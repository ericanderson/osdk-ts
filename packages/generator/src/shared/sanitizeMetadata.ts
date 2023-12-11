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
  __UNSABLE_WireOntologyDefinitionV2,
  WireOntologyDefinition,
} from "../WireOntologyDefinition";

/**
 * @internal
 */
export function sanitizeMetadata(
  ontology: __UNSABLE_WireOntologyDefinitionV2,
): __UNSABLE_WireOntologyDefinitionV2;
/**
 * @internal
 */
export function sanitizeMetadata(
  ontology: WireOntologyDefinition,
): WireOntologyDefinition;
/**
 * @internal
 */
export function sanitizeMetadata<
  T extends WireOntologyDefinition | __UNSABLE_WireOntologyDefinitionV2,
>(
  ontology: T,
): T {
  return {
    ...ontology,
    actionTypes: Object.fromEntries(
      Object.values(ontology.actionTypes).map(actionType => {
        return [camelize(actionType.apiName), {
          ...actionType,
          apiName: camelize(actionType.apiName),
        }];
      }),
    ),
  };
}
function camelize(name: string) {
  return name.replace(/-./g, segment => segment[1]!.toUpperCase());
}
