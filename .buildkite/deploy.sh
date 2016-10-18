#!/bin/bash

set -eo pipefail
echo "--- Set Node Version"
. "$NVM_DIR/nvm.sh"
nvm use 4
echo "--- Deploy to $BUILDKITE_BRANCH"
sed -i -e 's/$NPM_TOKEN/'"$NPM_TOKEN"'/' .ebextensions/app.config
if [[ "$BUILDKITE_BRANCH" == "develop"  ]]; then
sed -i -e 's/roadrunner-device-services": "^0.2.0"/roadrunner-device-services": "^0.2.0"/' package.json
fi
if [[ "$BUILDKITE_BRANCH" == "staging"  ]]; then
sed -i -e 's/roadrunner-device-services": "^0.2.0"/roadrunner-device-services": "^0.3.0"/' package.json
fi
if [[ "$BUILDKITE_BRANCH" == "master"  ]]; then
sed -i -e 's/roadrunner-device-services": "^0.2.0"/roadrunner-device-services": "^1.0.0"/' package.json
fi
gulp deploy | tee -a bk-pipeline.log
buildkite-agent artifact upload "dist/**/*.zip"
