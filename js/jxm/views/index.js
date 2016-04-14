define(function (require, exports, module) {
    var Template = require("jxm/tpl/index.tpl");
    var Model = require("jxm/model/model");
    var imageSlider=null;
    var tool = require('jxm/utils/Tool');
    var getBannerImages = new Model.getBannerImages();
    var handle = new tool();
    var self;
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
            self=this
            var shareConfig={"link":window.location.origin};
            handle.share(shareConfig);
            this.setHeader();
            handle.orientationTips();
            this.getBannerImg();

            App.hideLoading();
        },
        onHide: function(){
            imageSlider=null;
        },
        getBannerImg: function(){

            getBannerImages.exec({
                type: 'get',
                success: function(data){
                    if(data.ret == 0){
                        self.initAD();
                        self.bannerData= data.data;
                    }else if(data.ret == 999001){
                        handle.goLogin();
                    }else{
                        App.showToast(data.msg  || self.message);
                    }
                },
                error: function(){
                    App.hideLoading();
                    App.showToast(self.message);
                }
            });
        },
        initAD: function() {
            var container = self.$el.find(".img_box");
            var minHeight = $(window).width() / 3.2;

            var imgs =self.bannerData ? self.bannerData.bannerImages:[{
                id: 3,
                src: './images/xszy.jpg',
                href: 'http://mp.weixin.qq.com/s?__biz=MzA5NDk4NDA5Ng==&mid=210062014&idx=1&sn=babbf5cda487369cf0ae489719e12a73#rd '
            }];
            container.css({
                "max-height": minHeight,
                "min-height": minHeight,
                "height": minHeight
            });
            imageSlider = new App.UI.UIImageSlider({
                datamodel: {
                    data: imgs,
                    itemFn: function(item) {
                        return item.src ? '<img width=100% src="' + item.src + '" data-href="' + item.href + '">' : '</img>';
                    }
                },
                displayNum: 1,
                wrapper: container,
                autoPlay: true,
                itemClick: function(e) {
                    window.location.href = e.href;
                }
            });
            imageSlider.show();
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
