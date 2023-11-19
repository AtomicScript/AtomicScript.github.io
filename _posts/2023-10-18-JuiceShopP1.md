---
layout: post
title: "Pwning JuiceShop"
date: 2023-10-18 
categories: ["OWASP", "Hands-on"]
tags: "OWASP"
---
# Pwning JuiceShop Part 1

## Introduction
OWASP stands for Open Worldwide Application Security Project and it is a nonprofit foundations specilized in improving software security. The OWASP Juice shop is an intentional vulnerable web application to train on the OWASP Security risk for modern web application using the gamification technique. The goal is to solve the 106 challenges

### Challenges
I started the Docker container for juice shop, and started looking around. There is a login page, different JS files that has several paths mentioned such as the score-board and the adminstration page that requires me to have the admin access. While going through every web page I found the admin email address admin@juice-sh.op and since its OWASP id have to brute force and/or use SQL injection to bypass the login. 

#### Score Board (Miscellaneous)
> Find the carefully hidden 'Score Board' page.

I completed this challenge by simply accessing the score-board path mentioned in the main.js file. 

#### Error Handling (Security Misconfiguration)
> Provoke an error that is neither very gracefully nor consistently handled.

I completed this challeneg by simply trying to access /rest/admin mentioned in the main.js file

#### Zero Stars (Improper Input Validation)
> Give a devastating zero-star feedback to the store.

The minimum raiting is set to 1 on the web application so for me to change it to zero Id have to manipulate the POST using BurpSuit. I started by sending a raiting of one, then on the burpsuit i sent the sent the POSTrequest to the repeater to be manipulated before sending the request. 

#### Bully Chatbot (Miscellaneous)
> Receive a coupon code from the support chatbot.

For this challenge I had to ask the chatbot like a child over and over again till it gave me the coupon code.
[!] Ensure that you are not logged in

#### Bonus Payload (XSS)
> Use the bonus payload <iframe width="100%" height="166" scrolling="no" frameborder="no" allow="autoplay" src="https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/771984076&color=%23ff5500&auto_play=true&hide_related=false&show_comments=true&show_user=true&show_reposts=false&show_teaser=true"></iframe> in the DOM XSS challenge.

To complete this challenge, I copied the Iframe mentioned into the Search input which is vulnerable to XSS attack

#### Confidential Document (Sensitive Data Exposure)
> Access a confidential document.

For this challenge I was too focused on the web application port 3000, but on the FTP port I found the confidential documents. 

#### DOM XSS (XSS)
> Perform a DOM XSS attack with <iframe src="javascript:alert(`xss`)">.

I copied the iframe mentioned into the search input that is vulnerable to the XSS attacks after trying on every input.

#### Exposed Metrics (Sensitive Data Exposure)
> Find the endpoint that serves usage data to be scraped by a popular monitoring system.

I had to research on this and tried to find a walkthrough, but after searching the path /metrics I solved the challenge.

#### Missing Encoding (Improper Input Validation)
> Retrieve the photo of Bjoern's cat in "melee combat-mode".

While checking the photo in the photo-wall path, I could not figure our why exactly the photo path is not working and I was not able to find it in the source file to check if the file name was changed. The issue happens due to hashtags being restricted characters so all I had to do is replace it with %23 
https://zacheller.dev/OWASP-Juice-Shop

#### Outdated Allowlist (Unvalidated Redirects)
> Let us redirect you to one of our crypto currency addresses which are not promoted any longer.

In the main JS file there is a redirection to the bitcoin address by simply copying it and pasting it to the url I completed the callegnge
```http://localhost:3000/redirect?to=https:%2F%2Fblockchain.info%2Faddress%2F1AbKfgvw9psQ41NbLi8kufDQTezwG8DRZm```

#### Privacy Policy (Miscellaneous)
> Read our privacy policy.

I had to be logged into an account to and in the privacy & security in the Account tab I was able to complete the challenge

#### Repetitive Registration (Improper Input Validation)
> Follow the DRY principle while registering a user.

For this callenge, I had to send the post to the repeater in the burpsuit to edit the password and the password repeat. 

#### Web3 Sandbox (Broken Access Control)
> Find an accidentally deployed code sandbox for writing smart contracts on the fly.

For this challenge, I had to try to understand what is needed to find or what is the blockchain control. To complete this challenge I had to simply search the web3-sandbox path mentioned in the Web3 code Sandbox update.