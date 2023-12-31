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
import type { SiteVersion } from "../SiteVersion.js";

/**
 * Get the deployed version that will be served for a given siteasset repository.
 *
 * artifacts:sites:read-deployment-info permission is needed on the repository rid to call this endpoint.
 */
export async function getDeployedVersion(
  ctx: ConjureContext,
  repositoryRid: string,
): Promise<SiteVersion | undefined> {
  return conjureFetch(
    ctx,
    `/sites/v2/admin/repository/${repositoryRid}/deployed-version`,
    "GET",
  );
}
