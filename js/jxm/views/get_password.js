define(function (require, exports, module) {
    var Model = require("jxm/model/model");
    var Template = require("jxm/tpl/get_password.tpl");
    var getMsgCodeModel = new Model.getMsgCodeModel();
    var getCaptcha = new Model.getCaptchaModel();
    var RetrievePassword= new Model.RetrievePassword();
    var loginPwdResetCheck= new Model.loginPwdResetCheck();
    var loginPwdResetSms= new Model.loginPwdResetSms();
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
            'click #js_reset':'doReset',
            'click .js_img_code': 'getCaptcha',
            'click #js_password_eye':'getSwitch'
        },

        getCount: function () {
            return this.count++
        },
        afterMount: function () {
            this.$el.append(this.template)
        },
        onShow: function () {
            self=this
            this.$el.find(".js_mobile").val('');
            this.$el.find(".js_password").val('');
            this.$('.count').html(this.getCount());
            this.setHeader();
            this.regClear();
            this.getCaptcha();
            App.hideLoading();
        },
        onHide:function(){
            this.$el.find(".js_code").val('');
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
        getCaptcha: function () {
            var self = this;
            getCaptcha.exec({type:"get"}).then(function (json) {
                if (json && json.ret == 0) {
                    var img = "data:image/gif;base64,"+json.data.captchaData;
                    var js_identify_code=self.$el.find(".js_identify_code");
                    js_identify_code.show();
                    js_identify_code.data("show","true")
                    self.$el.find(".js_img_code").attr("src", img);
                } else {
                    App.showToast("获取验证码失败");
                }
            }).catch(function () {
                App.showToast("获取验证码失败");
            })
        },
        startReset:function(){
            var phone_num = this.$el.find('.js_mobile').val();
            var coad_num = this.$el.find('.js_code').val();
            var passWord=this.$el.find('.js_password').val();
            App.showLoading();
            loginPwdResetCheck.set({"mobile": phone_num,"picCaptcha":coad_num,"newPassword":passWord})//组织参数
            loginPwdResetCheck.exec().then(function (data) {
                App.hideLoading();
                if(data&&data.ret==0){
                    loginPwdResetSms.exec({
                        type: 'get',
                        success: function (data) {
                            if(data.ret==0){
                                var isBind=self.request.query&&self.request.query.type||"";
                                if(isBind=="bind"){
                                    App.goTo("get_password_next?type=bind")
                                }else{
                                    App.goTo("get_password_next");
                                }
                            }else{
                                var msg=data.msg||"error"
                                App.showToast(msg);
                            }

                        }
                    })

                }else if (data.ret == 999001){
                    handle.goLogin();
                }else if (data.ret == 100009){

                    var msg=data.msg||"系统错误";
                    App.showToast(msg);
                    self.$el.find('.js_code').val("");
                    self.getCaptcha()
                }else{
                    var msg=data.msg||"系统错误";
                    self.$el.find('.js_code').val("");
                    self.getCaptcha()
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