---
layout: post
title:  "Installing & running Authentik in rootless Docker"
background: '/img/bg-posts.jpg'
date:   2026-03-03 09:18:00 +0800
tags: authentik rootless docker idp oidc
---


This has been tested successfully on the following setup. 
* Server: Ubuntu 24.04.4 LTS
* Docker: Latest
* Authentik: Latest

### References
* [Authentik Docker Compose installation](https://docs.goauthentik.io/install-config/install/docker-compose/)

### Assumption
* Docker is running [rootless](2026-02-26-rootless-docker.md).

### Theory
1. Create a new non-root & non-sudoer user for installing & running Authentik. Switch to, or login with this user.
2. At the user's home folder, create the necessary folders for installing & running Authentik.
3. Download the Docker Compose file into the application folder, e.g., ~/authentik.
4. Generate PostgreSQL password and secret key.
5. Patch the Docker Compose file for running rootless either manually or using script. Update "/var/run/docker.sock:/var/run/docker.sock" to "/run/user/1000/docker.sock:/var/run/docker.sock". 
6. Install and start authentik (using default ports: HTTP - 9000 and HTTPS - 9443).
7. Browse to http://<YOUR_SERVER_IP>:9000/if/flow/initial-setup/ to continue with the configuration. Refresh the page if it did not redirect to login page after a few minutes.
8. Rename the default admin username and enable MFA to secure the account.

### Installation
```bash
mkdir -p ~/authentik && cd ~/authentik

mkdir -p certs media

wget https://docs.goauthentik.io/compose.yml

echo "PG_PASS=$(openssl rand -base64 36 | tr -d '\n')" >> .env
echo "AUTHENTIK_SECRET_KEY=$(openssl rand -base64 60 | tr -d '\n')" >> .env

sed -i "s|/var/run/docker.sock|/run/user/$(id -u)/docker.sock|g" compose.yml

docker compose pull
docker compose up -d
```
