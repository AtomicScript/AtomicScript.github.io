---
layout: post
title: "Diamond Model of Intrusion Analysis"
date: 2023-10-07 
categories: ["Framework", "Cyber Threat Intelligence"]
tags: "Framework"
---

# Diamond Model of Intrusion Analysis

## Introduction
The Diamond Model is a valuable tool for conducting investigations to ascertain the identity of attackers and their motivations behind an attack. This model helps in understanding the relationships among its components, providing clarity in identifying adversaries' intentions and tactics, and facilitating the discovery of proactive measures against emerging cyber threats.

![Diamond Model](/images/Frameworks/Diamond%20Mode%20.png)

### Adversary  (Attacker)
the adversary, also known as the attacker, is an entity or threat actor with the capability to exploit the infrastructure against the victim.

### Capablity (Method)
Tools and Techniques employed by adversaries to achieve their objectives during an event.

### Infrastructure (Attack vector)
Infrastructure comprises the physical or logical communication structures that adversaries exploit to deliver their capabilities.

### Victim 
The victim represents the entity against whom the attacks are initiated, vulnerabilities are exploited, or adversary capabilities are employed.

## Summarize
The **Adversary** utilizes their **apability** through an **Infrastructure** targeting the **Victim**.

## Examples
The Diamond Model may sometimes have missing components. For instance, if the adversary remains unidentified or undisclosed, further investigation is required and a new profile will be created.

### Rackspace Ransomware Attack
In this case, the attackers exploited the **ProxyNotShell vulnerability** within the **exchange environment**. The victim, **Rackspace Technology**, has confirmed that the threat actor or adversary belongs to the **Play ransomware group**.


### Syssphinx
The **Syssphinx cybercrime** group employed **owerShell scripts** to deploy a **backdoor** while targeting various **financial institutions**.

### Stuxnet
**Unknown** attackers **developed the Stuxnet virus** that exploits the **zero-day vulnerabilties in the SCADA systems** used in **Iran's Nuclear Facilities**. While we do have the capablity, infrastructure and victim we dont have the Adversary. 


The **Stuxnet virus**, which exploits **zero-day vulnerabilities in SCADA systems** used in **Iran's Nuclear Facilities**, was developed by **unknown attackers**. While we possess information regarding capability, infrastructure, and victim, the identity of the adversary remains undisclosed.

## NIST vs Diamond model 
While the Diamond Model framework focuses on investigating, analyzing, and understanding cyber threats and attacks, the NIST CSF framework emphasizes establishing guidelines and best practices to assist organizations in managing and improving their cybersecurity risk management processes and posture.