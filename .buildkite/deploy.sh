#!/bin/bash

set -eo pipefail
echo "--- Set Node Version"
. "$NVM_DIR/nvm.sh"
nvm use default
echo "--- Deploy to $BUILDKITE_BRANCH"
#gulp deploy | tee -a bk-pipeline.log
gulp zip-app
scp -i "~/acklenavenue.pem" indigo-backend-develop.zip centos@ec2-54-162-255-166.compute-1.amazonaws.com:/home/centos/
buildkite-agent artifact upload "zip/*.zip"
