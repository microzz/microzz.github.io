---
title: Node.js实现一个小爬虫
date: 2017-02-14 16:33:13
tags:
  - Nodejs
  - 爬虫
  - JS
  - ES6
  - ECMAScript6
  - JavaScript
---

# Node.js实现一个小爬虫

## 分析

我们将用最简单的代码实现一个简单的小爬虫。本示例采用ES6写法。首先我们要安装第三方cheerio模块，在项目目录使用`npm install cheerio --save` 命令即可。在文件中我们需要引入如下模块：


| 模块名 | 作用 |
| :-: | :-: |
| cheerio | 类似jQuery，方便对DOM内容操作 |
| https | 针对https协议，http模块用法类似 |


## 代码实现

```javascript
// 引入模块
const https = require('https');
const cheerio = require('cheerio');

// 爬取目标网站URL
let url = 'https://microzz.com';

// 使用get方法访问
https.get(url, res => {
  let html = '';
  
  // 监听data事件获取html源码
  res.on('data', data => {
    html += data;
  });

 // 监听end事件，同时把获取到的数据传给filterData方法进行过滤
  res.on('end', () => {
    let titles = filterData(html);
    console.log(titles);
  });

}).on('error', e => {
  console.log(e.message);
});

// 使用cheerio模块对内容进行筛选过滤
function filterData(html) {
  let $ = cheerio.load(html);
  let oTitles = $('.post-title-link');
  let titles = '';

  oTitles.each( (index, item) => {
    let title = $(item).text();
    let end = index == (oTitles.length - 1) ? '' : '\n';
    titles += '【' + (index+1) + '】' + title + end;
  });

  return titles;

}
```

至此一个简单的爬取 https://microzz.com 文章内容标题的小爬虫就完成啦😄



