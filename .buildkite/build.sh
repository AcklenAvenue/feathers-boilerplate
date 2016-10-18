#!/bin/bash

set -eo pipefail
echo "--- Set Node Version"
. "$NVM_DIR/nvm.sh"
nvm current
nvm use 4
echo "--- Install Dependencies"
yarn
echo "--- Build"
gulp compile
echo "--- Test"
gulp test
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
