---
title: 原生JS中DOM节点相关API合集
date: 2017-04-06 20:14:10
tags:
  - JavaScript
  - JS
  - DOM
  - API
---

# 原生JS中DOM节点相关API合集

## 节点属性

```javascript
Node.nodeName   //返回节点名称，只读
Node.nodeType   //返回节点类型的常数值，只读
Node.nodeValue  //返回Text或Comment节点的文本值，只读
Node.textContent  //返回当前节点和它的所有后代节点的文本内容，可读写
Node.baseURI    //返回当前网页的绝对路径

Node.ownerDocument  //返回当前节点所在的顶层文档对象，即document
Node.nextSibling  //返回紧跟在当前节点后面的第一个兄弟节点
Node.previousSibling  //返回当前节点前面的、距离最近的一个兄弟节点
Node.parentNode   //返回当前节点的父节点
Node.parentElement  //返回当前节点的父Element节点
Node.childNodes   //返回当前节点的所有子节点
Node.firstChild  //返回当前节点的第一个子节点
Node.lastChild   //返回当前节点的最后一个子节点

//parentNode接口
Node.children  //返回指定节点的所有Element子节点
Node.firstElementChild  //返回当前节点的第一个Element子节点
Node.lastElementChild   //返回当前节点的最后一个Element子节点
Node.childElementCount  //返回当前节点所有Element子节点的数目。
```

## 操作

```javascript
Node.appendChild(node)   //向节点添加最后一个子节点
Node.hasChildNodes()   //返回布尔值，表示当前节点是否有子节点
Node.cloneNode(true);  // 默认为false(克隆节点), true(克隆节点及其属性，以及后代)
Node.insertBefore(newNode,oldNode)  // 在指定子节点之前插入新的子节点
Node.removeChild(node)   //删除节点，在要删除节点的父节点上操作
Node.replaceChild(newChild,oldChild)  //替换节点
Node.contains(node)  //返回一个布尔值，表示参数节点是否为当前节点的后代节点。
Node.compareDocumentPosition(node)   //返回一个7个比特位的二进制值，表示参数节点和当前节点的关系
Node.isEqualNode(noe)  //返回布尔值，用于检查两个节点是否相等。所谓相等的节点，指的是两个节点的类型相同、属性相同、子节点相同。
Node.normalize()   //用于清理当前节点内部的所有Text节点。它会去除空的文本节点，并且将毗邻的文本节点合并成一个。

//ChildNode接口
Node.remove()  //用于删除当前节点
Node.before()  //
Node.after()
Node.replaceWith()
```

## Document节点

### Document节点的属性

```javascript
document.doctype   //
document.documentElement  //返回当前文档的根节点
document.defaultView   //返回document对象所在的window对象
document.body   //返回当前文档的<body>节点
document.head   //返回当前文档的<head>节点
document.activeElement  //返回当前文档中获得焦点的那个元素。

//节点集合属性
document.links  //返回当前文档的所有a元素
document.forms  //返回页面中所有表单元素
document.images  //返回页面中所有图片元素
document.embeds  //返回网页中所有嵌入对象
document.scripts  //返回当前文档的所有脚本
document.styleSheets  //返回当前网页的所有样式表

//文档信息属性
document.documentURI  //表示当前文档的网址
document.URL  //返回当前文档的网址
document.domain  //返回当前文档的域名
document.lastModified  //返回当前文档最后修改的时间戳
document.location  //返回location对象，提供当前文档的URL信息
document.referrer  //返回当前文档的访问来源
document.title    //返回当前文档的标题
document.characterSet属性返回渲染当前文档的字符集，比如UTF-8、ISO-8859-1。
document.readyState  //返回当前文档的状态
document.designMode  //控制当前文档是否可编辑，可读写
document.compatMode  //返回浏览器处理文档的模式
document.cookie   //用来操作Cookie
```

### Document节点的方法

#### 读写方法

```javascript
document.open()   //用于新建并打开一个文档
document.close()   //不安比open方法所新建的文档
document.write()   //用于向当前文档写入内容
document.writeIn()  //用于向当前文档写入内容，尾部添加换行符。
```

#### 查找节点

```javascript
document.querySelector(selectors)   //接受一个CSS选择器作为参数，返回第一个匹配该选择器的元素节点。
document.querySelectorAll(selectors)  //接受一个CSS选择器作为参数，返回所有匹配该选择器的元素节点。
document.getElementsByTagName(tagName)  //返回所有指定HTML标签的元素
document.getElementsByClassName(className)   //返回包括了所有class名字符合指定条件的元素
document.getElementsByName(name)   //用于选择拥有name属性的HTML元素（比如<form>、<radio>、<img>、<frame>、<embed>和<object>等）
document.getElementById(id)   //返回匹配指定id属性的元素节点。
document.elementFromPoint(x,y)  //返回位于页面指定位置最上层的Element子节点。
```

#### 生成节点

```javascript
document.createElement(tagName)   //用来生成HTML元素节点。
document.createTextNode(text)   //用来生成文本节点
document.createAttribute(name)  //生成一个新的属性对象节点，并返回它。
document.createDocumentFragment()  //生成一个DocumentFragment对象
（4）事件方法

document.createEvent(type)   //生成一个事件对象，该对象能被element.dispatchEvent()方法使用
document.addEventListener(type,listener,capture)  //注册事件
document.removeEventListener(type,listener,capture)  //注销事件
document.dispatchEvent(event)  //触发事件
```

