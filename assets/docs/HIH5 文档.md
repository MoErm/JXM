# HIH5 文档

## 简介

HIH5 是以 Backbone 为核心的移动端轻量级单页应用框架。

其理念是「One URL Pattern, One Controller, One Page」。

一个 URL 模式，对应一个 controller 模块；一个 controller 模块对应一个 Page 组件。

- URL Pattern 由 Backbone.Router 模块支持
- Constroller 为异步请求的 JavaScript 文件，可以是 requirejs 的 AMD 模块，也可以是 Webpack 等其他模块构建工具的产物
- One Page 为 HIH5 提供的 Page 组件，承载视图

HIH5 框架的一般工作模式如下：

- 页面加载 HIH5 框架相关的 css 、js以及全局配置
- 框架启动其路由模块，匹配当前 URL，根据全局配置里的模块(modules)信息，请求模块
- requirejs/webpack 判断请求的模块是否已加载，若否，则请求一个 js 文件
- 异步加载的 js 文件里，输出(export)一个 HIH5 的 Page 组件类
- HIH5 实例化该 Page 组件，执行其 onRequest 方法，传入 request 参数对象，执行其 pageLoad 方法，加载视图

作为框架使用者，通常只需要关注自己维护的 Page 组件，框架提供了一系列精细的生命周期方法，能满足95%的应用场景

## API 介绍

### 全局变量

HIH5 框架提供了以下全局变量，在 js 文件中可以直接使用，不需要再`require`

- `Backbone`

  * 未经改造的 Backbone，用法可参考它的中文文档：http://www.css88.com/doc/backbone/

- `_`  

  * 未经改造的 underscore 函数式方法库，用法可参考它的中文文档：http://www.css88.com/doc/underscore/

- `$/Zepto`  

  * 未经改造的 DOM 操作库(模块不完整)，用法可参考它的中文文档： http://www.css88.com/doc/zeptojs_api/

- `Promise`

    * 兼容各个浏览器的ES6-Promise函数，用法可参考中文文档：http://liubin.github.io/promises-book/
  
- `requestAnimationFrame` 

  * 兼容各个浏览器的「请求动画帧」函数，可替代 setTimeout(fn, 0) 做动画效果，使用文档：https://developer.mozilla.org/zh-CN/docs/Web/API/Window/requestAnimationFrame

- `riot`

  * A REACT-LIKE USER INTERFACE MICRO-LIBRARY
  * 官方文档：https://muut.com/riotjs/
  * 中文翻译：https://github.com/Centaur/riotjs_doc_cn

- `App`

  * 框架自身的全局变量，包含一系列常用方法与模块（见后文）

HIH5 虽然没有改造 Backbone 的源码，但提供了 Backbone-super 强化插件，功能如下:

在原始的 Backbone 中，调用父类同名方法的方式为手动调用

```javascript
var Library = Backbone.Model.extend({
  constructor: function() {
    this.books = new Books();
    Backbone.Model.apply(this, arguments); //手动调用
  },
  parse: function(data, options) {
    this.books.reset(data.books);
    return data.library;
  }
});

var SubLibary = Library.extend({
	parse: function(data, options) {
	SubLibary.__super__.parse.apply(this, arguments); //手动调用
	//Library.prototype.parse.apply(this, arguments); //更冗长的手动调用
    console.log('sub libary')
  }
})
```

在 HIH5 框架强化的 Backbone-super 中，只需要

```javascript
var Library = Backbone.Model.extend({
  constructor: function() {
    this.books = new Books();
    //this.$super 为父类同名方法
    this.$super.apply(this, arguments);
  },
  parse: function(data, options) {
    this.books.reset(data.books);
    return data.library;
  }
});
var SubLibary = Library.extend({
	parse: function(data, options) {
	//this.$super 总是等于父类同名方法，如果父类没有该方法，将抛出错误
	this.$super(data, options);
    console.log('sub libary');
  }
})
```

### 顶层 API

这里说的顶层 API 是指挂载在 App 这一全局变量下的方法

#### App.goBack()

浏览器后退，history.back() 的简易封装

#### App.goTo(url, options)

前往 url 链接，options 对象为可选参数

其内部实现为 Backbone.Router#navigate，所以参数与行为可参考文档：http://www.css88.com/doc/backbone/#Router-navigate

#### App.jump(url)

链接跳转，location.href = url 的简易封装

#### App.start(configs, onSuccess, onFail)

根据配置启动路由，框架自行调用，框架用户不会用到它，可忽略

