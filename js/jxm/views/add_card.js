//我的银行卡
define(function (require, exports, module) {
    var addCard = require('jxm/tpl/add.card.tpl');
    var myCardTpl = require('jxm/tpl/my.card.tpl');
    var Model = require("jxm/model/model");
    var footer = require('jxm/tpl/card.footer.tpl');
    var addMyBankCard= new Model.addMyBankCard();
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
        events: {
            'click .add_card': 'goAddCard'
        },
        onShow: function () {

            return this.showCard();
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
                        if(data.data!=null){
                            self.$el.html(_.template(myCardTpl + footer)(data.data));
                            self.setHeader2();
                            //console.log(self.data.cardList[0].status)
                            if(self.data.cardList[0].status==02){
                                self.giveUp()

//                                self.promptAlert = handle.prompt('您更换的新银行卡还没绑定完成，是否要继续更换？','放弃', '去更换',function(){
//                                    //解除锁定
//                                    self.giveUp()
//                                }, function(){
//                                    //继续更换
//                                    App.goTo("rebind_card")
//                                });
//                                self.promptAlert.show();
                            }

//                            self.promptAlert = handle.alert("",function(){
//                               self.giveUp()
//                            });
//                            self.promptAlert.show();

                        }else{
                            self.setHeader();
                            self.$el.html(addCard + footer);
                        }

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
                        App.goTo('setting');
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
                        App.goTo('setting');
                    }
                },
                right:
                    [{
                        'tagname': 'changeCard', 'value': '<i style="font-size: 3rem">&plus;</i>&nbsp;&nbsp;',
                        callback: function () {

                            App.showToast("添加新银行卡")

                        }
                    }]
            });
        },
        giveUp:function(){
            abortChange.exec({
                type: "post",
                success: function (data){
                    if(data.ret == 0){
                        //解锁成功

                    }else if(data.ret == 999001){
                        handle.goLogin();
                    }else{
                        App.showToast(data.msg);
                    }
                },
                error:function(){
                    App.hideLoading();
                    App.showToast(message);
                }
            })
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
                            App.goTo("set_card_psw?origin=rebind");
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
                            App.goTo("set_card_psw")
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










