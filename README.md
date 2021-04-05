# mp-core

声明式风格的 UI 定义。用类型安全的 tsx 语法写小程序的页面模板。Show/For 的语法源自 jsx-lite/solid

* Show 对应 wx:if
* For 对应 wx:for
* Widget 对应 抽象节点

引用组件

* 原生组件全局声明，例如 `<wx-view>`。微信小程序的原生组件，导入 `@rotcare/mp-wechat`
* useComponent 导入第三方组件
* useWidget 导入 mp-core 声明式风格的 UI 定义