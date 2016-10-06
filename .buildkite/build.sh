#!/bin/bash

set -eo pipefail
echo "--- Set Node Version"
. "$NVM_DIR/nvm.sh"
nvm current
nvm use 4
echo "--- Install Dependencies"
npm install -g gulp
npm update
echo "--- Build And Test"
if [[ "$BUILDKITE_BRANCH" == "develop"  ]]; then
  export NODE_ENV=dev
fi
gulp compile
if [[ "$BUILDKITE_BRANCH" == "develop"  ]]; then
  echo "--- deploy to develop"
  gulp deploy
  buildkite-agent artifact upload "zip/**/*.zip"
fi
if [[ "$BUILDKITE_BRANCH" == "staging"  ]]; then
  echo "--- deploy to staging"
  gulp deploy
  buildkite-agent artifact upload "zip/**/*.zip"
fi
if [[ "$BUILDKITE_BRANCH" == "master"  ]]; then
  echo "--- deploy to production"
  gulp deploy
  buildkite-agent artifact upload "zip/**/*.zip"
fi
