

layout: page      # 必须
title: 关于我  # 必须，页面名称
description: About me       # 页面二级标题，描述性文字
comments: false     # 禁用评论，可选，默认开启
reward: false       # 禁用打赏，可选，默认开启
date: 2017-03-17 09:17:43
----

# 简介
**姓名**：赵辉 
**专业**：软件工程 
**简介**：目前是一个待业的大三码农，求工作😄

-------


## 作品

### 三级联动的生成器插件

*  **👉[三级联动的生成器插件](https://microzz.com/2017/03/12/select-plugin/)**

**介绍**
自主完成的一个三级联动的生成器插件，默认生成中国地区🇨🇳的三级联动数据，也可以自定义数据。已经发布到 npm 上（ **[select-plugin](https://www.npmjs.com/package/select-plugin)** ），并且有不错的下载量。
 
**技术栈** 
&nbsp;&nbsp;&nbsp;**ES6**：本插件采用的是ECMAScript6的语法，用了class类、解构赋值、箭头函数、模版字符串、函数默认值、块级作用域等知识。 
&nbsp;&nbsp;&nbsp;**Node.js**：用Node.js处理中国的省市地区的非常庞大数据数据，并转化为自己想要的格式(难点)。 
&nbsp;&nbsp;&nbsp;**Gulp**：Gulp作为自动化构建工具，ES6转换为ES5、打包压缩代码。 
&nbsp;&nbsp;&nbsp;**npm**：插件最后上传到NPM，开源供每个人使用。 

**收获**

1. 对OOP有了更深的认识，代码的封装复用能力提高;
2. 用各种方法探索处理海量数据，转换为所需要的格式。 
  &nbsp;
  
**源代码**
    GitHub 👉 https://github.com/microzz/select-plugin
    
    
-------


### Vue音乐播放器2.0升级版

*  **👉[Vue音乐播放器2.0升级版](https://microzz.com/2017/04/08/vue-music2/)**

**介绍**

之前花了几天做了1.0版本，现在Vue音乐播放器升级版来了，加入QQ音乐在线搜索结果，加入韩寒一个(One)每日一句，功能更强，技术栈更多。目前**star**数300+。
 
**技术栈** 
&nbsp;&nbsp;&nbsp;**Vue2**：采用最新Vue2的语法😁
&nbsp;&nbsp;&nbsp;**Vuex**：实现不同组件之间的状态共享✌️
&nbsp;&nbsp;&nbsp;**vue-router**：单页应用路由管理必备😎
&nbsp;&nbsp;&nbsp;**axios**：发起http请求😉
&nbsp;&nbsp;&nbsp;**SASS(SCSS)**：css预处理语言💪
&nbsp;&nbsp;&nbsp;**Express**(上线版本是**Koa2**)：因为vue-cli是用的Express做服务器，所以开源的开发版本是Express，自己生产环境用的是Koa2。 😜
&nbsp;&nbsp;&nbsp;**Webpack**：自动化构建工具，大部分配置vue-cli脚手架已经弄好了，很方便。😏
&nbsp;&nbsp;&nbsp;**ES6**：采用ES6语法，这是趋势。👏
&nbsp;&nbsp;&nbsp;**localStorage(HTML5)**：本地存储，保存用户个性化设置。😊
&nbsp;&nbsp;&nbsp;**CSS3**：CSS3动画及样式。👍

&nbsp;&nbsp;&nbsp;**ES6**：本示例采用的是ES6的语法，因为Webpack编译，所以也不必太过当心兼容性问题。 
&nbsp;&nbsp;&nbsp;**HTML5**：
本demo用localStorage本地存储保存用户设置（如：皮肤）和用户歌单列表 。 
&nbsp;&nbsp;&nbsp;**CSS3**：很多动画都是依靠CSS3完成的，方便性能也不错，缺点是兼容性问题。 
 

**收获**

1. vuex什么时候使用，如何使用，各组件之间状态共享也是难点。
  
2. 异步编程：JS是单线程，异步编程尤为重要。当我们向后端请求数据，是异步的，如果没有处理好相关的异步操作，是会有各种问题的。JS可以利用`setTimeout`、`回调`、`Generator`、`Promise`、`Async`。
定时这种方式太麻烦，还是不推荐；回调层次多了，有回调地狱，代码维护性很差；Generator需要手动去执行，当然可以使用类似`co`的模块。相比之下`Promise`和`Async`是比较理想的。
3. 本项目中使用了QQ音乐和One(一个)的接口，后端API编写也是难点，包含了各种异步请求。对返回数据的解析也是难点，有的时候你还需要对数据进行解码。
4. 各组件结构的设计：一开始大纲没设计好，后面想修改涉及面会很广。
5. 过渡动画让交互更有趣，但是有的还是耗性能的，有设备差异，没用好会造成卡顿。

**源代码**
    GitHub 👉 https://github.com/microzz/vue-music-player
    
-------

### Vue做一个GitHub项目排行榜

*  **👉[Vue做一个GitHub项目排行榜](https://microzz.com/2017/04/10/github-ranking/)**

**介绍**

GitHub不同语言热门项目排行，Vue做页面展示。
**技术栈**
&nbsp;&nbsp;&nbsp;**Vue2.0**：前端页面展示。
&nbsp;&nbsp;&nbsp;**axios**：一个基于 `Promise` 的 HTTP 库，向后端发起请求。
&nbsp;&nbsp;&nbsp;**Express**、**Koa2**：因为vue-cli生成的项目是基于**express**的，所以在开发阶段我使用的是它，但是真正上线生产环境我换成了**Koa2**。
&nbsp;&nbsp;&nbsp;**request**、**request-promise**：没有用Node.js原生的`http/https`模块是因为不喜欢回调函数式的异步，可读性和可维护性很差。所以选择了**request**+**request-promise**，让异步更为优雅一点。
&nbsp;&nbsp;&nbsp;**cheerio**：服务器特别定制的，快速、灵活、实施的jQuery核心实现，抓取页面内容很方便。
&nbsp;&nbsp;&nbsp;**SASS**(**SCSS**)：用SCSS做CSS预处理语言，有些地方很方便，个人很喜欢用。
&nbsp;&nbsp;&nbsp;**ES6**、**ES7**：采用ES6语法，这是以后的趋势。自己上线的生产环境后端增加了`Async/await`，使异步更加优雅。
&nbsp;&nbsp;&nbsp; **Webpack**：vue-cli自带Webpack，但是需要自己改造一下，比如要对 `build/dev-server.js`扩展express，增加后端请求路由(上线版本用的是Koa2)。此外需要安装sass相关loader，vue-cli已经配置好了webpack，你只需要安装依赖就可以，使用的时候只需要`<style lang="scss"></style>`。
&nbsp;&nbsp;&nbsp;**flex**：flex弹性布局。
&nbsp;&nbsp;&nbsp;**CSS3**：CSS3过渡动画及样式。 
 

**收获**

1. 异步操作很容易出问题，异步处理一定要小心！要熟练掌握`Promise`、`Async/await`、`Generator`等方法。 
2. 因为访问每次爬取GitHub速度慢，性能差，所以建议使用缓存，把爬取到的数据保存为json文件或者其他缓存方式，我在上线的正式版是保存为json文件。那么这个时候就要有一个定时爬取的工具了，这里推荐[node-schedule](https://github.com/node-schedule/node-schedule)模块，很方便就能实现定时任务，查看官方文档就能简单上手了。上线版本我是每隔几个小时就爬取一次，然后保存数据，这样减轻了服务器压力，前端访问速度也大大加快。
3. GitHub貌似最多只能有10个并发，我尝试9个是正常的，10个就会报错，刚好我一次性爬取的语言数目超过数目，一看报错信息是**429**状态码。查信息发现：

> &nbsp;&nbsp;&nbsp;&nbsp;429 Too Many Requests (太多请求)
> 当你需要限制客户端请求某个服务的数量，也就是限制请求速度时，该状态码就会非常有用。在此之前，有一些类似的状态码。例如“509 Bandwidth Limit Exceeded”。

所以一定好处理好这些异步请求，不然就爬取不到信息缓存了。


**源代码**
    GitHub 👉 https://github.com/microzz/github-ranking
    
-------


### Vue.js打造一个开源的CNode社区

*  **👉[Vue.js打造一个开源的CNode社区](https://microzz.com/2017/04/17/vue-cnode/)**

**介绍**

Vue.js打造一个开源的CNode社区，实现了浏览、发帖、收藏、回复、点赞、个人中心等等功能。

**技术栈**

* **Vue2.0**：前端页面展示。
* **Vuex**：Vuex，实现不同组件间的状态共享
* **vue-router**：页面路由切换
* **axios**：一个基于 `Promise` 的 HTTP 库，向后端发起请求。
* **Express**、**Koa2**：因为vue-cli生成的项目是基于**express**的，所以在开发阶段我使用的是它，但是真正上线生产环境我换成了**Koa2**。
* **Moment.js**：一个时间处理的库，方便对时间进行格式化成需要的格式，如主题、回复时间显示"* 分钟前、* 小时前、*天前"等等。
* **ES6**、**ES7**：采用ES6语法，这是以后的趋势。箭头函数、Promise等等语法很好用。
* **localStorage**：保存用户信息。
* **Canvas**：页面顶部小雪花效果。
* **Webpack**：vue-cli自带Webpack，但是需要自己改造一下，比如要对需要安装sass相关loader，vue-cli已经配置好了webpack，你只需要安装依赖就可以，使用的时候只需要`<style lang="scss"></style>`。
* **SASS**(**SCSS**)：用SCSS做CSS预处理语言，有些地方很方便，个人很喜欢用。(详看👉[SASS用法指南](https://microzz.com/2017/03/18/sass/))
* **flex**：flex弹性布局，**简单**适配手机、PC端。
* **CSS3**：CSS3过渡动画及样式。

**总结**

1. 组件状态多了用Vuex管理很方便，引用 Redux 的作者 Dan Abramov 的话说就是：
> Flux 架构就像眼镜：您自会知道什么时候需要它。

2. 事先一定要先想好整个页面组成，怎样去分组件开发，这样在开发阶段会事半功倍。
3. Moment.js在Vue中用ES6的方式引入会有问题，可以尝试在main.js尝试这样`import moment from 'moment'` `Vue.prototype.moment = moment;`给Vue的原型上添加moment，这样就可以在Vue的实例中随意使用它了。
 
 **源代码**
    GitHub 👉 https://github.com/microzz/vue-cnode
    
-------

### Vue.js+Socket.io+Koa2打造一个智能聊天室

*  **👉[Vue.js+Socket.io+Koa2打造一个智能聊天室](https://microzz.com/2017/04/27/vue-chat/)**

**介绍**

QQ群里面的智能机器人很火，于是用Vue.js+Socket.io+Koa2打造了一个智能聊天室，实现了IP定位、在线群聊，加入了Emoji表情😄，以及接入了智能机器人😏

**技术栈**

* **Vue2.0**：前端页面展示。
* **Socket.io**：实现实时通信
* **Vuex**：Vuex，实现不同组件间的状态共享
* **vue-router**：页面路由切换
* **axios**：一个基于 `Promise` 的 HTTP 库，向后端发起请求。
* **Express**、**Koa2**：因为vue-cli生成的项目是基于**express**的，所以在开发阶段我使用的是它，但是真正上线生产环境我换成了**Koa2**。
* **Moment.js**：一个时间处理的库，方便对时间进行格式化成需要的格式。
* **ES6**、**ES7**：采用ES6语法，这是以后的趋势。箭头函数、Promise等等语法很好用。
* **localStorage**：保存用户信息以及聊天记录。
* **Webpack**：vue-cli自带Webpack，但是需要自己改造一下，比如要对需要安装sass相关loader，vue-cli已经配置好了webpack，你只需要安装依赖就可以，使用的时候只需要`<style lang="scss"></style>`。
* **SASS**(**SCSS**)：用SCSS做CSS预处理语言，有些地方很方便，个人很喜欢用。(详看👉[SASS用法指南](https://microzz.com/2017/03/18/sass/))
* **flex**：flex弹性布局，**简单**适配手机、PC端。
* **CSS3**：CSS3过渡动画及样式。

**总结**

1. 跨域问题要处理好，推荐使用CORS
2. get方式通过URL传参最好使用`encodeURI`对参数进行编码
3. 一定要处理好那些异步操作，否则会带来各种问题。开发阶段使用的是`Promise`，上线时候使用了ES7的`Async`+`Promise`的组合，让异步操作更加合理。
4. 组件状态多了用Vuex管理很方便，引用 Redux 的作者 Dan Abramov 的话说就是：
> Flux 架构就像眼镜：您自会知道什么时候需要它。

5. 事先一定要先想好整个页面组成，怎样去分组件开发，这样在开发阶段会事半功倍。
6. Moment.js在Vue中用ES6的方式引入会有问题，可以尝试在main.js尝试这样`import moment from 'moment'` `Vue.prototype.moment = moment;`给Vue的原型上添加moment，这样就可以在Vue的实例中随意使用它了。
 
 **源代码**
    GitHub 👉 https://github.com/microzz/vue-chat
    
-------

### React.JS新闻App

*  **👉[ReactJS新闻App](https://microzz.com/2017/03/29/react-news/)**

**介绍**

一个由React.js编写的新闻WebApp。

**技术栈**
&nbsp;&nbsp;&nbsp;**React**：React.js组件化开发项目采用组件化的思想，把大的功能模块划分成一个个小的模块，便于团队合作和维护。
&nbsp;&nbsp;&nbsp;**react-router**：路由库React-Router，它是官方维护的，事实上也是唯一可选的路由库。它通过管理 URL，实现组件的切换和状态的变化，开发复杂的应用几乎肯定会用到，特别是SPA(单页应用)
&nbsp;&nbsp;&nbsp;**Ant Design**：Ant Design 是蚂蚁金服开发和正在使用的一套企业级的前端设计语言和基于 React 的前端框架实现。
&nbsp;&nbsp;&nbsp;**Webpack**：Webpack作为自动化构建工具
&nbsp;&nbsp;&nbsp;**ES6**：全面采用ES6语法，这是以后的趋势，兼容性问题可以用babel解决。
 

**收获**

1. 组件化方式开发，可维护性更好了，团体合作很合适。
2. 对Promise异步操作更加熟练
3. fetch代替Ajax，异步流程更为清晰


**源代码**
    GitHub 👉 https://github.com/microzz/news-app-by-react.js
    


未完待续...

## 关于我
GitHub: 👉 https://github.com/microzz
掘金专栏: 👉 https://juejin.im/user/57f0f27a128fe100542d29ad
SegmentFault: 👉 https://segmentfault.com/u/microzz/posts














