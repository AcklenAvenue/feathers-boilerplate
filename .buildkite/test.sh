#!/bin/bash

set -eo pipefail
echo "--- Set Node Version"
. "$NVM_DIR/nvm.sh"
nvm use 4 | tee -a bk-pipeline.log
echo "--- Test" | tee -a bk-pipeline.log
gulp test | tee -a bk-pipeline.log