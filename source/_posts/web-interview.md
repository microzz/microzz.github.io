---
title: 前端面试题(部分)
date: 2017-02-08 22:52:44
tags:
  - Web
  - 面试题
---

### 原型：
>我们创建的每一个函数，都可以有一个prototype属性，该属性指向一个对象。这个对象，就是原型。

当我们在创建对象时，可以根据自己的需求，选择性的将一些属性和方法通过prototype属性，挂载在原型对象上。而每一个new出来的实例，都有一个__proto__属性，该属性指向构造函数的原型对象，通过这个属性，让实例对象也能够访问原型对象上的方法。因此，当所有的实例都能够通过__proto__访问到原型对象时，原型对象的方法与属性就变成了共有方法与属性。

```javascript
// 声明构造函数
function Person(name, age) {
    this.name = name;
    this.age = age;
}

// 通过prototye属性，将方法挂载到原型对象上
Person.prototype.getName = function() {
    return this.name;
}

var p1 = new Person('tim', 10);
var p2 = new Person('jak', 22);
console.log(p1.getName === p2.getName); // true
```

通过图示我们可以看出，构造函数的prototype与所有实例对象的__proto__都指向原型对象。而原型对象的constructor指向构造函数。

### 原型链：

>我们知道所有的函数都有一个叫做toString的方法。那么这个方法到底是在哪里的呢？

先随意声明一个函数：
```javascript
function foo() {}
```
其中foo是Function对象的实例。而Function的原型对象同时又是Object的实例。这样就构成了一条原型链。原型链的访问，其实跟作用域链有很大的相似之处，他们都是一次单向的查找过程。因此实例对象能够通过原型链，访问到处于原型链上对象的所有属性与方法。这也是foo最终能够访问到处于Object原型对象上的toString方法的原因。

### 闭包：
>闭包 是指有权访问另一个函数作用域中的变量的函数，创建闭包的最常见的方式就是在一个函数内创建另一个函数，通过另一个函数访问这个函数的局部变量
> 另一种理解：当函数可以记住并访问所在的词法作用域时，就产生了闭包，这个函数持有对该词法作用域的引用，这个引用就叫做闭包

>闭包本质还是函数，只不过这个函数绑定了上下文环境（函数内部引用的所有变量）

JavaScript的作用域就是词法作用域而不是动态作用域,
词法作用域最重要的特征是它的定义过程发生在代码的书写阶段
动态作用域的作用域链是基于调用栈的 词法作用域的作用域链是基于代码中的作用域嵌套

>闭包的缺点就是常驻内存，会增大内存使用量，使用不当很容易造成内存泄露。

>闭包可以用来管理私有变量和私有方法，将对变量（状态）的变化封装在安全的环境中，使得这些变量不能被外部随意修改，同时又可以通过指定的函数接口来操作。 

**闭包有三个特性：**
1.函数嵌套函数
2.函数内部可以引用外部的参数和变量
3.参数和变量不会被垃圾回收机制回收

**经典栗子：**
在一个 ul li 列表，我想点击某个 li 然后返回对应的索引。
通常的做法是 写一个 for 循环 然后给每个 li 绑定点击事件，这样就形成了一个闭包。
```html
<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="UTF-8">
	<title>闭包</title>
	<script>
	window.onload = function(){
		var aLi = document.getElementsByTagName('li');
		for (var i=0;i<aLi.length;i++){
			aLi[i].onclick = function(){  //当点击时for循环已经结束
				alert(i);
			};
		}
	}
	</script>
</head>
<body>
	<ul>
		<li>0</li>
		<li>1</li>
		<li>2</li>
		<li>3</li>
	</ul>
</body>
</html>
```
我的理解是这样的：当我们给每个 li 绑定点击事件的时候，因为是事件监听，也可以说是事件驱动模式，处理事件监听的逻辑是异步执行的，当我们点击一个 li 的时候，for 循环已经结束，此时的下标索引为 li 的 length大小，所以点击任何一个 li 查找索引的时候都是查找到全局作用域，都是返回 length 大小。

