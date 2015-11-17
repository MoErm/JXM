define(function (require, exports, module) {
    var Model = require("jxm/model/model");
    var Store = require("jxm/model/store");
    var Template = require("jxm/tpl/rebind_card.tpl");
    var loginStore = new Store.loginStore();
    var checkTradePwd = new Model.checkTradePwdChinaPay();
    var tool = require('jxm/utils/Tool');
    var handle = new tool();
    var message = '网络错误，请稍后重试';
    var self;
    module.exports = App.Page.extend({
        template: Template,
        initialize: function () {
            self=this;
            this.count = 0
        },

        events: {
            'click #js_password_eye':'getSwitch',
            'click #forgetPwd':'forgetPwd',
            'click #js_submit':'checkPwd'
        },
        forgetPwd:function(){
            App.goTo("forget_password");
        },
        checkPwd:function(){
            var pwd=self.$('.js_password').val();
            if(pwd==""){
                App.showToast("请输入交易密码");
                return
            }
            App.showLoading();
            checkTradePwd.set({"tradePwd":pwd})
            checkTradePwd.exec({
                type: "post",
                success: function (data){
                    App.hideLoading();
                    if(data.ret == 0 ){
                        //next
                        sessionStorage.setItem("reBindInfo",JSON.stringify(data.data))
                        App.goTo("rebind_card_step2")
                    }else if(data.ret == 999001){
                        handle.goLogin();
                    }else if(data.ret == 110202){
                        App.showToast(data.msg);
                    }else{
                        self.promptAlert = handle.alert(data.msg);
                        self.promptAlert.show();
                    }

                },
                error:function(){
                    App.hideLoading();
                    App.showToast(message);
                }
            })

        },
        getSwitch:function(){
            var passWord = self.$el.find('.js_password');
            var passwordEye = self.$el.find('#js_password_eye');
            if(passWord.attr('type')=='password'){
                passWord.attr('type','text');
                passwordEye.css('opacity',"1")
            }else{
                passWord.attr('type','password')
                passwordEye.css('opacity',"")
            }
        },


        afterMount: function () {
            this.$el.append(this.template)
        },
        onShow: function () {
            var query = this.request.query;
            var openid=query&&query.openid||"";
            if(openid!=""){
                sessionStorage.setItem("openid",openid);
            }
            App.hideLoading();
            this.setHeader();
            this.$el.find(".js_password").val('');
        },

        onHide:function(){
            App.hideLoading();
        },
        setHeader: function () {
            var header = new App.UI.UIHeader();
            header.set({
                view: this,
                title: '身份验证',
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
