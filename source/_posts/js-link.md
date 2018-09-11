---
title: 用JS实现链表的数据结构
date: 2017-08-01 19:04:29
tags:
  - JS
  - JavaScript
  - 链表
  - 数据结构与算法
---

# 用JavaScript实现链表的数据结构

> &nbsp;&nbsp;&nbsp;&nbsp;链表（Linked list）是一种常见的基础数据结构，是一种线性表，但是并不会按线性的顺序存储数据，而是在每一个节点里存到下一个节点的指针(Pointer)      &nbsp;&nbsp;--- 维基百科

上面是维基百科对**链表**的解读。下面我们用**JavaScript**代码对链表的数据结构进行实现

## 实现Node类表示节点

```javascript
/**
 * Node 类用来表示节点
 * element 用来保存节点上的数据
 * next 用来保存指向下一个节点的链接
 */
function Node(element) {
  this.element = element;
  this.next = null;
}
```

## LList类提供对链表操作的方法

```javascript
/**
 * LList 类提供了对链表进行操作的方法
 * 链表只有一个属性，
 * 使用一个 Node 对象来保存该链表的头节点。
 */
class LList {
  constructor() {
    this.head = new Node('head');
  }

  // 查找节点
  find(item) {
    let currNode = this.head;

    while(currNode.element !== item) {
      currNode = currNode.next;
    }

    return currNode;
  }

  // 查找前一个节点
  findPre(item) {
    if(item === 'head') throw new Error('now is head!');

    let currNode = this.head;
    while (currNode.next && currNode.next.element !== item) {
      currNode = currNode.next;
    }

    return currNode;
  }

  // 插入新节点
  insert(newElement, item) {
    let newNode = new Node(newElement);
    let currNode = this.find(item);
    newNode.next = currNode.next;
    currNode.next = newNode;
  }

  // 删除一个节点
  remove(item) {
    let preNode = this.findPre(item);
    if(preNode.next !== null) {
      preNode.next = preNode.next.next;
    }
  }

  // 显示链表中的元素
  display() {
    let currNode = this.head;

    while(currNode.next !== null) {
      console.log(currNode.next.element);
      currNode = currNode.next;
    }
  }
}
```

## 测试代码

```javascript
const list = new LList(); 
// LList { head: Node { element: 'head', next: null } }

list.insert('0', 'head');
list.insert('1', '0');
list.insert('2', '1');
list.insert('3', '2');
list.remove('1');
console.log(list); 
// LList { head: Node { element: 'head', next: Node { element: '0', next: [Object] } } }

console.log(list.display()); // 0 2 3

console.log(list.findPre('1')); 
// Node { element: '0', next: Node { element: '1', next: Node { element: '2', next: [Object] } } }
```

上面就是用JavaScript对简单链表的数据结构的简单实现😄



