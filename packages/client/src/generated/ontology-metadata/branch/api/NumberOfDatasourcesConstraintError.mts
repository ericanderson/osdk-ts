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

import type { ObjectTypesHaveNoDatasourcesError } from "./ObjectTypesHaveNoDatasourcesError.mjs";
import type { ObjectTypesHaveTooManyDatasourcesError } from "./ObjectTypesHaveTooManyDatasourcesError.mjs";
export interface NumberOfDatasourcesConstraintError_objectTypesHaveNoDatasources {
  type: "objectTypesHaveNoDatasources";
  objectTypesHaveNoDatasources: ObjectTypesHaveNoDatasourcesError;
}

export interface NumberOfDatasourcesConstraintError_objectTypesHaveTooManyDatasources {
  type: "objectTypesHaveTooManyDatasources";
  objectTypesHaveTooManyDatasources: ObjectTypesHaveTooManyDatasourcesError;
}

export type NumberOfDatasourcesConstraintError =
  | NumberOfDatasourcesConstraintError_objectTypesHaveNoDatasources
  | NumberOfDatasourcesConstraintError_objectTypesHaveTooManyDatasources;