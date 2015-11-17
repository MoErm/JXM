define(function (require, exports, module) {
    var Model = require("jxm/model/model");
    var Store = require("jxm/model/store");
    var Template = require("jxm/tpl/change_password.tpl");
    var tool = require('jxm/utils/Tool');
    var handle = new tool();
    var ChangeLoginPassword = new Model.ChangeLoginPassword();
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
            ChangeLoginPassword.set({"oldPwd": oldPassword,"newPwd":newPassword})//组织参数
            ChangeLoginPassword.exec().then(function (data) {
                    if(data&&data.ret==0){
                        App.showToast("修改登录密码成功");
                        App.goTo("setting");
                    }else if (data.ret == 999001){
                        handle.goLogin();
                     }else{
                        var msg=data.msg||"error"
                        App.showToast(msg);
                }
            }).catch(function () {
                //TODO
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
            this.$el.find("#js_oldpassword").val('');
            this.$el.find("#js_newpassowrd").val('');
            this.$el.find("#js_affirmpassword").val('');
            this.setHeader();
            this.regClear();
        },
        regClear:function(){
            var mobile_box=this.$el.find("#js_oldpassword");
            var mobile_newpssword=this.$el.find("#js_newpassowrd");
            var mobile_affirmpassword=this.$el.find("#js_affirmpassword");
            App.UI.UIInputClear(mobile_box,"",null,{"right":5});
            App.UI.UIInputClear(mobile_newpssword,"",null,{"right":5});
            App.UI.UIInputClear(mobile_affirmpassword,"",null,{"right":5});
        },
        setHeader: function () {
            var header = new App.UI.UIHeader();
            header.set({
                view: this,
                title: '修改登录密码',
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
