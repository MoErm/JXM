//实名绑卡手机号验证
define(function (require, exports, module) {
    var bindCard_new_step3= require('jxm/tpl/rebind_card_step3.tpl');
    var tool = require('jxm/utils/Tool');
    var model = require('jxm/model/model');
    var Store = require("jxm/model/store");
    var footer = require('jxm/tpl/card.footer.tpl');
    var rebindBindCard = new model.rebindBindCard();
    var rebindRealStatusCheck = new model.rebindRealStatusCheck();
    var sendDribblet = new model.sendDribblet();
    var rebindChangeCard = new model.rebindChangeCard();
    var loginStore = new Store.loginStore();
    var handle = new tool();
    var message = '网络错误，请稍后重试';
    var self;
    var firstLoad=false;
    module.exports = App.Page.extend({
        initialize:function(){
            self = this;
        },
        afterMount: function(){
            var self=this;

            self.checkStep();


        },
        checkStep:function(){
            firstLoad=true;
            App.showLoading();
            rebindRealStatusCheck.exec({
                type: 'get',
                success: function(data){
                    // console.log(data)
                    App.hideLoading();
                    if(data.ret == 0){
                       if(data.data.phase==2){
                            App.goTo("rebind_card_step2")
                        }else if(data.data.phase==3){
                            self.$el.html(_.template(bindCard_new_step3)(data.data)+footer);
                            var tel=sessionStorage.getItem("bind_tel")
                            self.$(".js_tel").val(tel);
                            //跳转至手机号check
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
        showCard:function(){
            App.showLoading();

            rebindRealStatusCheck.exec({
                type: 'get',
                success: function(data){
                    App.hideLoading();
                    if(data.ret == 0){
                        self.$('#step3_cardNo').html(data.data.cardNo);
                        self.$('#step3_bankName').html(data.data.bankName);
                        self.$('#step3_provinceName').html(data.data.provinceName+"&ensp;"+data.data.cityName);


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
        events: {
            'click .js_agreement a': 'agreementLink',//《委托支付服务协议》
            'click .js_agreement': 'agreement',//是否同意《委托支付服务协议》
            'click .js_next': 'next',//下一步
            'click .input_tip':'showInputTips'
        },
        showInputTips:function(){
            self.promptAlert = handle.alert('<p>预留手机号说明</p><hr><p style="text-align: left">银行预留手机号码是办理该银行卡时所填写的手机号码。<br>没有预留、手机号忘记或者已停用，请联系银行客服更新处理</p>');
            self.promptAlert.show();
        },
        clearBrank: function(e){
            var val = $(e.target).val();
            $(e.target).val(handle.deleteAllBlank(val));
        },
        onShow: function () {
            if(firstLoad){
                self.showCard();
            }

            self.setHeader();

        },
        doChangeCard:function(){
            App.showLoading();
            rebindChangeCard.exec({
                type: 'get',
                success: function(data){
                    App.hideLoading();
                    if(data.ret == 0){
                        App.goTo('rebind_card_step2');
                        self.$('#step3_cardNo').html("");
                        self.$('#step3_bankName').html("");
                        self.$('#step3_provinceName').html("");
                        self.$(".js_tel").val("");
                        App.showLoading();
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
        setHeader: function () {
            var header = new App.UI.UIHeader();
            header.set({
                view: this,
                title: '验证银行卡',
                back: {
                    'tagname': 'back', 'value': '<i class="icon-back" style="margin-left: 15px">&nbsp;更换&nbsp;</i>',
                    callback: function () {

                        self.promptAlert = handle.prompt('更换银行卡？<br>返回后信息将重新填写并验证','取消', '更换',function(){}, function(){
                            self.doChangeCard();
                        });
                        self.promptAlert.show();
                    }
                },
                right:null
//                    right: [{
//                        'tagname': 'invite', 'value': '遇到问题？',
//                        callback: function () {
//                                self.promptAlert = handle.prompt('手机号认证不通过？<br>使用“金额验证”方式完成绑定','再试试', '是的',function(){}, function(){
//                                    //金额验证接口
//                                    self.getDribblet();
//                                });
//                            self.promptAlert.show();
//
//                        }
//                    }]
            });
        },
        agreement: function(e){
            $(e.target).toggleClass('checked')
        },
        agreementLink: function(e){
            var tel=self.$(".js_tel").val()
            if(tel){
                sessionStorage.setItem("bind_tel", tel);
            }
            e.stopImmediatePropagation();
            App.goTo('get_contract?cid=13&type=2');
        },
        clearBrank: function(e){
            var val = $(e.target).val();
            $(e.target).val(handle.deleteAllBlank(val));
        },




        next: function(){
            var error = [];

            var tel = self.$('.js_tel').val();
            if(!tel){
                error.push('请输入手机号');
            }else if(!handle.checkTel(tel)){
                error.push('手机号不正确');
            }

            if(error.length){
                App.showToast(error[0]);
                return;
            }
            App.showLoading();
            rebindBindCard.set({
                'mobile': tel
            });
            rebindBindCard.exec({
                type: 'post',
                success: function(data){
                    App.hideLoading();
                    if(data.ret == 0){
                        var loginData = handle.isLogin();
                        if(loginData){
                            loginData.banktel = tel;
                            loginStore.set(loginData);
                            App.goTo('rebind_confirm_card');
                        }else{
                            handle.goLogin();
                        }

                    }else if(data.ret == 110199){

                        self.promptAlert = handle.alert(data.msg);
                        self.promptAlert.show();

//                                self.promptAlert = handle.prompt(data.msg,'再试试', '金额验证','', function(){
//                                    self.getDribblet();
//                                });
//                                self.promptAlert.show();
                    }else if(data.ret == 999001){
                        handle.goLogin();
                    }else{
                        App.showToast(data.msg || message);
                    }
                },
                error: function(){
                    App.hideLoading();
                    App.showToast(message);
                }
            })
        },
        onHide: function(){
            if(self.promptAlert){
                self.promptAlert.hide();
            }
            if(self.bank){
                self.bank.hide();
            }
            if(self.selectCity){
                self.selectCity.hide();
            }
        }
    })
})
