define(function (require, exports, module) {
    var Model = require("jxm/model/model");
    var Store = require("jxm/model/store");
    var Template = require("jxm/tpl/reg_next.tpl");
    var getMsgCodeModel = new Model.getMsgCodeModel();
    var signUpModel = new Model.signUpModel();
    var registerSms = new Model.registerSms();
    var loginStore = new Store.loginStore();
    var bonusStore = new Store.bonusStore();
    var tool = require('jxm/utils/Tool');
    var handle = new tool();
    var self;
    var smsFlag=false;
    module.exports = App.Page.extend({
        template: Template,
        events: {
            'click #js_startReg': 'doReg',
            "click .code":"getCode"
        },
        afterMount: function () {
            this.$el.append(this.template)
        },
        onShow: function () {
            self=this
            var shareConfig={"link":window.location.origin};
            handle.share(shareConfig);
            this.$el.find("#smsCode").val('');
            this.setHeader();
            smsFlag = true
            self.startCountDown(60);//开始倒计时逻辑
            App.hideLoading();
        },
        doReg: function (e) {
            e.preventDefault();
                this.startReg();
        },
        startReg:function(){
            var smsCode = this.$el.find('#smsCode').val();
            if(smsCode==""){
                App.showToast("请正确输入验证码")
                return
            }
            App.showLoading();
            signUpModel.set({"smsCode": smsCode})//组织参数
            signUpModel.exec().then(function (data) {
                App.hideLoading();
                if(data&&data.ret==0){
                    App.showToast("注册成功");
                    loginStore.set(data.data);//设置LocalStorge
                    window.setTimeout(function(){App.goTo("ttl_recommend")},2000);
                }else if(data.ret==100005||data.ret==100006||data.ret==110022){
                    App.showToast(data.msg);
                    App.goTo("reg")
                }else{
                    var msg=data.msg||"error"
                    App.showToast(msg);
                }
            }).catch(function () {
                App.hideLoading();
                //TODO
            })
        },
        onHide:function(){
            App.hideLoading();
        },
        getCode: function (e) {
            var self = this;
            if(smsFlag){
                return
            }
            registerSms.exec({
                type: 'get',
                success: function (data) {
                    if(data.ret==0){
                        smsFlag = true
                        self.startCountDown(60);//开始倒计时逻辑
                    }else{
                        App.showToast(data.msg)
                    }

                }
            })
        },
        startCountDown: function (time) {
            var self = this;
            var el = this.$el.find('.code');
            el.addClass("disabled");
            self._tick = time;
            (function f() {
                if (self.codeTimer) {
                    window.clearTimeout(self.codeTimer);
                    self.codeTimer = null;
                }
                var sec = parseInt(self._tick);
                self._tick = sec <= 0 ? self.tick : sec;
                if (sec <= 0) {
                    smsFlag=false;
                    window.clearTimeout(self.codeTimer);
                    el.removeClass("disabled");
                    el.html("重新获取");
                    return;
                }
                el.html("已发送（" + self._tick + "秒）");
                self._tick--;
                self.codeTimer = setTimeout(function () {
                    f();
                }, 1000);
            })();
        },
        setHeader: function () {
            var header = new App.UI.UIHeader();
            header.set({
                view: this,
                title: '注册页',
                back: {
                    'tagname': 'back',
                    callback: function () {
                        App.goTo("reg")
                    }
                },
                right: null
            });
        }
    })
})
