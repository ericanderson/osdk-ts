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

import type { DatasourceDerived } from "./DatasourceDerived.mjs";
import type { RolesEnabled } from "./RolesEnabled.mjs";
import type { RolesEnforced } from "./RolesEnforced.mjs";
export interface PermissionModel_rolesEnforced {
  type: "rolesEnforced";
  rolesEnforced: RolesEnforced;
}

export interface PermissionModel_rolesEnabled {
  type: "rolesEnabled";
  rolesEnabled: RolesEnabled;
}

export interface PermissionModel_datasourceDerived {
  type: "datasourceDerived";
  datasourceDerived: DatasourceDerived;
}

export type PermissionModel =
  | PermissionModel_rolesEnforced
  | PermissionModel_rolesEnabled
  | PermissionModel_datasourceDerived;