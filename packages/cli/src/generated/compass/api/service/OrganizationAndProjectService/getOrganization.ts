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
import type { OrganizationFolder } from "../../project/OrganizationFolder.js";

/**
 * Gets a Compass namespace by rid.
 *
 * Returns an empty optional if the resource is not a namespace, else returns the namespace.
 */
export async function getOrganization(
  ctx: ConjureContext,
  rid: string,
): Promise<OrganizationFolder | undefined> {
  return conjureFetch(ctx, `/hierarchy/organizations/${rid}`, "GET");
}