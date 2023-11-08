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
import type { MinimalFs } from "../MinimalFs";
import { wireObjectTypeV2ToSdkObjectDefinition } from "../shared/wireObjectTypeV2ToSdkObjectDefinition";
import { formatTs } from "../util/test/formatTs";
import type { WireOntologyDefinition } from "../WireOntologyDefinition";
import { wireObjectTypeV2ToObjectInterfaceStringV1 } from "./wireObjectTypeV2ToV1ObjectInterfaceString";

export async function generatePerObjectInterfaceAndDataFiles(
  ontology: WireOntologyDefinition,
  fs: MinimalFs,
  outDir: string,
) {
  await fs.mkdir(outDir, { recursive: true });
  await Promise.all(
    Object.values(ontology.objectTypes).map(async (object) => {
      const links = ontology.linkTypes[object.apiName];
      const uniqueApiNames = new Set(links?.map(a => a.objectTypeApiName));
      await fs.writeFile(
        path.join(outDir, `${object.apiName}.ts`),
        await formatTs(`
        import { ObjectDefinition } from "@osdk/api";
        ${
          wireObjectTypeV2ToObjectInterfaceStringV1(
            object,
            links,
          )
        }

         export const ${object.apiName} = ${
          JSON.stringify(
            wireObjectTypeV2ToSdkObjectDefinition(
              object,
              links,
            ),
            null,
            2,
          )
        } satisfies ObjectDefinition<"${object.apiName}", ${
          uniqueApiNames.size > 0
            ? [...uniqueApiNames].map(apiName => `"${apiName}"`).join(
              "|",
            )
            : "never"
        }>;`),
      );
    }),
  );

  await fs.writeFile(
    path.join(outDir, "index.ts"),
    await formatTs(`
    ${
      Object.keys(ontology.objectTypes).map(apiName =>
        `export * from "./${apiName}";`
      ).join("\n")
    }
    `),
  );
}
