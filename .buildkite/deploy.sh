#!/bin/bash

set -eo pipefail
echo "--- Set Node Version"
. "$NVM_DIR/nvm.sh"
nvm use default
echo "--- Deploy to $BUILDKITE_BRANCH"
sudo cp ~/acklenavenue.pem acklenavenue.pem
sudo chmod 400 acklenavenue.pem
gulp deploy | tee -a bk-pipeline.log
buildkite-agent artifact upload "zip/*.zip"
