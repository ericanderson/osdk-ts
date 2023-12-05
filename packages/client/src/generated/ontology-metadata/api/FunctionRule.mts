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

import type { ExperimentalDeclarativeEditInformation } from "./ExperimentalDeclarativeEditInformation.mjs";
import type { FunctionInputName } from "./FunctionInputName.mjs";
import type { FunctionRid } from "./FunctionRid.mjs";
import type { FunctionVersion } from "./FunctionVersion.mjs";
import type { LogicRuleValue } from "./LogicRuleValue.mjs";

export interface FunctionRule {
  functionRid: FunctionRid;
  functionVersion: FunctionVersion;
  functionInputValues: Map<FunctionInputName, LogicRuleValue>;
  experimentalDeclarativeEditInformation:
    | ExperimentalDeclarativeEditInformation
    | undefined;
}