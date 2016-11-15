#!/bin/bash

set -eo pipefail
echo "--- Set Node Version"
. "$NVM_DIR/nvm.sh"
nvm use default
echo "--- Deploy to $BUILDKITE_BRANCH"
cd zip
sudo cp ~/acklenavenue.pem acklenavenue.pem
sudo chmod 400 acklenavenue.pem
gulp deploy | tee -a bk-pipeline.log
sudo ssh -i "acklenavenue.pem" centos@indigo-backend-dev.acklenavenueclient.com "unzip -o indigo-backend-$ENVIRONMENT.zip -d /home/centos/builds"
sudo ssh -i "acklenavenue.pem" centos@indigo-backend-dev.acklenavenueclient.com 'cd builds && npm install'
buildkite-agent artifact upload "*.zip"
