define(function (require, exports, module) {
    var Model = require("jxm/model/model");
    var Store = require("jxm/model/store");
    var Template = require("jxm/tpl/login.tpl");
    var loginStore = new Store.loginStore();
    var loginModel = new Model.loginModel();
    var getCaptcha = new Model.getCaptchaModel();
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
            'click .reg': 'goToReg',
            'click .getpsswrd': 'goToGetPass',
            'click .js_startLogin': 'doLogin',
            'click .js_img_code': 'getCaptcha',
            'click .js_password_eye':'getSwitch'
        },
        goToReg: function (e) {
            e.preventDefault()
            App.goTo("reg")
        },
        goToGetPass: function (e) {
            e.preventDefault()
            App.goTo("get_password")
        },
        doLogin: function (e) {
            e.preventDefault();
            if (this.checkCode()) {
                this.startLogin();
            }
        },
        getSwitch:function(){
            var passWord = self.$el.find('.js_password');
            var passwordEye = self.$el.find('.js_password_eye');
            if(passWord.attr('type')=='password'){
                passWord.attr('type','text');
                passwordEye.css('opacity',"1")
            }else{
                passWord.attr('type','password')
                passwordEye.css('opacity',"")
            }
        },
         startLogin: function () {
            var phone_num = this.$el.find('.js_mobile').val();
            var passWord = this.$el.find('.js_password').val();
            var code_num = this.$el.find('.js_code').val();
             var query = this.request.query;
             var openId=query&&query.openid||"";
             var source="";
             if(handle.mobileType()=='android'){
                 source='02'
             }
            App.showLoading();
//            loginModel.set({"userId": phone_num, "loginPwd": passWord, "captcha": code_num})
             var sendData={
                 "userId": phone_num, "loginPwd": passWord, "captcha": code_num,"openId":openId,"source":source
             }

            //loginModel.set({"userId": phone_num, "loginPwd": passWord, "captcha": code_num,"openId":openId})
            loginModel.set(sendData)
            loginModel.exec().then(function (data) {
                if(data&&data.ret==0){
                    loginStore.set(data.data);
                    var expireDate = new Date();
                    expireDate.setDate(expireDate.getDate()+7);
                   document.cookie="JSESSIONID="+data.data.jsessionid+";path=/;expires="+expireDate.toGMTString();
                    if(self.request.query&&self.request.query.backurl){
                        window.location=window.decodeURIComponent(self.request.query.backurl)
                    }else{
                        App.goTo("list");
                    }

                }else{
                    App.hideLoading();
                    self.getCaptcha();
                    var msg=data.msg||"系统错误";
                    App.showToast(msg);
                }

            }).catch(function () {
                App.showToast("网络错误,请重试");
                App.hideLoading();
            })
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
        checkCode: function () {
            var phone_num = $.trim(this.$el.find('.js_mobile').val());
            var passWord = this.$el.find('.js_password').val();
            var code_num = this.$el.find('.js_code').val();
            var js_identify_code =this.$el.find('.js_identify_code');
            var re = /^0?1[123456789]\d{9}$/;
            if (phone_num == "") {
                App.showToast("手机号不能为空");
                return false;
            }
            if (re.test(phone_num) != true) {
                App.showToast("手机号格式不正确");
                return false;
            }
            if (!passWord.match(/\D/g) || /^[a-zA-Z]*$/.test(passWord) || !/\w/.test(passWord) || passWord.length < 6) {
                App.showToast("密码有误，请输入6~12位，包含数字、字母和符号的组合。");
                return false;
            }
            if(js_identify_code.data("show")=="true"&&code_num == "") {
                App.showToast("验证码不能为空");
                return false;
            }
            return true;
        },

        getCount: function () {
            return this.count++
        },
        afterMount: function () {
//            if(handle.isLogin()){
//                if(self.request.query&&self.request.query.backurl){
//                   // window.location=window.decodeURIComponent(self.request.query.backurl)
//                }else{
//                    App.goTo("list");
//                }
//            };
            this.$el.append(this.template);
        },
        onShow: function () {
            var query = this.request.query;
            var openid=query&&query.openid||"";
            if(openid!=""){
                sessionStorage.setItem("openid",openid);
            }

            this.$el.find(".js_mobile").val('');
            this.$el.find(".js_password").val('');
            App.hideLoading();
            this.regClear();
            this.setHeader();
            var shareConfig={"link":window.location.origin};
            handle.share(shareConfig);
        },
        regClear:function(){
            var mobile_box=this.$el.find(".js_mobile");
            App.UI.UIInputClear(mobile_box,"",null,{"right":5});
        },

        onHide:function(){
            App.hideLoading();
        },
        setHeader: function () {
            var header = new App.UI.UIHeader();
            header.set({
                view: this,
                title: '登录',
                back: {
                   // 'tagname': 'back',
                    callback: function () {
                  //      App.goBack()
                    }
                },
                right: null
            });
        }
    })
})
