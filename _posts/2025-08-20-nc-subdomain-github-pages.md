---
layout: post
title:  "Using custom subdomain for Github Pages website"
background: '/img/bg-posts.jpg'
date:   2025-08-20 12:15:13 +0800
tags: subdomain github pages namecheap
---

Here's how to configure at both Github and Namecheap to use your own custom subdomain (for e.g., https://my.internet.life) to serve a Github Pages website.

## At Namecheap
1. Click on **Manage** for your matching domain.
    
2. Click on **Advanced DNS**. Under the "Host Records" section, **Add New Record**.
    
3. Select "CNAME Record", enter the following.
```text
   Host: <your subdomain only> e.g., www or my
   Value: <github-user-id>.github.io (NC will append a dot/period after saving)
```
4. Save the record. 
   
Important: If you're only using the subdomain, this is the only entry that you'll need!

## At Github
1. Select your repository. Click on **⚙️ Settings** (top menu).

2. Click on **Pages** and enter your custom subdomain in under **Custom Domain**. For e.g., my.internet.life (without the http/https).
   
3. Wait for the DNS Check to complete. Once it's done, a certificate will be provisioned for use and you can enable the **Enforce HTTPS**.
