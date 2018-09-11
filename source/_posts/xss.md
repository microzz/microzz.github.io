---
title: Web安全之XSS
date: 2017-08-17 22:27:41
tags:
 - XSS
 - Web安全
 - 跨站脚本攻击
 - CSRF
---

# XSS跨站脚本攻击

## 概念
> &nbsp;&nbsp;&nbsp;&nbsp;**跨站脚本**（Cross-site scripting，通常简称为：XSS）是一种网站应用程序的安全漏洞攻击，是代码注入的一种。它允许恶意用户将代码注入到网页上，其他用户在观看网页时就会受到影响。这类攻击通常包含了HTML以及用户端脚本语言。
> XSS攻击通常指的是通过利用网页开发时留下的漏洞，通过巧妙的方法注入恶意指令代码到网页，使用户加载并执行攻击者恶意制造的网页程序。这些恶意网页程序通常是JavaScript，但实际上也可以包括Java，VBScript，ActiveX，Flash或者甚至是普通的HTML。攻击成功后，攻击者可能得到更高的权限（如执行一些操作）、私密网页内容、会话和cookie等各种内容。

以上是维基百科对**XSS**的解释，XSS在Web安全中非常常见，也是我们应该引起重视的。下面就详细进行一下介绍。

## 分类
XSS通常可以分为两大类：

### **反射型XSS**
发出请求时，XSS代码出现在URL中，作为输入提交到服务端，服务端解析后响应，XSS代码随响应内容一起传回浏览器，最后浏览器解析执行XSS代码。这个过程像一次反射，故叫**反射性XSS**。

#### 代码演示反射型XSS
为了方便实验，我选用了Koa2做后端，模版使用Ejs。

我们对一个路由做如下处理：

```javascript
router.get('/', async (ctx, next) => {
  ctx.set('X-XSS-Protection', 0);
  await ctx.render('index', {
    title: 'XSS攻击示例',
    xss: ctx.request.query.xss
  })
})
```

我们需要注意代码中还额外设置了一个header
`ctx.set('X-XSS-Protection', 0);`
因为很多现在很多现代浏览器都有xss的拦截措施进行保护。如果没有设置的话会有如下结果：

