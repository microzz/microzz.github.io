---
title: JS中的函数节流和函数防抖
date: 2017-05-18 22:35:44
tags:
  - throttle
  - debounce
  - 函数节流
  - 函数防抖
---

# JavaScript中的函数节流和函数防抖

## **函数节流**
指让函数有规律的进行调用，应用场景：window.resize，游戏中子弹发射(1s只能发射一颗子弹)等；

## **函数防抖**
让函数在"调用''之后的一段时间后生效，应用场景:输入框(例：在用户停止输入的500ms后再处理用户数据)。

```javascript
//函数节流
/*
* @params {Function} fun 调用函数
* @params {delay} number 延迟时间
*/
const throttle = (fun, delay, ...rest) => {
    let last = null;
    return () => {
        const now = + new Date();
        if (now - last > delay) {
            fun(rest);
            last = now;
        }
    }
}
//实例
const throttleExample  = throttle(() => console.log(1), 1000);
//调用
throttleExample();
throttleExample();
throttleExample();
//函数防抖
const debouce = (fun, delay, ...rest) => {
    let timer = null;
    return () => {
        clearTimeout(timer);
        timer = setTimeout(() => {
            fun(rest);
        }, delay);
    }
}
//实例
const debouceExample = debouce(() => console.log(1), 1000);
//调用
debouceExample();
debouceExample();
debouceExample();
```

## About
GitHub: 👉https://github.com/microzz

