---
title: 前端水印生成方案
date: 2018-07-01 19:30:02
tags:
  - Canvas
  - SVG
  - 隐水印
  - JavaScript
  - NodeJS
---

# 前端水印生成方案

 >&nbsp;&nbsp;&nbsp;&nbsp;前段时间做某系统审核后台，出现了审核人员截图把内容外泄露的情况，虽然截图内容不是特别敏感，但是安全问题还是不能忽视。于是便在系统页面上面加上了水印，对于审核人员截图等敏感操作有一定的提示作用。

## 网页水印生成解决方案
### 通过canvas生成水印
![Canvas兼容性](https://icdn.microzz.com/20180701/caniuse_canvas.png)
这里我们用canvas来生成base64图片，通过CanIUse网站查询兼容性，如果在移动端以及一些管理系统使用，兼容性问题可以完全忽略。

`HTMLCanvasElement.toDataURL` 方法返回一个包含图片展示的 data URI 。可以使用 type 参数其类型，默认为 PNG 格式。图片的分辨率为96dpi。

如果画布的高度或宽度是0，那么会返回字符串“data:,”。
如果传入的类型非“image/png”，但是返回的值以“data:image/png”开头，那么该传入的类型是不支持的。
Chrome支持“image/webp”类型。具体参考[HTMLCanvasElement.toDataURL](https://developer.mozilla.org/zh-CN/docs/Web/API/HTMLCanvasElement/toDataURL)

具体代码实现如下：

```javascript
 (function () {
      // canvas 实现 watermark
      function __canvasWM({
        // 使用 ES6 的函数默认值方式设置参数的默认取值
        // 具体参见 https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Functions/Default_parameters
        container = document.body,
        width = '200px',
        height = '150px',
        textAlign = 'center',
        textBaseline = 'middle',
        font = "20px microsoft yahei",
        fillStyle = 'rgba(184, 184, 184, 0.8)',
        content = '请勿外传',
        rotate = '30',
        zIndex = 1000
      } = {}) {
        var args = arguments[0];
        var canvas = document.createElement('canvas');

        canvas.setAttribute('width', width);
        canvas.setAttribute('height', height);
        var ctx = canvas.getContext("2d");

        ctx.textAlign = textAlign;
        ctx.textBaseline = textBaseline;
        ctx.font = font;
        ctx.fillStyle = fillStyle;
        ctx.rotate(Math.PI / 180 * rotate);
        ctx.fillText(content, parseFloat(width) / 2, parseFloat(height) / 2);

        var base64Url = canvas.toDataURL();
        const watermarkDiv = document.createElement("div");
        watermarkDiv.setAttribute('style', `
          position:absolute;
          top:0;
          left:0;
          width:100%;
          height:100%;
          z-index:${zIndex};
          pointer-events:none;
          background-repeat:repeat;
          background-image:url('${base64Url}')`);

        container.style.position = 'relative';
        container.insertBefore(watermarkDiv, container.firstChild);

        
      });

      window.__canvasWM = __canvasWM;
    })();

    // 调用
    __canvasWM({
      content: 'QQMusicFE'
    })
```

效果如下：
![Canvas实现网页水印效果](https://icdn.microzz.com/20180701/canvas_demo1.png)

为了使这个方法更通用，兼容不同的引用方式，我们还可以加上这段代码：

```javascript
      // 为了兼容不同的环境
      if (typeof module != 'undefined' && module.exports) {  //CMD
        module.exports = __canvasWM;
      } else if (typeof define == 'function' && define.amd) { // AMD
        define(function () {
          return __canvasWM;
        });
      } else {
        window.__canvasWM = __canvasWM;
      }
```

这样似乎能满足我们的需求了，但是还有一个问题，稍微懂一点浏览器的使用或者网页知识的用户，可以用浏览器的开发者工具来动态更改DOM的属性或者结构就可以去掉了。这个时候有两个解决办法：
1. 监测水印div的变化，记录刚生成的div的innerHTML，每隔几秒就取一次新的值，一旦发生变化，则重新生成水印。但是这种方式可能影响性能；
2. 使用[MutationObserver](https://developer.mozilla.org/zh-CN/docs/Web/API/MutationObserver)

MutationObserver给开发者们提供了一种能在某个范围内的DOM树发生变化时作出适当反应的能力。

![MutationObserver兼容性](https://icdn.microzz.com/20180701/caniuse_mo.png)

通过兼容性表可以看出高级浏览器以及移动浏览器支持非常不错。
Mutation Observer API 用来监视 DOM 变动。DOM 的任何变动，比如节点的增减、属性的变动、文本内容的变动，这个 API 都可以得到通知。
使用MutationObserver构造函数，新建一个观察器实例，实例的有一个回调函数，该回调函数接受两个参数，第一个是变动数组，第二个是观察器实例。MutationObserver 的实例的observe方法用来启动监听，它接受两个参数。
第一个参数：所要观察的 DOM 节点，第二个参数：一个配置对象，指定所要观察的特定变动，有以下几种：

| 属性       | 描述    |
| :--------  | :----- |
| childList     | 如果需要观察目标节点的子节点(新增了某个子节点,或者移除了某个子节点),则设置为true. |
| attributes    | 如果需要观察目标节点的属性节点(新增或删除了某个属性,以及某个属性的属性值发生了变化),则设置为true.|
| characterData |如果目标节点为characterData节点(一种抽象接口,具体可以为文本节点,注释节点,以及处理指令节点)时,也要观察该节点的文本内容是否发生变化,则设置为true.|
| subtree |除了目标节点,如果还需要观察目标节点的所有后代节点(观察目标节点所包含的整棵DOM树上的上述三种节点变化),则设置为true.|
| attributeOldValue |在attributes属性已经设为true的前提下,如果需要将发生变化的属性节点之前的属性值记录下来(记录到下面MutationRecord对象的oldValue属性中),则设置为true.|
| characterDataOldValue |在characterData属性已经设为true的前提下,如果需要将发生变化的characterData节点之前的文本内容记录下来(记录到下面MutationRecord对象的oldValue属性中),则设置为true.|
| attributeFilter |一个属性名数组(不需要指定命名空间),只有该数组中包含的属性名发生变化时才会被观察到,其他名称的属性发生变化后会被忽略.|

`MutationObserver`只能监测到诸如属性改变、增删子结点等，对于自己本身被删除，是没有办法的可以通过监测父结点来达到要求。因此最终改造之后代码为：

```javascript
   (function () {
      // canvas 实现 watermark
      function __canvasWM({
        // 使用 ES6 的函数默认值方式设置参数的默认取值
        // 具体参见 https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Functions/Default_parameters
        container = document.body,
        width = '300px',
        height = '200px',
        textAlign = 'center',
        textBaseline = 'middle',
        font = "20px Microsoft Yahei",
        fillStyle = 'rgba(184, 184, 184, 0.6)',
        content = '请勿外传',
        rotate = '30',
        zIndex = 1000
      } = {}) {
        const args = arguments[0];
        const canvas = document.createElement('canvas');

        canvas.setAttribute('width', width);
        canvas.setAttribute('height', height);
        const ctx = canvas.getContext("2d");

        ctx.textAlign = textAlign;
        ctx.textBaseline = textBaseline;
        ctx.font = font;
        ctx.fillStyle = fillStyle;
        ctx.rotate(Math.PI / 180 * rotate);
        ctx.fillText(content, parseFloat(width) / 2, parseFloat(height) / 2);

        const base64Url = canvas.toDataURL();
        const __wm = document.querySelector('.__wm');

        const watermarkDiv = __wm || document.createElement("div");
        const styleStr = `
          position:absolute;
          top:0;
          left:0;
          width:100%;
          height:100%;
          z-index:${zIndex};
          pointer-events:none;
          background-repeat:repeat;
          background-image:url('${base64Url}')`;

        watermarkDiv.setAttribute('style', styleStr);
        watermarkDiv.classList.add('__wm');

        if (!__wm) {
          container.style.position = 'relative';
          container.insertBefore(watermarkDiv, container.firstChild);
        }
        
        const MutationObserver = window.MutationObserver || window.WebKitMutationObserver;
        if (MutationObserver) {
          let mo = new MutationObserver(function () {
            const __wm = document.querySelector('.__wm');
            // 只在__wm元素变动才重新调用 __canvasWM
            if ((__wm && __wm.getAttribute('style') !== styleStr) || !__wm) {
              // 避免一直触发
              mo.disconnect();
              mo = null;
            __canvasWM(JSON.parse(JSON.stringify(args)));
            }
          });

          mo.observe(container, {
            attributes: true,
            subtree: true,
            childList: true
          })
        }

      }

      if (typeof module != 'undefined' && module.exports) {  //CMD
        module.exports = __canvasWM;
      } else if (typeof define == 'function' && define.amd) { // AMD
        define(function () {
          return __canvasWM;
        });
      } else {
        window.__canvasWM = __canvasWM;
      }
    })();

    // 调用
    __canvasWM({
      content: 'QQMusicFE'
    });
```

### 通过SVG生成水印
SVG：可缩放矢量图形（英语：Scalable Vector Graphics，SVG）是一种基于可扩展标记语言（XML），用于描述二维矢量图形的图形格式。 SVG由W3C制定，是一个开放标准。 -- [维基百科](https://zh.wikipedia.org/wiki/%E5%8F%AF%E7%B8%AE%E6%94%BE%E5%90%91%E9%87%8F%E5%9C%96%E5%BD%A2)

![SVG浏览器兼容性](https://icdn.microzz.com/20180701/caniuse_svg.png)

相比Canvas，SVG有更好的浏览器兼容性，使用SVG生成水印的方式与Canvas的方式类似，只是base64Url的生成方式换成了SVG。具体如下：

```javascript
     (function () {
      // svg 实现 watermark
      function __svgWM({
        container = document.body,
        content = '请勿外传',
        width = '300px',
        height = '200px',
        opacity = '0.2',
        fontSize = '20px',
        zIndex = 1000
      } = {}) {
        const args = arguments[0];
        const svgStr = `<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${width}">
  <text x="50%" y="50%" dy="12px"
    text-anchor="middle"
    stroke="#000000"
    stroke-width="1"
    stroke-opacity="${opacity}"
    fill="none"
    transform="rotate(-45, 120 120)"
    style="font-size: ${fontSize};">
    ${content}
  </text>
</svg>`;
        const base64Url = `data:image/svg+xml;base64,${window.btoa(unescape(encodeURIComponent(svgStr)))}`;
        const __wm = document.querySelector('.__wm');

        const watermarkDiv = __wm || document.createElement("div");
     // ...
     // 与 canvas 的一致
     // ...
    })();

    __svgWM({
      content: 'QQMusicFE'
    })
```

### 通过NodeJS生成水印
身为现代前端开发者，Node.JS也是需要掌握的。我们同样可以通过NodeJS来生成网页水印(出于性能考虑更好的方式是利用用户客户端来生成)。前端发一个请求，参数带上水印内容，后台返回图片内容。
具体实现(Koa2环境)：
1. 安装gm以及相关环境，详情看[gm文档](https://github.com/aheckmann/gm)
2. `  ctx.type = 'image/png'; `设置响应为图片类型
3. 生成图片过程是异步的，所以需要包装一层Promise，这样才能为通过 async/await 方式为 ctx.body 赋值

```javascript
const fs = require('fs')
const gm = require('gm');
const imageMagick = gm.subClass({
  imageMagick: true
});


const router = require('koa-router')();

router.get('/wm', async (ctx, next) => {
  const {
    text
  } = ctx.query;

  ctx.type = 'image/png';
  ctx.status = 200;
  ctx.body = await ((() => {
    return new Promise((resolve, reject) => {
      imageMagick(200, 100, "rgba(255,255,255,0)")
        .fontSize(40)
        .drawText(10, 50, text)
        .write(require('path').join(__dirname, `./${text}.png`), function (err) {
          if (err) {
            reject(err);
          } else {
            resolve(fs.readFileSync(require('path').join(__dirname, `./${text}.png`)))
          }
        });
    })
  })());
});
```

**如果只是简单的水印展示，建议在浏览器生成，性能更好**

## 图片水印生成解决方案
除了给网页加上水印之外，有时候我们需要给图片也加上水印，这样在用户保存图片后，带上了水印来源信息，既可以保护版权，水印的其他信息也可以防止泄密。

### 通过canvas给图片加水印

实现如下：

```javascript
    (function() {
      function __picWM({
        url = '',
        textAlign = 'center',
        textBaseline = 'middle',
        font = "20px Microsoft Yahei",
        fillStyle = 'rgba(184, 184, 184, 0.8)',
        content = '请勿外传',
        cb = null,
        textX = 100,
        textY = 30
      } = {}) {
        const img = new Image();
        img.src = url;
        img.crossOrigin = 'anonymous';
        img.onload = function() {
          const canvas = document.createElement('canvas');
          canvas.width = img.width;
          canvas.height = img.height;
          const ctx = canvas.getContext('2d');

          ctx.drawImage(img, 0, 0);
          ctx.textAlign = textAlign;
          ctx.textBaseline = textBaseline;
          ctx.font = font;
          ctx.fillStyle = fillStyle;
          ctx.fillText(content, img.width - textX, img.height - textY);

          const base64Url = canvas.toDataURL();
          cb && cb(base64Url);
        }
      }

        if (typeof module != 'undefined' && module.exports) {  //CMD
        module.exports = __picWM;
      } else if (typeof define == 'function' && define.amd) { // AMD
        define(function () {
          return __picWM;
        });
      } else {
        window.__picWM = __picWM;
      }
      
    })();

    // 调用
    __picWM({
        url: 'http://localhost:3000/imgs/google.png',
        content: 'QQMusicFE',
        cb: (base64Url) => {
          document.querySelector('img').src = base64Url
        },
      });
```

效果如下：

![Canvas给图片生成水印](https://icdn.microzz.com/20180701/wm_pic.png)

### 通过NodeJS批量为图片加水印
我们同样可以通过gm这个库来给图片加上水印

```javascript
function picWM(path, text) {
  imageMagick(path)
    .drawText(10, 50, text)
    .write(require('path').join(__dirname, `./${text}.png`), function (err) {
      if (err) {
        console.log(err);
      }
    });
}
```
如果需要批处理图片，只需要遍历相关文件即可。

**如果只是简单的水印展示，建议在浏览器生成，性能更好**

## 拓展

### 隐水印
前段时间阿里凭截图查到了月饼事件的泄密者，其实就是用了隐水印。这其实很大程度不是前端的范畴了，但是我们也应该了解。AlloyTeam团队写过一篇 [不能说的秘密——前端也能玩的图片隐写术](http://www.alloyteam.com/2016/03/image-steganography/) ，通过Canvas给图片加上了“隐水印”，针对用户保存的图片，是可以轻松还原里面隐含的内容，但是对于截图或者处理过的照片却无能为力，不过对于一些机密图片文件展示，是可以偷偷用上该技术的。

### 使用加密后的水印内容
前端生成的水印也可以，别人也可以用同样的方式生成，可能会有“嫁祸于人”（可能这是多虑的），我们还是要有更安全的解决方法。水印内容可以包含多种编码后的信息，包括用户名、用户ID、时间等。比如我们只是想保存用户唯一的用户ID，需要把用户ID传入下面的md5方法，就可以生成唯一标识。编码后的信息是不可逆的，但可以通过全局遍历所有用户的方式进行追溯。这样就可以防止水印造假也可以追溯真正水印的信息。

```javascript
// MD5加密库 utility
const utils = require('utility')

// 加盐MD5
exports.md5 =  function (content) {
  const salt = 'microzz_asd!@#IdSDAS~~';
  return utils.md5(utils.md5(content + salt));
}
```

## 总结
安全问题不能大意，对于一些比较敏感的内容，我们可以通过组合使用上述的水印方案，这样才能最大程度给浏览者警示的作用，减少泄密的情况。

## 参考链接
*  [不能说的秘密——前端也能玩的图片隐写术](http://www.alloyteam.com/2016/03/image-steganography/) 
*  [阮一峰-Mutation Observer API](http://javascript.ruanyifeng.com/dom/mutationobserver.html)
* lucifer-基于KM水印的图片网页水印实现方案
* damon-网页水印明水印前端SVG实现方案






