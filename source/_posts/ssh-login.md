---
title: Linux/Mac下SSH无密码登录服务器配置
date: 2018-03-27 17:57:24
tags:
  - ssh
  - Linux
  - 服务器
---

# Linux/Mac下实现SSH无密码登录服务器

在可信设备上每次连接服务器都比较繁琐，现在通过配置公私钥就可以实现无密码登录。

## 步骤
首先我们在自己的Linux系统（客户端，这里是Mac）上生成一对SSH Key：SSH密钥和SSH公钥。密钥保存在自己的Linux系统上。
然后公钥上传到Linux服务器。之后我们就能无密码SSH登录了。SSH密钥就好比是你的身份证明

### 客户端
这里用Mac的终端环境做演示
1. 切换到用户名下面的.ssh路径下:
`cd ~/.ssh`
2. `ls`查看目录下面有没有`id_rsa`、`id_rsa.pub`文件，如果有，则可以跳过3操作
3. 打开终端，使用下面的ssh-keygen来生成RSA密钥和公钥．-t表示type，就是说要生成RSA加密的钥匙．默认的RSA长度是2048位。如果你非常注重安全，那么可以指定4096位的长度`ssh-keygen -t rsa -b 4096 -C "Your Email"`
生成SSH Key的过程中会要求你指定一个文件来保存密钥，按Enter键使用默认的文件就行了。然后需要输入一个密码来加密你的SSH Key。
SSH私钥会保存在目录下的`～/.ssh/id_rsa`文件中。SSH公钥保存在`～/.ssh/id_rsa.pub`文件中

### 服务器
1. 在用户`～/`目录下，同样生成私钥和公钥
`ssh-keygen -t rsa -b 4096 -C "Your Email"`
2. 开启ssh代理
`eval "$(ssh-agent -s)"` 
3. 把key加入代理中
`ssh-add ~/.ssh/id_rsa`
4. 粘贴本地的公钥到服务器

`vi ~/.ssh/authorized_keys`

也可以使用`ssh-copy-id`命令来完成。
`ssh-copy-id username@remote-server`
输入远程用户的密码后，SSH公钥就会自动上传了。SSH公钥保存在远程Linux服务器的`～/.ssh/authorized_keys`文件中．
5. 授权文件
`chmod 600 authorized_keys`
6. 重启服务
`sudo service sshd restart`

到这里你就可以直接在你本地 
`ssh username@remote-server`
实现无密码登录服务器了，非常方便。

## alias 别名登录
上面我们要登录服务器时还是要
`ssh username@remote-server`
服务器地址一般不好记，这个时候我们就可以在Mac终端里面设置别名，简写很多操作。这里以zsh为例
修改alias别名快捷方式，实现快速登录服务器

1. 打开配置文件
`vi ~/.zshrc`
2. 添加别名配置

```
alias cvm="ssh root@your_server_address"
alias codes="cd ~/codes"
alias down="cd ~/Downloads"
alias desk="cd ~/Desktop"
alias ~="cd ~"
```
3.使配置生效 `source ~/.zshrc`

现在我们在终端输入 `cvm` 就可以无密码快速登录自己的服务器了
输入`codes`就可以快捷进入`~/codes`文件夹，还有很多其他的快捷方式你可以根据需要添加


