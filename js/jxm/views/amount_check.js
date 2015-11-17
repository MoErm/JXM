//实名绑卡小额代付
define(function (require, exports, module) {
         var amount_check= require('jxm/tpl/amount_check.tpl');
        var tool = require('jxm/utils/Tool');
        var model = require('jxm/model/model');
        var Store = require("jxm/model/store");
         var footer = require('jxm/tpl/card.footer.tpl');
        var checkDribblet = new model.checkDribblet();
        var sendDribblet = new model.sendDribblet();
        var changeCard = new model.changeCard();
        var realStatusCheck = new model.realStatusCheck();
        var loginStore = new Store.loginStore();
        var changeCard = new model.changeCard();
        var HasSetTransPwd = new model.HasSetTransPwd();
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
            doChangeCard:function(){
                App.showLoading();
                changeCard.exec({
                    type: 'get',
                    success: function(data){
                        App.hideLoading();

                        if(data.ret == 0){
                            self.$('#amount_cardNo').html("");
                            self.$('#amount_bankName').html("");
                            self.$('#amount_provinceName').html("");
                            App.goTo('bind_card_new_step2');
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
            checkStep:function(){


                App.showLoading();
                realStatusCheck.exec({
                    type: 'get',
                    success: function(data){
                        // console.log(data)
                        App.hideLoading();
                        if(data.ret == 0){
                            sessionStorage.setItem("bind_card_info", JSON.stringify(data))

                                if(data.phase==1){
                                    App.goTo("bind_card_new")
                                }else if(data.phase==2){
                                    App.goTo("bind_card_new_step2")
                                }else if(data.phase==3){
                                    firstLoad=true;
                                    self.$el.html(_.template(amount_check)(data)+footer);
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
            events: {
                'click .js_agreement a': 'agreementLink',//《委托支付服务协议》
                'click .js_agreement': 'agreement',//是否同意《委托支付服务协议》
                'blur .amount_input': 'inputChange',//是否同意《委托支付服务协议》
                'click .js_next': 'next'//下一步
            },
            inputChange:function(){
                var amount = handle.deleteAllBlank(self.$('.amount_input').val());
                if(amount.length==1){
                    amount=amount+"0"
                }
                self.$('.amount_input').val(amount)

            },
            clearBrank: function(e){
                var val = $(e.target).val();
                $(e.target).val(handle.deleteAllBlank(val));
            },
            onShow: function () {
            if(firstLoad){
                self.showCard();
            }
//                self.showCard();
                self.setHeader();
            },
            setHeader: function () {
                var header = new App.UI.UIHeader();
                header.set({
                    view: this,
                    title: '验证银行卡',
                    back: {
                        'tagname': 'back', 'value': '<i class="icon-back" style="margin-left: 15px">&nbsp;更换&nbsp;</i>',
                        callback: function () {
                            self.promptAlert = handle.prompt('更换银行卡？<br>返回后信息将重新填写并验证','取消', '更换','', function(){
                                self.doChangeCard();
                            });
                            self.promptAlert.show();
                        }
                    },
                    right: null
                });
            },
            agreement: function(e){
                $(e.target).toggleClass('checked')
            },
            agreementLink: function(e){
                e.stopImmediatePropagation();
                App.goTo('get_contract?cid=13&type=2');
            },
            clearBrank: function(e){
                var val = $(e.target).val();
                $(e.target).val(handle.deleteAllBlank(val));
            },
            goToSetPW:function(){
                HasSetTransPwd.exec({
                    type: 'get',
                    success: function(data){
                        App.hideLoading();

                        if(data.ret == 0){
                            App.goTo('list');
                        }else if(data.ret == 999001){
                            handle.goLogin();
                        }else if(data.ret == 110009){
                            App.goTo('set_card_psw');
                        }
                    },
                    error: function(){
                        App.hideLoading();
                        App.showToast(message);
                    }
                })
            },



            next: function(){
                    var error = [];
                    var amount = handle.deleteAllBlank(self.$('.amount_input').val());
                    if(!amount||amount==""){
                        error.push('请输入金额');
                    }else if(!handle.checkNum(amount)){
                        error.push('请正确输入金额');
                    }
                    if(error.length){
                        App.showToast(error[0]);
                        return;
                    }
                if(amount.length==1){
                    amount='0.'+amount+"0"
                }else{
                    amount='0.'+amount
                }
                App.showLoading();
                checkDribblet.set({
                      'amount':amount
                    });
                checkDribblet.exec({
                        type: 'post',
                        success: function(data){
                            App.hideLoading();
                            if(data.ret == 0){
                                App.showToast("绑卡成功");
                                window.setTimeout(function(){
                                    self.goToSetPW();
                                },2000)
                            }else if(data.ret == 999001){
                                handle.goLogin();

                            }else if(data.ret == 110105||data.ret == 110106||data.ret == 110102||data.ret == 110107){

                                    self.promptAlert = handle.alert(data.msg);

                                self.promptAlert.show();
                            }else if(data.ret == 110108){
                                var authentication = handle.prompt('验证金额已失效<br>收到验证金额请在24小时之内完成验证', '取消', '重新获取', '', function () {
                                    self.getDribblet()
                                });
                                authentication.show();
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
            getDribblet:function(){
                App.showLoading();
                sendDribblet.exec({
                    type: 'post',
                    success: function(data){
                        App.hideLoading();
                        if(data.ret == 0){



                                self.promptAlert = handle.alert('验证金额已发送，收到验证金额请在24小时之内完成验证');

                            self.promptAlert.show();

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
            showCard:function(){

                App.showLoading();
                realStatusCheck.exec({
                    type: 'get',
                    success: function(data){
                        App.hideLoading();
                        if(data.ret == 0){
                            if(data.phase==4) {

                            }else{
                                if(data.provinceName){
                                    self.$('#amount_cardNo').html(data.cardNo);
                                    self.$('#amount_bankName').html(data.bankName);
                                    self.$('#amount_provinceName').html(data.provinceName + "&ensp;" + data.cityName);
                                }

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
            regClear:function(){
                _.each(['amount_input'], function(item){
                    App.UI.UIInputClear(self.$('.' + item), '', null, {'right': 5});

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