#### App.Model

App.Model 继承自 Backbone.Model ，新增了几个常用的 ajax 方法。

##### App.Model#$http(options) 方法

返回一个封装了 ajax 异步请求的 promise 对象。

options 参数为一个对象，跟 $.ajax 接受的参数完全一致，内部实现就是将 options 传递给 $.ajax。

$http 默认请求的 url 参数为 this.url，默认请求类型是 GET，默认数据类型是 JSON

##### App.Model#$get(data) 方法

返回一个请求类型为 GET 的 ajax promise 对象。

data 参数将传递给 $.ajax({data: data})，请求 url 默认为 this.url

##### App.Model#$post(data) 方法

返回一个请求类型为 POST 的 ajax promise 对象。

data 参数将传递给 $.ajax({data: data})，请求 url 默认为 this.url

##### App.Model#exec(options) 方法

返回一个请求类型默认为 POST 的 ajax promise 对象

默认以 model 的 attributes 属性对象为 data 值，传递给 this.$post 方法。

options 参数为可选对象，将覆盖同名默认参数，最终传递给 $.ajax(options)。

#### App.fetch(options) 方法

App.fetch 是 App.Model 的几个 ajax 方法的内部实现，options 参数跟 $.ajax 完全一致。

App.fetch 方法返回 promise，可以用 then 方法与 catch 方法。

zepto 的 $.ajax 的返回值， 保存在 promise.xhr 属性中，可以通过 App.fetch(options).xhr 访问到，方便调用 xhr.abort 等方法。

注意： App.fetch(options).xhr 不是 promise 对象，App.fetch(options) 才是。将 App.fetch 的返回值保存在变量中，既能使用 promise.then 方法，也能使用 promise.xhr.abort 方法。

### Page 组件API

HIH5 框架目前提供了三种类型的 Page 组件，所有 Page 组件都继承自 Backbone.View，可以使用 Backbone.View 所有 API。

最基础的是 App.Page，每一个 page 要呈现自己时，都是立刻闪现

App.SliderPage 继承了 App.Page，在跳转到别的 page 组件时，会执行左右滑动 css3 的动画 

App.SwiperPage 继承了 App.SliderPage，除了跳转时会执行 css3 动画外，还可以从屏幕的左右两侧以拖动方式，拉取相邻的 page 组件，并将链接跳转到该 page 组件

注意： SwiperPage 拉取 page 组件的依据是 dom 顺序，而不是浏览器的记录，所以从左往右拉取的 page 组件，不一定是浏览器后退的 url 模式所对应的 page 组件

Ps：以下 `Page#property` 格式表示实例属性或方法，相当于 `this.property`， 可能是原型提供的，也可能是实例自身的(hasOwnProperty)

#### Page#el 属性

page 组件对应的 dom 对象，它的初始 className 为 'page'，当 page 组件呈现时，page.el 被添加一个 className 类名 active

注意：.page 拥有固定样式

```css
.page {
	display:none;
	position:absolute;
	top:0;
	left:0;
	width: 100%;
	min-height: 100%;
	overflow: hidden;
	background: #fff;
	overflow-scrolling : touch;
	-webkit-overflow-scrolling : touch;
}
.page.active {
	display: block;
}
```

#### Page#$el 属性

同 Backbone.View#$el : http://backbonejs.org/#View-$el

#### Page#name 属性

name 属性为 page 组件所对应的 controller 名字，通常是 requirejs 的 paths 对象里的 key 值

container 不会出现两个 name 一样的 page 组件，一个 controller 对应一个 page 组件

#### Page#isMounted 属性

当 page 组件不在 container 容器里时，this.isMounted 为 false，否则为 true

#### Page#pageId 属性

以 10000 为开头的自增 uid 数字，通常没有作用

#### Page#prevPage 属性

当前 page 组件迭代的上一个 page 组件的 Page#name 名，类型为字符串。

作用为让当前 page 组件知道是自己来自哪一个 controller 。

如果当前 page 组件为第一个 page 组件时，Page#prevPage 属性为 null。

#### Page#nextPage 属性

迭代当前 page 组件的 page 组件的 Page#name，类型为字符串。

作用为让当前 page 组件知道下一个 controller 是哪一个。

#### Page#config 属性

当前组件对应的配置信息，大致格式如下：

```json
{
	"url": "index(/:id)",
    "controller": "index",
    "showLoading": true
}
```

