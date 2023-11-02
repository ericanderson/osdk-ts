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

import { type MinimalFs } from "../MinimalFs";
export interface InMemoryFs extends MinimalFs {
  getFiles(): Record<string, string>;
  getFile(path: string): string;
}

export function createInMemoryFs(): InMemoryFs {
  const files: Record<string, string> = {};
  return {
    writeFile: async (path, contents) => {
      files[path] = contents;
    },
    mkdir: async (path, options) => {
    },
    getFiles: () => files,
    getFile: (path) => files[path],
  };
}
