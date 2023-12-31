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

import type { DomainName } from "./DomainName.js";
import type { SiteDomainRegistrationRequestRid } from "./SiteDomainRegistrationRequestRid.js";

/**
 * Domain that is managed through control panel and requires an enrollment-level Information Security Officer
 * approval to be fully registered.
 * The domain should be validated with control panel before use, its status can be fetched through
 * approvals APIs.
 */
export interface ControlPanelManagedDomainInfo {
  requestRid: SiteDomainRegistrationRequestRid;
  siteDomain: DomainName;
}
