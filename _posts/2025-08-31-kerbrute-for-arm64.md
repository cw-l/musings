---
layout: post
title:  "Compiling Kerbrute for ARM64"
background: '/img/bg-posts.jpg'
date:   2025-08-31 10:25:18 +0800
tags: kerbrute arm64
---

While there're many alternatives to Kerbrute, it's always good to have another tool in the box, especially for those using AMR64.

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
2. Compile
```bash
# edit Makefile to include arm64
nano Makefile

# add arm64 to the end of ARCHS, save file
ARCHS=amd64 386 arm64

# compile!
make linux
```
3. Test Run
```bash
# check out the binaries in the "dist" directory
cd dist
ls -la

# run it
./kerbrute_linux_arm64

# test user enumeration
./kerbrute_linux_arm64 userenum -d nagoya-industries.com --dc 192.168.186.21 ~/Nagoya/users

# test password spraying
./kerbrute_linux_arm64 passwordspray -d nagoya-industries.com --dc 192.168.186.21 ~/Nagoya/users Summer2023
```

### Credits:
* [Reddit](https://www.reddit.com/r/oscp/comments/wkyrq8/kerbrute_in_arm_based_kali/)
* [Github](https://github.com/ropnop/kerbrute/issues/50)
