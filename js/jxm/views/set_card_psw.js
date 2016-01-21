//实名绑卡
define(function (require, exports, module) {
        var setCardPsw = require('jxm/tpl/set.card.psw.tpl');
        var footer = require('jxm/tpl/card.footer.tpl');
        var tool = require('jxm/utils/Tool');
        var model = require('jxm/model/model');
        var handle = new tool();
        var setTransactPwdModel = new model.setTransactPwdModel();
        var realStatusCheck = new model.realStatusCheck();
        var message = '网络错误，请稍后重试';
        var self;
        module.exports = App.Page.extend({
            initialize:function(){
                self = this;
            },
            afterMount: function(){

                    self.$el.html(setCardPsw + footer);
                    self.regClear()

            },
            events: {
                'click .js_sure': 'sure',//确认
                'input .js_psw': 'clearBrank'//密码不让输入空格
            },
            onShow: function () {
                self.setHeader();
                App.hideLoading();
            },
            clearBrank: function(e){
                var val = $(e.target).val();
                $(e.target).val(handle.deleteAllBlank(val));
            },
            regClear:function(){
                App.UI.UIInputClear(self.$('.js_psw'), '', null, {'right': 5});
            },
            setHeader: function () {
                var header = new App.UI.UIHeader();
                header.set({
                    view: this,
                    title: '设置交易密码',
                    back: {
                        'tagname': 'back',
                        callback: function () {
                            if(!self.promptAlert){
                                self.promptAlert = handle.prompt('未完成设置将无法进行交易。要继续完成设置吗？','放弃', '继续', function(){
                                    handle.getProductLink();
                                });
                            }
                            self.promptAlert.show();
                        }
                    },
                    right: null
                });
            },
            sure: function(){
                var error = [];
                var pswA = handle.deleteAllBlank(self.$('.js_psw1').val());
                var pswB = handle.deleteAllBlank(self.$('.js_psw2').val());
                if(!pswA.length){
                    error.push('请输入交易密码');
                }else if(pswA.length < 6 || !pswA.match(/\d{6}/)){
                    error.push('密码有误，请输入6位数字密码');
                }else if(!pswB.length){
                    error.push('请确认交易密码保持一致')
                }else if(pswA !== pswB){
                    error.push('密码不一致');
                    self.$('.js_psw').val('');
                }
                if(error.length){
                    App.showToast(error[0]);
                    return;
                }
                self.setPassWord(pswA);
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
//                                if(data.defaultCheckMode=='02'){
//                                    App.goTo('amount_check')
//                                }else{
//                                    App.goTo('bind_card_new_step3');
//                                }
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
            setPassWord: function(password){
                var query = this.request.query;
                App.showLoading();
                setTransactPwdModel.set({'transactPwd': password});
                setTransactPwdModel.exec().then(function(data){
                    App.hideLoading();
                    if(data.ret == 0){
                        App.showToast('设置交易密码成功!');
                        setTimeout(function(){
                            if(query&&query.origin=="rebind"){
                                App.goTo('add_card');
                            }else{
                                App.goBack();
                            }

                        },2000);
                    }else if(data.ret == 110001){
                        //未绑定银行卡
                        App.showToast('未绑定银行卡');
                        setTimeout(function(){
                            App.goTo('bind_card_new');
                        },2000);
                    }else if(data.ret == 999001){
                        handle.goLogin();
                    }else{
                        App.showToast(data.msg || message);
                    }
                }).catch(function(){
                    App.hideLoading();
                    App.showToast(message);
                });
            },
            onHide: function(){
                if(self.promptAlert){
                    self.promptAlert.hide();
                }
            }
        })
})










