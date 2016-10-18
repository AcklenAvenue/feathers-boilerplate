#!/bin/bash

set -eo pipefail
echo "--- Set Node Version"
. "$NVM_DIR/nvm.sh"
nvm current
nvm use 4
echo "--- Install Dependencies"
yarn
echo "--- Build"
gulp copy-default-json
gulp clean-dist
gulp compile
