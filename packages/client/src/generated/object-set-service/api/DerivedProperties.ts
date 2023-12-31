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

import type { DerivedPropertyDefinition } from "./DerivedPropertyDefinition.js";
import type { PropertyId } from "./PropertyId.js";

/**
 * A collection of derived properties that can be referenced in an object set or aggregation.
 * They are ephemeral and only exist for the lifetime of a request.
 */
export type DerivedProperties = Record<PropertyId, DerivedPropertyDefinition>;
