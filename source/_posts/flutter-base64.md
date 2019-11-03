---
title: Flutter中展示Base64图片
date: 2019-11-03 13:42:04
tags:
  - Flutter
  - Dart
  - Base64
---

# Flutter中展示Base64图片
在flutter中难免会用到Base64照片，通过`dart:convert`库我们可以很容易加载Base64图片。

## Flutter中如何展示Base64照片
在flutter中的`Base64Decoder().convert`方法的的参数是base64图片中`,`后面的部分。所以我们需要进行截取，实现的主要代码如下：

```dart
import 'dart:convert';

const String Base64Str = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgAgMAAAAOFJJnAAAADFBMVEUAAAAWFyMYGCMXHCilIQtpAAAABHRSTlMAmV8tOa34CwAAAEdJREFUGNNjoAdgPgDBDLwJDAycBSBGBAODKojBFMbAMLUByACSQDYIqCZwRoAZnBGqQPVgRSAlYEVAJRBFEVAGZwLCEhoAAKvbDA7roJ+AAAAAAElFTkSuQmCC';

Image.memory(
  Base64Decoder().convert(Base64Str.split(',')[1]),
  width: 22.0,
  height: 22.0,
)
```

如果用上面的方法，发现在`ListView`中使用，滚动`ListView`的时候会出现重复渲染，并且渲染很慢。框架没有比较base64字符串，所以一张已经存在的照片被当作一张新的照片来处理。

## 图片多次解码重渲染问题
我们可以用`StatefulWidget`，在`initState`方法中的数据进行解码，从而避免多次对图像进行解码，提升性能和改善用户体验。
下面是封装的`Base64Image` Widget：

```dart
import 'dart:convert';
import 'dart:typed_data';

import 'package:flutter/material.dart';

/// 加载Base64资源，避免避免多次解码图像
class Base64Image extends StatefulWidget {

  /// base资源，已处理的
  final String source;

  /// 未处理的base64资源
  final String base64;

  /// 图像宽度
  final double width;

  /// 图像高度
  final double height;

  /// 缩放比例
  final double scale;

  Base64Image({
    Key key,
    this.source,
    this.base64,
    this.height: 22.0,
    this.width: 22.0,
    this.scale: 1.0,
  }) : super(key: key);

  @override
  _Base64ImageState createState() => _Base64ImageState();
}

class _Base64ImageState extends State<Base64Image> {
  Uint8List _source;

  @override
  void initState() {
    _source = Base64Decoder().convert(widget.source ?? widget.base64.split(',')[1]);
    super.initState();
  }

  @override
  Widget build(BuildContext context) {
    return Image.memory(
      _source,
      height: widget.height,
      width: widget.width,
      scale: widget.scale,
    );
    
  }
}
```