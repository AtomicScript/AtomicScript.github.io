---
layout: post
title: "Wonderland"
date: 2023-10-08
categories: ["Hands-on", "TryHackMe"]
tags: ""
---

# Wonderland
> Enter Wonderland and capture the flags.

Used: **nmap**, **gobuster**, **Python**, **Perl**

## Recon:

### Nmap
"Like any Capture the Flag challenge, we commence by gathering information from open ports, services in operation, directories, and more. In this case, we identified two open ports: SSH and HTTP. I accessed the website using the URL and port 80, but regrettably, there was no valuable information to be found. Further investigation led me to stumble upon another directory, /img, which contained three images. However, none of them revealed anything of significant interest.

![index](/images/wonderland/website1.png)

### GoBuster
I Used GoBuster to explore if there were any undiscovered directories. GoBuster successfully uncovered the /r directory, which piqued my curiosity. The initial index page cryptically urged me to 'follow the rabbit,' and it just so happened that the directory we uncovered was /r. This prompted me to consider a connection to 'Alice.' I decided to venture further by trying /r/a, in reference to Alice's adventures. Surprisingly, it worked, leading me to yet another directory, /r/a! 

```bash

gobuster dir -u http://10.10.248.120 -w /usr/share/wordlists/dirb/common.tx

```

![rabbit](/images/wonderland/website2.png)

Now, I encountered a cat inquiring about a favorable path to reach our destination. My goal was to reach the flag, so I experimented with /r/a/f. Rather than manually proceeding, I decided to leverage GoBuster's common word list to continue the exploration.

```bash

gobuster dir -u http://10.10.248.120/r/a -w /usr/share/wordlists/dirb/common.tx

```
![alice](/images/wonderland/website3.png)

The next directory I stumbled upon was 'b,' but a thought struck me: What if we are spelling out the word 'rabbit'? Trusting my instincts, I proceeded to spell out /r/a/b/b/i/t and, as if by magic, a door opened to welcome me into Wonderland. Delving deeper, I clicked on 'view-source' and I went through the page's source code. It was on a line where it said 'display: none' that I discovered the precious SSH credentials, hidden in plain sight!

![wonderland](/images/wonderland/full_website.png)

## User Alice 
The SSH credentials were used to successfully lon in as 'alice' and the user had two files in the home directory: 'root.txt' and python script. 

### Analyzing the python file
The Python file first imports the 'random' module and contains a 'poem' variable, which appears to be a lengthy string. It seems to randomly select a line from the poem to print out. After running it multiple times, it became evident that the file doesn't possess the necessary privileges to output 'root.txt,' nor do we have permission to modify it.

the user Alice does have the privilege to execute the python script but lacks the permission to edit it. I considered the possibility of creating a file with the same name and replacing it, but this approach proved unsuccessful. Faced with these challenges, I decided to read the walkthrough again to gain a better understanding. 

### Random
I understand that the file uses the random module, and the python script goes through several libraries to search for it including the current directory.  So, I decided to create a 'random.py' file in the current directory. This way, the Python script would import it and run its code. "After running the file, we gain access to the 'Rabbit' user, but things start to get a bit more challenging from here.

```python
import os

os.system("/bin/bash")
```

## User Rabbit
The 'Rabbit' user has permission to run 'teaparty.' Initially, I suspected it might be vulnerable to buffer overflow, but that wasn't the case. Ultimately, I resorted to using a walkthrough to gain a better understanding of the next steps.

### TeaParty
The 'teaparty' file uses 'echo' and 'date' programs for execution. After running 'echo $PATH,' I realized that 'echo' and 'date' execute from the '/bin' folder where they are located. Programs search for paths in the order they're listed when called, which sparked an idea: I could create a script in a directory like 'tmp' and add it to the path before '/bin,' making the program execute my script first.

#### TMP
I created a 'date' bash script in the 'tmp' folder with the following content, granted it execute permission, and then added the 'TMP' path.

```bash
#!/bin/bash
/bin/bash
```

```bash
export PATH=/tmp:$PATH
```
By running the echo $PATH again I can see the /tmp added before the /bin


## User Hatter
After executing the tea party again, we gain access to the 'Hatter' user, but it seems they have no permissions and are not in the sudoers file. However, we did discover their password: 'WhyIsARavenLikeAWritingDesk?' Unfortunately, it's unclear what it's used for.

To further investigate, I downloaded LinPeas and executed it in the 'tmp' folder, but there were issues due to the 'date' tmp file. With the help of a walkthrough, I learned that the 'pear' has a capability set as 'cap_setuid+ep set,' which can manipulate the process UID. This can be used as a backdoor to maintain root access with 'CAP_SETUID' capability set.


### PERL
by following the GTFOBins on capablities 
```perl 
perl -e 'use POSIX qw(setuid); POSIX::setuid(0); exec "/bin/sh";'
```
I didnt know what is wrong and why it says i dont have permission, i started a new ssh session as hatter instead of alice and it worked!

![root](/images/wonderland/root_wonderland.png)


## References:
https://gtfobins.github.io/gtfobins/perl/ 
https://musyokaian.medium.com/wonderland-tryhackme-walkthrough-4ae729c62423
