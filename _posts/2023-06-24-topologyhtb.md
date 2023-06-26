---
layout: post
title: "Topology"
date: 2023-06-24 
categories: ["Hands-on", "HackTheBox"]
tags: "Latex Injection"
---

# Topology
Tool used: **nmap**, **nikto**, **Gobuster**, **John**, **Linpeas**

## Enumeration 

### Nmap 

```bash
nmap -sS -Pn 10.10.11.217
```

### Gobuster 
```bash
gobuster dir -u 10.10.11.217 -w /usr/share/wordlists/dirb/common.txt 
```

### Nikto 
```bash
nikto -h http://10.10.11.217/
```

### Outcome
The machine has the SSH, and the HTTP port open, and from the gobuster and nikto, I found a directory of images and some hidden directories like htpasswd and htacces. I wonder if I can inject a malicious image to gain access.

**Apache 2.4.41 : port 80**
http://latex.topology.htb/equation.php
On the website there is a hyperlink to a php file, but I cannot access it. For me to access that file or that part of the website I need to add the domain (latex.topology) with the IP address to the /etc/hosts. 


## Exploring the website 
The latex equation generator is now accessible from my machine. I can see that it takes in an input such as the one provided below as an example, and it generates a PNG file. I explored the latex injection and tried generating the following input '\input{/etc/passwd}', but  it won't be that easy. The image shows the following text as the output 'Illegal command detected. Sorry, now back to research to bypass this. 

![website latex](/images/Topology/website.png)

![Bad Request](/images/Topology/bad.png)

Turns out I was missing a lot of stuff. First, I need $ at the start and end, and input will only work with lstinputlisting. This latex command used to include the content of an external file like a password file to be included in the content.  

```bash
$\lstinputlisting{/etc/passwd}$
```

## htpasswd
From the gobuster scan, I found the .htpasswd file. htpasswd file used by Apache web servers to store usernames and their corresponding encrypted passwords for HTTP Basic Authentication. After generating the input, I found the user and their MD5 hashed password. 

```bash
$\lstinputlisting{/var/www/dev/.htpasswd}$

```
## Johnn the ripper 
I need to crack the mD5 of hashed password after ':'. I copied the hashed password into a file and used John the ripper with rockyou.txt wordlist to crack it. 

```bash
# hash is the file that contains the encrypted file.
john --wrodlist=rockyou.txt hash
vdaisley:calculus20
```

## SSH 
Now that I have the username and the password, I can go ahead and SSH as that user using the below command. After accessing the user, I found the user flag and Linpeas is already installed in the machine ready for me.

```bash
ssh vdaisley@10.10.11.217 
```


## Escalating 

### Linpeas outcome
Linpeas provided me with a lot of information and different ways the system can be exploited, but I still used a hint from the walkthrough to know where and what to look for. We can see from the below that the /opt is usually empty BUT there is a gnuplot directory, but sadly I don't have permission to access it. I created a file in the directory and tried to read it, this concludes that I have permission to write and read! According to the walkthrough I need to write a **PLY** script that would spawn a root shell by converting the BASH to SUID permissions!

```bash
╔══════════╣ Unexpected in /opt (usually empty)
total 12
drwxr-xr-x  3 root root 4096 May 19 13:04 .
drwxr-xr-x 18 root root 4096 Jun 12 10:37 ..
drwx-wx-wx  2 root root 4096 Jun 25 02:30 gnuplot
```

### PLT script!
I followed the script of [Hack the Box Writeups](https://hacktheboxwriteups.medium.com/htb-topology-writeup-2dee14592115) to write the script within a plot file that would spawn a root shell by converting the BASH to SUID within the Gnuplot directory since we have the permission to write. With that, I had root access and got the root flag! 

