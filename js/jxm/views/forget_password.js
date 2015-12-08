define(function (require, exports, module) {
    var Model = require("jxm/model/model");
    var Store = require("jxm/model/store");
    var Template = require("jxm/tpl/forget_password.tpl");
    var tool = require('jxm/utils/Tool');
    var handle = new tool();
    var getMsgCodeModel = new Model.getMsgCodeModel();
    var checkTranPwd = new Model.checkTranPwd();
    module.exports = App.Page.extend({
        template: Template,
        events: {
            'click #js_next': 'doNext',
            'click .code':'getCode',
            'click #js_Code':'checkId'
        },
        doNext: function (e) {
            e.preventDefault();
            if(this.checkCode()){
                this.goNext();
            }
        },
        goNext:function(){
            var idCard=this.$el.find('#idCard').val();
            var code_num = this.$el.find('#js_code').val();
            checkTranPwd.set({"idNo":idCard,"msgCode":code_num});
            checkTranPwd.exec().then(function (data) {
                if(data&&data.ret==0){
                    App.goTo("forget_password_tips?token="+data.data.token);
                }else if (data.ret == 999001){
                    handle.goLogin();
                }else{
                    var msg=data.msg||"error";
                    App.showToast(msg);
                }
            }).catch(function () {
                App.showToast("网络错误,请稍后重试");
            })
        },
        checkCode:function(){
            var code_num = this.$el.find('#js_code').val();
             if(!this.checkId()){
                 App.showToast('身份证号不正确');
                 return false;
             }else if(code_num==""){
                 App.showToast('请输入正确的验证码');
                 return false;
             }else{
                 return true;
             }
        },

        regClear:function(){
            var mobile_box=this.$el.find("#idCard");
            App.UI.UIInputClear(mobile_box,"",null,{"right":5});
        },
            checkId: function (e) {
            var idCard=this.$el.find('#idCard');
            var idard=this.$el.find('#idCard').val();
            var checkId=this.$el.find('#checkId');
            var myId=/(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/;
            var dd=myId.test(idard);
            if(dd !=true){
                App.showToast('身份证号不正确')
               return false;
               }else{
                return true;
               }
        },
        getCode: function (e) {
            var self = this;
            var target = $(e.target);
            var code_num = this.$el.find('#js_code').val();
            if (self.checkId() != true || target.hasClass("disabled")) {//如果是灰色的则返回
                return;
            }
            getMsgCodeModel.set({"type":"1","destination":"4"})
            getMsgCodeModel.exec().then(function () {
                self.startCountDown(60);
            }).catch(function () {
                self.startCountDown(60);
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
        getCount: function () {
            return this.count++
        },
        afterMount: function () {
            this.$el.append(this.template)
        },
        onShow: function () {
            this.$el.find("#idCard").val('');
            this.$el.find("#js_code").val('');
            this.setHeader();
            this.regClear();
            App.hideLoading();
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
