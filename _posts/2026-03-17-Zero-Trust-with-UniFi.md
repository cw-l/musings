---
layout: post
title: "Implementing Zero Trust with UniFi"
background: '/img/bg-posts.jpg'
date: 2026-03-18 13:30:00 +0800
tags: 
  - UniFi
  - UCG Ultra
  - Zero Trust
  - Segmentation
  - Zone Based Firewall
---

> "ZTA Using Micro-Segmentation: An enterprise may choose to implement a ZTA based on placing individual or groups of resources on a unique network segment protected by a gateway security component."
>
> — Zero Trust Architecture NIST.SP.800.207


This has been tested successfully on the following setup. 
* UCG Ultra; UniFi OS 5.0.12 & Network 10.1.85


It is possible to implement ZTA in a home environment, without the big price tag that enterprises paid. Naturally, there would be some constraints and limitations.

The UniFi UCG Ultra uses Zone Based Firewall (ZBF) to implement ZTA. Personally, I don't think one needs to be a network engineer to implement this, but some understanding of how network works and the willingness to read up documentations help.


## Step 1: Enable ZBF
By enabling ZBF in UniFi, 6 default zones and policies would be created and enabled. You only need to allocate networks (segments/VLANs/subnets) into the appropriate zone. Each network can only reside in one zone. You can only create additional custom zones.
![UniFi ZBF](/assets/img/UniFi-ZBF.png){: width="80%" height="auto"}

The generated and custom policies are shown in the _Zone Matrix_. The first column represent the source and first row, the destination. 
![UniFi ZBF Zone Matrix](/assets/img/UniFi-ZoneMatrix.png){: width="80%" height="auto"}

## Step 2: Enable Network Isolation & Create Custom Policy (Optional)
You could group all your IoT devices logically in a network and place it into a zone. In my example, I'd grouped the Smart TV, network printer, gaming console, digital lock, fan, CCTV, etc into the IoT network and housed them in the DMZ. These devices are not permitted to initiate communication with my Internal zone.

So if you've a compromised IoT device, it will be confined within the DMZ.
![UniFi Network Isolation](/assets/img/UniFi-Network-Isolation.png){: width="80%" height="auto"}

But sometimes, your devices in other zones would need to communicate with the IoT devices, for e.g., sending print jobs to the printer. This is can handled by a custom policy, to allow your laptops, PCs, tablets and even smartphones to send print jobs.
![UniFi Network Isolation](/assets/img/UniFi-Zones-Custom-Policy.png){: width="80%" height="auto"}

## Step 3: Monitor Your Network
You could monitor your network for threats via the Insights. By setting region block rules, you could deny traffic from certain regions that you don't expect visits. Likewise, you could monitor for suspicious lateral movements between zones.
![UniFi Network Isolation](/assets/img/UniFi-Insights.png){: width="80%" height="auto"}

With a reasonable price, one could enjoy the security that ZTA offers. If you're into homelab, this is certainly useful in separating your personal test workloads from your WFH, Netflix and children's HBL.
