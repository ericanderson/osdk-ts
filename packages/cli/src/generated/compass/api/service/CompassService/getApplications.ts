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
import type { Application } from "../../registry/Application.js";

/**
 * Returns the list of registered applications.
 *
 * If a track is provided, will only return applications available on the requested track,
 * including applications without a track.
 * If a track is not provided, will return all applications.
 */
export async function getApplications(
  ctx: ConjureContext,
  palantirExternalHost: string | undefined,
  track: string | undefined,
): Promise<Array<Application>> {
  return conjureFetch(
    ctx,
    `/registry/applications?${new URLSearchParams({ "track": "" + track })}`,
    "GET",
  );
}