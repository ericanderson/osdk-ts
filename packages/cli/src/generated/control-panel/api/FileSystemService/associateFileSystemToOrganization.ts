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
import type { FileSystemCatalogRid } from "../FileSystemCatalogRid.js";
import type { OrganizationRid } from "../OrganizationRid.js";

/**
 * Associates a file system to an organization. This endpoint should be used only to correct legacy cases in
 * which an organization does not have a file system but does have a private namespace.
 *
 * Requires the `control-panel:file-system:create` operation on Control Panel's root node, which is only expected
 * to be granted to BLT.
 */
export async function associateFileSystemToOrganization(
  ctx: ConjureContext,
  organizationRid: OrganizationRid,
  fileSystemRid: FileSystemCatalogRid,
): Promise<boolean> {
  return conjureFetch(
    ctx,
    `/filesystems/${organizationRid}/${fileSystemRid}/associate`,
    "PUT",
  );
}