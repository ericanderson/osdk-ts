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

/**
 * For a given set of rids, return the map of rid to namespaceRid of the namespace that the resource lives in.
 * This will return results for resources not registered in Compass, so long as the resource lives in a
 * namespace's GK tree. However, if an input resource does not exist or cannot be associated with a namespace, or
 * if the calling user does not have permission to view the resource or its containing project, it will not be
 * returned. No permissions are required on the namespaceRid.
 *
 * Throws TooManyResourcesRequested if more than 200 resources are requested in a single batch.
 */
export async function getNamespaceRidsForResources(
  ctx: ConjureContext,
  rids: Array<string>,
): Promise<Record<string, string>> {
  return conjureFetch(
    ctx,
    `/hierarchy/v2/batch/namespaces/resources`,
    "PUT",
    rids,
  );
}