#!/bin/bash

set -eo pipefail
echo "--- Set Node Version"
. "$NVM_DIR/nvm.sh"
nvm use default
echo "--- Deploy to $BUILDKITE_BRANCH"
#gulp deploy | tee -a bk-pipeline.log
cd zip
sudo cp ~/acklenavenue.pem acklenavenue.pem
sudo chmod 400 acklenavenue.pem
expect -c "
   spawn sudo scp -i "acklenavenue.pem" indigo-backend-$ENVIRONMENT.zip centos@indigo-backend-dev.acklenavenueclient.com:/home/centos/
   expect Are you sure you want to continue connecting (yes/no)? { send yes\n }
"
sudo ssh -i "acklenavenue.pem" indigo-backend-dev.acklenavenueclient.com 'unzip -o indigo-backend-$ENVIRONMENT.zip -d /home/centos/builds'
sudo ssh -i "acklenavenue.pem" indigo-backend-dev.acklenavenueclient.com 'npm install /home/centos/builds'
buildkite-agent artifact upload "*.zip"
