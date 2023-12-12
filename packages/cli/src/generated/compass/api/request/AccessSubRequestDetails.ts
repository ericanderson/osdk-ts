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

import type { InternalRealmGroupAdditionSubRequest } from "./InternalRealmGroupAdditionSubRequest.js";
import type { MarkingAdditionSubRequest } from "./MarkingAdditionSubRequest.js";
import type { RoleGrantSubRequest } from "./RoleGrantSubRequest.js";
export interface AccessSubRequestDetails_internalRealmGroupAddition {
  type: "internalRealmGroupAddition";
  internalRealmGroupAddition: InternalRealmGroupAdditionSubRequest;
}

export interface AccessSubRequestDetails_roleGrant {
  type: "roleGrant";
  roleGrant: RoleGrantSubRequest;
}

export interface AccessSubRequestDetails_markingAddition {
  type: "markingAddition";
  markingAddition: MarkingAdditionSubRequest;
}
/**
 * A subrequest that provide some discretionary or mandatory access to a resource.
 */
export type AccessSubRequestDetails =
  | AccessSubRequestDetails_internalRealmGroupAddition
  | AccessSubRequestDetails_roleGrant
  | AccessSubRequestDetails_markingAddition;