define(function (require, exports, module) {
    var Model = require("jxm/model/model");
    var tool = require('jxm/utils/Tool');
    var handle = new tool();
    var Template = require("jxm/tpl/reset_password.tpl");
    var ChangeTradePassword = new Model.ChangeTradePassword();
    var ResetTransactionPwd = new Model.ResetTransactionPwd();
    var setTransactPwdModel = new Model.setTransactPwdModel();
    var submitFlag=false;
    var pd_1="";
    var pd_2="";
    var message = '网络错误，请稍后重试';
    var self;
    module.exports = App.Page.extend({
        template: Template,
        events: {
            'click #js_confirm': 'doConfirm'
        },
        afterMount: function () {

        },
        onHide: function(){

        },
        beforeIn:  function () {
            if(handle.mobileType()=="android"){
                window.app.setMoneyPsd()
            }else if(handle.mobileType()!="html") {
                handle.setupWebViewJavascriptBridge(function (bridge) {
                    bridge.callHandler('setPassword', null, function (response) {
                    })
                })
            }
        },
        doConfirm:function(){
            var query=self.request.query;
            if(query.soure==0){
                self.setPassWord()
            }else if(query.soure==1){
                self.submit()
            }else if(query.soure==2){
                self.startConfirm()
            }
        },
        onShow: function () {
            pd_1="";
            pd_2="";
            submitFlag=false;
            self=this
            self.$el.html(this.template)
           $("body").css("background-color","white");
            this.setHeader();
            var $input = $(".fake-box input");
            $("#js_confirm").css("display","none");
            $("#sixPass_tips").css("display","none");
            $("#pwd-input").on("input", function() {
                var pwd = $(this).val().trim();
                for (var i = 0, len = pwd.length; i < len; i++) {
                    $input.eq("" + i + "").val(pwd[i]);
                }
                $input.each(function() {
                    var index = $(this).index();
                    if (index >= len) {
                        $(this).val("");
                    }
                });
                if (len == 6) {
                  if(submitFlag){
                      pd_2=$("#pwd-input").val();
                      if(pd_1!=pd_2){
                          submitFlag=false
                          pd_1="";
                          pd_2="";
                          $("#pwd-input").val("");
                          $("#sixPass_title").html("请输入6位数字密码");
                          $("#sixPass_tips").css("display","block");
                          $("#sixPass_tips").html("两次密码输入不一致");
                          $input.each(function() {
                              $(this).val("");
                          });
                          $("#js_confirm").css("display","none");

                        return
                      }
                      $("#js_confirm").css("display","block");
                      console.log("提交  pd_2   "+pd_2+"    pd_1  "+pd_1)
                  }else{
                      pd_1=$("#pwd-input").val()
                      if(!pd_1.match(/\d{6}/)){
                          $("#sixPass_tips").css("display","block");
                          $("#sixPass_tips").html("请输入6位数字密码");
                          $("#pwd-input").val("")
                          $input.each(function() {
                              $(this).val("");
                          });
                          return
                      }
                      submitFlag=true
                      $("#pwd-input").val("")
                      $input.each(function() {
                          $(this).val("");
                      });
                      $("#sixPass_title").html("请重复输入6位数字密码")
                  }
                }else{
                    $("#js_confirm").css("display","none");
                }
            });
            App.hideLoading();
        },
        submit:function(){
            App.showLoading();
            var oldPwd=sessionStorage.getItem("oldPassword")
            ChangeTradePassword.exec({
                type: 'post',
                data:{
                    'oldPwd':oldPwd,
                    'newPwd':pd_1
                },
                success: function(data){
                    App.hideLoading();
                    if(data.ret == 0){
                        sessionStorage.removeItem("oldPassword")
                        App.showToast("修改交易密码成功");
                        App.goTo("setting");
                    }else if(data.ret == 999001){
                            handle.goLogin();
                    }else{
                        pd_1="";
                        pd_2=""
                        $("#pwd-input").val("")
                        submitFlag=false
                        $("#sixPass_tips").css("display","block");
                        $("#sixPass_tips").html(data.msg );
                        $input.each(function() {
                            $(this).val("");
                        });
                    }
                },
                error: function(){
                    App.hideLoading();
                    App.showToast(message);
                }
            })
        },
        setPassWord: function(password){
            var query = self.request.query;
            App.showLoading();
            setTransactPwdModel.set({'transactPwd': pd_1});
            setTransactPwdModel.exec().then(function(data){
                App.hideLoading();
                if(data.ret == 0){
                    App.showToast('设置交易密码成功!');
                    setTimeout(function(){
                        if(query&&query.origin=="rebind"){
                            App.goTo('add_card');
                        }else{
                            App.goTo("setting");
                        }
                    },2000);
                }else if(data.ret == 110001){
                    //未绑定银行卡
                    App.showToast('未绑定银行卡');
                    setTimeout(function(){
                        App.goTo('bind_card_new');
                    },2000);
                }else if(data.ret == 999001){
                    handle.goLogin();
                }else{
                    pd_1="";
                    pd_2=""
                    $("#pwd-input").val("")
                    submitFlag=false
                    $("#sixPass_tips").css("display","block");
                    $("#sixPass_tips").html(data.msg );
                    $input.each(function() {
                        $(this).val("");
                    });
                }
            }).catch(function(){
                pd_1="";
                pd_2=""
                $("#pwd-input").val("")
                submitFlag=false
                $input.each(function() {
                    $(this).val("");
                });
                App.hideLoading();
                App.showToast(message);
            });
        },
        startConfirm: function () {
            var token = this.request.query.token;
            ResetTransactionPwd.set({"tradePassword": pd_1, "token": token})
            ResetTransactionPwd.exec().then(function (data) {
                if (data && data.ret == 0) {
                    App.showToast("修改交易密码成功");
                    App.goTo("setting");
                } else if (data.ret == 999001){
                    handle.goLogin();
                }else{
                    pd_1="";
                    pd_2=""
                    $("#pwd-input").val("")
                    submitFlag=false
                    $("#sixPass_tips").css("display","block");
                    $("#sixPass_tips").html(data.msg );
                    $input.each(function() {
                        $(this).val("");
                    });
                }
            }).catch(function () {
                //TODO
            })
        },
        setHeader: function () {
            var title=""
            var query=self.request.query;
            if(query.soure==0){
                title='设置交易密码'
            }else if(query.soure==1){
                title='修改交易密码'
            }else if(query.soure==2){
                title='忘记交易密码'
            }
            var header = new App.UI.UIHeader();
            header.set({
                view: this,
                title: title,
                back: {
                    'tagname': 'back',
                    callback: function () {
                        self.promptAlert = handle.prompt('是否退出交易密码设置','是', '否', function(){
                            App.goTo("setting");
                        },null);
                        self.promptAlert.show();

                    }
                },
                right: null
            });
        }
    })
})
