define(function (require, exports, module) {
    var Model = require("jxm/model/model");
    var Store = require("jxm/model/store");
    var Template = require("jxm/tpl/translate_password.tpl");
    var ChangeTradePassword = new Model.ChangeTradePassword();
    var chkOldTradePwd = new Model.chkOldTradePwd();
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
           // var affirmPassword=this.$el.find('#js_affirmpassword').val();
            chkOldTradePwd.set({"oldPwd": oldPassword})//组织参数
            chkOldTradePwd.exec().then(function (data) {
                    if(data&&data.ret==0){
                        sessionStorage.setItem("oldPassword",oldPassword)
                        App.goTo("reset_password?soure=1");
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
            if(oldPassword==""){
                App.showToast("原密码不能为空");
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
            this.$el.find('#js_oldpassword').val("");
            App.hideLoading();
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
