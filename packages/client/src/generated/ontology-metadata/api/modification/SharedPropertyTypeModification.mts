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

import type { BaseFormatter } from "../BaseFormatter.mjs";
import type { SharedPropertyTypeAlias } from "../entitymetadata/SharedPropertyTypeAlias.mjs";
import type { ObjectTypeFieldApiName } from "../ObjectTypeFieldApiName.mjs";
import type { SharedPropertyTypeDisplayMetadata } from "../SharedPropertyTypeDisplayMetadata.mjs";
import type { Type } from "../Type.mjs";
import type { TypeClass } from "../TypeClass.mjs";
import type { SharedPropertyTypeGothamMappingModification } from "../typemapping/SharedPropertyTypeGothamMappingModification.mjs";
import type { DataConstraintsModification } from "./DataConstraintsModification.mjs";
import type { ValueTypeReferenceModification } from "./ValueTypeReferenceModification.mjs";

export interface SharedPropertyTypeModification {
  apiName: ObjectTypeFieldApiName | undefined;
  displayMetadata: SharedPropertyTypeDisplayMetadata;
  baseFormatter: BaseFormatter | undefined;
  type: Type;
  typeClasses: Array<TypeClass>;
  indexedForSearch: boolean;
  dataConstraints: DataConstraintsModification | undefined;
  gothamMapping: SharedPropertyTypeGothamMappingModification | undefined;
  valueType: ValueTypeReferenceModification | undefined;
  aliases: Array<SharedPropertyTypeAlias> | undefined;
}