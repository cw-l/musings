---
layout: post
title:  "(Passwordless) SSH using FIDO Key"
background: '/img/bg-posts.jpg'
date:   2025-08-18 18:18:18 +0800
tags: fido ssh mfa
---


This has been tested successfully on the following setup. 
* Server: Ubuntu 24.04.3 LTS
* Client: Apple M1 Pro, macOS Sequoia 15.6
* OpenSSH: 8.2 or newer
* FIDO Key: Identiv uTrust FIDO2 NFC Security Key (USB-C) 


## Step 0 - Install Homebrew (optional)
As macOS System SSH does not support FIDO by default, install Homebrew SSH to make it work. This step is only required if you do not have Homebrew installed.
```bash
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
```
Run the commands in the **Next step** to complete installation.


## Step 1 - Install Homebrew OpenSSH + FIDO support
{% highlight bash %}
brew install libfido2 openssh
{% endhighlight %}
Verify FIDO-backed keys are supported:
{% highlight bash %}
/opt/homebrew/bin/ssh -Q key | grep sk
{% endhighlight %}
You should see these or similar.
```text
	sk-ssh-ed25519@openssh.com
	sk-ssh-ed25519-cert-v01@openssh.com
	sk-ecdsa-sha2-nistp256@openssh.com
	sk-ecdsa-sha2-nistp256-cert-v01@openssh.com
```


## Step 2 - Generate SSH key-pair
You would be prompted to enter the passphrase. If you do, it will be needed during SSH login. If no passphrase is provided, anyone with access to the private key can login to the server. 
On the other hand, even if the passphrase is entered, the bad actor could still try to crack it. You can specify a different location to store the created key-pair.

❗Remember to use the **Homebrew ssh-keygen** to generate the key-pair, if you use the default System's SSH, it will **fail**.

Try first with FIDO provider. If this works, proceed to next step.
```bash
/opt/homebrew/bin/ssh-keygen -t ed25519-sk -O provider=/opt/homebrew/lib/ssh/libsk-libfido2.dylib -f ~/.ssh/id_ed25519_sk
```
If you encounter an error occur, try generating without the provider option. Again, move to the next step if you succeed here.
```bash
/opt/homebrew/bin/ssh-keygen -t ed25519-sk -f ~/.ssh/id_ed25519_sk
```
Some security keys (especially older YubiKeys or U2F-only keys) don’t support ed25519-sk, try using ecdsa-sk instead. Typically, it should work at this attempt. 
```bash
/opt/homebrew/bin/ssh-keygen -t ecdsa-sk -f ~/.ssh/id_ecdsa_sk
```


## Step 3 - Copy the public key to the server
You must have a valid user created on the server. You would be prompted for the user password to SSH to the server for the copy to work. 
❗Do not to use **root** for this.
```bash
ssh-copy-id -i ~/.ssh/id_ecdsa_sk.pub <user>@<ip-address>
```
You could optionally verify the **authorized_keys** file at the server. The file timestamp would have been updated.
```bash
cat authorized_keys
```


## Step 4 - Configure the SSH Config file
You would need to edit the server's SSH config file to uncomment the line **# PubkeyAuthentication yes**. For Ubuntu, there's no need to restart the SSH service as it's typically shipped with socket-activated SSH.
This means that the systemd listens on TCP port 22, and when a connection comes in, it spawns sshd.

❗You need to have a breakglass accout configured. This caters to situations where the main & backup FIDO keys were lost, damaged and the password authentication was disabled.
```bash
sudo nano /etc/ssh/sshd_config

// before
# PubkeyAuthentication yes

// after
PubkeyAuthentication yes
```


## Step 5 - Configure your client to cache the passphrase (optional)
Skip this step, if you intend to enter the passphrase each time you login. 

Identify the shell being used on your client machine. For macOS, it should be **zsh**.
Configure the Homebrew ssh-agent to auto-start on login and also to cache the passphrase by editing the .zshrc file. Append the two lines to the end of the file. Reload it.
add these to the end of the profile
```bash
echo $SHELL
nano ~/.zshrc
eval "$(/opt/homebrew/bin/ssh-agent -s)"
/opt/homebrew/bin/ssh-add ~/.ssh/id_ecdsa_sk
source ~/.zshrc
```


## Step 6 - SSH to the server

Perform ssh login to the server. You will need to touch the FIDO key!
```bash
/opt/homebrew/bin/ssh -i ~/.ssh/id_ecdsa_sk <user>@<ip_address>
```
