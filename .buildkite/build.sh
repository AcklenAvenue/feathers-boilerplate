#!/bin/bash

set -eo pipefail
echo "--- Set Node Version"
. "$NVM_DIR/nvm.sh"
nvm current
nvm use default
echo "--- Install Dependencies"
npm install
echo "--- Build"
gulp copy-default-json
gulp clean-dist
gulp compile
