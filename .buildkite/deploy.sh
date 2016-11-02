#!/bin/bash

set -eo pipefail
echo "--- Set Node Version"
. "$NVM_DIR/nvm.sh"
nvm use default
echo "--- Deploy to $BUILDKITE_BRANCH"
#gulp deploy | tee -a bk-pipeline.log
gulp zip-app
cd zip
sudo cp ~/acklenavenue.pem acklenavenue.pem
sudo chmod 400 acklenavenue.pem
expect -c "
   spawn sudo scp -i "acklenavenue.pem" indigo-backend-*.zip centos@ec2-54-162-255-166.compute-1.amazonaws.com:/home/centos/
   expect Are you sure you want to continue connecting (yes/no)? { send yes\n }
"
buildkite-agent artifact upload "*.zip"