当框架的路由器匹配到 url 时，请求 controller 模块，并设置 Page#config 属性为该配置对象。

框架用户不必自行设置该属性。

#### Page#request 属性

当前组件对应的请求信息，大致格式如下：

```json
{
	"url": "index/123?a=1&b=2",
	"params": ["123"],
	"query": {
		"a": "1",
		"b": "2"
	}
}
```

当框架的路由器匹配到 url 时，请求 controller 模块，并根据当前具体的 url 解析出路径参数(params)与查询字符串(query)，更新到 Page#request 属性中。

框架用户不必自行设置该属性。

#### Page#displayCount 属性

当前组件的显示次数，从 0 开始计数，由框架自动更新，框架用户不需要设置它。

#### Page#scrollTop 属性

记录当前 page 的滚动条位置。

在 pageUnload 时，page 组件会记录当前滚动条的位置，在 pageLoad 方法中，onShow 方法被调用后，重新设置滚动条位置。

框架用户在 beforeIn、afterIn 以及 onShow 方法中，设置 this.scrollTop 为某个数字，可以改变 page 组件的滚动条位置。

设置 this.scrollTop 为 0，则置顶；设置 this.scrollTop 为某个 dom 元素的 offsetTop 值，相当于锚点定位到该元素。

#### Page#isNewPage() 方法

返回 true 或者 false

在组件第一次调用 onShow() 方法前，返回 true，此后都返回 false。

内部实现为判断 this.displayCount 是否等于 0.

#### 生命周期方法 Page#onRequest(request)

默认是空函数。

当浏览器 url 与当前 page 组件匹配时调用，request 是请求对象参数，数据结构同 Page#request。

在 onRequest 方法中作为参数的 request， 不等于 this.request。 this.request 是上一个请求参数对象。如果是第一次请求该 page 组件，this.request 为 undefined

执行完 onRequest 方法后， request 参数将覆盖 this.request，更新其值。

注意，只有当浏览器 url 不等于 this.request.url 时，onRequest 方法才会被调用。因此，点击前进/后退不会触发该生命周期方法。可以在这个方法内根据 request 对象发出 ajax 请求拿到数据，更新视图。

如果在 onShow 里发请求，则前进/后退依然会触发 page 视图的请求与刷新。

onRequest 方法在 pageLoade 方法执行前调用。

#### 生命周期方法 Page#beforeMount(container)

默认是空函数。

当组件要插入 container 容器前调用，container 参数是一个原生 DOM 对象。此时 this.isMounted 为 false。

框架默认的 container 为 document.querySelector('#container') 对象。

#### 生命周期方法 Page#afterMount(container)

默认是空函数。

当组件插入到 container 容器之后调用，container 参数是一个原生 DOM 对象。此时 this.isMounted 为 true。

#### 生命周期方法 Page#beforeUnmount(container)

默认是空函数。

当组件要从 container 中移除时调用，container 参数是一个原生 DOM 对象。此时 this.isMounted 为 true。

组件从 container 中插入和移除都是由框架来执行，当 container 的组件数量太多（默认最多10个）时，最不常用的 page 组件将被移除。

#### 生命周期方法 Page#afterUnmount(container)

默认是空函数。

当组件从 container 中移除后调用，container 参数是一个原生 DOM 对象。此时 this.isMounted 为 false。

#### 生命周期方法 Page#beforeIn(prevPage)

默认是空函数。

当组件要进入视图，即将显示时调用，prevPage 参数为上一个在视图中处于 active 状态的 page 组件。

此时 this.el 没有 active 这个 className。prevPage.el 则有 active。

如果当前组件是第一个进入视图的组件，prevPage 参数为null。

#### 生命周期方法 Page#afterIn(prevPage)

默认是空函数。

当组件进入视图后，已经显示时调用，prevPage 参数为上一个出于 active 状态的 page 组件。

此时 this.el 拥有 active 这个 className。prevPage.el 则失去了 active。

#### 生命周期方法 Page#onShow()

默认是空函数。

该方法在 afterIn 方法执行后，紧跟着执行；该方法没有参数。

在 onShow 方法执行完毕后，this.displayCount 自增。所以，beforeIn\afterIn\onShow 三个方法中 this.displayCount 相等。

#### 生命周期方法 Page#beforeOut(nextPage)

默认是空函数。

当组件处于 active，即将被下一个 page 组件所迭代时调用，nextPage 为下一个进入 active 状态的 page 组件。

此时 this.el 拥有 active 这个className， nextPage.el 则没有。

