define(function (require, exports, module) {
    var Model = require("jxm/model/model");
    var Store = require("jxm/model/store");
    var Template = require("jxm/tpl/bind.tpl");
    var loginStore = new Store.loginStore();
    var loginModel = new Model.loginModel();
    var bindWechat = new Model.bindWechat();
    var getCaptcha = new Model.getCaptchaModel();
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
            'click #js_Immediate_binding': 'doBind',
            'click #js_img_code': 'getCaptcha',
            'click #js_password_eye':'getSwitch'
        },
        goToReg: function (e) {
            e.preventDefault()
            var query = this.request.query;
            var openId=query&&query.openid||"";
            App.goTo("reg?type=bind&openid="+openId)
        },
        goToGetPass: function (e) {
            e.preventDefault();
            var query = this.request.query;
            var openId=query&&query.openid||"";
            App.goTo("get_password?type=bind&openid="+openId)
        },
        doBind: function (e) {
            e.preventDefault();
            if (this.checkCode()) {
                this.startBind();
            }
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
        startBind: function () {
            var phone_num = this.$el.find('.js_mobile').val();
            var passWord = this.$el.find('.js_password').val();
            var code_num = this.$el.find('.js_code').val();
            var query = this.request.query;
            var openId=query&&query.openid||"";
            App.showLoading();
            bindWechat.set({"userId": phone_num, "loginPwd": passWord, "captcha": code_num,"openId":openId})//组织参数
            bindWechat.exec().then(function (data) {
                if(data&&data.ret==0){
                    App.showToast("绑定成功");
                    loginStore.set(data.data);//设置LocalStorge
                    window.setTimeout(function(){App.goTo("ttl_recommend");},2000);
                }else{
                    App.hideLoading();
                    self.getCaptcha();
                    var msg=data.msg||"系统错误,请稍后重试";
                    App.showToast(msg);
                }

            }).catch(function () {
                //TODO
                App.hideLoading();
                App.showToast("网络错误,请稍后重试");
            })
        },
        getCaptcha: function () {
            var self = this;
            getCaptcha.exec({type:"get"}).then(function (json) {
                if (json && json.ret == 0) {
                    var img = "data:image/gif;base64,"+json.data.captchaData;
                    var js_identify_code=self.$el.find("#js_identify_code");
                    js_identify_code.show();
                    //js_identify_code.attr("data-show","true")
                    js_identify_code.data("show","true")
                    self.$el.find("#js_img_code").attr("src", img);
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
            var js_identify_code =this.$el.find('#js_identify_code');
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
            this.regClear();
            this.$el.find(".js_password").val('');
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
                title: '绑定',
                back: {
                    'tagname': '',
                    callback: function () {
                      //  App.goBack('')
                    }
                },
                right: null
            });
        }
    })
})
