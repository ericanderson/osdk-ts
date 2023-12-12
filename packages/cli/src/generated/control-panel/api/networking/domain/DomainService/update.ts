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
import type { InternetDomainName } from "../../../InternetDomainName.js";
import type { UpdateDomainRequest } from "../UpdateDomainRequest.js";

/**
 * Updates the specified declared domain state for Control Panel, which will be updated asynchronously (see
 * {@link #get} for status updates). This endpoint expects the domain to be in normalized form (e.g. lowercase).
 *
 * Throws:
 * - ControlPanel:PermissionDenied if the user does not have `control-panel:environment:administer` on the
 * Control Panel root.
 * - Default:InvalidArgument if the migration status prohibits writing domains (see
 * `DomainMigrationStatus`).
 * - Default:InvalidArgument if specified domain does not exist in declared domain state.
 * - Default:InvalidArgument if specified domain aliases are syntactically invalid (see `DomainAlias`).
 * - Default:InvalidArgument if specified domain aliases contain duplicates
 */
export async function update(
  ctx: ConjureContext,
  name: InternetDomainName,
  request: UpdateDomainRequest,
): Promise<void> {
  return conjureFetch(ctx, `/domain/${name}`, "PUT", request);
}