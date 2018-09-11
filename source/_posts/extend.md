---
title: JavaScript实现继承的几种方法
date: 2017-03-06 21:44:25
tags:
  - JavaScript
  - JS
  - ES6
  - 原型链
---

# JavaScript中实现继承的几种方法

## ES5中的实现
### 概述
JavaScript(ES5)中没有像Java那样类的概念，写法跟传统的面向对象语言（比如C++和Java）差异很大，很容易让新学习这门语言的程序员感到困惑。但是我们可以通过原型链prototype来模拟类，去实现继承的相关功能。下面来看看ES5中实现继承常见的三种方法。代码如下：

### 代码

```javascript
/**
 * JavaScript(ES5)中实现继承的几种方法
 */

// 定义基类Person
function Person(name, age) {
  this.name = name;
  this.age = age;
}

// 共享数据
Person.prototype.LEGS_NUM = 2;

// 共享方法
Person.prototype.info = function () {
  console.log('My name is ' + this.name + ' .I\'m ' + this.age + ' years old now');
};

Person.prototype.walk = function () {
  console.log(this.name + ' is walking...');
};

// Student子类
function Student(name, age, className) {
  // 调用父类
  Person.call(this, name, age);
  this.className = className;
}

// 1⃣️ 方法一：Person.prototype直接赋值给Student.prototype
// Student.prototype = Person.prototype;

// 2⃣️ 方法二：Student.prototype为Person的实例
// Student.prototype = new Person();

// 3⃣️ 方法三：创建一个空对象，对象的原型指向Person.prototype，赋值给Student.prototype
Student.prototype = Object.create(Person.prototype);

Student.prototype.constructor = Student;

// 覆盖父类的info方法
Student.prototype.info = function () {
  console.log('My name is ' + this.name + ',I\'m ' + this.age + ' years old now, and from class ' + this.className + '.');
};

// Student类的共享方法
Student.prototype.learn = function (subject) {
  console.log(this.name + ' is learning ' + subject + '.');
};

// 测试,创建一个Student的实例
var microzz = new Student('Microzz', 22, 5);
microzz.info(); // My name is Microzz,I'm 22 years old now, and from class 5.
console.log(microzz.LEGS_NUM); // 2
microzz.walk(); // Microzz is walking...
microzz.learn('JavaScript'); // Microzz is learning JavaScript.
console.log(microzz.__proto__.__proto__ === Person.prototype); // true
console.log(microzz.__proto__ === Student.prototype); // true
console.log(microzz.__proto__.constructor === Student); // true
```
### 三种方法比较
上面代码中有三种方法实现继承，现在我们可以来分析一下这几种方法。
1⃣️这种方法中，Person.prototype直接赋值给Student.prototype，但是有一个很严重的问题，如果子类prototype添加新的东西的话也会改写父类。所以这种方法不推荐。
2⃣️第二种方法Student.prototype为Person的实例，这也是可以实现的。但是Person构造函数有参数应该传什么呢？传任何一个都是很奇怪的。所以也不推荐。
3⃣️第三种方法是比较理想的，创建一个空对象，对象的原型指向Person.prototype，赋值给Student.prototype。但是Object.create也有一点小瑕疵，因为它是ES5之后才支持的，不过我们可以通过模拟实现Object.create方法。代码如下：

```javascript
if (!Object.create) {
  Object.prototype.create = function (proto) {
    function F() {}
    F.prototype = proto;
    return new F;
  }
}
```
这样在ES5中就完美实现了继承😄


## ES6中的实现
### 概述
ES6提供了更接近传统语言"类"的写法，引入了Class（类）这个概念，作为对象的模板。通过class关键字，可以定义类。基本上，ES6的class可以看作只是一个语法糖，它的绝大部分功能，ES5都可以做到，新的class写法只是让对象原型的写法更加清晰、更像面向对象编程的语法而已。下面我们用ES6的语法实现类的继承。
### 代码

```javascript
// 基类 Person
class Person {
  // 父类的构造方法
  constructor(name, age) {
    this.name = name;
    this.age = age;
    // 共享变量
    this.LEGS_NUM = 2;
  }
  // 父类的info方法
  info() {
    console.log(`My name is ${this.name}, I\'m ${this.age} years old now.`);
  }

  // 父类的walk方法
  walk() {
    console.log(this.name + ' is walking...');
  }

}

// 子类 Student
class Student extends Person {
  constructor(name, age, className) {
    // 调用基类的构造方法
    super(name, age);
    this.className = className;
  }

  // 覆盖父类的info方法
  info() {
    console.log(`My name is ${this.name}, I\'m ${this.age} years old, and from class ${this.className}.`);
  }
}

// 实例化一个Student的实例
let stu = new Student('Zhaohui', 22, 5);
stu.info(); // My name is Zhaohui, I'm 22 years old, and from class 5.
stu.walk(); // Zhaohui is walking...
console.log(stu.LEGS_NUM); // 2
console.log(stu instanceof Student); // true
console.log(stu instanceof Person); // true
```
这样我们就通过ES6中的class实现了“类”的继承了😄