解决办法：
给每个 li 绑定点击事件的时候创建一个块级作用域，这样，当处理事件监听的逻辑的时候向上查找就不会查找到全局作用域。
> 1、定义一个立即执行函数
```javascript
var aLi = document.getElementsByTagName('li');
for (var i=0;i<aLi.length;i++){
	(function(i){
		aLi[i].onclick = function(){
			alert(i);
		};
	})(i);
}
```

> 2、用es6中的let替换var
```javascript
var aLi = document.getElementsByTagName('li');
for (let i=0;i<aLi.length;i++){
	aLi[i].onclick = function(){
		alert(i);
	};
}
```

### 对象：
> JS中的对象，可以看作是一组数据和功能的集合，带有各种属性和方法的一种数据类型。

JS中对象分为两种：
1、JS的内建对象，如：String，Date，Array等等(Function、Math、Number)

2、我们自己创建的对象：
	1）对象字面量
	2）构造函数

调用构造函数 new 4个步骤：
1、创建一个新对象
2、将构造函数的作用域赋给新对象（因此this就指向了这个新对象）
3、执行构造函数中的代码（为这个新对象添加属性）
4、返回新对象


### 继承
> js中的继承主要依靠原型链来实现的，通过原型链的方式实现了父类子类之间共享属性的继承以及身份确认机制。

> * 构造函数方式实现继承
> 在子类的构造函数内部通过 父类名.call 或 apply 来调用父类的构造函数(apply的第二个参数是一个参数数组，call的参数要全部列举出来，bind不会立即调用，其他两个会立即调用
)
> 方法都在构造函数中定义，因此函数无法复用。

> * 组合继承
> 使用原型链实现对原型属性和方法的继承，通过构造函数实现对实例属性的继承
> Sub.prototype = new Sup()
> 子类原型覆盖掉了父类原型的某些属性（父类原型中的依然还在）

> * 寄生组合继承
> es5中主流的继承方式
> Sub.prototype=Object.create(Sup.prototype)
> Sub.prototype.constructor=Sub
> Object.create(obj)方法，该方法会对传入的obj对象进行浅拷贝。和上面组合继承的主要区别就是：将父类的**原型**复制给了子类原型。构造函数中继承父类属性／方法，并初始化父类。子类原型和父类原型建立联系。

> es6的继承方式
> es6引入了class、extends、super、static(部分为ES2016标准)

```javascript
class A {
}

class B extends A {
}

B.__proto__ === A // true
B.prototype.__proto__ === A.prototype // true
```


### 算法：
#### 数组去重：建一个空对象和空数组，循环遍历需要去重的数组，判断对象有没有此属性，没有的话就给对象添加此属性，并向空数组中push这个值。
```javascript
//es5
function unique(arr){
	var obj = {}
	var result = []
	for(var i in arr){
		if(!obj[arr[i]]){
			obj[arr[i]] = true;
			result.push(arr[i]);
		}
	}
	return result;
}

//es6
[...new Set(arr)]
```

#### 冒泡排序：相邻两个对比，最后把最大的排到了最后，重复此过程。
```javascript
function bubbleSort(arr) {
    var len = arr.length;
    for (var i = 0; i < len; i++) {
        for (var j = 0; j < len - 1 - i; j++) {
            if (arr[j] > arr[j+1]) {        //相邻元素两两对比
                var temp = arr[j+1];        //元素交换
                arr[j+1] = arr[j];
                arr[j] = temp;
            }
        }
    }
    return arr;
}
```

