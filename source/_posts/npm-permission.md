---
title: NPM权限修复
date: 2018-06-18 17:01:23
tags:
  - JS
  - JavaScript
  - NodeJS
  - Node.JS
  - NPM
---
# 修复npm权限问题

## 背景
采用二进包方式安装nodejs需要root权限，因为 nodejs 的默认安装路径是 /usr/local/bin/node, /usr/local目录的所有者是root。因此我们在以全局安装和本地安装npm包的时候，需要在普通用户和超级用户来回切换。
遇到以下问题,就要考虑修复npm权限了：
（1）Error：EACCES: permission denied
（2）用sudo安装的包，提示没有执行权限
为避免用普通用户安装npm包时报错，一般我们不建议使用 sudo, 也就是无论是全局安装还是本地安装方式，都不需要加 sudo, 这样就不会产生权限混乱的问题了。

## 解决方案
将 `/usr/local` 目录的所有者变更为当前用户
`sudo chown -R $(whoami) /usr/local`
注：可以用`ls -all /usr/local` 查看所有者是否已经变更
修改目录所有者
`sudo chown -R $(whoami) your-project-path`
修复 `npm` 或 `yarn` 的缓存目录的权限问题
`sudo chown -R $(whoami) $(npm get cache)`
`sudo chown -R $(whoami) $(yarn cache dir)`
