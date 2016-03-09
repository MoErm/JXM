define(function (require, exports, module) {
    var Model = require("jxm/model/model");
    var Store = require("jxm/model/store");
    var Chart = require("jxm/utils/Chart");
    var Template = require("jxm/tpl/my_invest.tpl");
    var Footer = require("jxm/tpl/footer.tpl");
    var myProperty = new Model.myProperty();
    var historyOrder = new Model.historyOrder();
    var getRollingNotice = new Model.getRollingNotice();
    var Store = require("jxm/model/store");
    var loginStore = new Store.loginStore();
    var tool = require('jxm/utils/Tool')
    var handle = new tool();
    var payLayer = require("jxm/common/common");
    var self;
    //接口
    module.exports = App.Page.extend({
        events: {
            'click .js_history': 'goHistory',
            'click .triangle': 'goHistory',
            'click .my_change': 'goWallet',
            'click .js_float': 'goFloat',
            'click .js_regular': 'goRegular',
            'click .js_setting': 'setting',
            'click .js_product_list': 'list',
            'click .js_ttl': 'ttl_recommend',
            'click .invest_tiantian': 'goRedeem',
            'click .js_close': 'goClose',
            'click .invest_invite': 'goInvite',
            'click .invest_record': 'goRecord',
            'click .js_situation':'goHeroList'
        },
        initialize: function () {
            self = this;
        },
        ttl_recommend:function(){
            App.goTo("ttl_recommend")
        },
        goWallet:function(){
            App.goTo("my_wallet")
        },
        goRedeem:function(){
            App.goTo("ttl_introduce?last=2")
        },
        goInvite:function(){
            App.goTo("my_invite")
        },
        goRecord:function(){
            App.goTo("my_invest_record")
        },
        goHeroList:function(){
//            window.location.href="./activity/818hero/heroList.html"
            window.location.href="./activity/818hero/heroList.html"
//            if(window.WebViewJavascriptBridge){
//                window.WebViewJavascriptBridge.callHandler('openUrl',{"url": window.location.origin+"/activity/818hero/heroList.html"},function(response) {})
//            }else{
//                window.location.href="./activity/818hero/heroList.html"
//            }
        },
        onShow: function () {
            handle.share();
            this.setHeader();

            self.$el.html(Footer);
            self.$('#js_my_invest').addClass('cur');
            self.regQR();
            this.render();

            return
        },
        regQR:function(){
            App.Bridge(function(bridge,scope){
                //bridge.init();
                //注册返回函数
                bridge.registerHandler('showQR', function(data, responseCallback) {
                    payLayer.inviteFriends(true);
                    $(".js_two_dimension").click();
                })
            },self);
        },
        initNotice:function(){
            getRollingNotice.exec({
                type: 'get',
                data:{
                    index:'03'
                },
                success: function(data){
                    if(data.ret == 0){
                        if(data.data.isShow==1){
                            $(".notice").css("display","block")
                            $(".notice_text").html(data.data.content)
                            self.time=data.data.duration
                            self.noticeAni()
                        }
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
        noticeAni:function(){
            $(".notice_text").css("marginLeft",document.body.clientWidth)
            require(["jquery"], function ($) {
                $(".notice_text").animate({marginLeft:-($(".notice_text")[0].scrollWidth+document.body.clientWidth)},self.time,"linear",self.noticeAni);
            });
        },
        render: function () {
            $(".mod_my_invest").html("")
            var self = this;
            App.showLoading();
            return myProperty.exec({
                type: 'get',
                success: function (data) {
                    App.hideLoading();
                    if (data.ret == 0) {
                        self.data = data.data
                        self.data.currentIncome = data.data.currentIncome || 0

                        //百分位显示
                        self.data.floatPropRate = (self.data.floatPropRate * 100).toFixed(2)
                        self.data.fixedPropRate = (self.data.fixedPropRate * 100).toFixed(2)


                        self.$el.html(_.template(Template + Footer)(self.data));
                        self.initNotice()
                        //self.newAcitve();
                        self.$('.js_my_invest').addClass('cur');
                        handle.setTitle("我");
                        //处理总资产的长度
                        self.$()


                       //self.setChart()
                    } else if (data.ret == 999001) {
                        handle.goLogin();
                    } else {
                        App.showToast(data.msg || '网络错误');
                    }
                },
                error: function () {
                    App.hideLoading();
                    App.showToast('网络错误');
                }
            })
        },
        setChart: function () {


            if (parseFloat(self.data.fixedProp) == 0 && parseFloat(self.data.floatProp) == 0) {

                var data = [
                    {
                        value: 10000,
                        color: "#b5b5b5"
                    },
                    {
                        value: 1,
                        color: "#b5b5b5"
                    }
                ]

            } else {
                var fixedProp = parseFloat(self.data.fixedProp.split(",").join('')).toFixed(2)
                var floatProp = parseFloat(self.data.floatProp.split(",").join('')).toFixed(2)


                fixedProp == "0.00" ? fixedProp = floatProp / 0.9999 - floatProp : fixedProp
                floatProp == "0.00" ?  floatProp = fixedProp / 0.9999 - fixedProp :  floatProp


                var data = [
                    {
                        value: fixedProp,
                        color: "#fe6403"
                    },
                    {
                        value: floatProp,
                        color: "#ffc644"
                    }
                ]
            }
            var ctx = this.$el.find("#canvas").get(0).getContext("2d");
            var myNewChart = new Chart(ctx).Doughnut(data, {
                animation: false,
                percentageInnerCutout: 70,
                segmentShowStroke: false

            });
        },
        goHistory: function (e) {
            e.preventDefault();
//            App.goTo("my_wallet")
            App.goTo("invest_history")
        },
        goFloat: function (e) {
            e.preventDefault();
            App.goTo("detail_float?oid=" + $(e.currentTarget).attr('id'));
        },
        goRegular: function (e) {
            e.preventDefault();
            App.goTo("detail_regular?oid=" + $(e.currentTarget).attr('id'))
        },
        setHeader: function () {
            var header = new App.UI.UIHeader();

            header.set({
                view: this,
                events: {
                    'click .js_setting': 'setting'
                },
                back: {
                    'tagname': '',
                    callback: function () {
                    }
                },
                center: {
                    'tagname': 'title', 'value': [' ']
                },

                right: [{
                    'tagname': 'invite', 'value': '',
                    itemFn: function () {
                        return '<span class="right_txt_btn user js_invite">邀请好友</span>';

//                        return '<span class="right_tow_btn1 js_setting"></span><span class="right_tow_btn2 js_invite"></span>';
                    },
                    callback: function () {
                        if (window.WebViewJavascriptBridge){
                    //        var shareConfig={'title': '我正式邀请你加入加薪猫理财,秒拿微信现金红包','url':handle.inviteCode()};
                            var shareConfig={'title': '能送现金红包的理财平台，你听说过吗？','url':handle.inviteCode(),'desc':'加薪猫提供7%-13%年化收益率的理财产品,首次投资秒送最高35元微信现金红包,身边的好友都抢疯了!'};
                            window.WebViewJavascriptBridge.callHandler('doShare',shareConfig,function(response) {
                                //TODO
                            })
                        }else{
                            payLayer.inviteFriends();
                        }
                    }
                }]
            });
        },
        setting: function () {
            App.goTo('setting');
        },
        list: function () {
            App.goTo('list');
        },
        onHide: function () {
            handle.setTitle("加薪猫");
        }
    })
})