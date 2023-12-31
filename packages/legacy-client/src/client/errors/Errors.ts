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

export interface PalantirApiError extends Error {
  errorType?: string;
  message: string;
  errorName: string;
  errorInstanceId?: string;
  statusCode?: number;
  parameters?: any;
}

export class PalantirApiError extends Error implements PalantirApiError {
  message: string;
  errorName: string;
  errorType?: string;
  statusCode?: number;
  errorInstanceId?: string;
  parameters?: any;

  constructor(
    message: string,
    errorName: string,
    errorType?: string,
    statusCode?: number,
    errorInstanceId?: string,
    parameters?: any,
  ) {
    super();
    this.errorName = errorName;
    this.errorType = errorType;
    this.statusCode = statusCode;
    this.errorInstanceId = errorInstanceId;
    this.message = message;
    this.parameters = parameters;
  }
}

export function isPalantirApiError(e: any): e is PalantirApiError {
  return e.errorName && e.errorInstanceId;
}
