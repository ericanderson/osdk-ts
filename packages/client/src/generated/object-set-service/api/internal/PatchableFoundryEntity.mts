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

import type { DatasourceRid } from "../DatasourceRid.mjs";
import type { EntityPrimaryKey } from "../EntityPrimaryKey.mjs";
import type { EntityTypeRid } from "../EntityTypeRid.mjs";
import type { EntityVersion } from "../EntityVersion.mjs";
import type { PropertyTypeRid } from "../PropertyTypeRid.mjs";
import type { PropertyValue } from "../PropertyValue.mjs";
import type { InternalPropertyValue } from "./InternalPropertyValue.mjs";

export interface PatchableFoundryEntity {
  entityTypeRid: EntityTypeRid;
  primaryKey: EntityPrimaryKey;
  properties: Map<PropertyTypeRid, PropertyValue>;
  propertiesV2: Map<PropertyTypeRid, InternalPropertyValue>;
  version: EntityVersion;
  isAlive: boolean;
  authCode: Blob;
  patch: Blob | undefined;
  datasourceRids: Array<DatasourceRid>;
  invisibleDatasourceRids: Array<DatasourceRid>;
  invisibleProperties: Array<PropertyTypeRid>;
}