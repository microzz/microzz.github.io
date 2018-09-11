---
title: 原生JS中对象相关API合集
date: 2017-04-20 18:02:48
tags:
  - JavaScript
  - Object
---

# 原生JavaScript中对象相关API合集-对象篇
现在jQuery已经没有那么有优势了，原生JS赶紧学起来😄 
**附**：
👉[原生JS中DOM节点相关API合集-DOM操作篇](https://microzz.com/2017/04/06/jsdom/) 
👉[原生JS中CSS相关API合集-CSS操作篇](https://microzz.com/2017/04/14/jscss/)

## Object对象

### 生成实例对象

```javascript
var o = new Object()
```

### 属性

```javascript
Object.prototype   //返回原型对象
```

### 方法

```javascript
Object.keys(o)   //遍历对象的可枚举属性
Object.getOwnPropertyName(o)   //遍历对象不可枚举的属性
```

### 对象实例的方法

```javascript
valueOf // 返回当前对象对应的值。  
toString // 返回当前对象对应的字符串形式。  
toLocaleString // 返回当前对象对应的本地字符串形式。  
hasOwnProperty // 判断某个属性是否为当前对象自身的属性，还是继承自原型对象的属性。 
isPrototypeOf // 判断当前对象是否为另一个对象的原型。
propertyIsEnumerable // 判断某个属性是否可枚举。
```

## Array对象

### 生成实例对象

```javascript
var a = new Array()
```

### 属性

```javascript
a.length  // 长度
```

### Array.isArray()

```javascript
Array.isArray(a)   // 用来判断一个值是否为数组
```

### Array实例的方法

```javascript
a.valueof()   // 返回数组本身

a.toString()  // 返回数组的字符串形式

a.push(value,vlaue....)   
// 用于在数组的末端添加一个或多个元素，
// 并返回添加新元素后的数组长度。

pop()   // 用于删除数组的最后一个元素，并返回该元素

join()  
// 以参数作为分隔符，将所有数组成员组成一个字符串返回。
// 如果不提供参数，默认用逗号分隔。

concat()  
// 用于多个数组的合并。它将新数组的成员，
// 添加到原数组的尾部，然后返回一个新数组，原数组不变。

shift()  // 用于删除数组的第一个元素，并返回该元素。

unshift(value)  
// 用于在数组的第一个位置添加元素，
// 并返回添加新元素后的数组长度。

reverse()   // 用于颠倒数组中元素的顺序，返回改变后的数组

slice(start_index, upto_index)
// 用于提取原数组的一部分，返回一个新数组，原数组不变。
// 第一个参数为起始位置（从0开始），第二个参数为终止位置
// （但该位置的元素本身不包括在内）。
// 如果省略第二个参数，则一直返回到原数组的最后一个成员。
// 负数表示倒数第几个。

splice(index, count_to_remove, addElement1, addElement2, ...);   
// 用于删除原数组的一部分成员，并可以在被删除的位置添加入新的数组成员，
// 返回值是被删除的元素。第一个参数是删除的起始位置，
// 第二个参数是被删除的元素个数。如果后面还有更多的参数，
// 则表示这些就是要被插入数组的新元素。

sort()   
// 对数组成员进行排序，默认是按照字典顺序排序。
// 排序后，原数组将被改变。如果想让sort方法按照自定义方式排序，
// 可以传入一个函数作为参数，表示按照自定义方法进行排序。
// 该函数本身又接受两个参数，表示进行比较的两个元素。
// 如果返回值大于0，表示第一个元素排在第二个元素后面；
// 其他情况下，都是第一个元素排在第二个元素前面。

map()   
// 对数组的所有成员依次调用一个函数，根据函数结果返回一个新数组。

map(elem,index,arr)   
// map方法接受一个函数作为参数。
// 该函数调用时，map方法会将其传入三个参数，
// 分别是当前成员、当前位置和数组本身。

forEach()   
// 遍历数组的所有成员，执行某种操作,参数是一个函数。
// 它接受三个参数，分别是当前位置的值、当前位置的编号和整个数组。

filter()   
// 参数是一个函数，所有数组成员依次执行该函数，
// 返回结果为true的成员组成一个新数组返回。该方法不会改变原数组。

some()    
// 用来判断数组成员是否符合某种条件。
// 接受一个函数作为参数，所有数组成员依次执行该函数，返回一个布尔值。
// 该函数接受三个参数，依次是当前位置的成员、当前位置的序号和整个数组。
// 只要有一个数组成员的返回值是true，则整个some方法的返回值就是true，否则false。

every()   
// 用来判断数组成员是否符合某种条件。
// 接受一个函数作为参数，所有数组成员依次执行该函数，返回一个布尔值。
// 该函数接受三个参数，依次是当前位置的成员、当前位置的序号和整个数组。
// 所有数组成员的返回值都是true，才返回true，否则false。

reduce()   
// 依次处理数组的每个成员，最终累计为一个值。
// 从左到右处理（从第一个成员到最后一个成员）

reduceRight()  
// 依次处理数组的每个成员，最终累计为一个值。
// 从右到左（从最后一个成员到第一个成员）

indexOf(s)   
// 返回给定元素在数组中第一次出现的位置，如果没有出现则返回-1。
// 可以接受第二个参数，表示搜索的开始位置

lastIndexOf()  
// 返回给定元素在数组中最后一次出现的位置，如果没有出现则返回-1。
```

## Number对象

### 生成对象

```javascript
var n = new Number()
```

### Number对象的属性

```javascript
Number.POSITIVE_INFINITY // 正的无限，指向Infinity。
  
Number.NEGATIVE_INFINITY // 负的无限，指向-Infinity。
  
Number.NaN // 表示非数值，指向NaN。  

Number.MAX_VALUE // 表示最大的正数，相应的，最小的负数为-Number.MAX_VALUE。  

Number.MIN_VALUE 
// 表示最小的正数（即最接近0的正数，在64位浮点数体系中为5e-324），
// 相应的，最接近0的负数为-Number.MIN_VALUE。 
 
Number.MAX_SAFE_INTEGER // 表示能够精确表示的最大整数，即9007199254740991。  

Number.MIN_SAFE_INTEGER // 表示能够精确表示的最小整数，即-9007199254740991。
```

### Number对象实例的方法

```javascript
toString()   
// 用来将一个数值转为字符串形式.可以接受一个参数，表示输出的进制。
// 如果省略这个参数，默认将数值先转为十进制，再输出字符串；
// 否则，就根据参数指定的进制，将一个数字转化成某个进制的字符串。

toFixed()   // 用于将一个数转为指定位数的小数，返回这个小数对应的字符串。

toExponential()  
// 用于将一个数转为科学计数法形式。
//可传入一个参数，参数表示小数点后有效数字的位数，范围为0到20，
// 超出这个范围，会抛出一个RangeError。

toPrecision()  // 用于将一个数转为指定位数的有效数字。
```

## String 对象

### 生成实例对象

```javascript
var s = new String()
```

### String对象的属性

```javascript
s.length   //返回字符串的长度
```

### 方法

```javascript
s.chatAt(index)   // 返回指定位置的字符

s.fromCharCode()    // 该方法的参数是一系列Unicode码点，返回对应的字符串。

s.charCodeAt(index)    // 返回给定位置字符的Unicode码点（十进制表示）

s.concat(s2)  // 用于连接两个字符串

s.slice(start,end)   
// 用于从原字符串取出子字符串并返回，不改变原字符串。
// 第一个参数是子字符串的开始位置，第二个参数是子字符串的结束位置（不含该位置）。
// 如果参数是负值，表示从结尾开始倒数计算的位置，即该负值加上字符串长度。

s.substring(start,end)  
// 用于从原字符串取出子字符串并返回，不改变原字符串.
// 第一个参数表示子字符串的开始位置，第二个位置表示结束位置。

s.substr(start,length)   
// 用于从原字符串取出子字符串并返回，不改变原字符串。
// 第一个参数是子字符串的开始位置，第二个参数是子字符串的长度。
// 如果第一个参数是负数，表示倒数计算的字符位置。
// 如果第二个参数是负数，将被自动转为0，因此会返回空字符串。

s.indexOf(s)   
// 返回给定元素在字符串中第一次出现的位置，如果没有出现则返回-1。
// 可以接受第二个参数，表示搜索的开始位置 

s.lastIndexOf()  
// 返回给定元素在字符串中最后一次出现的位置，如果没有出现则返回-1。

s.trim()  // 用于去除字符串两端的空格，返回一个新字符串

s.toLowerCase()  // 用于将一个字符串全部转为小写,返回一个新字符串，不改变原字符串。

s.toUpperCase()  // 全部转为大写

s.localeCompare(s2)  
// 用于比较两个字符串。它返回一个整数，如果小于0，表示第一个字符串小于第二个字符串；
// 如果等于0，表示两者相等；如果大于0，表示第一个字符串大于第二个字符串。

s.match(regexp)   
// 用于确定原字符串是否匹配某个子字符串，返回一个数组，
// 成员为匹配的第一个字符串。如果没有找到匹配，则返回null。

s.search()  // 返回值为匹配的第一个位置。如果没有找到匹配，则返回-1。

s.replace(oldValue,newValue)  
// 用于替换匹配的子字符串，一般情况下只替换第一个匹配
// （除非使用带有g修饰符的正则表达式）。

s.split()  
// 按照给定规则分割字符串，返回一个由分割出来的子字符串组成的数组。
// 还可传入第二个参数，决定了返回数组的成员数。
```

## Math对象

### 属性

```javascript
Math.E  // 常数e。  
Math.LN2  // 2的自然对数。  
Math.LN10  // 10的自然对数。  
Math.LOG2E  // 以2为底的e的对数。  
Math.LOG10E  // 以10为底的e的对数。  
Math.PI  // 常数Pi。  
Math.SQRT1_2  // 0.5的平方根。  
Math.SQRT2  // 2的平方根。
```

### 数学方法

```javascript
Math.abs()  // 返回参数的绝对值  
Math.ceil()  // 向上取整，接受一个参数，返回大于该参数的最小整数。 
Math.floor()  // 向下取整  
Math.max(n,n1,...)  // 可接受多个参数，返回最大值  
Math.min(n,n1,..)  // 可接受多个参数，返回最小值  
Math.pow(n,e)  // 指数运算, 返回以第一个参数为底数、第二个参数为幂的指数值。 
Math.sqrt()  // 返回参数值的平方根。如果参数是一个负值，则返回NaN。  
Math.log()  // 返回以e为底的自然对数值。
Math.exp()  // 返回e的指数，也就是常数e的参数次方。
Math.round()  // 四舍五入  
Math.random()  //返回0到1之间的一个伪随机数，可能等于0，但是一定小于1。
```

### 三角函数方法

```javascript
Math.sin()  // 返回参数的正弦  
Math.cos()  // 返回参数的余弦  
Math.tan()  // 返回参数的正切  
Math.asin()  // 返回参数的反正弦（弧度值）  
Math.acos()  // 返回参数的反余弦（弧度值）  
Math.atan()  // 返回参数的反正切（弧度值）
```

## JSON对象

### 方法

```javascript
JSON.stringify()   
// 用于将一个值转为字符串。该字符串应该符合JSON格式，并且可以被JSON.parse方法还原。
//（JSON.stringify(obj, selectedProperties)）还可以接受一个数组，
// 作为第二个参数，指定需要转成字符串的属性。
// 还可以接受第三个参数，用于增加返回的JSON字符串的可读性。
// 如果是数字，表示每个属性前面添加的空格（最多不超过10个）；
// 如果是字符串（不超过10个字符），则该字符串会添加在每行前面。

JSON.parse()   //用于将JSON字符串转化成对象。
```

## console对象

### 方法

```javascript
console.log(text,text2,...)   
// 用于在console窗口输出信息。
// 它可以接受多个参数，将它们的结果连接起来输出。
// 如果第一个参数是格式字符串（使用了格式占位符），
// console.log方法将依次用后面的参数替换占位符，然后再进行输出。

console.info()   
// 在console窗口输出信息，
// 同时，会在输出信息的前面，加上一个蓝色图标。

console.debug()  
// 在console窗口输出信息，
// 同时，会在输出信息的前面，加上一个蓝色图标。

console.warn()  // 输出信息时，在最前面加一个黄色三角，表示警告；

console.error()  
// 输出信息时，在最前面加一个红色的叉，
// 表示出错，同时会显示错误发生的堆栈

console.table()  // 可以将复合类型的数据转为表格显示。

console.count()  // 用于计数，输出它被调用了多少次。

console.dir()    
// 用来对一个对象进行检查（inspect），
// 并以易于阅读和打印的格式显示。

console.dirxml()  // 用于以目录树的形式，显示DOM节点。

console.assert()  
// 接受两个参数，第一个参数是表达式，第二个参数是字符串。
// 只有当第一个参数为false，才会输出第二个参数，否则不会有任何结果。

// 这两个方法用于计时，可以算出一个操作所花费的准确时间。
console.time()
console.timeEnd()
// time方法表示计时开始，timeEnd方法表示计时结束。
// 它们的参数是计时器的名称。
// 调用timeEnd方法之后，console窗口会显示“计时器名称: 
// 所耗费的时间”。

console.profile()  
// 用来新建一个性能测试器（profile），
// 它的参数是性能测试器的名字。

console.profileEnd()  // 用来结束正在运行的性能测试器。

console.group()
console.groupend()
// 上面这两个方法用于将显示的信息分组。
// 它只在输出大量信息时有用，分在一组的信息，可以用鼠标折叠/展开。

console.groupCollapsed()  
// 用于将显示的信息分组，该组的内容，
//在第一次显示时是收起的（collapsed），而不是展开的。

console.trace()  // 显示当前执行的代码在堆栈中的调用路径。
console.clear()  // 用于清除当前控制台的所有输出，将光标回置到第一行。
```

## About 

GitHub：👉 https://github.com/microzz 
个人网站：👉 https://microzz.com/


