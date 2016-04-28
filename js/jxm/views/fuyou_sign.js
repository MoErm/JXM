//实名绑卡
define(function (require, exports, module) {
        var bindCard_new = require('jxm/tpl/fuyou_sign.tpl');
        var tool = require('jxm/utils/Tool');
        var model = require('jxm/model/model');
        var Store = require("jxm/model/store");
        var loginStore = new Store.loginStore();
        var fuyouNotSignedCard = new model.fuyouNotSignedCard();
        var fuyouSignForAppSign = new model.fuyouSignForAppSign();
        var footer = require('jxm/tpl/card.footer.tpl');
        var handle = new tool();
        var message = '网络错误，请稍后重试';
        var bankIndex = 0;
        var self;
         var cardbin=false;
         var cardChecked=false;
        var firstInit=false;
        var submitFlag=false;
        module.exports = App.Page.extend({
            initialize:function(){
                self = this;
            },
            afterMount: function(){
//                    self.checkStep();
            },
            events: {
                'click .js_next': 'goSign'//《委托支付服务协议》

            },

            onShow: function () {
                //self.initData()
                self.$el.html(bindCard_new + footer)

                App.hideLoading()
                self.setHeader();
            },
            initData:function(){
                fuyouNotSignedCard.exec({
                    type: "get",
                    success: function (data){
                        self.data=data.data;
                        App.hideLoading();

                        if(data.ret == 0){
                            self.$el.html((_.template(bindCard_new + footer)(self.data)));
                        }else if(data.ret == 999001){
                            handle.goLogin();
                        }else {
                            App.showToast(data.msg);
                        }
                    },
                    error:function(){
                        App.hideLoading();
                        App.showToast(message);
                    }
                })
            },
            goSign:function(){
                var cardMobile=handle.deleteAllBlank(self.$('#js_cardMobile').val());
                if(!cardMobile){
                    App.showToast("请输入银行预留手机号")
                    return
                }

                fuyouSignForAppSign.exec({
                    type: "get",
                    data:{
                        mobile:cardMobile
                    },
                    success: function (data){
                        App.hideLoading();
                        console.log(data)
                        if(data.ret == 0){
                            self.$('#mchnt_cd').val(data.data.merCode)
                            self.$('#mchnt_txn_ssn').val(data.data.serialNo)
                            self.$('#login_id').val(data.data.loginId)
                            self.$('#mobile').val(data.data.cardMobile)
                            self.$('#page_notify_url').val(data.data.pgCallback)
                            self.$('#signature').val(data.data.signature)
                            var actionUrl;
                            actionUrl= data.data.appSignUrl;
                           //console.log(self.$('#signForm'))
                            self.$('#signForm')[0].action =actionUrl;
                            document.getElementById('signForm').submit();
                        }else if(data.ret == 999001){
                            handle.goLogin();
                        }else {
                            App.showToast(data.msg);
                        }
                    },
                    error:function(){
                        App.hideLoading();
                        App.showToast(message);
                    }
                })
            },
            setHeader: function () {
                var header = new App.UI.UIHeader();
                header.set({
                    view: this,
                    title: '签约',
                    back: {
                        'tagname': 'back',
                        callback: function () {
                               App.goBack()
                        }
                    },
                    right:null
                });
            },
            onHide: function(){
            }
        })
})
