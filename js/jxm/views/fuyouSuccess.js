define(function (require, exports, module) {
    var Model = require("jxm/model/model");
    var Store = require("jxm/model/store");
    var Template = require("jxm/tpl/fuyouSuccess.tpl");
    var fuyouTradeInfo = new Model.fuyouTradeInfo();

    var Store = require("jxm/model/store");
    var loginStore = new Store.loginStore();
    var tool = require('jxm/utils/Tool')
    var handle = new tool();
    var payLayer = require("jxm/common/common");
    var self;
    //接口
    module.exports = App.Page.extend({
        events: {

        },
        initialize: function () {
            self = this;
        },
        onShow: function () {
            handle.share();
            this.setHeader();
            self.$el.html(_.template(Template));
            var query = this.request.query;
            var msg;
            if(query&&query.msg){
                msg=decodeURI(query.msg);
            }else{
                msg="成功"
            }
            self.$('.fuyouSuccess_txt1').html(msg)
            self.initTime()
            App.hideLoading()

            return
        },
        initTime:function(){
            var time=2
            self.countdown=setInterval(function(){
                if(time<=0){
                    clearInterval(self.countdown);
                    if(handle.mobileType()=="android"){
                        window.app.goBack()
                    }else if(handle.mobileType()=="ios") {
                        handle.setupWebViewJavascriptBridge(function (bridge) {
                            bridge.callHandler('back', null, function (response) {
                            })
                        })
                    }else{
                        App.goTo("my_invest")
                    }
                }
                console.log(time)
                self.$(".fuyouSuccess_txt2").html(time+"秒后自动跳转")
                time--;
            },1000)

        },
        setHeader: function () {
            var header = new App.UI.UIHeader();

            header.set({
                view: this,
                events: {
                    'click .js_setting': 'setting'
                },
                back: {
                    // 'tagname': 'back',
                    callback: function () {
                        //      App.goBack()
                    }
                },
                center: {
                    'tagname': 'title', 'value': ['加薪猫']
                },

                right: null
            });
        },

        list: function () {
            App.goTo('list');
        },
        onHide: function () {

        }
    })
})