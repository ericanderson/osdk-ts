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
import type { UpdateUserRequest } from "../UpdateUserRequest.js";
import type { UserDirectoryUserRid } from "../UserDirectoryUserRid.js";

/**
 * Updates the user in the user directory.
 *
 * The user's attributes will be updated asynchronously on both Multipass and the user directory. Thus
 * attributes in Multipass and the user directory may be temporarily out of sync.
 *
 * Throws:
 * - ControlPanel:PermissionDenied if the user does not have `control-panel:user-directory-user:edit` on the
 * user directory user node.
 * - Default:InvalidArgument if the specified user does not exist in the user directory.
 * - Default:InvalidArgument if the specified user's state is not `UserDirectoryUserState.SYNC_USER`
 */
export async function updateUser(
  ctx: ConjureContext,
  userDirectoryUserRid: UserDirectoryUserRid,
  request: UpdateUserRequest,
): Promise<void> {
  return conjureFetch(
    ctx,
    `/user-directory/user/${userDirectoryUserRid}`,
    "PUT",
    request,
  );
}