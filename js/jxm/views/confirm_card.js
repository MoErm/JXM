//验证短信
define(function (require, exports, module) {
        var confirmCard = require('jxm/tpl/confirm.card.tpl');
        var tool = require('jxm/utils/Tool');
        var handle = new tool();
        var model = require("jxm/model/model");
        var getBindCardMsg = new model.getBindCardMsg();
        var checkBindCardMsg = new model.checkBindCardMsg();
        var HasSetTransPwd = new model.HasSetTransPwd();
        var bindCard = new model.bindCard();
        var message = '网络错误，请稍后重试';
        var self;
        module.exports = App.Page.extend({
            initialize:function(){
                self = this;
            },
            afterMount: function(){
                if(handle.isLogin()){
                    self.$el.html( _.template(confirmCard)({'mobile': handle.dealTel(handle.isLogin().banktel)}));
                }else{
                    handle.goLogin();
                }
            },
            events: {
                'click .js_next': 'next',//下一步
                'click .js_obtain_code': 'obtainCode'//获取验证码
            },
            countDown: function(){
                var now = 60;
                var text = '秒后重新获取验证码';
                self.obtain.removeClass('js_obtain_code');
                self.obtain.addClass('disabled');
                self.obtain.html(now + text);
                if(self.cutDown){ clearInterval(self.cutDown);}
                var timer = function(){
                    --now;
                    self.obtain.html(now + text);
                    if(!now){
                        clearInterval(self.cutDown);
                        self.obtain.removeClass('disabled');
                        self.obtain.addClass('js_obtain_code');
                        self.obtain.html('重新获取');
                    }
                }
                self.cutDown = setInterval(function(){timer()},1000);
            },
            onShow: function () {
                self.setHeader();
                self.obtain = self.$('.js_obtain');
                if(self.prevPage == 'bind_card_new_step3'){
                    self.countDown();
                }
            },
            setHeader: function () {
                var header = new App.UI.UIHeader();
                header.set({
                    view: this,
                    title: '实名绑卡',
                    back: {
                        'tagname': 'back',
                        callback: function () {
                                self.promptAlert = handle.prompt('未完成设置将无法进行交易。要继续完成设置吗？','放弃', '继续', function(){
                                    App.goTo('setting');
                                });
                            self.promptAlert.show();
                        }
                    },
                    right: null
                });
            },
            next: function(){
                var code = handle.deleteAllBlank(self.$('.js_code').val());
                if(!code){
                    App.showToast('请输入正确的验证码');
                    return;
                }
                App.showLoading();
                checkBindCardMsg.set({'msgCode' : code});
                checkBindCardMsg.exec().then(function(data){
                    App.hideLoading();
                    if(data.ret == 0){
                        App.showToast("绑卡成功");
                        window.setTimeout(function(){
                           self.goToSetPW();
                        },2000)
                    }else if(data.ret == 999001){
                        handle.goLogin();
                        if(self.cutDown){ clearInterval(self.cutDown);}
                    }else{
                        App.showToast(data.msg || message);
                    }
                }).catch(function(){
                    App.hideLoading();
                    App.showToast(message);
                })
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
            obtainCode: function(){
                if(handle.isLogin()){
                    getBindCardMsg.set({'mobile': handle.isLogin().banktel});

                    getBindCardMsg.exec({
                        type: 'get',
                        success: function(data){
                            if(data.ret == 0){
                                self.countDown();
                            }else if(data.ret == 999001){
                                handle.goLogin();
                                if(self.cutDown){ clearInterval(self.cutDown);}
                            }else{
                                App.showToast(data.msg || message);
                            }
                        },
                        error: function(){
                            App.hideLoading();
                            App.showToast(message);
                        }
                    })

                }else{
                    handle.goLogin();
                }
            },
            onHide: function(){

                if(self.promptAlert){
                    self.promptAlert.hide();
                }
            }
        })
})










