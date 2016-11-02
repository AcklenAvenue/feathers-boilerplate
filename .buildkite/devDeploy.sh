#!/usr/bin/expect
    spawn scp -i "acklenavenue.pem" indigo-backend-develop.zip centos@ec2-54-162-255-166.compute-1.amazonaws.com:/home/centos/
    expect "Are you sure you want to continue connecting (yes/no)?"
    send yes\n
    interact
