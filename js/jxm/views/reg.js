define(function (require, exports, module) {
    var Model = require("jxm/model/model");
    var Store = require("jxm/model/store");
    var Template = require("jxm/tpl/reg.tpl");
    var getMsgCodeModel = new Model.getMsgCodeModel();
    var signUpModel = new Model.signUpModel();
    var registerSms = new Model.registerSms();
    var registerCheck = new Model.registerCheck();
    var loginStore = new Store.loginStore();
    var bonusStore = new Store.bonusStore();
    var getCaptcha = new Model.getCaptchaModel();
    var tool = require('jxm/utils/Tool');
    var handle = new tool();
    var self;
    module.exports = App.Page.extend({
        template: Template,
        events: {
            'click #js_startReg': 'doReg',
            'click #js_login': "goLogin",
            'click .js_img_code': 'getCaptcha',
            'blur .js_password':'getPasswordHiding',
            'focus .js_password':'getPasswordHint',
            'click #js_password_eye':'getSwitch',
            'click #js_Website_registration':'registrationLink',//《网站注册协议（会员版）》
            'click .Investor_statement':"Investor"//《合格投资人申明》
        },
        afterMount: function () {
            this.$el.append(this.template)

        },
        registrationLink:function(){
            App.goTo('get_contract?cid=11');
        },
        Investor:function(){
            App.goTo('get_contract?cid=12');
        },
        onShow: function () {
            self=this
            var shareConfig={"link":window.location.origin};
            handle.share(shareConfig);
            this.$el.find(".js_password").val('');
            this.setHeader();
            this.regClear();
            this.getCaptcha()
            handle.orientationTips();
            var query = this.request.query;
            var isbind=query&&query.type||"";
            var invitecodeUrl=  query&&query.invitecode||"";

            var invitecode=sessionStorage.getItem("invitecode")
            if(invitecodeUrl!=""){
                invitecode=invitecodeUrl;
            }
            if(isbind=="bind"){
                this.$el.find("#js_login").html("立即绑定")
            }
            if(invitecode!=""&&invitecode!=null){
                this.$el.find("#js_invite_code").val(invitecode);
                this.$el.find(".invite_code").hide();
            }
            App.hideLoading();
        },
        goLogin: function (e) {
            e.preventDefault();
            var query = this.request.query;
            var isbind=query&&query.type||"";
            if(isbind=="bind"){
                var openId=query&&query.openid||"";
                App.goTo("bind?openid="+openId)
            }else{
                App.goTo("login")
            }

        },
        getPasswordHiding: function(){
           var PasswordHiding= this.$el.find('#js_Password_hint');
            PasswordHiding.hide()
        },
        getPasswordHint: function(){
            var PasswordHint= this.$el.find('#js_Password_hint');
            PasswordHint.show()
        },
        doReg: function (e) {
            e.preventDefault();
            if(this.checkCode()){
                App.hideLoading();
                this.startReg();
            };
        },
        getCaptcha: function () {

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
        startReg:function(){
            var passWord=this.$el.find('.js_password').val();
            var phone_num = this.$el.find('.js_mobile').val();
            var coad_num = this.$el.find('.js_code').val();
            var inviteCode=this.$el.find('#js_invite_code').val()||"";
            var query = this.request.query;
            var openId=query&&query.openid||"";
            var sessionOpenId=bonusStore.get()
            if(openId==""){
                    openId=sessionOpenId
            }
            var source="";
            if(handle.mobileType()=='android'){
                source='02'
            }
            App.showLoading();
            registerCheck.set({"userId": phone_num,"loginPwd":passWord,"msgCaptcha":coad_num,"inviteCode":inviteCode,"openId":openId,"source":source,"version":"1.1"})//组织参数
            registerCheck.exec({
                type: 'get',
                success: function (data) {
                    App.hideLoading();
                    if(data&&data.ret==0){
                        //App.showToast("注册成功");
                        //loginStore.set(data.data);//设置LocalStorge
                        //window.setTimeout(function(){App.goTo("ttl_recommend")},2000);
                        registerSms.exec({
                            type: 'get',
                            success: function (data) {
                                if(data.ret==0){
                                    App.goTo("reg_next")
                                }else{
                                    var msg=data.msg||"error"
                                    App.showToast(msg);
                                }
                            }
                        })
                    }else if(data.ret==100009){
                        App.showToast(data.msg);
                        self.$el.find('.js_code').val("");
                        self.getCaptcha()
                    }else{
                        self.$el.find('.js_code').val("");
                        self.getCaptcha()
                        var msg=data.msg||"error"
                        App.showToast(msg);
                    }
                }
            })
        },
        checkCode:function(){
            var passWord= this.$el.find('.js_password').val();
            var phone_num = $.trim(this.$el.find('.js_mobile').val());
            var coad_num = this.$el.find('.js_code').val();

            var re = /^0?1[123456789]\d{9}$/;
            if (phone_num == "") {
                App.showToast("手机号不能为空");
                return false;
            }
            if (re.test(phone_num) != true) {
                App.showToast("手机号格式不正确");
                return false;
            }
            if(coad_num==""){
                App.showToast("验证码不能为空");
                return false;
            }
            if(!passWord.match(/\D/g)|| /^[a-zA-Z]*$/.test(passWord) || !/\w/.test(passWord)||passWord.length<6){
                App.showToast("密码有误，请输入6~12位，包含数字、字母和符号的组合。");
                return false;
            }
            return true;
        },
        checkMobile: function () {
            var phone_num = $.trim(this.$el.find('.js_mobile').val());
            var re = /^0?1[123456789]\d{9}$/;
            if (phone_num == "") {
                App.showToast("手机号不能为空");
                return false;
            }
            if (re.test(phone_num) != true) {
                App.showToast("手机号格式不正确");
                return false;
            }
            return true;
        },
        onHide:function(){
            this.$el.find('.js_password').val("");
            this.$el.find('.js_mobile').val("");
            this.$el.find('.js_code').val("");
            App.hideLoading();
        },
        getCode: function (e) {
            var self = this;
            var target = $(e.target);
            var phone_num = this.$el.find('.js_mobile').val();
            if (self.checkMobile() !== true || target.hasClass("disabled")) {//如果是灰色的则返回
                return;
            }
            getMsgCodeModel.set({"mobile": phone_num,"type":"1","destination":"1"})//组织参数
            getMsgCodeModel.exec().then(function () {
                self.startCountDown(60);//开始倒计时逻辑
            }).catch(function () {
                //App.showToast("获取验证码失败");
                self.startCountDown(60);//开始倒计时逻辑
            })
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

        regClear:function(){
            var mobile_box=this.$el.find(".js_mobile");
            var mobile_password=this.$el.find(".verification");
            App.UI.UIInputClear(mobile_box,"",null,{"right":5});
            App.UI.UIInputClear(mobile_password,"",null,{"right":100});
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
        setHeader: function () {
            var header = new App.UI.UIHeader();
            header.set({
                view: this,
                title: '注册页',
                back: {
                   // 'tagname': 'back',
                    callback: function () {
                      //  App.goBack()
                    }
                },
                right: null
            });
        }
    })
})
