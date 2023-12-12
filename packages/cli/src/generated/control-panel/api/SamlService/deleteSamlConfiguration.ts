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
import type { DeleteSamlResponse } from "../DeleteSamlResponse.js";

/**
 * Deletes the SAML configuration with the given RID.
 *
 * Requires `control-panel:authentication-provider:edit` on the SAML RID.
 *
 * Warning: this endpoint is destructive and should only be called on SAMLs which definitely do not need to exist
 * anymore.
 */
export async function deleteSamlConfiguration(
  ctx: ConjureContext,
  samlRid: string,
): Promise<DeleteSamlResponse> {
  return conjureFetch(ctx, `/saml/${samlRid}`, "DELETE");
}
