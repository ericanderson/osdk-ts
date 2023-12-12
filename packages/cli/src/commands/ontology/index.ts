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

import type * as yargs from "yargs";
import type { CliCommonArgs } from "../../CliCommonArgs.js";
import type { CommonOntologyArgs } from "./CommonOntologyArgs.js";
import init from "./initialize/index.js";

const site: yargs.CommandModule<CliCommonArgs, CommonOntologyArgs> = {
  command: "ontology",
  describe: "Manage your ontology",
  builder: (argv) => {
    return argv
      .options({
        baseUrl: {
          type: "string",
          demandOption: true,
        },
      })
      .command(init)
      .demandCommand();
  },
  handler: async (args) => {
  },
};

export default site;
