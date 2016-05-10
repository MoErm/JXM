//我的银行卡
define(function (require, exports, module) {
    var addCard = require('jxm/tpl/add.card.tpl');
    var myCardTpl = require('jxm/tpl/my.card.tpl');
    var Model = require("jxm/model/model");
    var footer = require('jxm/tpl/card.footer.tpl');
    //var addMyBankCard= new Model.addMyBankCard();
    var addMyBankCard= new Model.fuyouCard();
    var changeCheck= new Model.changeCheck();
    var abortChange= new Model.abortChange();
    var HasSetTransPwd = new Model.HasSetTransPwd();
    var realStatusCheck = new Model.realStatusCheck();
    var tool = require('jxm/utils/Tool');
    var handle = new tool();
    var message = '网络错误，请稍后重试';
    var self;
    var onceClick=true;
    module.exports = App.Page.extend({
        beforeIn:  function () {
           if(handle.mobileType()=="android"){
               window.app.goMyCards()
           }else if(handle.mobileType()!="html") {
               handle.setupWebViewJavascriptBridge(function (bridge) {
                   bridge.callHandler('back', null, function (response) {
                   })
               })
           }
        },
        events: {
            'click .js_add_card': 'goAddCard',
            'click .js_next': 'goSign'
        },
        onShow: function () {

            return this.showCard();
        },
        goSign:function(){
            App.goTo("fuyou_sign")
        },
        showCard:function(){
             self = this;
            App.showLoading();
            return addMyBankCard.exec({
                type: "get",
                success: function (data){
                    self.data=data.data;

                    App.hideLoading();
                    if(data.ret == 0){
                        self.data.dealBankNum=handle.dealBankNum;
                        self.$el.html(_.template(myCardTpl + footer)(data.data));
                            self.setHeader2();
                        //if(data.data.cardList.length!=0){
                        //    self.$el.html(_.template(myCardTpl + footer)(data.data));
                        //    self.setHeader2();
                        //    //console.log(self.data.cardList[0].status)
                        //
                        //}else{
                        //    self.setHeader();
                        //    self.$el.html(addCard + footer);
                        //}

                    }else if(data.ret == 110001){
                        self.setHeader();
                        self.$el.html(addCard + footer);
                    }else if(data.ret == 100031){
                        self.promptAlert = handle.alert(data.msg,function(){
                        });
                        self.promptAlert.show();
                        self.setHeader();
                        self.$el.html(addCard + footer);
                    }else if(data.ret == 999001){
                        handle.goLogin();
                    }else {
                        self.promptAlert = handle.alert(data.msg,function(){

                           App.goTo("setting")

                        });
                        self.promptAlert.show();
                        self.setHeader();
                        self.$el.html(addCard + footer);
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
                title: '我的银行卡',
                back: {
                    'tagname': 'back',
                    callback: function () {
                        App.goTo('my_invest');
                    }
                },
                right:null
//                    [{
//                        'tagname': 'changeCard', 'value': '更换&nbsp;&nbsp;',
//                        callback: function () {
//                            self.checkUnBinding()
//
//                        }
//                    }]
            });
        },

        setHeader2: function () {
            var header = new App.UI.UIHeader();
            header.set({
                view: this,
                title: '我的银行卡',
                back: {
                    'tagname': 'back',
                    callback: function () {
                        App.goTo('my_invest');
                    }
                },
                right:
                    [{
                        'tagname': 'changeCard', 'value': '更换银行卡&nbsp;',
                        callback: function () {
                            var customer = self.$('.js_customer');
                            if(!self.callPhone){
                                self.callPhone = handle.prompt('更换银行卡请联系客服并提供相应证明，客服电话：4008-339-869','取消', '呼叫', null, function(){
                                    customer.trigger('click');
                                });
                            }
                            self.callPhone.show();
                        }
                    }]
            });
        },
        checkUnBinding:function(){
            App.showLoading();
            changeCheck.exec({
                type: "get",
                success: function (data){

                    App.hideLoading();
                    if(data.ret == 0){

                        App.goTo("rebind_card")
                    }else if(data.ret == 110200||data.ret == 110201){

                        if(onceClick){
                            onceClick=false;
                        self.promptAlert = handle.alert(data.msg,function(){

                                onceClick=true;

                        });
                        self.promptAlert.show();
                        }
                    }else if(data.ret == 999001){
                        handle.goLogin();
                    }else if(data.ret == 110009){

                        self.promptAlert = handle.prompt('您的交易密码还未设置，请先设置交易密码','放弃', '去设置',function(){
                            //解除锁定

                        }, function(){
                            //继续更换
                            App.goTo("reset_password?soure=0&origin=rebind");
                        });
                        self.promptAlert.show();
                    }
                },
                error:function(){
                    App.hideLoading();
                    App.showToast(message);
                }
            })

        },

        goAddCard: function(){
            handle.setProductLink('setting');
            App.goTo('bind_card_new');
        },
        checkStep:function(){
            App.showLoading();
            realStatusCheck.exec({
                type: 'get',
                success: function(data){
                    App.hideLoading();
                    if(data.ret == 0){
                        if(data.phase==1){
                            App.goTo("bind_card_new")
                        }else if(data.phase==2){
                            App.goTo('bind_card_new_step2');
                        }else if(data.phase==3){
//                            if(data.defaultCheckMode=='02'){
//                                App.goTo('amount_check')
//                            }else{
//                                App.goTo('bind_card_new_step3');
//                            }
                            App.goTo('bind_card_new_step3');
                            //跳转至手机号check
                        }else if(data.phase==4){
                            App.goTo("reset_password?soure=0")
                        }else{
                            App.goTo("setting")
                        }
                    }else if(data.ret == 999001){
                        handle.goLogin();
                    }else{
                        App.showToast(data.msg  || message);
                    }
                },
                error: function(){
                    App.hideLoading();
                    App.showToast(message);
                }
            })
        },
        onHide: function(){
            this.$el.html('');
        }
    })
})










