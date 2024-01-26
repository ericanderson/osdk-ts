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

import path from "path";
import type { MinimalFs } from "../MinimalFs.js";
import { formatTs } from "../util/test/formatTs.js";
import type { WireOntologyDefinition } from "../WireOntologyDefinition.js";

export async function generateOntologyMetadataFile(
  ontology: WireOntologyDefinition,
  fs: MinimalFs,
  outDir: string,
  additionalUserAgents: string[] = [],
) {
  const userAgent = ["foundry-typescript-osdk/2.0.0", ...additionalUserAgents]
    .join(" ");
  fs.writeFile(
    path.join(outDir, "OntologyMetadata.ts"),
    await formatTs(
      `
      export const OntologyMetadata = {
        ontologyRid: "${ontology.ontology.rid}",
        ontologyApiName: "${ontology.ontology.apiName}",
        userAgent: "${userAgent}",
      }
      `,
    ),
  );
}
