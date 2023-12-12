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
import type { AdminRoleId } from "../AdminRoleId.js";
import type { GetAdminRoleMembersResponseV2 } from "../GetAdminRoleMembersResponseV2.js";
import type { OrganizationRid } from "../OrganizationRid.js";

/**
 * Returns the principals that are granted the admin role on the organization. Principals can be: users, groups,
 * all members of an organization. The latter is deprecated as it will not be supported in the future
 * implementation using roles.
 */
export async function getAdminRoleMembersV2(
  ctx: ConjureContext,
  adminRoleId: AdminRoleId,
  orgRid: OrganizationRid,
): Promise<GetAdminRoleMembersResponseV2> {
  return conjureFetch(
    ctx,
    `/org-admin/admin-role/${adminRoleId}/members-v2?${new URLSearchParams({
      "orgRid": orgRid,
    })}`,
    "GET",
  );
}