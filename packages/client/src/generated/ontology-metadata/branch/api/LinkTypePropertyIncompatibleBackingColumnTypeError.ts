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

import type { FoundryFieldType } from "../../api/FoundryFieldType.js";
import type { LinkTypeRid } from "../../api/LinkTypeRid.js";
import type { PropertyTypeRid } from "../../api/PropertyTypeRid.js";

/**
 * An error representing when the property of a many-to-many link type has a type that is incompatible with the type of the backing data.
 */
export interface LinkTypePropertyIncompatibleBackingColumnTypeError {
  linkType: LinkTypeRid;
  propertyType: PropertyTypeRid;
  validColumnTypes: Array<FoundryFieldType>;
  providedColumnType: FoundryFieldType;
}