#!/bin/bash

set -eo pipefail
echo "--- Set Node Version"
. "$NVM_DIR/nvm.sh"
nvm current
nvm use 6.5.0
echo "--- Install Dependencies"
sudo yarn
echo "--- Build"
gulp config-replace-secrets
#gulp clean-dist
#gulp compile
#gulp zip-app
