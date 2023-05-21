---
layout: post
title: "Hashing Files"
date: 2023-05-20 
categories: ["Python", "Cryptography"]
tags: "python"
---

# Hashing Files

Library used: **hashlib**

When hashing a file you dont hash the file name but the content of the file, for this reason I made the hashing function read the content of the file and then return the hash digest of that file. The file will be hashed with MD5,SHA-1, and SHA-256 then return the hexdigest of the file. 
