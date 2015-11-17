define(function (require, exports, module) {
    var Model = require("jxm/model/model");
    var Store = require("jxm/model/store");
    var Template = require("jxm/tpl/translate_password.tpl");
    var ChangeTradePassword = new Model.ChangeTradePassword();
    module.exports = App.Page.extend({
        template: Template,
        events: {
            'click #js_affirm': 'doAffirm'
        },
        doAffirm: function (e) {
            e.preventDefault();
            if(this.checkCode()){
                this.startLogin();
            };
        },
        startLogin:function(){
            var oldPassword=this.$el.find('#js_oldpassword').val();
            var newPassword=this.$el.find('#js_newpassowrd').val();
           // var affirmPassword=this.$el.find('#js_affirmpassword').val();
            ChangeTradePassword.set({"oldPwd": oldPassword,"newPwd":newPassword})//组织参数
            ChangeTradePassword.exec().then(function (data) {
                    if(data&&data.ret==0){
                        App.showToast("修改交易密码成功");
                        App.goTo("setting");
                    }else if (data.ret == 999001){
                        handle.goLogin();
                    }else{
                        var msg=data.msg||"error"
                        App.showToast(msg);
                }
            }).catch(function () {
                App.showToast("系统错误,请稍候重试");
            })
        },
        checkCode: function(){
                var oldPassword=this.$el.find('#js_oldpassword').val();
                var newPassword=this.$el.find('#js_newpassowrd').val();
                var affirmPassword=this.$el.find('#js_affirmpassword').val();
            if(oldPassword==""){
                App.showToast("原密码不能为空");
                return false;
            } else if(!newPassword.match(/\D/g)|| /^[a-zA-Z]*$/.test(newPassword) || !/\w/.test(newPassword)||newPassword.length<6){
                App.showToast("新密码有误，请输入6~12位，包含数字、字母和符号的组合");
                return false;
            }else if(newPassword !== affirmPassword){
                App.showToast("密码不一致")
                return false;
            }
            return true
        },
        getCount: function () {
            return this.count++
        },
        afterMount: function () {
            this.$el.append(this.template)
        },
        onShow: function () {
            this.setHeader()
        },
        setHeader: function () {
            var header = new App.UI.UIHeader();
            header.set({
                view: this,
                title: '修改交易密码',
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
