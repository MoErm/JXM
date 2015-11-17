define(function (require, exports, module) {
    var Model = require("jxm/model/model");
    var Store = require("jxm/model/store");
    var Template = require("jxm/tpl/forget_password_tips.tpl");
    var ResetTransactionPwd = new Model.ResetTransactionPwd();
    module.exports = App.Page.extend({
        template: Template,
        events: {
            'click #js_confirm': 'doConfirm'
        },
        doConfirm: function (e) {
            e.preventDefault();
            if (this.checkTradPassword()) {
                this.startConfirm()
            }
        },
        startConfirm: function () {
            var token = this.request.query.token;
            var newPassword = this.$el.find('#js_new_password').val();
            var confPassword = this.$el.find('#js_Confirm_password').val();
            ResetTransactionPwd.set({"tradePassword": newPassword, "token": token})
            ResetTransactionPwd.exec().then(function (data) {
                if (data && data.ret == 0) {
                    App.showToast("修改交易密码成功");
                    App.goTo("setting");
                } else if (data.ret == 999001){
                    handle.goLogin();
                }else{
                    var msg = data.msg || "error";
                    App.showToast(msg);
                }
            }).catch(function () {
                //TODO
            })
        },
        getCount: function () {
            return this.count++
        },
        afterMount: function () {
            this.$el.append(this.template)
        },
        checkTradPassword: function () {
            var newPassword = this.$el.find('#js_new_password').val();
            var confPassword = this.$el.find('#js_Confirm_password').val();
            if (!newPassword.match(/\D/g) || /^[a-zA-Z]*$/.test(newPassword) || !/\w/.test(newPassword) || newPassword.length < 6) {
                App.showToast("新密码有误，请输入6~12位，包含数字、字母和符号的组合");
                return false;
            } else if (confPassword != newPassword) {
                App.showToast("密码不一致");
                return false;
            }
            ;
            return true;
        },
        onShow: function () {
            this.$el.find("#js_new_password").val('');
            this.$el.find("#js_Confirm_password").val('');
            this.setHeader();
            this.regClear();
        },
        regClear:function(){
            var mobile_new_password=this.$el.find("#js_new_password");
            var mobile_Confirm_password=this.$el.find("#js_Confirm_password");
            App.UI.UIInputClear(mobile_new_password,"",null,{"right":5});
            App.UI.UIInputClear(mobile_Confirm_password,"",null,{"right":5});
        },
        setHeader: function () {
            var header = new App.UI.UIHeader();
            header.set({
                view: this,
                title: '忘记交易密码',
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
