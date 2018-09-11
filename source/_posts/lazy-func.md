---
title: JS惰性函数实现Ajax封装
date: 2017-02-23 14:55:16
tags:
 - JS
 - JavaScript
 - Ajax
 - Function
 - 性能优化
---

# JS惰性函数实现Ajax封装
## JavaScript惰性函数
> &nbsp;&nbsp;&nbsp;惰性函数，即只在第一次执行，第一次执行后再调用得到的结果都是一样的。这对于前端性能优化有一定的帮助，有助于开发健壮的项目。

## Ajax
> &nbsp;&nbsp;&nbsp;AJAX即“Asynchronous Javascript And XML”（异步JavaScript和XML），是指一种创建交互式网页应用的网页开发技术。
AJAX = 异步 JavaScript和XML。
通过在后台与服务器进行少量数据交换，AJAX 可以使网页实现异步更新。这意味着可以在不重新加载整个网页的情况下，对网页的某部分进行更新。

## 惰性函数实现Ajax封装

```javascript
/**
 * 惰性函数
 */
function createXHR() {
  var xhr = null;
  if ( typeof XMLHttpRequest !== 'undefined') {
    xhr = new XMLHttpRequest();
    createXHR = function () {
      return new XMLHttpRequest();
    };
  } else {
    try {
      xhr = new ActiveXObject("Msxml2.XMLHTTP");
      createXHR = function () {
        return new ActiveXObject("Msxml2.XMLHTTP");
      };
    } catch (e) {
      try {
        xhr = new ActiveXObject('Microsoft.XMLHTTP');
        createXHR = function () {
          return ActiveXObject('Microsoft.XMLHTTP');
        };
      } catch (e) {
        createXHR = function () {
          return null;
        }
      }
    }
  }
  return xhr;
}
```


