#!/usr/bin/expect -f

set timeout 300
set password "Vicnan888"

spawn ssh root@gcore.xin "cd /root/GWEB && ./deploy-to-alibaba.sh"
expect {
    "yes/no)?" {
        send "yes\r"
        expect "*assword:*"
        send "$password\r"
    }
    "*assword:*" {
        send "$password\r"
    }
}
expect eof
