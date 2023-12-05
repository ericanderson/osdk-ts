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

import type { ArrayPropertyValue } from "./ArrayPropertyValue.mjs";
import type { AttachmentPropertyValue } from "./AttachmentPropertyValue.mjs";
import type { BooleanPropertyValue } from "./BooleanPropertyValue.mjs";
import type { CipherTextPropertyValue } from "./CipherTextPropertyValue.mjs";
import type { DatePropertyValue } from "./DatePropertyValue.mjs";
import type { DecimalPropertyValue } from "./DecimalPropertyValue.mjs";
import type { DoublePropertyValue } from "./DoublePropertyValue.mjs";
import type { GeoPointPropertyValue } from "./GeoPointPropertyValue.mjs";
import type { GeoShapePropertyValue } from "./GeoShapePropertyValue.mjs";
import type { GeotimeSeriesReferencePropertyValue } from "./GeotimeSeriesReferencePropertyValue.mjs";
import type { IntegerPropertyValue } from "./IntegerPropertyValue.mjs";
import type { LongPropertyValue } from "./LongPropertyValue.mjs";
import type { MarkingPropertyValue } from "./MarkingPropertyValue.mjs";
import type { MediaReferencePropertyValue } from "./MediaReferencePropertyValue.mjs";
import type { NullPropertyValue } from "./NullPropertyValue.mjs";
import type { StringPropertyValue } from "./StringPropertyValue.mjs";
import type { TimeDependentPropertyValue } from "./TimeDependentPropertyValue.mjs";
import type { TimestampPropertyValue } from "./TimestampPropertyValue.mjs";
import type { VectorPropertyValue } from "./VectorPropertyValue.mjs";
export interface PropertyValue_array {
  type: "array";
  array: ArrayPropertyValue;
}

export interface PropertyValue_boolean {
  type: "boolean";
  boolean: BooleanPropertyValue;
}

export interface PropertyValue_cipherText {
  type: "cipherText";
  cipherText: CipherTextPropertyValue;
}

export interface PropertyValue_date {
  type: "date";
  date: DatePropertyValue;
}

export interface PropertyValue_decimal {
  type: "decimal";
  decimal: DecimalPropertyValue;
}

export interface PropertyValue_double {
  type: "double";
  double: DoublePropertyValue;
}

export interface PropertyValue_geoPoint {
  type: "geoPoint";
  geoPoint: GeoPointPropertyValue;
}

export interface PropertyValue_geoShape {
  type: "geoShape";
  geoShape: GeoShapePropertyValue;
}

export interface PropertyValue_geotimeSeriesReference {
  type: "geotimeSeriesReference";
  geotimeSeriesReference: GeotimeSeriesReferencePropertyValue;
}

export interface PropertyValue_integer {
  type: "integer";
  integer: IntegerPropertyValue;
}

export interface PropertyValue_long {
  type: "long";
  long: LongPropertyValue;
}

export interface PropertyValue_marking {
  type: "marking";
  marking: MarkingPropertyValue;
}

export interface PropertyValue_null {
  type: "null";
  null: NullPropertyValue;
}

export interface PropertyValue_string {
  type: "string";
  string: StringPropertyValue;
}

export interface PropertyValue_timeDependent {
  type: "timeDependent";
  timeDependent: TimeDependentPropertyValue;
}

export interface PropertyValue_timestamp {
  type: "timestamp";
  timestamp: TimestampPropertyValue;
}

export interface PropertyValue_attachment {
  type: "attachment";
  attachment: AttachmentPropertyValue;
}

export interface PropertyValue_mediaReference {
  type: "mediaReference";
  mediaReference: MediaReferencePropertyValue;
}

export interface PropertyValue_vector {
  type: "vector";
  vector: VectorPropertyValue;
}

export type PropertyValue =
  | PropertyValue_array
  | PropertyValue_boolean
  | PropertyValue_cipherText
  | PropertyValue_date
  | PropertyValue_decimal
  | PropertyValue_double
  | PropertyValue_geoPoint
  | PropertyValue_geoShape
  | PropertyValue_geotimeSeriesReference
  | PropertyValue_integer
  | PropertyValue_long
  | PropertyValue_marking
  | PropertyValue_null
  | PropertyValue_string
  | PropertyValue_timeDependent
  | PropertyValue_timestamp
  | PropertyValue_attachment
  | PropertyValue_mediaReference
  | PropertyValue_vector;