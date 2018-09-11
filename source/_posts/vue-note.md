---
title: Vue.js2.0学习笔记
date: 2017-03-20 22:30:39
tags:
  - Vue.js
  - Vuex
  - JS
  - JavaScript
---

# Vue.js2.0学习笔记

## 父子组件如何通信
1.父子组件如何通信？
### 事件
  
* 父组件监听一个事件，子组件触发该事件，并且可以传递自身数据。比如

```js

// 父组件引入子组件
<child v-on:tellFather="fatherFunc"></child>

// 父组件 data 里面有 info
data() {
    return {
      info: ''
    }

// 父组件 methods 有 fatherFunc 方法
methods: {
    fatherFunc(msg) {
      this.info = msg
    }
  }

// 子组件 通过 childFunc 触发父组件监听的事件
<button v-on:click="childFunc">Button</button>

// 子组件 data 里面有 msg 信息要传给父组件
data() {
    return {
      msg: 'This is the message from child'
    }
  },
  
  // 子组件的 childFunc 方法
  methods: {
    childFunc() {
        
      // 关键！！！ 
      // 子组件触发父组件的 tellFather 事件，
      // 并可以传递自身 data 里面的数据给父组件
      this.$emit('tellFather', this.msg)
    }
  }
```

### 使用Vuex
* 使用 Vuex 让不同组件间共享状态(state)

## this.$parent.message
2.子组件中使用`this.$parent.message`可以获取父亲data里面的message
## this.$refs
3.`this.$refs.img`可以获取ref属性为img的DOM元素
## $event
4.有时也需要在内联语句处理器中访问原生 DOM 事件。可以用特殊变量 `$event` 把它传入方法：

```javascript
<button v-on:click="warn('Form cannot be submitted yet.', $event)">Submit</button>
// ...
methods: {
  warn: function (message, event) {
    // 现在我们可以访问原生事件对象
    if (event) event.preventDefault()
    alert(message)
  }
}
```
## 修饰符
5.在事件处理程序中调用 `event.preventDefault()` 或 `event.stopPropagation()` 是非常常见的需求。尽管我们可以在 methods 中轻松实现这点，但更好的方式是：methods 只有纯粹的数据逻辑，而不是去处理 DOM 事件细节。
为了解决这个问题， Vue.js 为` v-on` 提供了 事件修饰符。通过由点(.)表示的指令后缀来调用修饰符。
`.stop`
`.prevent`
`.capture`
`.self`
`.once`

```js
<!-- 阻止单击事件冒泡 -->
<a v-on:click.stop="doThis"></a>
<!-- 提交事件不再重载页面 -->
<form v-on:submit.prevent="onSubmit"></form>
<!-- 修饰符可以串联  -->
<a v-on:click.stop.prevent="doThat"></a>
<!-- 只有修饰符 -->
<form v-on:submit.prevent></form>
<!-- 添加事件侦听器时使用事件捕获模式 -->
<div v-on:click.capture="doThis">...</div>
<!-- 只当事件在该元素本身（而不是子元素）触发时触发回调 -->
<div v-on:click.self="doThat">...</div>
```
## name
6.一开始好多人会忽视 `name` 的属性，为什么要给组件写上 `name` 呢？

* 允许组件模板递归地调用自身。注意，组件在全局用 `Vue.component()` 注册时，全局 ID 自动作为组件的 name。

* 指定 `name` 选项的另一个好处是便于调试。有名字的组件有更友好的警告信息。另外，当在有 vue-devtools, 未命名组件将显示成 `<AnonymousComponent>`, 这很没有语义。通过提供 `name` 选项，可以获得更有语义信息的组件树。

## Vuex action
7.**Vuex**中 Mutations 必须是*同步*的，Action 提交的是 mutation，而不是直接变更状态。Action 可以包含任意*异步*操作。

***未完待续...***



