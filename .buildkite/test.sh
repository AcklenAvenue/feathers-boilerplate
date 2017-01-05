#!/bin/bash

set -eo pipefail
echo "--- Set Node Version"
. "$NVM_DIR/nvm.sh"
nvm use default | tee -a bk-pipeline.log
echo "--- Test" | tee -a bk-pipeline.log
gulp test | tee -a bk-pipeline.log
