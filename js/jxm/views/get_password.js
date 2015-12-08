define(function (require, exports, module) {
    var Model = require("jxm/model/model");
    var Template = require("jxm/tpl/get_password.tpl");
    var getMsgCodeModel = new Model.getMsgCodeModel();
    var RetrievePassword= new Model.RetrievePassword();
    var tool = require('jxm/utils/Tool');
    var handle = new tool();
    var self;
    module.exports = App.Page.extend({
        template: Template,
        initialize: function () {
            self=this;
            this.count = 0
        },
        events: {
            'click .code': 'getCode',
            'click #js_reset':'doReset',
            'click #js_password_eye':'getSwitch'
        },

        getCount: function () {
            return this.count++
        },
        afterMount: function () {
            this.$el.append(this.template)
        },
        onShow: function () {
            this.$el.find(".js_mobile").val('');
            this.$el.find(".js_password").val('');
            this.$('.count').html(this.getCount());
            this.setHeader();
            this.regClear();
            App.hideLoading();
        },
        onHide:function(){
            App.hideLoading();
        },
        doReset: function (e) {
            e.preventDefault();
            if(this.checkCode()){
                App.hideLoading();
                this.startReset();
            };
        },
        getSwitch:function(){
            var passWord = this.$el.find('.js_password');
            var passwordEye = this.$el.find('#js_password_eye');
            if(passWord.attr('type')=='password'){
                passWord.attr('type','text');
                passwordEye.css('opacity',"1")
            }else{
                passWord.attr('type','password')
                passwordEye.css('opacity',"")
            }
        },

        startReset:function(){
            var phone_num = this.$el.find('.js_mobile').val();
            var coad_num = this.$el.find('.js_code').val();
            var passWord=this.$el.find('.js_password').val();
            var query = this.request.query;
            var openId=query&&query.openid||"";
            App.showLoading();
            RetrievePassword .set({"userId": phone_num,"msgCaptcha":coad_num,"loginPwd":passWord,"openId":openId})//组织参数
            RetrievePassword .exec().then(function (data) {
                App.hideLoading();
                if(data&&data.ret==0){
                    App.showToast("重置成功");
                    setTimeout(function(){
                        var isBind=self.request.query&&self.request.query.type||"";
                        if(isBind=="bind"){
                            App.goTo("bind")
                        }else{
                            App.goTo("login");
                        }
                    },2000);
                }else if (data.ret == 999001){
                    handle.goLogin();
                }else{
                    var msg=data.msg||"系统错误";
                    App.showToast(msg);
                }
            }).catch(function () {
                App.hideLoading();
                App.showToast("网络错误,请稍后重试");
                //TODO
            })
        },
        checkMobile: function () {
            var phone_num = $.trim(this.$el.find('.js_mobile').val());
            var re = /^0?1[123456789]\d{9}$/;

            if (re.test(phone_num) != true) {
                App.showToast("请输入正确手机号");
                return false;
            }
            return true;

        },
        checkCode:function(){
            var phone_num = $.trim(this.$el.find('.js_mobile').val());
            var coad_num = this.$el.find('.js_code').val();
            var passWord=this.$el.find('.js_password').val();
            var re = /^0?1[123456789]\d{9}$/;
            if (phone_num == "") {
                App.showToast("手机号不能为空");
                return false;
            }
            if (re.test(phone_num) != true) {
                App.showToast("手机号格式不正确");
                return false;
            }
            else  if(coad_num==""){
                App.showToast("验证码不能为空");
                return false;
            }
            else if(!passWord.match(/\D/g)|| /^[a-zA-Z]*$/.test(passWord) || !/\w/.test(passWord)||passWord.length<6){
                App.showToast("密码有误，请输入6~12位，包含数字、字母和符号的组合。");
                return false;
            }
            return true;
        },
        getCode: function (e) {
            var self = this;
            var target = $(e.target);
            var phone_num = this.$el.find('.js_mobile').val();
            if (self.checkMobile() != true || target.hasClass("disabled")) {//如果是灰色的则返回
                return;
            }
            getMsgCodeModel.set({"mobile": phone_num,"type":"1","destination":"2"})//组织参数
            getMsgCodeModel.exec().then(function () {
                self.startCountDown(60);//开始倒计时逻辑
            }).catch(function () {
                //App.showToast("获取验证码失败");
                self.startCountDown(60);//开始倒计时逻辑
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
        regClear:function(){
            var mobile_box=this.$el.find(".js_mobile");
            App.UI.UIInputClear(mobile_box,"",null,{"right":5});
        },

        setHeader: function () {
            var header = new App.UI.UIHeader();
            header.set({
                view: this,
                title: '找回密码',
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