---
title: Vue.js写一个音乐播放器
date: 2017-03-15 21:44:02
tags:
  - Vue.js
  - JavaScript
  - ES6
  - JS
  - ECMAScript6
  - HTML5
---
# Vue.js写一个音乐播放器

**Vue音乐播放器2.0升级版已经发布，请看 
👉 [Vue.js音乐播放器升级版](https://microzz.com/2017/04/08/vue-music2/)**

## 在线预览
**2.0版本预览地址**：🔗https://microzz.com/vue-music/
在线预览地址1: 🔗http://microzz.cn/vue-music/
在线预览地址2: 🔗https://microzz.github.io/vue-music-player/

## 源代码
GitHub地址: 🔗https://github.com/microzz/vue-music-player
欢迎大家follow和star哦😄

## 介绍
学习Vue.js后，决定做个小项目锻炼一下，于是选择了典型的音乐播放器上手。其中遇到了很多坑，也学到了很多。代码可能还有瑕疵，欢迎大家到我的[GitHub](https://github.com/microzz/vue-music-player)反馈，相互交流学习。同时也欢迎大家follow和star😄
预览图：
![红色皮肤-microzz.com](https://icdn.microzz.com/20170315_vue_music/red.png)
![绿色皮肤-microzz.com](https://icdn.microzz.com/20170315_vue_music/green.png)
![蓝色皮肤-microzz.com](https://icdn.microzz.com/20170315_vue_music/blue.png)
![黑色皮肤-microzz.com](https://icdn.microzz.com/20170315_vue_music/black.png)

### 技术栈

#### **Vue.js**
Vue的双向数据绑定真的很爽，让开发者更多的关注业务逻辑，而不是耗性能的DOM操作。借鉴了React.js和Angular.js等著名框架，Vue写起来也的确很方便，很多地方也想的很周到。因为实际场景，并没有使用到路由、vuex等东西。
其中也遇到了几个值得注意的地方：
1. 用好`watch`会事半功倍
2. 有些操作要在实例加载完，所以钩子函数`mounted`需要注意
3. 很多小技巧要试过才知道走了弯路😂

-------

#### **ES6**
本示例采用的是ES6的语法，因为webpack编译，所以也不必太过当心兼容性问题。ES6也即ECMAScript 2015，发布也有一段时间了，很多地方很方便，这是大势所趋，以后会慢慢地向ES6迁移。掌握是很必要的！

-------

#### HTML5
**localStorage**
本demo用localStorage本地存储保存用户设置（如：皮肤）和用户歌单列表

-------

#### CSS3
很多动画都是依靠CSS3完成的，方便性能也不错，缺点是兼容性问题。

-------


## 更新记录
### 2017.03.13
A music player by Vue.js。一个由Vue.js写的音乐播放器，今天完成了播放器的大体功能，数据是通过JSON模拟

#### 后续完善
1. 搭建后台调用网上音乐API
2. 完善功能

-------
### 2017.03.14
列表部分功能完善，部分代码优化，部分异步代码Promise化

#### 后续完善
1. 冗余代码整合优化
2. 部分代码封装


-------

### 2017.03.15
1.0.0正式版发布

-------

### 2017.03.19
2.0.0版本筹划...

### 2017.04.03
2.0.0版本开始

### 2017.04.08
2.0.0版本完成

**Vue音乐播放器2.0升级版已经发布，请看 
👉 [Vue.js音乐播放器升级版](https://microzz.com/2017/04/08/vue-music2/)**

## About
个人网站：🔗https://microzz.com/
GitHub：🔗https://github.com/microzz







