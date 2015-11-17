define(function (require, exports, module) {
    var Template = require("jxm/tpl/account.tpl");
    var Model = require("jxm/model/model");
    var Store = require("jxm/model/store");
    var tool = require('jxm/utils/Tool');
    var handle = new tool();
    var HasSetTransPwd = new Model.HasSetTransPwd();
    var realStatusCheck = new Model.realStatusCheck();
    var loginStore = new Store.loginStore();
    var loginOut = new Model.loginOut();
    var self;
    module.exports = App.Page.extend({
        template: Template,
        events: {
            'click #js_mod_log_password': 'goModLogPassword',
            'click .reset_password': 'goResetPassword',
            'click .set_trans_psw': 'goTranslatePassword',
            'click #js_login_out': 'doLoginOut'
        },
        goTranslatePassword: function () {
            var status=this.$el.find('.set_trans_psw').data("isSetTransPsw");
            if (status == 1) {
                App.goTo("translate_password");
            } else if(status == 0){
                App.goTo("set_card_psw");
            }else {
                var authentication = handle.prompt('您尚未完成实名认证<br>立即前往认证', '取消', '认证', '', function () {
                    App.goTo('bind_card_new');
                });
                authentication.show();
            }
        },
        goResetPassword: function () {
            var status=this.$el.find('.reset_password').data("isResetPsw");
            if (status == 1) {
                App.goTo("forget_password");
            } else if(status == 0){
                App.goTo("set_card_psw");
            }else{
                var authentication = handle.prompt('您尚未完成实名认证<br>立即前往认证', '取消', '认证', '', function () {
                    App.goTo('bind_card_new');
                });
                authentication.show();
            }
        },
        goModLogPassword: function (e) {
            e.preventDefault();
            App.goTo("change_password");
        },

        doLoginOut:function (){
            App.showLoading();
            var openid=sessionStorage.getItem("openid");

            if(openid!=""&&openid!=null){
                loginOut.set({"openId":openid})
            }else{
                loginOut.set({"openId":""})
            }

            loginOut.exec().then(function (data) {
                App.hideLoading();
                if(data&&data.ret==0){
                    sessionStorage.removeItem('openid')
                    handle.rmStore();
                    App.goTo("index");
                    window.location.reload();
                }else{
                    self.getCaptcha();
                    var msg=data.msg||"系统错误";
                    App.showToast(msg);
                }
            }).catch(function () {
                App.hideLoading();
                App.showToast("网络错误,请重试");
            })
        },
        afterMount: function () {
            var mobile=loginStore.get()&&loginStore.get().userId||"";
            var data={"mobile":mobile};
            var HTML= _.template(this.template)(data);
            this.$el.append(HTML)
        },
        onShow: function () {
            self=this;
            this.setHeader();
            return this.checkSetTransPwd()
        },
        checkSetTransPwd: function () {
            App.showLoading();
            var self = this;
            HasSetTransPwd.set();
            return HasSetTransPwd.exec({type: 'get'}).then(function (data) {
                App.hideLoading();
                if (data && data.ret == 0) {
                    self.$el.find('#js_set').text('已设置');
                    self.$el.find('.set_trans_psw').data("isSetTransPsw", 1);
                    self.$el.find('.reset_password').data("isResetPsw", 1)
                } else if (data.ret == 110009) {
                    self.$el.find('#js_set').text('未设置');
                    self.$el.find('.set_trans_psw').data("isSetTransPsw", 0);
                    self.$el.find('.reset_password').data("isResetPsw", 0)
                } else if (data.ret == 110001) {
                    self.$el.find('#js_set').text('未设置');
                    self.$el.find('.set_trans_psw').data("isSetTransPsw", 2);
                    self.$el.find('.reset_password').data("isResetPsw", 2)
                } else {
                    App.showToast(data.msg)
                }
            }).catch(function () {
                //TODO
                App.hideLoading();
            })
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
                            App.goTo('bind_card_new_step3');
//                            if(data.defaultCheckMode=='02'){
//                                App.goTo('amount_check')
//                            }else{
//                                App.goTo('bind_card_new_step3');
//                            }
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
        setHeader: function () {
            var header = new App.UI.UIHeader();
            header.set({
                view: this,
                title: '账户设置',
                back: {
                    'tagname': 'back',
                    callback: function () {
                        App.goBack()
                    }
                },
                right: null
            });
        }
    })
})
