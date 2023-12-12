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

import { type ConjureContext, conjureFetch } from "conjure-lite";
import type { AuthenticationProviderRid } from "../../../AuthenticationProviderRid.js";
import type { PrincipalId } from "../../../PrincipalId.js";
import type { SetGroupOrganizationsRequest } from "../SetGroupOrganizationsRequest.js";

/**
 * Sets organizations for a rule-based group.
 * Organizations must belong to the provider's enrollment.
 *
 * Requires `control-panel:authentication-provider:edit` on the provider RID.
 */
export async function setGroupOrganizations(
  ctx: ConjureContext,
  providerRid: AuthenticationProviderRid,
  groupId: PrincipalId,
  request: SetGroupOrganizationsRequest,
): Promise<void> {
  return conjureFetch(
    ctx,
    `/authentication-provider/${providerRid}/groups/${groupId}/organizations`,
    "PUT",
    request,
  );
}