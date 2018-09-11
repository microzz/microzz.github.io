---
title: JavaScript通过原型设计一个事件对象
date: 2017-01-21 22:13:02
tags:
  - JavaScript
  - JS
  - 事件
  - event
  - 原型
---
# JavaScript通过原型设计一个事件对象
### 实现以下功能：
> 1. 添加监听者
> 2. 移除监听者
> 3. 清空监听者
> 4. 发起事件信号

### 设计思路如下：

>   定义一个对象，包含一个实例成员listeners，用于记录所有的监听者
> 为对象的原型增加，新增、删除、清空和执行四个成员
> 具体代码可以参见下面示例

### 代码实现

```javascript
function myEvent(){
	this.listeners = [];	//监听者列表
}
//添加一个监听者
myEvent.prototype.addListener = function(fn){
	this.listeners.push(fn);
};
//除移一个监听者
myEvent.prototype.removeListener = function(fn){
	var index = this.listeners.indexOf(fn);
    this.listeners.splice(index,1);
};
//清除所有监听者
myEvent.prototype.clearListeners = function(){
	this.listeners = [];
};
//发出执行信号，并告之所有监听者
myEvent.prototype.raise = function(e){
	var l = this.listeners.length;
    for(var i = 0; i < l; i++){
    	this.listeners[i](e);	//执行所有监听方法
    }
};

var me = new myEvent();

//事件fun1
function fun1(e) {
	console.log('fun1: ' + e);
}

//事件fun2
function fun2(e) {
	console.log('fun2: ' + e);
}

//调用相关方法进行测试
me.addListener(fun1);
me.addListener(fun2);
me.removeListener(fun1)
//me.clearListeners();
me.raise("a");
```
