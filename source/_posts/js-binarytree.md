---
title: JavaScript实现二叉树算法
date: 2017-08-22 22:03:04
tags:
 - JavaScript
 - JS
 - 二叉树
 - 数据结构与算法
---

# JavaScript实现二叉树算法

## 什么是二叉树
> &nbsp;&nbsp;&nbsp;在计算机科学中，二叉树（英语：Binary tree）是每个节点最多只有两个分支(不存在分支度大于2的节点)的树结构。通常分支被称作“左子树”和“右子树”。二叉树的分支具有左右次序，不能颠倒。

以上是维基百科对**二叉树**的简单介绍，我们可以用图片形象表示：
![二叉树结构](https://icdn.microzz.com/20170822_binarytree/binarytree.png)

## JS来实现二叉树
下面我们通过**JavaScript**来模拟二叉树的数据结构

```javascript
/**
 * JavaScript实现二叉树算法
 */
function BinaryTree() {
  // 二叉树根节点
  this.root = null;

  // 生成二叉树节点
  const Node = function(key) {
    this.key = key;
    this.left = null;
    this.right = null;
  }

  // 插入节点
  const insertNode = function(node, newNode) {
    if (newNode.key < node.key) {
      if (node.left === null) {
        node.left = newNode;
      } else {
        insertNode(node.left, newNode);
      }
    } else {
      if (node.right === null) {
        node.right = newNode;
      } else {
        insertNode(node.right, newNode);
      }
    }
  }

  // 实例调用的插入节点方法
  this.insert = function(key) {
    let newNode = new Node(key);
    if (this.root === null) {
      this.root = newNode;
    } else {
      insertNode(this.root, newNode);
    }
  }
  
}

// 模拟数据
const data = [8, 3, 10, 1, 6, 14, 4, 7, 13];

// 实例化二叉树的数据结构
const binaryTree = new BinaryTree();

// 遍历数据并插入
data.forEach(item => binaryTree.insert(item));

// 打印结果
console.log(binaryTree.root);
```

## 结果
![binaryTree.root](https://icdn.microzz.com/20170822_binarytree/result.png)

也即对应图像：
![二叉树结构](https://icdn.microzz.com/20170822_binarytree/binarytree.png)


以上就是用**JavaScript**对**二叉树**的**简单**描述。

