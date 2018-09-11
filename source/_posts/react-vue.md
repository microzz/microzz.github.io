---
title: React和Vue对比
date: 2017-03-22 23:23:29
tags:
  - ReactJS
  - Vue.js
---

# React.js和Vue.js对比

## 相同点

1. 数据驱动视图，提供响应式的视图组件
2. 都有Virtual DOM，组件化开发，通过props参数进行父子组件数据的传递，都实现webComponents规范
3. 数据流动单向
都支持服务端渲染

4. 都有支持native的方案，React的React native，Vue的weex

## 不同点

1. 社区：React社区还是要比vue大很多；

2. 开发模式：React在view层侵入性还是要比Vue大很多的,React严格上只针对MVC的view层，Vue则是MVVM模式的一种实现；

3. 数据绑定：Vue有实现了双向数据绑定，React数据流动是单向的

4. 数据渲染：对于大规模数据渲染，React要比Vue更快，渲染机制启动时候要做的工作比较多；

5. 数据更新方面：Vue 由于采用依赖追踪，默认就是优化状态：你动了多少数据，就触发多少更新，不多也不少。React在复杂的应用里有两个选择:

(1). 手动添加 shouldComponentUpdate 来避免不需要的 vdom re-render。 
(2).Components 尽可能都用 pureRenderMixin，然后采用 redux 结构 + Immutable.js；

6. 开发风格的偏好：React 推荐的做法是 JSX + inline style，也就是把 HTML 和 CSS 全都写进 JavaScript 了，即"all in js"；Vue进阶之后推荐的是使用 webpack + vue-loader 的单文件组件格式，即html,css,js写在同一个文件；

7. 使用场景：React配合Redux架构适合超大规模多人协作的复杂项目;Vue则适合小快灵的项目。对于需要对 DOM 进行很多自定义操作的项目，Vue 的灵活性优于 React；

8. Vue要比React更好上手，具体可能体现在很多人不熟悉React的JSX语法和函数式编程的思想，以及想要发挥出React的最大威力需要学习它一系列生态的缘故；

9. Vue着重提高开发效率,让前端程序员更快速方便的开发应用。React着重于变革开发思想，提升前端程序员编程的深度与创造力,让前端工程师成为真正的程序员而不是UI的构建者

## 关于
GitHub: 👉https://github.com/microzz


