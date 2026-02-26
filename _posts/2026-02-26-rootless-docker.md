---
layout: post
title:  "Rootless Docker with Ubuntu 24.04.4 LTS"
background: '/img/bg-posts.jpg'
date:   2026-02-26 13:18:00 +0800
tags: rootless docker ubuntu privilege escalation
---


This has been tested successfully on the following setup. 
* Server: Ubuntu 24.04.4 LTS
* Docker: Latest

### References
* [Install Docker Engine on Ubuntu](https://docs.docker.com/engine/install/ubuntu/)
* [Rootless Mode](https://docs.docker.com/engine/security/rootless/)
* [Understanding the Docker USER Instruction](https://www.docker.com/blog/understanding-the-docker-user-instruction/)
* [Root by accident, privilege escalation using Docker](https://medium.com/@serafincpd/root-by-accident-privilege-escalation-using-docker-8f121079fa01)

### Theory
1. Uninstall previous installation, if any, especially if docker was installed as part of Ubuntu installation.
2. Set up Docker's apt repository.
3. Install the Docker packages (latest version) and uidmap.
4. Disable system-wide Docker daemon.
5. Run dockerd-rootless-setuptool.sh install as a non-root & non-sudoer user to set up the daemon.

### Installation
```bash
sudo apt remove $(dpkg --get-selections docker.io docker-compose docker-compose-v2 docker-doc podman-docker containerd runc | cut -f1)

sudo apt update
sudo apt install ca-certificates curl
sudo install -m 0755 -d /etc/apt/keyrings
sudo curl -fsSL https://download.docker.com/linux/ubuntu/gpg -o /etc/apt/keyrings/docker.asc
sudo chmod a+r /etc/apt/keyrings/docker.asc

sudo tee /etc/apt/sources.list.d/docker.sources <<EOF
Types: deb
URIs: https://download.docker.com/linux/ubuntu
Suites: $(. /etc/os-release && echo "${UBUNTU_CODENAME:-$VERSION_CODENAME}")
Components: stable
Signed-By: /etc/apt/keyrings/docker.asc
EOF

sudo apt update

sudo apt install uidmap docker-ce docker-ce-cli containerd.io docker-buildx-plugin docker-compose-plugin

sudo systemctl disable --now docker.service docker.socket
sudo rm /var/run/docker.sock

dockerd-rootless-setuptool.sh install
```