#### 选择排序：寻找最小的数，保存索引，然后与第一层循环其下标对于的值进行交换
```javascript
function selectionSort(arr) {
    var len = arr.length;
    var minIndex, temp;
    for (var i = 0; i < len - 1; i++) {
        minIndex = i;
        for (var j = i + 1; j < len; j++) {
            if (arr[j] < arr[minIndex]) {     //寻找最小的数
                minIndex = j;                 //将最小数的索引保存
            }
        }
        temp = arr[i];
        arr[i] = arr[minIndex];
        arr[minIndex] = temp;
    }
    return arr;
}
```
#### 快速排序：选取一个记录作为中间轴，然后将比‘这个记录值’小的移到‘记录值’之前，大的移到之后，然后递归
```javascript
function quickSort(arr) {
	if(arr.length == 0) {
		return [];    // 返回空数组
	}
	var cIndex = Math.floor(arr.length / 2);
	var c = arr.splice(cIndex, 1);
	var l = [];
	var r = [];
	for (var i = 0; i < arr.length; i++) {
		if(arr[i] < c) {
			l.push(arr[i]);
		} else {
			r.push(arr[i]);
		}
	}
	return quickSort(l).concat(c, quickSort(r));
}
```
### 性能优化
> * 网页内容
>	* 减少 http请求次数
>	* 减少 DNS查询次数
>	* 避免页面跳转
>	* 缓存 Ajax
>	* 延迟加载
>	* 提前加载
>	* 减少 DOM元素数量
>	* 避免 404
> * 服务器
>	* 使用CDN(内容分发网络)
>	* 添加Expires或Cache-Control报文头
>	* Gzip压缩传输文件
> * CSS
>	* 将样式表置顶
>	* 用<link>代替@import
> * JavaScript
>	* 把脚本置于页面底部
>	* 使用外部JavaScript和CSS
>	* 精简JavaScript和CSS
>	* 去除重复脚本
>	* 减少DOM访问
> * 图片
>	* 优化图像
>	* 优化CSS Spirite
>	* 不要在HTML中缩放图片
>	* favicon.ico要小而且可缓存

### 问面试官
> * 目前关注哪些最新的Web前端技术（未来的发展方向）？
> * 团队如何工作的（实现一个产品的流程）？
> * 公司的薪资结构是什么样子的？（摸清自己具体在什么层次）
> * 公司的晋升机制具体是怎么样的？（看出你的上进心的稳定性）

### Event Loop、消息队列、事件轮询
异步函数在执行结束后，会在事件队列中添加一个事件（回调函数）(遵循先进先出原则)，主线程中的代码执行完毕后（即一次循环结束），下一次循环开始就在事件队列中“读取”事件，然后调用它所对应的回调函数。这个过程是循环不断的，所以整个的这种运行机制又称为Event Loop（事件循环）

主线程运行的时候，产生堆（heap）和栈（stack），栈中的代码（同步任务）调用各种外部API，它们在"任务队列"中加入各种事件（click，load，done）。只要栈中的代码执行完毕，主线程就会去读取"任务队列"，依次执行那些事件所对应的回调函数。

执行栈中的代码（同步任务），总是在读取"任务队列"（异步任务）之前执行。

### token、session
> token就是令牌,比如你授权(登录)一个程序时,他就是个依据,判断你是否已经授权该软件;cookie就是写在客户端的一个txt文件,里面包括你登录信息之类的

基于Token的身份验证的过程如下:

1.用户通过用户名和密码发送请求。

2.服务端验证。

3.服务端返回一个签名的token 给客户端。

4.客户端储存token,并且每次用于发送请求。

5.服务端验证token并返回数据。

 每一次请求都需要token。

> session是指一类用来在客户端与服务器之间保持状态的解决方案,也可以用来保存少量数据，但会随着会话结束而销毁。

### 缓存
> Expires、Cache-Control、Last-Modified、 ETag

> 浏览器缓存（Browser Caching）是浏览器端保存数据用于快速读取或避免重复资源请求的优化机制，有效的缓存使用可以避免重复的网络请求和浏览器快速地读取本地数据，

* http缓存
> http缓存是基于HTTP协议的浏览器文件级缓存机制。即针对文件的重复请求情况下，浏览器可以根据协议头判断从服务器端请求文件还是从本地读取文件
> 判断expires，如果未过期，直接读取http缓存文件

* indexDB
> 是一个在客户端存储可观数量的结构化数据,并且为这些数据添加索引进行高性能检索。

* cookie
> 指一般网站为了辨别用户身份、储存在用户本地终端上的数据（通常经过加密）。cookie一般通过http请求中在头部一起发送到服务器端。一条cookie记录主要由键、值、域、过期时间、大小组成，一般用户保存用户的认证信息。

* localstorage
> localStorage是h5的一种新的本地缓存方案,加快下次页面打开时的渲染速度,除非主动删除数据，否则数据是永远不会过期的。

* sessionstorage
> 也是h5的一种本地缓存方案，数据的存储仅特定于某个会话中，也就是说数据只保持到浏览器关闭，当浏览器关闭后重新打开这个页面时， 之前的存储已经被清除。

