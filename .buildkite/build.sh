#!/bin/bash

set -eo pipefail
echo "--- Set Node Version"
. "$NVM_DIR/nvm.sh"
nvm current
nvm use 6.5.0
echo "--- Install Dependencies"
yarn
echo "--- Build"
ls -la config
gulp config-replace-secrets
ls -la config
gulp clean-dist
gulp compile
gulp zip-app
