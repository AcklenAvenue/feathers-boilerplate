#!/usr/bin/expect
    spawn scp -r build acklen@64.78.188.49:/home/acklen/indigo-backend
    expect "Are you sure you want to continue connecting (yes/no)?"
    send yes\n
    expect "password:"
    send 0r@nges\n;
    interact