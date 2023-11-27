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

export {
  BaseFoundryClient,
  type BaseObjectSet,
  type FoundryClientOptions,
  type ObjectSet,
  type Ontology,
} from "./client";
export {
  type ActionError,
  ActionExecutionMode,
  ActionResponse,
  ActionValidationResult,
  ArrayType,
  AttachmentType,
  BooleanType,
  ByteType,
  DateType,
  DecimalType,
  DoubleType,
  FloatType,
  FoundryApiError,
  GeoPoint,
  GeoPointType,
  GeoShape,
  GeoShapeType,
  IntegerType,
  isErr,
  isOk,
  LocalDate,
  LongType,
  ObjectType,
  Op,
  Polygon,
  ReturnEditsMode,
  SetType,
  ShortType,
  StringType,
  StructField,
  StructType,
  TimeSeriesType,
  Timestamp,
  TimestampType,
  visitError,
} from "./client";
export type {
  ActionEditedPropertiesNotFound,
  ActionExecutionOptions,
  ActionNotFound,
  ActionParameterObjectNotFound,
  ActionParameterObjectTypeNotFound,
  ActionResponseFromOptions,
  ActionTypeNotFound,
  ActionValidationFailed,
  AggregateObjectsError,
  AggregationGroup,
  AggregationGroupCountExceededLimit,
  AggregationResult,
  ApplyActionFailed,
  Attachment,
  AttachmentMetadata,
  AttachmentNotFound,
  AttachmentsError,
  AttachmentSizeExceededLimit,
  CompositePrimaryKeyNotSupported,
  DuplicateOrderBy,
  Edits,
  ErrorVisitor,
  FunctionEncounteredUserFacingError,
  FunctionExecutionTimedOut,
  FunctionInvalidInput,
  GetLinkedObjectError,
  GetObjectError,
  InvalidAggregationRange,
  InvalidAggregationRangePropertyType,
  InvalidAggregationRangeValue,
  InvalidContentLength,
  InvalidContentType,
  InvalidFields,
  InvalidGroupId,
  InvalidParameterValue,
  InvalidPropertyFiltersCombination,
  InvalidPropertyFilterValue,
  InvalidPropertyValue,
  InvalidRangeQuery,
  InvalidSortOrder,
  InvalidSortType,
  InvalidUserId,
  LinkedObjectNotFound,
  LinkTypeNotFound,
  ListLinkedObjectsError,
  ListObjectsError,
  LoadObjectSetError,
  MalformedPropertyFilters,
  MissingParameter,
  MultiLink,
  MultipleGroupByOnFieldNotSupported,
  ObjectNotFound,
  ObjectsExceededLimit,
  ObjectTypeNotFound,
  ObjectTypeNotSynced,
  OntologyEditsExceededLimit,
  OntologyNotFound,
  OntologyObject,
  OntologySyncing,
  Page,
  ParameterObjectNotFound,
  ParameterObjectSetRidNotFound,
  ParametersNotFound,
  ParameterTypeNotSupported,
  PermissionDenied,
  PropertiesNotFilterable,
  PropertiesNotFound,
  PropertiesNotSearchable,
  PropertiesNotSortable,
  PropertyApiNameNotFound,
  PropertyBaseTypeNotSupported,
  PropertyFiltersNotSupported,
  PropertyTypesSearchNotSupported,
  QueryDepthExceededLimit,
  QueryEncounteredUserFacingError,
  QueryError,
  QueryMemoryExceededLimit,
  QueryNotFound,
  QueryResponse,
  QueryTimeExceededLimit,
  Range,
  RangeType,
  Result,
  SearchObjectsError,
  SingleLink,
  ThreeDimensionalAggregation,
  TimeSeries,
  TimeSeriesError,
  TimeSeriesPoint,
  TwoDimensionalAggregation,
  Unauthorized,
  UnknownError,
  UnknownParameter,
} from "./client";
export {
  type Auth,
  ConfidentialClientAuth,
  PublicClientAuth,
  UserTokenAuth,
} from "./oauth-client";
