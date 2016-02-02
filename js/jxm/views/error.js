//我的银行卡
define(function (require, exports, module) {
    var error = require('jxm/tpl/error.tpl');
    var Model = require("jxm/model/model");
    var getAddrModel = new Model.getAddrModel();
    var tool = require('jxm/utils/Tool');
    var handle = new tool();
    var message = '网络错误，请稍后重试';
    var self;
    module.exports = App.Page.extend({
        events: {
            'click #backToIndex': 'backToIndex'
        },
        onShow: function () {
            self.setHeader()
            self.$el.html(error);
            self.showMsg()
            App.hideLoading();
            return
        },
        backToIndex:function(){
            if(handle.mobileType()=="android"){
                window.app.goBack()
            }else if(handle.mobileType()=="ios") {
                handle.setupWebViewJavascriptBridge(function (bridge) {
                    bridge.callHandler('back', null, function (response) {
                    })
                })
            }else{
                App.goTo("ttl_recommend")
            }
        },
        showMsg:function(){
            var query = this.request.query;
            var width=document.body.clientWidth;
            var errorHeight=width*0.6*0.7;
            self.$('.errorMsg').css("height",errorHeight)
            self.$('.errorText').css("margin-top",errorHeight/2.3)
            self.$('.errorText').css("margin-left",width*0.7*0.8*0.1)
            self.$('.errorText').css("width",width*0.7*0.8)
            self.$('.errorImg').css("margin-left",width*0.2)
            var msg
            if(query&&query.errorMsg){
                msg=decodeURI(query.errorMsg)
            }else{
                msg="出错啦"
            }


            self.$('.errorText').html(msg)
        },
        setHeader: function () {
            var header = new App.UI.UIHeader();
            header.set({
                view: this,
                title: '加薪猫',
                back: {
                    'tagname': 'back',
                    callback: function () {
                        if(handle.mobileType()=="android"){
                            window.app.goBack()
                        }else if(handle.mobileType()=="ios") {
                            handle.setupWebViewJavascriptBridge(function (bridge) {
                                bridge.callHandler('back', null, function (response) {
                                })
                            })
                        }else{
                            App.goTo("ttl_recommend")
                        }
                    }
                },
                right: null
            });
        },
        afterMount: function () {
            self=this
        },
        onHide: function(){

        }
    })
})










