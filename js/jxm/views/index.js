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
            App.hideLoading();
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
//                { id: 7, src: './images/zxbl.jpg', href: 'http://mp.weixin.qq.com/s?__biz=MzA5NDk4NDA5Ng==&mid=401347022&idx=1&sn=ee519f076c87b80c791e70514b37e3ab#rd' },
                { id: 7, src: './images/sdhd.jpg', href: 'http://mp.weixin.qq.com/s?__biz=MzA5NDk4NDA5Ng==&mid=401822477&idx=1&sn=2787511fd2fecbbcf8bcffabb1653c6c#rd' },
                { id: 4, src: './images/zbs12.jpg', href: 'http://mp.weixin.qq.com/s?__biz=MzA5NDk4NDA5Ng==&mid=401190971&idx=1&sn=4c1659ecf9359c282c06c68df34fa92d#rd' },
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
