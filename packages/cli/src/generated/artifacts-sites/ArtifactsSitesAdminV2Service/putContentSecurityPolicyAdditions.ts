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
import type { ContentSecurityPolicyAdditions } from "../ContentSecurityPolicyAdditions.js";

/**
 * Set the CSP additions configured for a repository.
 *
 * artifacts:sites:write-deployment-info permission is needed on the repository rid to call this endpoint.
 */
export async function putContentSecurityPolicyAdditions(
  ctx: ConjureContext,
  repositoryRid: string,
  contentSecurityPolicyAdditions: ContentSecurityPolicyAdditions,
): Promise<void> {
  return conjureFetch(
    ctx,
    `/sites/v2/admin/repository/${repositoryRid}/csp/additions`,
    "PUT",
    contentSecurityPolicyAdditions,
  );
}
