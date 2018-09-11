---
title: 上手Weex踩到的坑 长期更新
date: 2017-04-12 08:56:29
tags:
  - Weex
  - Vue.js
  - npm
---

# 上手Weex踩到的坑 长期更新

## weex-toolkit VS weexpack

官方出了两个脚手架工具：**weex-toolkit**、**weexpack**。

**weex-toolkit** 是官方提供的一个脚手架命令行工具，你可以使用它进行 Weex 项目的创建，调试以及打包等功能。

**weexpack** 是基于 Weex 快速搭建应用原型的利器。它能够帮助开发者通过命令行创建 Weex 工程，添加相应平台的 Weex app 模版，并基于模版从本地，GitHub 或者 Weex 应用市场安装插件，快速打包 Weex 应用并安装到手机运行，对于具有分享精神的开发者而言还能够创建 Weex 插件模版并发布插件到 Weex 应用市场。

官网是这样描述它们的

> &nbsp;&nbsp;&nbsp;&nbsp;现在使用 weex-toolkit 同样支持对 weexpack 的命令调用,如果你当前的项目与 weexpack 生成的项目目录一致，那么你可以直接实现对于 platform 的操作，从而构建具体的 Android/IOS app 。

**请注意**，说的是**如果你当前的项目与 weexpack 生成的项目目录一致**，但是实际上它们生成的项目目录并不一样，构建Android和IOS项目会失败。
而且官网教程中有的使用weex命令，有的使用weexpack命令，对于刚上手的人来说不友好。看官方3.22在Issues中回复说

> &nbsp;&nbsp;&nbsp;&nbsp;确实我们内部在争论目录一致性，后期我们希望让两者的目录保持一致性，或者通过检查的形式自动补全缺损的目录，从而让它们一致。

希望尽早统一目录或者合并这两个工具吧😄


## 安装源问题

安装完weex-toolki和weexpack两个工具之后，生成项目没什么问题，但是打包到真机运行就出现了问题，非常莫名其妙的各种错误。 
于是用npm命令 `npm list -g --depth 0` 查看这两个全局安装的包的情况，发现大量相关依赖报错。我是淘宝源cnpm全局安装这两个工具的，按道理都是阿里的东西，应该不会有什么问题。 
看了一下官方GitHub的Issues，发现也有一样的情况。 
于是立马卸载这两个全局安装的工具： 
`npm uninstall weex-toolkit -g` 
 `npm uninstall weexpack -g`， 
 然后开翻墙，重新安装这两个工具，虽然速度慢一点，但是安装完之后再次`npm list -g --depth 0` 至少不会报错了。
 然后再生成项目，真机运行，一切就正常了。。。


