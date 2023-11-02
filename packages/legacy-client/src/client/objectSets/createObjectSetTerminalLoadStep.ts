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

import type { ObjectTypesFrom, OntologyDefinition } from "@osdk/api";
import type {
  ObjectSetDefinition,
  OrderByClause,
} from "../../ontology-runtime";
import type { ClientContext } from "../../ontology-runtime/ontologyProvider/calls/ClientContext";
import { loadAllObjects } from "../../ontology-runtime/ontologyProvider/calls/loadObjects";
import { loadObjectsPage } from "../../ontology-runtime/ontologyProvider/calls/loadObjectsPage";
import type { ObjectSetTerminalLoadStep } from "../interfaces";
import type { OsdkLegacyObjectFrom } from "../OsdkObject";

export function createObjectSetTerminalLoadStep<
  O extends OntologyDefinition<any>,
  K extends ObjectTypesFrom<O>,
>(
  clientContext: ClientContext,
  apiName: K,
  objectSet: ObjectSetDefinition,
  selectedProperties: string[] = [],
  orderByClauses: OrderByClause[] = [],
): ObjectSetTerminalLoadStep<OsdkLegacyObjectFrom<O, K>> {
  return {
    async page(options) {
      return loadObjectsPage<O, K, OsdkLegacyObjectFrom<O, K>>(
        clientContext,
        apiName,
        objectSet,
        orderByClauses,
        selectedProperties,
        options,
      );
    },
    async all() {
      return loadAllObjects<O, K, OsdkLegacyObjectFrom<O, K>>(
        clientContext,
        apiName,
        objectSet,
        orderByClauses,
        selectedProperties,
      );
    },
  };
}