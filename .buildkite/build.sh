#!/bin/bash

set -eo pipefail
echo "--- Set Node Version"
. "$NVM_DIR/nvm.sh"
nvm current
nvm use 4 | tee -a bk-pipeline.log
echo "--- Install Dependencies"
yarn | tee -a bk-pipeline.log
echo "--- Build"
if [[ "$BUILDKITE_BRANCH" == "develop"  ]]; then
  export NODE_ENV=dev
fi
gulp compile | tee -a bk-pipeline.log