如果在该方法内返回 this.stop()，将终止切换 page 组件的过程。

```javascript
		//1/2概率提醒用户，终止 pageUnload 
        beforeOut: function() {
            if (Math.random() > 0.5) {
                return
            }
            App.showToast("you can't leave")
            return this.stop()
        }
```

请勿在该方法内返回 false, 这将终止切换过程，但地址栏的 url 却将产生混乱。

this.stop 方法返回 false，并且内部调整好正确的 url，所以直接return this.stop() 即可。

#### 生命周期方法 Page#afterOut(nextPage)

默认是空函数。

当组件失去 active 状态，在视图中变得不可见时调用，nextPage 为下一个进入 active 状态的组件。

此时 this.el 失去 active 这个 className，而 nextPage.el 则被添加了 active。

#### 生命周期方法 Page#onHide()

默认是空函数。

在执行完 afterOut 方法后，onHide 方法紧跟着执行，并且没有参数传入。

#### Page#pageLoad() 方法

此方法由框架自行调用。

让 page 组件进入 active 状态，如果 container 中有已经是 active 的其他组件，则调用其 pageUnload 方法使其脱离 active 状态。

该方法被调用时，会调用如下生命周期方法：

- 如果组件不在 container 中，执行 this.pageMount 方法插入，pageMount 方法将调用 beforeMount 与 afterMount 两个生命周期方法。

- 如果 container 中存在 active 状态的 page 组件，缓存在 prevPage 变量中，执行 prevPage.pageUnload 方法

- 执行 this.beforeIn 方法，并传入 prevPage 参数

- 执行 this.afterIn 方法，并传入 prevPage 参数

- 执行 onShow 方法，不传参。

每次都会调用的方法是这三个： beforeIn 、afterIn 以及 onShow.

#### Page#pageUnload() 方法

此方法由框架自行调用。

让 page 组件失去 active 状态，将调用 beforeOut 、 afterOut 以及 onHide 三个生命周期方法。

#### Page#pageMount() 方法

此方法由框架自行调用。

将 page 组件的 page.el 插入 container，将调用 beforeMount 与 afterMount 两个生命周期方法。

#### Page#pageUnmount() 方法

此方法由框架自行调用。

将 page 组件从 container 中移除，将调用 beforeUnmount 与 afterUnmount 两个生命周期方法。

### 图片懒加载

框架内置了一个轻量级的图片懒加载库，其启动配置如下：

```javascript
App.layzr = new Layzr({
  //符合 [data-src] 属性选择器的标签，包括但不限于<img src="loading.gif" data-src="imgUrl.jpg" />，其他标签亦可
  selector: '[data-src]',
  //图片真实地址，储存在标签的 data-src 属性中
  attr: 'data-src',
  //如果要区分 retina 视网膜屏与普通屏幕来提供不同分辨率的图片，retina 图放在 data-src-retina 属性中
  retinaAttr: 'data-src-retina',
  //如果不是img标签，其他标签需要背景图懒加载，将真实图片背景放在 data-src 属性中，同时添加一个 data-src-bg 属性
  //<div data-src="realImgUrl.jpg" data-src-bg>背景图懒加载</div>
  bgAttr: 'data-src-bg',
  //如果要跳过图片懒加载，添加 data-hidden 属性，即便在视图区域，也不会显示真实图片
  hiddenAttr: 'data-hidden',
  //当图片距离可视区域 1/10 屏幕高度时，开始请求真实图片
  threshold: 10
})
```

通过 App.layzr 可以拿到实例，该实例拥有 config 方法，接受一个 options 参数，可以覆盖并更新上述默认参数。

```javascript
//更新懒加载配置
App.layzr.config({
  //当图片距离可视区域 20/100 屏幕高度时，开始请求真实图片
  treshold: 20
})
```

由于每个 page 在 pageLoad 之后，框架都会自行执行 layzr.update() 方法实时更新在视图区域的懒加载图片，所以即便是首屏图片，也可以用懒加载模式，效果比直接放真实图片更好。

因为上一个 page 可以在 beforeOut 阻止切换到下一个 page 组件，而此时下一个 page 组件已经插入 dom，图片会自动请求。

如果所有图片都做懒加载，只有在 page 组件的首屏图片真正进入可视区域时，才会发出请求。

### 移动端点击延迟问题

框架内置并自行启动了 fastclick 模块，框架用户可以直接添加 click 事件，不需要用 tap 或者 touchstart.