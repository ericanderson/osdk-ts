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

import type { WorkflowObjectTypeTraitDescription } from "./WorkflowObjectTypeTraitDescription.mjs";
import type { WorkflowObjectTypeTraitDisplayName } from "./WorkflowObjectTypeTraitDisplayName.mjs";
import type { WorkflowObjectTypeTraitId } from "./WorkflowObjectTypeTraitId.mjs";
import type { WorkflowObjectTypeTraitProperty } from "./WorkflowObjectTypeTraitProperty.mjs";
import type { WorkflowObjectTypeTraitPropertyId } from "./WorkflowObjectTypeTraitPropertyId.mjs";
import type { WorkflowObjectTypeTraitVersion } from "./WorkflowObjectTypeTraitVersion.mjs";

export interface WorkflowObjectTypeTrait {
  displayName: WorkflowObjectTypeTraitDisplayName;
  id: WorkflowObjectTypeTraitId;
  description: WorkflowObjectTypeTraitDescription | undefined;
  version: WorkflowObjectTypeTraitVersion;
  properties: Map<
    WorkflowObjectTypeTraitPropertyId,
    WorkflowObjectTypeTraitProperty
  >;
}