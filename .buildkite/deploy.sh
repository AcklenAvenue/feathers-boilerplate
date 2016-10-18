#!/bin/bash

set -eo pipefail
echo "--- Set Node Version"
. "$NVM_DIR/nvm.sh"
nvm use 4
echo "--- Deploy to $BUILDKITE_BRANCH"
gulp deploy | tee -a bk-pipeline.log
buildkite-agent artifact upload "dist/**/*.zip"
