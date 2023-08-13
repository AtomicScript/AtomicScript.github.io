---
layout: post
title: "ParrotPost"
date: 2023-07-23 
categories: ["Hands-on", "TryHackMe"]
tags: "Phishing Analysis"
---
# ParrotPost: Phishing Analysis
> Reveal how attackers can craft client-side credential-stealing webpages that evade detection by security tools.

The room's goal is to learn how to analyze the malicous email and learn about the tools. 

## Email Intro 

### components 
the email are made up of:
- Smtp
- header
- body 

### Standards
Internet engineering task force
internet message format: specifies the Snytax and semantics of email messages
Multipurpose internet mail extention: standard for email messages on the Internet.


## Email header
Email header contains metadata and information such as:
- sender (from)
- recipient (to)
- date and time
- path message took to reach the destination 
- subject

Email headers can be easily spoofed or forged and, for this reason the "Recieved" headers are added by email servers to show the path the email took. Recieved can also show the IP address of the sender. 

X- prefix denotes that the header is not official or standardized header defined by IETF. (customized)

### Analyzing the email
After understanding the information that can be extracted from the file, I opened the file using sublime text and the [Email header Analyzer](https://mxtoolbox.com/EmailHeaders.aspx). I found the flag in the header and the below: 
- sender (from) : Parrot Post Webmail 
- recipient (to) : Paul Feathers 
- date and time : Sun, 30 Apr 2023 20:50:15 -0000
- path message took to reach the destination : from emkei.lv (emkei.lv [109.205.120.0]) (using TLSv1.3 with cipher
 TLS_AES_256_GCM_SHA384 (256/256 bits)
- subject : URGENT: ParrotPost Account Update Required

The sender and recieved from are different. Now that i found the sender's IP address i can put it the ip lookup table to get information about the ip address. 

## Email Attachment
While going through the email file using Sublime, something caught my attention. "Content-Type text/HTML" means that the email contained an attachment named "ParrotPostACTIONREQUIRED.htm" embedded. Going through the attachment header i learned that the attachment content is encoded via Base64

### Analysis 

#### Decoding the webpage (Base64)
I downloaded the email attachment to analyze it and opened it with sublime text. the file is an html with a script embedded in it. The base64 contains the fake website that would steal the credentials and then redirect to the real website. Sends an error message after the user provided the website with the username and password regardless of the credentials being correct or wrong. I found a nested base64 within the decoded messages. 

the variable is used as an input for the below functions:
```html
document.write(unescape(atob(b64)));
```
atob is a javascript function that decodes B64 strings unescapeconverts any escaped characters in the decoded string into their orginal form document write function displayes the decoded, and unescaped strings on the webpage where the code is executed. 

#### HTML Entity Obfuscator
**HTML Entity Encoding** : HTML entities are special sequences of characters used to represent reserved characters and other special characters in HTML
I copied the characters/long strings that have random characters and instead of choosing on cyberchef from Base64, I selected the from HTML entity to decode the encoded HTML entities. 

the output is a longin page asking for an email and a password with buttons for logging in and forgot password that goes nowhere. 

#### CSS Obfuscator
Back to cyberchef, I can find the css in the style tag a bit hard to read but when i copied the content between the style tag and pasted in the [css Beautify](https://www.cleancss.com/css-beautify/) tool it became more readable and easier to understand.

**minimizer** is a CSS Obfuscator tool used to transform the Css code to make it diffult to read and understand without affecting its functionality. By obfuscating the copied stylesheets, it makes it harder for antivirus engines and sandboxing agents to detect the stolen stylesheet.
**CSS Beautify** is a tool used to make the stylesheet more readable 

#### JS Obfuscator
Now that i went through the style, and html what is left is to understand what goes on when the user enters the email and the password. This happens in the script tag. I can see some weird characters as shown below that stuck out like a sore thumb. 

```javascript
eval(function(p,a,c,k,e,d){e=function(c){return c};if(!''.replace(/^/,String)){while(c--){d[c]=k[c]||c}k=[function(e){return d[e]}];e=function(){return'\\w+'};c=1};while(c--){if(k[c]){p=p.replace(new RegExp('\\b'+e(c)+'\\b','g'),k[c])}}return p}('3.2.1="0";',4,4,'12px|fontSize|style|errorMessage'.split('|'),0,{}))
```

too make it easier I will use the [JS-Beautify](https://beautifier.io/) to make it easier for me to read through the script and understand it. I copied everything between script tag and pasted it on Beautify.

the javascript "window.location.href" property can re-direct the browser to a new URL 


## Testing 
Now I will test the phishing website using the virtual machine in tryhackme with the developer tool network tab to see what happens once I submit the login.  After using a fake password and clicking on login the credentials are saved/appended to a creds.txt file. I opened the link of the cred.txt to see if I can see other credentials and I COULD.

# Conclusion
That was a fun exercise to learn about techniques to obfuscate malicious HTML, CSS, and Js code and still have the website not impacted. 