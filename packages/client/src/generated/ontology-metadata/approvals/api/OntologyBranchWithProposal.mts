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

import type { OntologyBranchRid } from "../../api/OntologyBranchRid.mjs";
import type { OntologyVersion } from "../../api/OntologyVersion.mjs";
import type { OntologyBranchAttribution } from "../../branch/api/OntologyBranchAttribution.mjs";
import type { OntologyBranchDescription } from "../../branch/api/OntologyBranchDescription.mjs";
import type { OntologyBranchDisplayName } from "../../branch/api/OntologyBranchDisplayName.mjs";
import type { OntologyBranchModificationData } from "../../branch/api/OntologyBranchModificationData.mjs";
import type { OntologyBranchProposal } from "./OntologyBranchProposal.mjs";

export interface OntologyBranchWithProposal {
  rid: OntologyBranchRid;
  displayName: OntologyBranchDisplayName;
  description: OntologyBranchDescription;
  attribution: OntologyBranchAttribution;
  createdAtOntologyVersion: OntologyVersion;
  proposal: OntologyBranchProposal;
  ontologyBranchModificationData: OntologyBranchModificationData;
  latestOntologyVersion: OntologyVersion;
  latestRebasedOntologyVersion: OntologyVersion;
}