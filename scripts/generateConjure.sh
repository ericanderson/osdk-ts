#!/usr/bin/env bash
set -e

SCRIPT_DIR=$( cd -- "$( dirname -- "${BASH_SOURCE[0]}" )" &> /dev/null && pwd )

function checkCommand() {
    local DARWIN_COMMAND="$1"
    local LINUX_COMMAND="$2"
    local DARWIN_ERROR="$3"

    local COMMAND_NAME="$LINUX_COMMAND"
    local ERROR_MESSAGE="Aborting"

    if [[ "$OSTYPE" == "darwin"* ]]; then
        COMMAND_NAME="$DARWIN_COMMAND"
        ERROR_MESSAGE="$DARWIN_ERROR"
    fi
    command -v "$COMMAND_NAME" || { echo >&2 "$COMMAND_NAME is required but not installed. $ERROR_MESSAGE."; exit 1; }
}

REALPATH=$(checkCommand "grealpath" "realpath" "Try 'brew install coreutils'")
SPONGE=$(checkCommand "sponge" "sponge" "Try 'brew install moreutils'")
XQ=$(checkCommand "xq" "xq" "Try 'brew install python-yq'")
WGET=$(checkCommand "wget" "wget" "Try 'brew install wget'")


rm -rf "${SCRIPT_DIR}/../tmp"

CONJURE_LITE="$SCRIPT_DIR/../packages/cli/node_modules/.bin/conjure-lite"

function generateConjure() {
    GROUP_ID="$1"
    ARTIFACT_ID="$2"
    PACKAGE_PATH="$3"
    OUT_DIR=$("$REALPATH" --relative-to=. "${PACKAGE_PATH}/src/generated/${ARTIFACT_ID/%-api//}")

    rm -rf "$OUT_DIR"

    printf "Fetching conjure IR\n  Coordinate: %s\n  Path: %s\n" "$GROUP_ID:$ARTIFACT_ID" "$OUT_DIR"
    "$SCRIPT_DIR/getConjureIr.sh" "$GROUP_ID" "$ARTIFACT_ID"
    echo "  - Generating typescript"
    $CONJURE_LITE generate --ir "${SCRIPT_DIR}/../tmp/${ARTIFACT_ID}.conjure.json" --outDir "$OUT_DIR"

    echo "  - Fixing up generated typescript"
    # Fix up the generated IR so lint doesnt choke
    while IFS= read -r -d '' -u 9
    do
        printf '/*\n *\n */\n\n' | cat - "$REPLY" | "$SPONGE" "$REPLY"
    done 9< <( find "$OUT_DIR" -type f -exec printf '%s\0' {} + )

    # Actually fix the headers now
    echo "  - Running lint-fix"
    (cd "$PACKAGE_PATH" && pnpm run fix-lint)
}

#generateConjure "com.palantir.artifacts" "artifacts-admin-api" "${SCRIPT_DIR}/../packages/cli"
#generateConjure "com.palantir.artifacts" "artifacts-sites-api" "${SCRIPT_DIR}/../packages/cli"
#generateConjure "com.palantir.compass" "compass-api" "${SCRIPT_DIR}/../packages/cli"
#generateConjure "com.palantir.controlpanel" "control-panel-api" "${SCRIPT_DIR}/../packages/cli"

#generateConjure "com.palantir.object-set-service" "object-set-service-api" "${SCRIPT_DIR}/../packages/client"
#generateConjure "com.palantir.object-set-watcher" "object-set-watcher-api" "${SCRIPT_DIR}/../packages/client"
#generateConjure "com.palantir.ontology" "ontology-metadata-api" "${SCRIPT_DIR}/../packages/client"
