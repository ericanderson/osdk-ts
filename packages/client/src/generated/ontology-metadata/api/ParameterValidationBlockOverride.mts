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

import type { AllowedValuesOverride } from "./AllowedValuesOverride.mjs";
import type { ParameterPrefillOverride } from "./ParameterPrefillOverride.mjs";
import type { ParameterRequiredOverride } from "./ParameterRequiredOverride.mjs";
import type { VisibilityOverride } from "./VisibilityOverride.mjs";
export interface ParameterValidationBlockOverride_parameterRequired {
  type: "parameterRequired";
  parameterRequired: ParameterRequiredOverride;
}

export interface ParameterValidationBlockOverride_visibility {
  type: "visibility";
  visibility: VisibilityOverride;
}

export interface ParameterValidationBlockOverride_allowedValues {
  type: "allowedValues";
  allowedValues: AllowedValuesOverride;
}

export interface ParameterValidationBlockOverride_prefill {
  type: "prefill";
  prefill: ParameterPrefillOverride;
}

export type ParameterValidationBlockOverride =
  | ParameterValidationBlockOverride_parameterRequired
  | ParameterValidationBlockOverride_visibility
  | ParameterValidationBlockOverride_allowedValues
  | ParameterValidationBlockOverride_prefill;