#### 其他

```javascript
document.hasFocus()   //返回一个布尔值，表示当前文档之中是否有元素被激活或获得焦点。
document.adoptNode(externalNode)  //将某个节点，从其原来所在的文档移除，插入当前文档，并返回插入后的新节点。
document.importNode(externalNode, deep)   //从外部文档拷贝指定节点，插入当前文档。
```

## Element节点

### Element节点的属性

#### 特性属性

```javascript
Element.attributes  //返回当前元素节点的所有属性节点
Element.id  //返回指定元素的id属性，可读写
Element.tagName  //返回指定元素的大写标签名
Element.innerHTML   //返回该元素包含的HTML代码，可读写
Element.outerHTML  //返回指定元素节点的所有HTML代码，包括它自身和包含的的所有子元素，可读写
Element.className  //返回当前元素的class属性，可读写
Element.classList  //返回当前元素节点的所有class集合
Element.dataset   //返回元素节点中所有的data-*属性。
```

#### 尺寸属性

```javascript
Element.clientHeight   //返回元素节点可见部分的高度
Element.clientWidth   //返回元素节点可见部分的宽度
Element.clientLeft   //返回元素节点左边框的宽度
Element.clientTop   //返回元素节点顶部边框的宽度
Element.scrollHeight  //返回元素节点的总高度
Element.scrollWidth  //返回元素节点的总宽度
Element.scrollLeft   //返回元素节点的水平滚动条向右滚动的像素数值,通过设置这个属性可以改变元素的滚动位置
Element.scrollTop   //返回元素节点的垂直滚动向下滚动的像素数值
Element.offsetHeight   //返回元素的垂直高度(包含border,padding)
Element.offsetWidth    //返回元素的水平宽度(包含border,padding)
Element.offsetLeft    //返回当前元素左上角相对于Element.offsetParent节点的垂直偏移
Element.offsetTop   //返回水平位移
Element.style  //返回元素节点的行内样式
```

#### 节点相关属性

```javascript
Element.children   //包括当前元素节点的所有子元素
Element.childElementCount   //返回当前元素节点包含的子HTML元素节点的个数
Element.firstElementChild  //返回当前节点的第一个Element子节点  
Element.lastElementChild   //返回当前节点的最后一个Element子节点  
Element.nextElementSibling  //返回当前元素节点的下一个兄弟HTML元素节点
Element.previousElementSibling  //返回当前元素节点的前一个兄弟HTML节点
Element.offsetParent   //返回当前元素节点的最靠近的、并且CSS的position属性不等于static的父元素。
```

### Element节点的方法

#### 位置方法

```javascript
getBoundingClientRect()  
// getBoundingClientRect返回一个对象，包含top,left,right,bottom,width,height // width、height 元素自身宽高
// top 元素上外边界距窗口最上面的距离
// right 元素右外边界距窗口最上面的距离
// bottom 元素下外边界距窗口最上面的距离
// left 元素左外边界距窗口最上面的距离
// width 元素自身宽(包含border,padding) 
// height 元素自身高(包含border,padding) 

getClientRects()   //返回当前元素在页面上形参的所有矩形。

// 元素在页面上的偏移量  
var rect = el.getBoundingClientRect()  
return {   
  top: rect.top + document.body.scrollTop,   
  left: rect.left + document.body.scrollLeft  
}
```

#### 属性方法

```javascript
Element.getAttribute()：读取指定属性  
Element.setAttribute()：设置指定属性  
Element.hasAttribute()：返回一个布尔值，表示当前元素节点是否有指定的属性  
Element.removeAttribute()：移除指定属性
```

#### 查找方法

```javascript
Element.querySelector()  
Element.querySelectorAll()  
Element.getElementsByTagName()  
Element.getElementsByClassName()
```

#### 事件方法

```javascript
Element.addEventListener()：添加事件的回调函数  
Element.removeEventListener()：移除事件监听函数  
Element.dispatchEvent()：触发事件

//ie8
Element.attachEvent(oneventName,listener)
Element.detachEvent(oneventName,listener)

// event对象  
var event = window.event||event;    

// 事件的目标节点  
var target = event.target || event.srcElement;

// 事件代理  
ul.addEventListener('click', function(event) {   
  if (event.target.tagName.toLowerCase() === 'li') {   
    console.log(event.target.innerHTML)   
  }  
});
```

#### 其他

```javascript
Element.scrollIntoView()   //滚动当前元素，进入浏览器的可见区域

//解析HTML字符串，然后将生成的节点插入DOM树的指定位置。
Element.insertAdjacentHTML(where, htmlString); 
Element.insertAdjacentHTML('beforeBegin', htmlString); // 在该元素前插入  
Element.insertAdjacentHTML('afterBegin', htmlString); // 在该元素第一个子元素前插入 
Element.insertAdjacentHTML('beforeEnd', htmlString); // 在该元素最后一个子元素后面插入 
Element.insertAdjacentHTML('afterEnd', htmlString); // 在该元素后插入

Element.remove()  //用于将当前元素节点从DOM中移除
Element.focus()   //用于将当前页面的焦点，转移到指定元素上
```

👉[GitHub](https://github.com/microzz)

