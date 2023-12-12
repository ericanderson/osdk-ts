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

import { type ConjureContext, conjureFetch } from "conjure-lite";
import type { EnrollmentRid } from "../../EnrollmentRid.js";
import type { EnrollmentSetupTokenPassword } from "../../EnrollmentSetupTokenPassword.js";
import type { Realm } from "../../Realm.js";
import type { RealmMfaResponse } from "../RealmMfaResponse.js";

/**
 * Returns the realm's multi-factor authentication method if it was configured, or empty optional otherwise.
 *
 * The authorization header should hold a token from an enrollment setup link.
 *
 * Throws `ControlPanel:InvalidEnrollmentSetupToken` if the token is invalid or doesn't match the enrollment.
 *
 * The realm must belong to the enrollment.
 */
export async function deprecatedGetRealmMfaWithEnrollmentSetupToken(
  ctx: ConjureContext,
  tokenPassword: EnrollmentSetupTokenPassword,
  enrollmentRid: EnrollmentRid,
  realm: Realm,
): Promise<RealmMfaResponse | undefined> {
  return conjureFetch(
    ctx,
    `/mfa/enrollments/${enrollmentRid}/realms/${realm}/enrollment-setup-token`,
    "GET",
  );
}