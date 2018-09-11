---
title: 原生JS中CSS相关API合集
date: 2017-04-14 22:42:43
tags:
  - CSS
  - JS
  - JavaScript
  - API
---

# 原生JS中CSS相关API合集-CSS操作篇


## 类名操作

```javascript
//ie8以下
Element.className  //获取元素节点的类名
Element.className += ' ' + newClassName  //新增一个类名

//判断是否有某个类名
function hasClass(element,className){
  return new RegExp(className,'gi').test(element.className);
}

//移除class
function removeClass(element,className){
  element.className = element.className.replace(new RegExp('(^|\\b)' + className.split(' ').join('|') + '(\\b|$)', 'gi'),'');
}

//ie10 
element.classList.add(className)  //新增
element.classList.remove(className)  //删除
element.classList.contains(className)  //是否包含
element.classList.toggle(className)  //toggle class
```

## style操作

```javascript
element.setAttribute('style','')

element.style.backgroundColor = 'red'

element.style.cssText //用来读写或删除整个style属性

element.style.setProperty(propertyName,value)  //设置css属性
element.style.getPropertyValue(property)  //获取css属性
element.style.removeProperty(property)  //删除css属性
操作非内联样式
//ie8
element.currentStyle[attrName]
//ie9+
window.getComputedStyle(el,null)[attrName] 
window.getComputedStyle(el,null).getPropertyValue(attrName)
//伪类
window.getComputedStyle(el,':after')[attrName]
```

## 附录
👉 [原生JS中DOM节点相关API合集](https://microzz.com/2017/04/06/jsdom/)

## About

个人网站：👉 https://microzz.com/ 

GitHub：👉 https://github.com/microzz


