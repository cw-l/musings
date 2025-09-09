---
layout: post
title:  "Verifying custom domain for Github Pages"
background: '/img/bg-posts.jpg'
date:   2025-08-20 13:45:13 +0800
updated_date: 2025-09-09 23:49:00 +0800
tags: custom domain github pages namecheap verify
---

This post isn't about all the pros of verifying our custom domain name in Github. You could [read](https://docs.github.com/en/pages/configuring-a-custom-domain-for-your-github-pages-site/verifying-your-custom-domain-for-github-pages) more about the advantages of verifying your custom domain for your Github personal account, if keen. Instead, this post is about the how-to do it, and the weird encounter.

## At Github
1. Click on your profile picture at the upper-right corner of GitHub, then click on **⚙️ Settings** followed by **Pages**.
    
2. Click **Add a domain**. 

3. Enter your apex domain, e.g., internet.life and click **Add domain**. You only need to verify the apex domain and not the subdomains.
    
4. Use the information to create a DNS TXT record in Namecheap.
  
## At Namecheap
3. Click on **Manage** for your matching domain.
    
4. Click on **Advanced DNS**. Under the "Host Records" section, **Add New Record**.
    
5. Select "TXT Record", use the information at Github to complete the record. So interestingly when I first verify the domain, I'd to add the apex-domain to the host, and it worked for a while. Then Github said it couldn't find the TXT record anymore and after removing the apex-domain, I was able to verify it again. YMMY, so toggle begin having and not having the apex-domain if you hit similar issue. 
```text
   Host: _github-pages-challenge-<Github-user-name>
   Host: _github-pages-challenge-<Github-user-name>.<apex-domain>
   Value: 7d77b2d16bab18xcec38b9007f7e63 (your value will differ)
```
6. Save the record. And wait for the validation to complete. Verify at Github.
