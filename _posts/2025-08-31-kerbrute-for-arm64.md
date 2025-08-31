---
layout: post
title:  "Compiling Kerbrute for ARM64"
background: '/img/bg-posts.jpg'
date:   2025-08-31 10:25:18 +0800
tags: kerbrute arm64
---

While there're many alternatives to Kerbrute, it's always good to have another tool in the box, especially for those using AMR64. Only tested on the *userenum* and *passwordspray* in Kali Linux ARM64, Macbook Pro M1.

## Compiling Kerbrute for AMR64
0. Install Prerequisite (optional - skip if you've these installed)
```bash
sudo apt install gccgo-go
sudo apt install golang-go
```
1. Clone the repository to your favourite working folder/directory.
```bash
git clone https://github.com/ropnop/kerbrute.git
cd kerbrute
```
2. Compile. Edit Makefile to include arm64 by adding arm64 to the end of ARCHS variable.
```bash
nano Makefile
ARCHS=amd64 386 arm64
make linux
```
3. Test Run
```bash
cd dist
ls -la

./kerbrute_linux_arm64

./kerbrute_linux_arm64 userenum -d nagoya-industries.com --dc 192.168.186.21 ~/Nagoya/users

./kerbrute_linux_arm64 passwordspray -d nagoya-industries.com --dc 192.168.186.21 ~/Nagoya/users Summer2023
```

### Credits:
* [Reddit](https://www.reddit.com/r/oscp/comments/wkyrq8/kerbrute_in_arm_based_kali/)
* [Github](https://github.com/ropnop/kerbrute/issues/50)
