---
layout: post
title: "Snapped Phish-ing Line"
date: 2023-09-10 
categories: ["Hands-on", "TryHackMe"]
tags: "Phishing Analysis"
---
# Snapped Phish-ing Line: Phishing Analysis
> Another Phishing email analysis; Apply learned skills to probe malicious emails and URLs, exposing a vast phishing campaign.

## Intro:
**An Ordinary Midsummer Day...**
As an IT department personnel of SwiftSpend Financial, one of your responsibilities is to support your fellow employees with their technical concerns. While everything seemed ordinary and mundane, this gradually changed when several employees from various departments started reporting an unusual email they had received. Unfortunately, some had already submitted their credentials and could no longer log in.

You now proceeded to investigate what is going on by:
- Analysing the email samples provided by your colleagues.
- Analysing the phishing URL(s) by browsing it using Firefox.
- Retrieving the phishing kit used by the adversary.
- Using CTI-related tooling to gather more information about the adversary.
- Analysing the phishing kit to gather more information about the adversary.

## Analyzing the email
I started the Virtual box that contains the emails in a folder and opened all of them and I was able to answer the first question by comparing the attachments for each email. For the second question I copied the email address 'From' since it was the email address used to send the phishing emails. For the third-question I saved Zoe attachment and used the cat command to view the content of the attachement which uses redirectction URL. I copied the URL and used Cyberchef to defang the URL instead of manually doing it. 

```
First Question: 
Who is the individual who received an email attachment containing a PDF?

Second Question:
What email address was used by the adversary to send the phishing emails?

Third-question
What is the redirection URL to the phishing page for the individual Zoe Duncan? (defanged format)
```

### Phishing Kit
**Phishing Kit** is a set of tools such as HTML, pictures, and code that attackers use to contruct and launch phishing attacks. This helps in building phishing attacks faster, but how can we find the phishing kit? I started messing around with the url until I came accross the directory of the phihsing! it contains log.txt and office 365, but the Zip file mentioned in the fourth question was not there. I found the zip file by clicking back to go back to the parent directory and I downloaded it, I also made sure to copy the link of the zip file, defang it and submit it for the question four. I pressed again to go back to parent directory but i came accross the main website that is powered by wordpress. A hosted website being used to host malicous phishing website behind... 

I extracted the zip file that conatins the phishing kit, i was not able to view it from the website. For the fifth question I used the command 'sha256sum' to get the SHA256 of the Phishing Kit zip file. The Sixth question was tricky because i was searching for the domain name of the url not the SHA256 of the phishing kit, after reading the Guide I went and searched on virus total using the Hash instead. 

for the tenth question i was able to find the gmail in both script.st and update.cmd in the phishing kit. For the nineth question, i had to examine every file until i found it in the submit and resubmit php file but it wasnt a gmail domain making me use fine with '.com' for each document. 

```
Fourth Question: 
What is the URL to the .zip archive of the phishing kit? (defanged format)

Fifth Question:
What is the SHA256 hash of the phishing kit archive?
sha256sum Update365.zip 

Sixth question
When was the phishing kit archive first submitted? (format: YYYY-MM-DD HH:MM:SS UTC)
Used VirusTotal

seventh Question
When was the phishing domain that was used to host the phishing kit archive first registered? (format: YYYY-MM-DD)
Used threatbook.io

nineth Question
What was the email address used by the adversary to collect compromised credentials?

tenth Question
The adversary used other email addresses in the obtained phishing kit. What is the email address that ends in "@gmail.com"?


```

### Log
For the eighth question I was able to find the user that submitted their password twice easily by grepping the Email with the 'Grep' command on bash. 

```
Eight Question:
What was the email address of the user who submitted their password twice?
log.txt
```

### Finding the flag 
For the flag I used the hint since I checked all the files in the phishing kit and didnt find anything. The hint said "The flag contains a ".txt" extension and, with some adjustments, should be downloadable from the phishing URL. Look for the flag in every subdomain/directory of the phishing URL.". The next move was to check flag.txt in every subdomain and directory and I was able to find it :) 

```
Eleventh Question:
What is the hidden flag?

```

## References:
Guide: https://medium.com/@rdillon73/ctf-snapped-phish-ing-line-from-tryhackme-9b3ebfbc8cbf






