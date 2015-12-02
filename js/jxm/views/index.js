define(function (require, exports, module) {
    var Template = require("jxm/tpl/index.tpl");
    var imageSlider=null;
    var tool = require('jxm/utils/Tool');
    var handle = new tool();
    module.exports = App.Page.extend({
        template: Template,
        events: {
            'click #js_immediate_reg': 'doReg',
            'click #js_immediate_login': 'doLogin'
        },
        doReg: function (e) {
            e.preventDefault()
            App.goTo("reg")
        },
        doLogin: function (e) {
            e.preventDefault()
            App.goTo("login")
        },
        afterMount: function () {
            if(handle.mobileType()=='android'){
                //App.showToast(handle.isLogin())
//                if(handle.isLogin()){
//                    App.goTo("list")
//                }else{
//                    handle.goLogin()
//                }
            }
            this.$el.append(this.template);
        },
        onShow: function () {
            var query = this.request.query;
            var invitecode=query&&query.invitecode||"";
            if(invitecode!=""){
                sessionStorage.setItem("invitecode",invitecode);
            }
            var openid=query&&query.openid||"";
            if(openid!=""){
                sessionStorage.setItem("openid",openid);
            }

            var shareConfig={"link":window.location.origin};
            handle.share(shareConfig);
            this.setHeader();
            handle.orientationTips();
            this.initAD();
        },
        onHide: function(){
            imageSlider=null;
        },
        initAD:function(){
            var container=this.$el.find(".img_box");
            var minHeight=$(window).width()/3.2;

            container.css({
                "max-height": minHeight,
                "min-height": minHeight,
                "height": minHeight
            });
            var imgs=[
//                { id: 6, src: './images/hnjh.jpg', href: 'http://mp.weixin.qq.com/s?__biz=MzA5NDk4NDA5Ng==&mid=400861107&idx=1&sn=0c871833c6cadd1cb7e546f2de22da5c#rd' },
                { id: 4, src: './images/zbs11.jpg', href: 'http://mp.weixin.qq.com/s?__biz=MzA5NDk4NDA5Ng==&mid=400413790&idx=1&sn=ef4e9f3d4ac84b9d09f6d3671833cd1a#wechat_redirect' },
           //     { id: 4, src: './images/zqhd.jpg', href: 'http://mp.weixin.qq.com/s?__biz=MzA5NDk4NDA5Ng==&mid=211186234&idx=1&sn=20889a3973778538d09f0e2f216fb574#rd' },
//                { id: 1, src: './images/zbs.png', href:window.location.origin+'/activity/818hero/heroList.html'  },
                { id: 2, src: './images/xszn.jpg', href:'http://mp.weixin.qq.com/s?__biz=MzA5NDk4NDA5Ng==&mid=209894037&idx=1&sn=5ad856a2d275475c801c6a0604874843#rd'  },
                { id: 3, src: './images/xszy.jpg', href: 'http://mp.weixin.qq.com/s?__biz=MzA5NDk4NDA5Ng==&mid=210062014&idx=1&sn=babbf5cda487369cf0ae489719e12a73#rd ' }
            ];

            if (!imageSlider) {
                imageSlider = new App.UI.UIImageSlider({
                    datamodel: {
                        data: imgs,
                        itemFn: function (item) {
                            return item.src ? '<img width=100% src="' + item.src + '" data-href="'+item.href+'">' : '</img>';
                        }
                    },
                    displayNum: 1,
                    wrapper: container,
                    autoPlay: true,
                    itemClick: function(e){
                        if(window.WebViewJavascriptBridge){
                            if(e.id==1){
                                window.location.href=e.href;
                            }else{
                                window.WebViewJavascriptBridge.callHandler('openUrl',{"url": e.href},function(response) {})
                            }
                        }else{
                            window.location.href=e.href;
                        }
                    }
                });
            } else {
                imageSlider.datamodel.data = imgs;
                imageSlider.refresh();
            }
            imageSlider.show();
            //container.find('img').css('height', self.getMinHeight());
        },
        setHeader: function () {
            var header = new App.UI.UIHeader();
            header.set({
                view: this,
                title: '加薪猫',
                back: {
                    'tagname': '',
                    callback: function () {}
                },
                right: null
            });
        }
    })
})
