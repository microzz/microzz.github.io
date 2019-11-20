---
title: JS中的高阶函数和偏函数
date: 2019-11-20 10:49:42
tags:
  - Flutter
  - Dart
  - DarkMode
  - 夜间模式
---

> 夜间模式（Dark Mode），也被称为暗黑模式或深色模式，是一种高对比度，或者反色模式的显示模式，开启之后在夜间可以缓解疲劳，更易于阅读，同时也能在一定程度上达到省电的效果。苹果方面有表示，明年3月份还不适配深色模式的App都要从App Store下架

# 夜间模式跟随系统
使用`MaterialApp`的`darkTheme`选项，可以很方便地适配跟随系统的DarkMode：

```dart
MaterialApp( 
    theme: ThemeData( 
        brightness: Brightness.light, 
        primaryColor: Colors.blue, 
    ), 
    darkTheme: ThemeData( 
        brightness: Brightness.dark, 
    ),
);
```
也可直接写做

```dart
darkTheme: ThemeData.dark()
```
- 这种方式是自动跟随iOS/Android的系统设置来切换的，无需用户再单独设置

# 手动开启夜间模式
上述的跟随系统自动切换暗黑模式的体验可能并不是很好，比如用户不喜欢夜间模式或者App的夜间模式配色适配并不是很好，这就会导致用户无法手动控制app的夜间模式或者只能关闭系统的设置。因此我们可以增加手动控制以及跟随系统的选项，让用户选择是否开启以及开启的方式。

## 保存用户配置
在flutter中可以使用[shared_preferences](https://pub.dev/packages/shared_preferences)来保存用户的配置数据，具体使用方法详见：[shared_preferences](https://github.com/flutter/plugins/tree/master/packages/shared_preferences#usage)使用

## 状态管理
主题的手动切换是影响全局的，如果通过常规的数据流向很难做到。常见的几种状态管理：
- [InheritedWidget](https://api.flutter.dev/flutter/widgets/InheritedWidget-class.html)
- [Scoped model](https://pub.dev/packages/scoped_model)
- [BLoC](https://github.com/felangel/bloc)
- [Redux](https://github.com/brianegan/flutter_redux)
- [Provider](https://pub.dev/packages/provider)

[Provider](https://pub.dev/packages/provider)是Google I/O 2019大会宣布的现在官方推荐的状态管理方式，我们需要在设置页里面通过用户设置，把变更状态共享给其他Widget，这里采用[Provider](https://pub.dev/packages/provider)这种方式来实现状态共享。

## 通用夜间模式Provider Model类

```dart
import 'package:flutter/foundation.dart';
import 'package:shared_preferences/shared_preferences.dart';

class DarkModeModel with ChangeNotifier {
  /// 夜间模式 0: 关闭 1: 开启 2: 随系统
  int _darkMode;

  static const Map<int, String> darkModeMap = {
    0: "关闭",
    1: "开启",
    2: "跟随系统"
  };

  static const String STORE_KEY = 'darkMode';

  SharedPreferences _prefs;

  int get darkMode => _darkMode;

  DarkModeModel() {
    _init();
  }

  void _init() async {
    this._prefs = await SharedPreferences.getInstance();
    int localMode = this._prefs.getInt(STORE_KEY);
    changeMode(localMode ?? 0);
  }

  void changeMode(int darkMode) async {

    _darkMode = darkMode;

    notifyListeners();

    SharedPreferences prefs = this._prefs ?? SharedPreferences.getInstance();

    await prefs.setInt(STORE_KEY, darkMode);
  }
}
```

## MaterialApp修改
如果手动控制是否开启夜间模式，可以设置`MaterialApp`的`theme`选项为`ThemeData.dark()`

```dart
theme: ThemeData.dark()
```

因为需要同时保留随系统自动切换与手动切换，而`darkTheme`选项和`theme`又有冲突，所以这里需要根据`darkModeModel.darkMode`的取值来渲染不同的`MaterialApp`，如果是手动模式再根据`darkModeModel.darkMode`的取值来渲染不同的`theme`。

```dart
MultiProvider(
  providers: [
    ChangeNotifierProvider(builder: (_) => DarkModeModel())
  ],
  child: Consumer<DarkModeModel>(
    builder: (context, darkModeModel, _) {
      return darkModeModel.darkMode == 2 
        ? MaterialApp(
            title: '特效君',
            theme: ThemeData(
              primarySwatch: Colors.blue,
            ),
            darkTheme: ThemeData.dark(),
              home: MainPage(title: '特效君'),
            ) 
        : MaterialApp(
            title: '特效君',
            theme: darkModeModel.darkMode == 1 
              ? ThemeData.dark()
              : ThemeData(
                  primarySwatch: Colors.blue,
                ),
            home: MainPage(title: '特效君'),
          );
    },
  ),
)
```

## 效果
这样我们就可以给用户提供自动跟随系统切换以及手动控制的选项了
![跟随系统开启夜间模式 - microzz.com](https://icdn.microzz.com/blog/darkmode_auto.png)

![手动开启关闭夜间模式 - microzz.com](https://icdn.microzz.com/blog/darkmode_close.png)