![XSS Protection](https://icdn.microzz.com/xss-protection1.png)
打开控制台就会有报错信息：
![XSS Protection](https://icdn.microzz.com/xss-protection2.png)

```html
<!-- index.ejs 首页模版页 -->
<!DOCTYPE html>
<html>
  <head>
    <title><%= title %></title>
    <link rel='stylesheet' href='/stylesheets/style.css' />
  </head>
  <body>
    <h1><%= title %></h1>
    <div><%- xss %></div>
  </body>
</html>
```
(注意：写成`<%= xss %>`就不会有效果了，为了演示需要写成`<%- xss %>`)

正常的显示是这样的：
![XSS](https://icdn.microzz.com/20170817_xss/xss-normal.png)

* 用户输入一些恶意代码的时候就会出现下面的情况,比如通过img标签的onerror事件获取cookie

![XSS获取cookie](https://icdn.microzz.com/20170817_xss/xss-cookie.png)

* 加载一些非同源js：
![XSS 加载其它js文件](https://icdn.microzz.com/xss-js.png)
打开网络面板和控制台，发现成功加载了jQuery，如果是其他恶意的脚本后果很严重。
![XSS 加载jQuery](https://icdn.microzz.com/xss-jq.png)


* 嵌入一个iframe插入各种广告或者其他恶意站点

![XSS iframe](https://icdn.microzz.com/20170817_xss/xss-iframe.png)


## **存储型XSS**

存储型XSS和反射型XSS差别仅在于提交的代码会存储在服务器端(数据库，内存，文件系统等)，下次请求目标页面时不用再提交XSS代码

下面通过一个图说明

![XSS 说明](https://icdn.microzz.com/20170817_xss/xss-pic.png)


#### 代码演示存储型XSS

* 前端

前端展示是一个多行文本框，然后支持评论和获取评论的输入框，如下图：
![XSS 演示](https://icdn.microzz.com/20170817_xss/xss-db1.png)

代码部分(为了使演示更方便，有些地方没有考虑兼容性)

```html
<!DOCTYPE html>
<html>
  <head>
    <title><%= title %></title>
    <link rel='stylesheet' href='/stylesheets/style.css' />
  </head>
  <body>
    <h1><%= title %></h1>
    <div>
      <textarea name="name" rows="8" cols="80">
        <p>microzz.com</p>
        <img src="null" alt="无法正常显示图片" onerror="alert('onerror')">
        <button onclick="alert('中奖啦')">去抽奖</button>
      </textarea>

      <button id="comment">评论</button>
      <button id="get">获取评论</button>
    <div>

    <script>
      const oTextArea = document.querySelector('textarea');
      const oCommentBtn = document.querySelector('#comment');
      const oGetBtn = document.querySelector('#get');

      oGetBtn.addEventListener('click', () => {
        fetch('/get')
          .then(result => result.json())
          .then(data => {
            let oP = document.createElement('p');
            oP.innerHTML = data.comment;
            document.body.appendChild(oP);
          })
      });

      oCommentBtn.addEventListener('click', () => {
        fetch(`/comment?comment=${oTextArea.value}`)
      })

    </script>
  </body>
</html>

```

* 服务端

为了使演示方便并没有使用数据库，这里使用`Object`来模拟代替，路由部分如下：

```javascript
const router = require('koa-router')()
const db = {
  comment: ''
};

router.get('/get', async (ctx, next) => {
  ctx.body = {
    comment: db.comment
  }
})

router.get('/comment', async (ctx, next) => {
  db.comment = ctx.request.query.comment;
  ctx.body = {
    msg: 'ok'
  }
})
```

我们看一下评论后获取评论的效果：
![XSS 演示](https://icdn.microzz.com/20170817_xss/xss-db4.png)

诱导是用户点击：
![XSS 演示](https://icdn.microzz.com/20170817_xss/xss-db5.png)

## 不同分类
XSS攻击从攻击的方式可以分为

* 反射型
* 存储型
* 文档型(MXSS, 也叫DOM XSS)

这种分类方式有些过时，长久以来，人们认为XSS分类有以上三种，但实际情况中经常无法区分，所以更明确的分类方式可以分为以下两类：

* client(客户端型)
* server(服务端型)

当一端xss代码是在服务端被插入的，那么这就是服务端型xss，同理，如果代码在客户端插入，就是客户端型xss。

## 防御措施
* 编码
* 过滤
* 校正
* CSP

### 编码
对用户输入的数据进行HTML Entity编码

![HTML Entities](https://icdn.microzz.com/20170817_xss/html-entities.png)

具体可以查阅 👉 https://dev.w3.org/html5/html-author/charref

比如我们可以写一个简单的方法：

```javascript
// 对用户的提交进行编码
function htmlEncode(str) {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/ /g, '&nbsp;')
    .replace(/\'/g, '&#39;')
    .replace(/\"/g, '&quot;')
    .replace(/\n/g, '<br>');
}
```

我们对上面的路由进行一下改造：

```javascript
router.get('/comment', async (ctx, next) => {
  db.comment = htmlEncode(ctx.request.query.comment);
  ctx.body = {
    msg: 'ok'
  }
})
```

此时页面就显示正常的内容了

![XSS 演示](https://icdn.microzz.com/20170817_xss/xss-db6.png)

### 过滤
* 移除用户上传的DOM属性，如`onerror`(`onerror`事件可以执行js代码)、`click`等事件

* 移除用户上传的Link、Style节点(可以利用`!important`重置页面样式，比如: `body{display: none)}`、
Script节点(执行js代码，加载非同源js)、
Iframe节点(插入恶意页面或者广告)等

### 校正

* 避免直接对HTML Entity解码，否则编码意义不大了

* 使用DOM Parse转换，校正不配对的DOM标签


### CSP

**内容安全策略(CSP)**是一个额外的安全层，有助于检测和减轻某些类型的攻击，包括跨站脚本 (XSS) 和数据注入攻击。这些攻击用于从数据窃取到现场污染或恶意软件分发的一切。

CSP 的实质就是白名单制度，开发者明确告诉客户端，哪些外部资源可以加载和执行，等同于提供白名单。它的实现和执行全部由浏览器完成，开发者只需提供配置。
CSP 大大增强了网页的安全性。攻击者即使发现了漏洞，也没法注入脚本，除非还控制了一台列入了白名单的可信主机。
#### 启用方法
* HTTP 头信息Content-Security-Policy

我们改造一下前面加载非同源的jQuery脚本的代码，后端路由进行这样的改造：

```javascript
router.get('/', async (ctx, next) => {
  ctx.set('X-XSS-Protection', 0);
  ctx.set('Content-Security-Policy', `default-src 'self'`)
  await ctx.render('index', {
    title: 'XSS攻击示例',
    xss: ctx.request.query.xss
  })
})
```
此时默认只允许加载本站的脚本，看一下网络请求，响应头上多了
`Content-Security-Policy: default-src 'self'`
表示一个网站管理者想要所有内容均来自站点自己 (这排除子域名.)
![XSS CSP](https://icdn.microzz.com/xss-csp1.png)
此时控制台也会报错
![XSS CSP](https://icdn.microzz.com/xss-csp2.png)

* 通过网页的<meta>标签也可以开启
`<meta http-equiv="Content-Security-Policy" content="script-src 'self'; object-src 'none'; style-src cdn.example.org third-party.org; child-src https:">`

上面代码中，CSP 做了如下配置：

```脚本：只信任当前域名
<object>标签：不信任任何URL，即不加载任何资源
样式表：只信任cdn.example.org和third-party.org
框架（frame）：必须使用HTTPS协议加载
其他资源：没有限制
启用后，不符合 CSP 的外部资源就会被阻止加载。
```

#### 资源加载限制
`default-src` 指令定义了那些没有被更精确指令指定的（默认）安全策略。该指令包含了以下指令：

* script-src：外部脚本
* style-src：样式表
* img-src：图像
* media-src：媒体文件（音频和视频）
* font-src：字体文件
* object-src：插件（比如 Flash）
* child-src：框架
* frame-ancestors：嵌入的外部资源（比如`<frame>`、`<iframe>`、`<embed>`和`<applet>`）
* connect-src：HTTP 连接（通过 XHR、WebSockets、EventSource等）
* worker-src：worker脚本
* manifest-src：manifest 文件


详细可以参考MDN 👉 https://developer.mozilla.org/zh-CN/docs/Web/Security/CSP/CSP_policy_directives

#### 注意点
（1）`script-src`和`object-src`是必设的，除非设置了`default-src`。
因为攻击者只要能注入脚本，其他限制都可以规避。而`object-src`必设是因为 Flash 里面可以执行外部脚本。
（2）`script-src`不能使用`unsafe-inline`关键字（除非伴随一个nonce值），也不能允许设置data:URL。
下面是两个恶意攻击的例子。


```<img src="x" onerror="evil()">
<script src="data:text/javascript,evil()"></script>
```
（3）必须特别注意 JSONP 的回调函数。


```
<script src="/path/jsonp?callback=alert(document.domain)//">
</script>
```
上面的代码中，虽然加载的脚本来自当前域名，但是通过改写回调函数，攻击者依然可以执行恶意代码。

#### 缺陷
* 日志不详细：上报的只有违规的站点名没有具体路径
* 规则不灵活：CSP 目前只支持白名单列表
* 无法和页面交互
* 上报方式不可控：只能使用 POST + JSON 的方式提交，无法设定一个缓存时间，控制重复上报的间隔
* 浪费带宽
* 维护繁琐
* 兼容性不高


### X-Frame-Options

这是response头个现在正在使用，但以后可以被CSP的 frame-ancestors取代。目前支持的状态比起 CSP frame-ancestors要好 使用的方式:

```
X-Frame-Options:DENY//这个页面不允许被以frame的方式加载  
X-Frame-Options:SAMEORIGIN//这个页面只允许同源页面加载  
X-Frame-Options:<uri> //这个页面只能被特定的域加载  
```

谷歌在这点就做的比较好：
![XSS Google](https://icdn.microzz.com/20170817_xss/xss-google.png)

###  Http-Only
使用http-only 保护cookie，可以保证即使发生了xss，用户的cookie也是安全的。使用http-only 保护的cookie是不会被javascript读写的。

### 其他
我们还可以使用一些成熟流行的开源库来对数据进行处理，增强安全性，防范XSS攻击。


## 未完待续
防范XSS攻击是一个持久艰巨的任务，即使是一线互联网公司也会遭遇此类攻击。只有在每一个步骤都时刻注意，才能很好避免此类事件。

## 参考链接
[CSP 策略指令](https://developer.mozilla.org/zh-CN/docs/Web/Security/CSP/CSP_policy_directives)
[Content Security Policy 入门教程](http://www.ruanyifeng.com/blog/2016/09/csp.html)
[【XSS】利用 onload 事件监控流量劫持](https://www.cnblogs.com/index-html/p/use-onload-event-trace-http-hijack.html)



