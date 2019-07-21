---
title: Mac/iOS自带输入法导入第三方输入法词库
date: 2019-06-16 10:27:41
tags:
 - 输入法
 - 词库
 - Mac
 - iOS
 - 苹果
 - iPhone
---

# Mac/iOS自带输入法导入第三方输入法词库

> 苹果的自带输入法简洁美观流畅，对各种软件的兼容性也是最好的，但是很明显的不足的就是词库没有第三方输入法强大。下面就介绍如何把第三方输入法个人词库导入到苹果自带输入法，原理都类似，支持百度输入法、搜狗输入法

## 词库文件
macOS、iOS上面输入法里面都有文本替换，这就可以让用户自定义词库，但是并没有导入的选项。但是发现在Mac上面选中文本项之后往桌面拖动是会在桌面生成一个 `用户词典.plist` 的文件，所以我们可以大胆把已有的文本替换都删除，把生成的plist文件拖进窗口里面，发现都还原了，我们可以推断这就是苹果自带输入法的自定义的词库文件了。
![用户词典文件](https://icdn.microzz.com/20190615/1.png)
打开 `用户词典.plist` 的文件，发现里面的结构也比较简单清晰，词库文件规则也一目了然，如下图：
![plist用户词典文件规则](https://icdn.microzz.com/20190615/2.png)

## 导入百度输入法用户词库
在百度输入法用户偏好设置里面选择导出用户词库文件，使用编辑器打开文件，发现并没有加密，打开文件，内容格式如下：
![百度输入法词库文件](https://icdn.microzz.com/20190615/3.png)

接下来我们就可以写一个脚本来对百度输入法导出的词库文件内容格式进行转换，转换逻辑都类似，不同的语言都可以实现，因为我是Web前端开发，所以用NodeJS来对文件进行处理。

### 用NodeJS转换词库文件
需要注意的是，你在VSCode打开百度输入法词库文件，发现其编码是UTF-16 LE，我在用NodeJS读取文件需要使用encoding UCS-2，否则会出现乱码。下面写了一个通用的脚本`word2plist.js`

```javascript
const { join } = require('path');
const { readFileSync, writeFileSync } = require('fs');

const fileName = process.argv.pop();

const wordStr = readFileSync(join(__dirname, fileName), { encoding: 'ucs-2'}).toString();

const wordList = wordStr.split(/\r\n/);

const plist = wordList.filter(v => v).map(record => {
  const match = record.match(/(.+)\((.+)\)/);
  const phrase = match[1];
  const shortcut = match[2].replace(/\|/g, '');
  return `<dict>
		<key>phrase</key>
		<string>${phrase}</string>
		<key>shortcut</key>
		<string>${shortcut}</string>
	</dict>`;
}).join('\r\n');

writeFileSync(join(__dirname, `${fileName}.plist`), `<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE plist PUBLIC "-//Apple//DTD PLIST 1.0//EN" "http://www.apple.com/DTDs/PropertyList-1.0.dtd">
<plist version="1.0">
<array>
  ${plist}
</array>
</plist>`);
```

[安装NodeJS](https://nodejs.org/) 之后，就可以直接运行：`node word2plist.js 文件路径`，比如导出的文件名是`baidu`，我们就可以运行

```bash
node word2plist.js baidu
```

运行之后就会在目录下生成一个`baidu.plist`文件，我们拖动文件到文本替换窗口里面，发现词库全部导入进去了！
![导入百度输入法词库文件](https://icdn.microzz.com/20190615/4.png)


## 导入搜狗输入法词库
因为搜狗输入法mac版本升级之后导出的词库bin文件是加密的，我们可以使用[深蓝词库](https://github.com/studyzy/imewlconverter)转换成百度的，然后用上面的脚本同样适用，QQ拼音等其他输入法用同意做法也是可以的。

> PS：词库是可以自动同步到iPhone设备上的，所以打开手机上的文本替换发现刚才导入的词库全有了！因为我的词库量太大了，不得不吐槽一下，手机上打开文本替换动不动就会卡死，苹果官方目前对该长列表展示的优化不足呀...

