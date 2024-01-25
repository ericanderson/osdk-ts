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

import type { ObjectTypeApiName } from "../components/ObjectTypeApiName.js";

/**
 * The requested object types are not synced into the ontology. Please reach out to your Ontology
 * Administrator to re-index the object type in Ontology Management Application.
 */
export interface ObjectTypeNotSynced {
  errorCode: "CONFLICT";
  errorName: "ObjectTypeNotSynced";
  errorInstanceId: string;
  parameters: {
    objectType: ObjectTypeApiName;
  };
}
