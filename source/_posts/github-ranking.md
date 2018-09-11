---
title: Vue做一个GitHub项目排行榜
date: 2017-04-10 19:41:53
tags:
  - Vue.js
  - SASS
  - SCSS
  - Koa2
  - ES6
  - JavaScript
  - ECMAScript6
---
# Vue做一个GitHub项目排行榜
GitHub不同语言热门项目排行，Vue做页面展示。

## 源代码
源代码地址：🔗 [GitHub](https://github.com/microzz/github-ranking) 
欢迎大家 star和fork😄
## 预览地址
在线效果预览地址：https://microzz.com/github-ranking/

## 技术栈
* **Vue2.0**：前端页面展示。
* **axios**：一个基于 `Promise` 的 HTTP 库，向后端发起请求。
* **Express**、**Koa2**：因为vue-cli生成的项目是基于**express**的，所以在开发阶段我使用的是它，但是真正上线生产环境我换成了**Koa2**。
* **request**、**request-promise**：没有用Node.js原生的`http/https`模块是因为不喜欢回调函数式的异步，可读性和可维护性很差。所以选择了**request**+**request-promise**，让异步更为优雅一点。
* **cheerio**：服务器特别定制的，快速、灵活、实施的jQuery核心实现，抓取页面内容很方便。
* **SASS**(**SCSS**)：用SCSS做CSS预处理语言，有些地方很方便，个人很喜欢用。(详看👉[SASS用法指南](https://microzz.com/2017/03/18/sass/))
* **ES6**、**ES7**：采用ES6语法，这是以后的趋势。自己上线的生产环境后端增加了`Async/await`，使异步更加优雅。
* **Webpack**：vue-cli自带Webpack，但是需要自己改造一下，比如要对 `build/dev-server.js`扩展express，增加后端请求路由(上线版本用的是Koa2)。此外需要安装sass相关loader，vue-cli已经配置好了webpack，你只需要安装依赖就可以，使用的时候只需要`<style lang="scss"></style>`。
* **flex**：flex弹性布局。
* **CSS3**：CSS3过渡动画及样式。

## 遇到的问题
1. 异步操作很容易出问题，异步处理一定要小心！要熟练掌握`Promise`、`Async/await`、`Generator`等方法。(详看👉[异步操作和Async函数](https://microzz.com/2017/01/15/async/)、[Promise对象](https://microzz.com/2017/01/14/promise/)、[Generator 函数](https://microzz.com/2017/01/13/generator/))
2. 因为访问每次爬取GitHub速度慢，性能差，所以建议使用缓存，把爬取到的数据保存为json文件或者其他缓存方式，我在上线的正式版是保存为json文件。那么这个时候就要有一个定时爬取的工具了，这里推荐[node-schedule](https://github.com/node-schedule/node-schedule)模块，很方便就能实现定时任务，查看官方文档就能简单上手了。上线版本我是每隔几个小时就爬取一次，然后保存数据，这样减轻了服务器压力，前端访问速度也大大加快。
3. GitHub貌似最多只能有10个并发，我尝试9个是正常的，10个就会报错，刚好我一次性爬取的语言数目超过数目，一看报错信息是**429**状态码。查信息发现：

> &nbsp;&nbsp;&nbsp;&nbsp;429 Too Many Requests (太多请求)
> 当你需要限制客户端请求某个服务的数量，也就是限制请求速度时，该状态码就会非常有用。在此之前，有一些类似的状态码。例如“509 Bandwidth Limit Exceeded”。

所以一定好处理好这些异步请求，不然就爬取不到信息缓存了。

## About
源代码地址：👉 [GitHub](https://github.com/microzz/github-ranking) 

个人网站：🔗[microzz-IT技术分享](https://microzz.com/) 

GitHub：🔗[microzz](https://github.com/microzz)

## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report
```



