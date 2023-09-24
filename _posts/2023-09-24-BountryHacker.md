---
layout: post
title: "Bounty Hacker"
date: 2023-09-24 
categories: ["Hands-on", "HackTheBox"]
tags: "Sudo"
---

# Bounty Hacker
> You were boasting on and on about your elite hacker skills in the bar and a few Bounty Hunters decided they'd take you up on claims! Prove your status is more than just a few glasses at the bar. I sense bell peppers & beef in your future! 

## Reconnaissance
![Recon](/images/BountyHacker/nmap-recon.png)
I started off with scanning the target using Nmap to find the open ports, and there were three active ports ftp, ssh, http. While running Dirb, nikto and agressive NMAP on the ports, I decided to invistigate the http to find any hints but came out empty. 

### FTP
![Anon-FTP](/images/BountyHacker/ftp-anon.png)
The FTP server allows anonymous login. I discovered two files, one named 'locks.txt' and the other 'task.txt.' The 'locks.txt' file appears to contain passwords or usernames with similar patterns, while the 'task.txt' file contains two tasks, 'protect' and 'plan,' likely assigned to 'lin.' 

## Gaining Access
![hydra](/images/BountyHacker/hydra.png)
I identified a username, 'lin,' and a list of passwords within the 'locks.txt' file. However, it's unclear whether these credentials are intended for FTP or SSH services. To test both services, we performed a successful brute-force attack using Hydra with 'locks.txt' as the password list. After successfully obtaining access, I logged into the system using the 'lin' credentials and used the 'id' command to determine if the user had root access.

```bash
hydra -l lin -P locks.txt [ip address] ssh
```

## Execution
### LinPeas
After gaining remote access to the target machine as the user lin, I navigated to the tmp folder, hosted my download folder containing the 'linpeas.sh' file, and used the 'wget' command to download 'linpeas' onto the target machine. I then waited for the results to be analyzed after running 'linpeas' in the target's 'tmp' folder.

I found few interesting things from the output of LinPeas:
1. Whoopsie but this turns out to be the daemon repsonsible for collecting error reports
![Whoopie](/images/BountyHacker/whoopsie.png)

2. In the contab daily, found popularity-contest and passwd but i understood that passwd was a normal process. 
![crontab](/images/BountyHacker/con-daily.png)

3. Sudo -l 
![sudo](/images/BountyHacker/sudo-linpeas.png)

## Privilege escalation
Using the command sudo -l, I found out that the user can execute the /bin/tar command which can be easily exploit via the below command from the [gtfobins](https://gtfobins.github.io/gtfobins/tar/) Page

```bash
sudo tar -cf /dev/null /dev/null --checkpoint=1 --checkpoint-action=exec=/bin/sh
```
![root](/images/BountyHacker/root.png)
