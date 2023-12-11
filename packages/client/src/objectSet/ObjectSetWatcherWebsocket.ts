/*
 * Copyright 2023 Palantir Technologies, Inc. All rights reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import type { ObjectTypeKeysFrom, OntologyDefinition } from "@osdk/api";
import { getObjectTypeV2 } from "@osdk/gateway/requests";
import type { OntologyObjectV2 } from "@osdk/gateway/types";
import { type ClientContext, createOpenApiRequest } from "@osdk/shared.net";
import type { ConjureContext } from "conjure-lite";
import WebSocket from "isomorphic-ws";
import invariant from "tiny-invariant";
import { createTemporaryObjectSet } from "../generated/object-set-service/api/ObjectSetService.js";

import type {
  Message,
  ObjectSetChanged,
  ObjectSetSubscribeRequests,
} from "../generated/object-set-watcher/index.js";
import type { FoundryObject } from "../generated/object-set-watcher/object/FoundryObject.js";
import { batchEnableWatcher } from "../generated/object-set-watcher/ObjectSetWatchService.js";
import type {
  StreamMessage,
  StreamMessage_objectSetChanged,
} from "../generated/object-set-watcher/StreamMessage.js";
import { loadOntologyEntities } from "../generated/ontology-metadata/api/OntologyMetadataService.js";
import type { Wire } from "../internal/net/index.js";
import { convertWireToOsdkObjects } from "../object/convertWireToOsdkObjects.js";
import type { OsdkObjectFrom } from "../OsdkObjectFrom.js";
import { Deferred } from "./Deferred.js";
import type { ObjectSetListener } from "./ObjectSetWatcher.js";
import {
  getObjectSetBaseType,
  toConjureObjectSet,
} from "./toConjureObjectSet.js";

export class ObjectSetWatcherWebsocket<
  O extends OntologyDefinition<any, any, any>,
> {
  static #instances = new WeakMap<
    ClientContext<any>,
    ObjectSetWatcherWebsocket<any>
  >();

  static getInstance<O extends OntologyDefinition<any, any, any>>(
    client: ClientContext<O>,
  ) {
    let instance = ObjectSetWatcherWebsocket.#instances.get(client);
    if (instance == null) {
      instance = new ObjectSetWatcherWebsocket(client);
      ObjectSetWatcherWebsocket.#instances.set(client, instance);
    }
    return instance;
  }

  #ws: WebSocket | undefined;
  #client: ClientContext<O>;
  #pendingListeners = new Map<
    string,
    { deferred: Deferred<() => void>; listener: ObjectSetListener<O, any> }
  >();
  #listeners = new Map<string, ObjectSetListener<O, any>>();
  #conjureContext: ConjureContext;
  #metadataContext: ConjureContext;
  #ossContext: ConjureContext;

  private constructor(client: ClientContext<O>) {
    this.#client = client;

    const stackUrl = new URL(client.stack);
    this.#conjureContext = {
      baseUrl: stackUrl.origin,
      servicePath: "/object-set-watcher/api",
      fetchFn: client.fetch,
      tokenProvider: async () => await client.tokenProvider(),
    };
    this.#ossContext = {
      baseUrl: stackUrl.origin,
      servicePath: "/object-set-service/api",
      fetchFn: client.fetch,
      tokenProvider: async () => await client.tokenProvider(),
    };
    this.#metadataContext = {
      baseUrl: stackUrl.origin,
      servicePath: "/ontology-metadata/api",
      fetchFn: client.fetch,
      tokenProvider: async () => await client.tokenProvider(),
    };
  }

  async subscribe<K extends ObjectTypeKeysFrom<O>>(
    objectSet: Wire.ObjectSet,
    listener: ObjectSetListener<O, K>,
  ): Promise<() => void> {
    const objectSetBaseType = await getObjectSetBaseType(objectSet);
    const mapping = await getOntologyPropertyMappingForApiName(
      this.#client,
      this.#metadataContext,
      objectSetBaseType,
    );
    const [temporaryObjectSet] = await Promise.all([
      // create a time-bounded object set representation for watching
      this.#createTemporaryObjectSet(objectSet),

      this.#ensureWebsocket(),

      // look up the object type's rid and ensure that we have enabled object set watcher for that rid
      // TODO ???
      getObjectSetBaseType(objectSet).then(baseType =>
        getObjectTypeV2(
          createOpenApiRequest(this.#client.stack, this.#client.fetch),
          this.#client.ontology.metadata.ontologyApiName,
          baseType,
        )
      ).then(
        objectType => this.#enableObjectSetsWatcher([objectType.rid]),
      ),
    ]);

    // subscribe to object set
    const requestId = crypto.randomUUID();
    const subscribe: ObjectSetSubscribeRequests = {
      id: requestId,
      requests: [{
        objectSet: temporaryObjectSet.objectSetRid,
        objectSetContext: {
          objectSetFilterContext: { parameterOverrides: {} },
        },
        watchAllLinks: false,
      }],
    };

    const deferred = new Deferred<() => void>();

    this.#pendingListeners.set(requestId, { deferred, listener });
    this.#ws?.send(JSON.stringify(subscribe));

    return deferred.promise;
  }

  async #ensureWebsocket() {
    if (this.#ws == null) {
      const { stack, tokenProvider } = this.#client;
      const base = new URL(stack);
      // TODO: This should be a different endpoint
      const url = `wss://${base.host}/object-set-watcher/ws/subscriptions`;
      const token = await tokenProvider();
      this.#ws = new WebSocket(url, [`Bearer-${token}`]);

      this.#ws.addEventListener("error", (e) => {
        this.#destroyWebsocket();
      });

      this.#ws.addEventListener("close", () => {
        this.#destroyWebsocket();
      });

      this.#ws.addEventListener("message", this.#onMessage);

      return new Promise<void>((resolve, reject) => {
        this.#ws!.addEventListener("open", () => {
          resolve();
        });
        this.#ws!.addEventListener("error", (event: WebSocket.ErrorEvent) => {
          reject(new Error(event.toString()));
        });
      });
    }
  }

  #onMessage = async (message: WebSocket.MessageEvent) => {
    const data = JSON.parse(message.data.toString()) as
      | StreamMessage
      | Message;

    switch (data.type) {
      case "objectSetChanged": {
        if ((data.objectSetChanged as any).confidenceValue) {
          const listener = this.#listeners.get(data.objectSetChanged.id);
          listener?.refresh?.();
          break;
        }

        const { id: subscriptionId, objects } =
          (data as StreamMessage_objectSetChanged).objectSetChanged;
        const listener = this.#listeners.get(subscriptionId);
        const convertedObjects = await convertFoundryToOsdkObjects(
          this.#client,
          this.#metadataContext,
          objects,
        );
        listener?.change?.(convertedObjects);
        break;
      }

      case "refreshObjectSet": {
        const { id: subscriptionId } = data.refreshObjectSet;
        const listener = this.#listeners.get(subscriptionId);
        listener?.refresh?.();
        break;
      }

      case "subscribeResponses": {
        const { id: requestId, responses } = data.subscribeResponses;

        const pendingData = this.#pendingListeners.get(requestId);

        if (pendingData == null) {
          throw new Error(
            "Got a subscription response for a requestId we weren't expecting",
          );
        }

        const { deferred, listener } = pendingData;
        this.#pendingListeners.delete(requestId);

        if (responses.length !== 1) {
          deferred.reject(
            "Got more than one response but we only expect a single one",
          );
        }

        const response = responses[0];
        switch (response.type) {
          case "error":
            deferred.reject(response.error);
            return;
          case "qos":
            deferred.reject(response.qos);
            this.#destroyWebsocket();
            return;
          case "success":
            const { id: subscriptionId } = response.success;
            this.#listeners.set(subscriptionId, listener);
            deferred.resolve(() => {
              // TODO there isn't actually a network call to unsubscribe the socket yet
              this.#listeners.delete(subscriptionId);
              if (this.#listeners.size === 0) {
                this.#destroyWebsocket();
              }
            });
            break;
          default:
            const _: never = response;
            deferred.reject(response);
        }

        break;
      }

      default:
        const _: never = data;
    }
  };

  async #enableObjectSetsWatcher(objectTypeRids: string[]) {
    return batchEnableWatcher(this.#conjureContext, {
      requests: objectTypeRids,
    });
  }

  async #createTemporaryObjectSet<K extends ObjectTypeKeysFrom<O>>(
    objectSet: Wire.ObjectSet,
  ) {
    // TODO do we need to do something when the subscription expires on the server?
    const objectSetBaseType = await getObjectSetBaseType(objectSet);
    const mapping = await getOntologyPropertyMappingForApiName(
      this.#client,
      this.#metadataContext,
      objectSetBaseType,
    );

    const temporaryObjectSet = await createTemporaryObjectSet(
      this.#ossContext,
      {
        objectSet: toConjureObjectSet(objectSet, mapping!),
        timeToLive: "ONE_DAY",
        objectSetFilterContext: { parameterOverrides: {} },
      },
    );
    return { objectSetRid: temporaryObjectSet.objectSetRid };
  }

  #destroyWebsocket() {
    if (this.#ws) {
      this.#ws.close();
      this.#ws = undefined;
    }

    for (const listener of this.#listeners.values()) {
      listener.cancelled?.();
    }
    this.#listeners.clear();
  }
}

async function convertFoundryToOsdkObjects<
  O extends OntologyDefinition<any>,
  K extends ObjectTypeKeysFrom<O>,
>(
  client: ClientContext<any>,
  ctx: ConjureContext,
  objects: ReadonlyArray<FoundryObject>,
): Promise<Array<OsdkObjectFrom<K, O>>> {
  const osdkObjects: OsdkObjectFrom<K, O>[] = await Promise.all(
    objects.map(async object => {
      const propertyMapping = await getOntologyPropertyMappingForRid(
        ctx,
        object.type,
      );
      const convertedObject: OntologyObjectV2 = Object.fromEntries([
        ...Object.entries(object.properties).map(([key, value]) => {
          return [propertyMapping?.propertyIdToApiNameMapping[key], value];
        }),
        [
          propertyMapping
            ?.propertyIdToApiNameMapping[Object.entries(object.key)[0][0]],
          Object.entries(object.key)[0][1],
        ],
        [
          "__apiName",
          propertyMapping?.apiName,
        ],
      ]);

      return convertWireToOsdkObjects<K & string, O>(
        client,
        propertyMapping?.apiName! as K & string,
        [
          convertedObject,
        ],
      ) as unknown as OsdkObjectFrom<K, O>;
    }),
  );

  return osdkObjects;
}

export type ObjectPropertyMapping = {
  apiName: string;
  id: string;
  propertyIdToApiNameMapping: Record<string, string>;
  propertyApiNameToIdMapping: Record<string, string>;
};

// Mapping of ObjectRid to Properties
const objectTypeMapping = new WeakMap<
  ConjureContext,
  Map<string, ObjectPropertyMapping>
>();

const objectApiNameToRid = new Map<string, string>();

async function getOntologyPropertyMappingForApiName(
  client: ClientContext<any>,
  ctx: ConjureContext,
  objectApiName: string,
) {
  if (objectApiNameToRid.has(objectApiName)) {
    return objectTypeMapping.get(ctx)?.get(
      objectApiNameToRid.get(objectApiName)!,
    );
  }

  const wireObjectType = await getObjectTypeV2(
    createOpenApiRequest(client.stack, client.fetch),
    client.ontology.metadata.ontologyApiName,
    objectApiName,
  );

  return getOntologyPropertyMappingForRid(ctx, wireObjectType.rid);
}

async function getOntologyPropertyMappingForRid(
  ctx: ConjureContext,
  objectRid: string,
) {
  if (!objectTypeMapping.has(ctx)) {
    objectTypeMapping.set(ctx, new Map());
  }

  if (
    !objectTypeMapping.get(ctx)!.has(objectRid)
  ) {
    const body = {
      objectTypeVersions: {
        // TODO: Undefined drops this in the body
        [objectRid]: "0000000a-0692-bbe3-af23-ddbb6c020392",
      },
      linkTypeVersions: {},
      loadRedacted: false,
      includeObjectTypesWithoutSearchableDatasources: true,
    };
    const entities = await loadOntologyEntities(ctx, body);

    invariant(entities.objectTypes[objectRid], "object type should be loaded");

    const propertyIdToApiNameMapping: Record<string, string> = Object
      .fromEntries(
        Object.values(entities.objectTypes[objectRid].propertyTypes).map(
          property => {
            return [property.id, property.apiName!];
          },
        ),
      );

    const propertyApiNameToIdMapping: Record<string, string> = Object
      .fromEntries(
        Object.values(entities.objectTypes[objectRid].propertyTypes).map(
          property => {
            return [property.id, property.apiName!];
          },
        ),
      );

    objectTypeMapping.get(ctx)?.set(objectRid, {
      apiName: entities.objectTypes[objectRid].apiName!,
      id: entities.objectTypes[objectRid].id,
      propertyIdToApiNameMapping,
      propertyApiNameToIdMapping,
    });

    objectApiNameToRid.set(entities.objectTypes[objectRid].apiName!, objectRid);
  }

  return objectTypeMapping.get(ctx)?.get(objectRid);
}
function isObjectSetChanged(
  message: StreamMessage | ObjectSetChanged,
): message is ObjectSetChanged {
  return (message as any)?.type == null;
}