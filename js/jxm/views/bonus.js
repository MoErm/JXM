define(function (require, exports, module) {
    var Model = require("jxm/model/model");
    var bonus = require("jxm/tpl/bonus.tpl");

    var openBonus = new Model.openBonus();
    var checkStatus = new Model.checkStatus();
    var Store = require("jxm/model/store");
    var tool = require('jxm/utils/Tool')
    var handle = new tool();
    var payLayer = require("jxm/common/common");
    var self;
    var oldPhoneflag=false;
    var openFlag=false;
    var finishFlag=false;
    var appid;
    //接口
    module.exports = App.Page.extend({
        template: bonus,
        events: {
            'click .bonus_btn': 'changePhone',
            'click .bonus_img3': 'openBonus',
            'input .bonus_input': 'openCheck'

        },
        beforeIn:  function () {
            App.showLoading();
            var query = this.request.query;
            var sessionOpenId=query.openId
            if(query.openId==null||query.openId==""){

                if(sessionOpenId==""||sessionOpenId==null){
                    var url="http://"+location.hostname+"/apps/api/user/shareAuthrize?cid="+query.cid;

                    var redirect_uri_in="https://open.weixin.qq.com/connect/oauth2/authorize?appid="+query.appid+"&redirect_uri="+encodeURIComponent(url)+"&response_type=code&scope=snsapi_userinfo&state=jiaxinmore#wechat_redirect"


                            window.location.href=redirect_uri_in;

                }else{
                    self.checkBonus()
                }

            }else{
                self.checkBonus()
            }


        },
        checkBonus:function(){
            App.showLoading();
            var query = this.request.query;
            var sessionOpenId=query.openId
            checkStatus.set({ 'cid': query.cid,
                'openId': sessionOpenId})
            checkStatus.exec({
                type: "get",
                success: function (data){

                    if(data.ret == 0 ){
                        sessionStorage.setItem("bonusLoginUrl",data.data.wechatAuthUrl)

                        sessionStorage.setItem("invitecode",data.data.invitationCode);

//                        App.showToast(JSON.stringify(data)+"invitecode:  "+sessionStorage.getItem("invitecode"),10000)
//                        return
                        if(data.data.status==00){
//                            App.goTo("bonusExpired")
                           if( _.isUndefined(data.data.mobile)){
                               App.goTo("bonusExpired?userMode="+data.data.userMode)
                           }else{
                               App.goTo("bonusExpired?mobile="+data.data.mobile+"&balance="+data.data.balance+"&userMode="+data.data.userMode)
                           }

                        }else if(data.data.status==02||data.data.status==01){
//                            var urlstr="bonusOpen?cid="+query.cid+"&openId="+sessionOpenId+"&mobile="+data.data.mobile+"&appid="+query.appid+"&userMode="+data.data.userMode
//                            App.showToast(JSON.stringify(data)+urlstr,10000)
//                            return
                            appid=data.data.appid;
//                            App.showToast("data.data.appid "+data.data.appid+"  query.appid  "+query.appid,100000)
                            App.goTo("bonusOpen?cid="+query.cid+"&openId="+sessionOpenId+"&mobile="+data.data.mobile+"&userMode="+data.data.userMode+"&appid="+data.data.appid)
                        }
                        else if(data.data.status==99){
                            var url="http://"+location.hostname+"/apps/api/user/shareAuthrize?cid="+query.cid
                            var redirect_uri="https://open.weixin.qq.com/connect/oauth2/authorize?appid="+data.data.appid+"&redirect_uri="+encodeURIComponent(url)+"&response_type=code&scope=snsapi_userinfo&state=jiaxinmore#wechat_redirect"

                            if(window.WebViewJavascriptBridge){
                                window.WebViewJavascriptBridge.callHandler('openUrl',{"url": redirect_uri},function(response) {})
                            }else{
                                window.location.href=redirect_uri;
                            }
                            //跳转授权
                        }
                        else if(data.data.status==03){
                            App.showLoading();
                            self.mobile=data.data.mobile;
                            self.showPage()

                        }
                    }else if(data.ret == 999001){
                        handle.goLogin();
                    }else{
                        App.showToast(data.msg)
                    }

                },
                error:function(){
                    App.hideLoading();
                    App.showToast(message);
                }
            })
        },
        openBonus:function(){
            if(self.mobile==""||self.mobile==null){
                oldPhoneflag=true
            }
            if(oldPhoneflag){
                var phoneNum=self.$el.find(".bonus_input").val();
                if(phoneNum.length<11){
                    self.$el.find(".bonus_img3").removeClass("bonus_rotate")
                    return
                }else{
                    if(!handle.checkTel(phoneNum)){
                        return
                    }
                    self.$el.find(".bonus_img3").addClass("bonus_rotate")
                    window.setTimeout(function(){self.doOpen();},2000);
                }
            }else{
                self.$el.find(".bonus_img3").addClass("bonus_rotate")
                window.setTimeout(function(){self.doOpen(); self.$el.find(".bonus_img3").removeClass("bonus_rotate");},2000);
            }


        },
        doOpen:function(){
            if(openFlag){
                return
            }
            openFlag=true;
            var query = this.request.query;
            var mobile;
            var openId=query.openId
            if(oldPhoneflag||self.mobile==null||self.mobile==""){
                mobile=self.$el.find(".bonus_input").val();

            }else{
                mobile=self.mobile;
            }
            var sendData={
                'cid': query.cid,
                'mobile': mobile,
                'openId':  openId
            }
            openBonus.set(sendData);
            openBonus.exec({
                type: 'post'
            }).then(function (data) {
                openFlag=false;
                App.hideLoading();
                if(data&&data.ret==0){
                    App.goTo("bonusOpen?cid="+query.cid+"&mobile="+mobile+"&openId="+openId+"&appid="+query.appid)
                }else if(data.ret==100203) {
                    self.promptAlert = handle.alert(data.msg);
                    self.promptAlert.show();
                    self.$el.find(".bonus_img3").removeClass("bonus_rotate")
                }else if(data.ret==100201) {
                    App.goTo("bonusOpen?cid="+query.cid+"&mobile="+mobile+"&openId="+openId+"&appid="+query.appid)
                }else{
                        App.hideLoading();
                        App.showToast(data.msg || '网络错误')

                }
            }).catch(function (error) {
                App.hideLoading();
                App.showToast(error.msg || '网络错误')
            })
        },
        openCheck:function(){
            var phoneNum=self.$el.find(".bonus_input")
            phoneNum.val(phoneNum.val().replace(/[^0-9]+/g,''))
            var phone=phoneNum.val()
            if(phone.length<11){
                self.$el.find("#openImg").attr("src","./images/bonus_openBtn_grey.png")
//                self.$el.find("#openImg").attr("src","./images/bonus_openBtn.png")
            }else{
                if(!handle.checkTel(phone)){
                    return
                }
//                self.$el.find("#openImg").src=("./images/bonus_openBtn_grey.png")
                self.$el.find("#openImg").attr("src","./images/bonus_openBtn.png")
            }
        },
        initialize: function () {
            self = this;
        },
        changePhone:function(){
            var query = this.request.query;
            self.$el.find(".bonus_input").attr("placeholder","当前手机号："+query.mobile)
            self.$el.find("#bonus_old").css("display","none")
            self.$el.find("#bonus_new").css("display","block")
            self.$el.find("#openImg").attr("src","./images/bonus_openBtn_grey.png")
//            self.$el.find("#openImg").attr("src","./images/bonus_openBtn.png")
            oldPhoneflag=true;
        },

        onShow: function () {
            handle.share();

            App.showLoading();
//            self.checkShow=setInterval(function(){
//                self.showPage();
//            },100)

            return;
        },
        afterMount: function () {


        },
        showPage:function(){

                this.setHeader();
                var query = this.request.query;
                self.data={"mobile":self.mobile}
                self.$el.html(_.template(this.template)(self.data));
                App.hideLoading();
                finishFlag=false;
                clearInterval(self.checkShow);


        },


        setHeader: function () {
            var header = new App.UI.UIHeader();
            header.set({
                view: this,
                back: {
                    'tagname': '',
                    callback: function () {
                    }
                },
                center: {
                    'tagname': 'title', 'value': ['加薪猫理财']
                },
                right: null
            });
        },

        onHide: function () {
        }
    })
})