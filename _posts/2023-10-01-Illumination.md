---
layout: post
title: "Illumination"
date: 2023-10-1 
categories: ["Hands-on", "HackTheBox"]
tags: "Challenges"
---

commands: **git**

# Illumination
> A Junior Developer just switched to a new source control platform. Can you find the secret token?


## Intro
For a change, I wanted to try hackthebox challenges to try something new related to forensic. At first i tried a memory dump exercise but volitality was not intsalling properly and my second option was Illumination. 


## Examining the files

Using the ls command with the la argument I came accross 2 files and a git folder. The two files explain that a token can be decodeed with base64 by the clients and in config.json it seems that the token was replaced and only inputed when logging in. 


```bash 
ls -la
```

![FileList](/images/Illumination/Illumination-la.png)


## Git history 
After not finding anything from Bot.js or Config.js, I decided its time to check the git log. It seems that in one of the commits the token was in the code so all i have to do it use the git show command of the commit number and decode it!

![configJs](/images/Illumination/configJS.png)

```bash 
git log 
```

```bash 
git show 47241a47f62ada864ec74bd6dedc4d33f4374699
```

![gitshow](/images/Illumination/gitshow.png)
