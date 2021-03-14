---
title: 如何在M1芯片Mac电脑上安装任意iOS App
date: 2021-03-14 22:45:19
tags:
    - Apple Silicon
    - Mac
    - M1
    - MacOS
    - iOS
    - AppleSilicon
---


# 如何在M1芯片Mac电脑上刷抖音

## 一、提取ipa文件
首先得提取`.ipa`文件（如果已有则可以跳至后面步骤）
* 下载[Apple Configurator 2](https://apps.apple.com/cn/app/apple-configurator-2/id1037126344?mt=12)


* 连接iOS设备之后，选中设备，点右上角 `添加`

![添加](https://icdn.microzz.com/20210314/add.png)

* 选择想要安装的app，比如选择 `抖音`，选择之后点添加

![选择需要安装的app](https://icdn.microzz.com/20210314/select-app.png)

* 下载`ipa`文件

![下载ipa文件](https://icdn.microzz.com/20210314/download-ipa.png)

* 下载完成，ipa文件是保存在`~/Library/Group\ Containers/K36BKF7T3D.group.com.apple.configurator/Library/Caches/Assets/TemporaryItems/**/*.ipa`位置，我们可以把文件移动到其他合适的位置，比如这里是移动到`~/Downloads`：

```bash
cp ~/Library/Group\ Containers/K36BKF7T3D.group.com.apple.configurator/Library/Caches/Assets/TemporaryItems/**/*.ipa ~/Downloads
```

## 二、安装ipa文件

* 双击`.ipa`文件进行安装

* 安装完之后会在`Applications`目录有抖音app

![安装ipa文件](https://icdn.microzz.com/20210314/install-ipa-end.png)

## 三、设置权限

* 此时我们直接点双击打开，会提示：

![没有权限](https://icdn.microzz.com/20210314/no-permission.png)

* 通过以下命令设置权限

```bash
sudo xattr -rd com.apple.quarantine /Applications/抖音.app
```

## 四、享用

* 打开app，这样就能直接在M1芯片（Apple Silicon）电脑刷抖音啦！

![没有权限](https://icdn.microzz.com/20210314/enjoy.png)