---
layout: post
title: "Cyber Kill Chain"
date: 2023-10-14 
categories: ["Framework", "Cyber Threat Intelligence"]
tags: "Framework"
---

# Cyber Kill Chain

## Introduction
The cyber kill chain is a military concept that outlines the steps of several common cyber attacks to help information security teams prevent detect,  or intercept attackers. It can also assist attackers in improving their attacks.

 Cyber Kill Chain is part of the intelligence drive defense model for the identification, and prevention of cyber intrusion activity. The model explains the steps that attackers mostly APTs have to go through to achieve their goals. The article also links the MITRE ATT&CK Tactics for each phase or each step in the cyber kill chain. 
## Steps 

![cyberkillchain](/images/Frameworks/cyberkillchain.jpg)


### Phase 1: Reconnaissance
In this stage, we identify the target and gather information for planning operations. The Attacker collects information about the target from email address harvesting and public information such as DNS, social media, and service information. During the reconnaissance stage, scanning can be both active and passive, and the more information gathered, the highest chance of success and the more sophisticated the attack would be. 

Techniques can be found in the link [Recon](https://attack.mitre.org/tactics/TA0043/), and [Discovery](https://attack.mitre.org/tactics/TA0007/), 

### Phase 2: Weaponization
After identifying information, the attacker creates the malware or modifies existing tools to exploit the vulnerability and set up a backdoor to continue accessing the system even if the vulnerability was closed or remediated. 

Techniques can be found in the link [Resource Development](https://attack.mitre.org/tactics/TA0042/)

### Phase 3: Delivery
Information was collected, malware/payload was created, and tools were modified, but the delivery method was not established. The delivery can happen through phishing emails, malicious links, or even images, or leaving the USBs around the target. A combination of delivery and social engineering increases the effectiveness of the attack. 

Techniques can be found in the link [Initial Access](https://attack.mitre.org/tactics/TA0001/)

### Phase 4: Exploitation
The malware was delivered, and vulnerability was exploited to gain access and execute within the target's system. The exploitation can happen through software, hardware, or human vulnerability, zero-day exploit, opening the malicious attachment of an email, or clicking a malicious link. 

Techniques can be found in the link [Initial Access](https://attack.mitre.org/tactics/TA0001/), and [Execution](https://attack.mitre.org/tactics/TA0002/)

### Phase 5: Installation
The attacker has access to the system, and the next stage is to install a backdoor to maintain access for an extended period. 

Techniques can be found in the link [Persistence](https://attack.mitre.org/tactics/TA0003/),and [Defense Evasion](https://attack.mitre.org/tactics/TA0005/)

### Phase 6: Command and Control
In this stage, the attacker would try to manipulate the victim remotely, move laterally through the network, and expand the access for more future entry points.

Techniques can be found in the link [Command and Control](https://attack.mitre.org/tactics/TA0011/), [Privilege Escalation](https://attack.mitre.org/tactics/TA0004/), and [Lateral Movement](https://attack.mitre.org/tactics/TA0008/)

### Phase 7: Actions on Objective
In this stage, the attacker would complete their goal. The goal can be stealing data, destroying, encrypting, or exfiltration.

Techniques can be found in the link [Collection](https://attack.mitre.org/tactics/TA0009/), [Credential Access](https://attack.mitre.org/tactics/TA0006/), [Exfiltration](https://attack.mitre.org/tactics/TA0010/) and [Impact](https://attack.mitre.org/tactics/TA0040/)


## Refereces: 
https://www.crowdstrike.com/cybersecurity-101/cyber-kill-chain/
https://www.lockheedmartin.com/content/dam/lockheed-martin/rms/documents/cyber/Gaining_the_Advantage_Cyber_Kill_Chain.pdf
https://www.lockheedmartin.com/content/dam/lockheed-martin/rms/documents/cyber/LM-White-Paper-Threat-Driven-Approach.pdf
