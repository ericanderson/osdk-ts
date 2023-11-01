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

import type {
  FilteredPropertiesTerminalOperationsWithGet,
  OntologyObject,
} from "../../ontology-runtime";
import type {
  GetObjectError,
  Result,
} from "../../ontology-runtime/ontologyProvider";
import type { ObjectSet } from "./objectSet";
import type { SelectableProperties } from "./utils/OmitProperties";

export type BaseObjectSet<O extends OntologyObject> =
  & ObjectSet<O>
  & BaseObjectSetOperations<O>;

export type BaseObjectSetOperations<O extends OntologyObject> = {
  apiName: O["__apiName"];

  description: string;

  get(primaryKey: O["__primaryKey"]): Promise<Result<O, GetObjectError>>;

  select<T extends keyof SelectableProperties<O>>(
    properties: readonly T[],
  ): FilteredPropertiesTerminalOperationsWithGet<O, T[]>;
};