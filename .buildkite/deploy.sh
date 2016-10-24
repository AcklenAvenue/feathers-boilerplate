#!/bin/bash

set -eo pipefail
echo "--- Set Node Version"
. "$NVM_DIR/nvm.sh"
nvm use default
echo "--- Deploy to $BUILDKITE_BRANCH"
gulp prepare-deployment | tee -a bk-pipeline.log
expect ./.buildkite/stagingDeploy.sh | tee -a bk-pipeline.log