---
layout: post
title:  "Implementing Web Content Filtering on UniFi UCG Ultra & NextDNS"
background: '/img/bg-posts.jpg'
date:   2025-10-23 21:30:00 +0800
updated_date: 2025-11-04 13:30:00 +0800
tags: unifi ucgultra nextdns webcontentfiltering parentalcontrols
---


This has been tested successfully on the following setup. 
* UCG Ultra; UniFi OS 4.3.9 & Network 9.5.21
* Client: Apple Macbook Air M1, iPhone 13 Pro

Important caveat:
* The Apple App Store app is categorised as gaming. So connecting to Apple App Store is restricted.

The UniFi UCG Ultra allows for paid web content filtering via Proofpoint & Cloudflare. The basic content filtering applies to the category Adult & Malicious. Of course, the usual domains allow & deny functionality is provided.

UniFi allows users to use a custom DNS per network. You could also use the same DNS provider for the entire setup by configuring at WAN. I'd configured Quad9 for my home lab servers' network and wanted to have parental control for the kids' network. Stumbled across [NextDNS](https://nextdns.io) and it worked with the first attempt. I'm using their free-tier and the features are good enough for kids' network.

## Step 1: Create your [NextDNS account](https://my.nextdns.io/) and configure it
Create a profile for this setup. I've static IP, so I linked it up. DDNS is also supported. Click ***Show advanced options*** to configure it.
![NextDNS Setup](/assets/img/nextdns-profile.png){: width="80%" height="auto"}

There's a handful of options for you to configure at the ***Parental Control*** tab. I'd added all the categories to restrict access, and enabled these options ***Safe Search***, ***YouTube Restricted Mode*** and ***Block Bypass Methods***.
![NextDNS Parental Control](/assets/img/nextdns-parentalcontrols.png){: width="80%" height="auto"}

## Step 2: Configure the desired network on UniFi UCG Ultra to use NextDNS DNS servers
On UniFi side, remember to remove any ***Content Filter*** that you might have placed on the desired network. Follow the numbering below to configure and you should be fine. Remember to click on ***Apply Changes***.
![UniFi Custom DNS Configuration](/assets/img/unifi-network-dns.png){: width="80%" height="auto"}

## Step 3: Test it out on various clients
Tested it on a Macbook Air M1 and iPhone 13 Pro and it worked!

So to extend it to LTE/4G/5G, you could install the NextDNS mobile app or add a profile to the iPhone. But, unless the iPhone is supervised, the profile can be deleted.
