define(function (require, exports, module) {
    var Model = require("jxm/model/model");
    var fuyouTradeInfo = new Model.fuyouTradeInfo();
    var Template = require("jxm/tpl/fuyouResetForApp.tpl");

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

            self.$el.html(Template);

            App.hideLoading();
            self.initData();
            return
        },
        initData:function(){
            if(handle.mobileType()=="android"){
                window.app.setParams("sendData")
            }else if(handle.mobileType()=="ios") {
                handle.setupWebViewJavascriptBridge(function (bridge) {
                    bridge.registerHandler('setParams', function(data, responseCallback) {
                        var datastr=JSON.stringify(data);
                        var datastr2=JSON.parse(datastr);
                        var datastr3=JSON.parse(datastr2.data);
                        self.sendData(datastr3)
                    })
                })
            }
        },
        sendData:function(data){
            self.$('#mchnt_cd').val(data.merCode);
            self.$('#mchnt_txn_ssn').val(data.serialNo);
            self.$('#login_id').val(data.loginId);
            self.$('#busi_tp').val(data.businessType);
            self.$('#back_url').val(data.callbackUrl);
            self.$('#signature').val(data.signature);
            var actionUrl= data.modifyUrl;
            self.$('#fuyouReset')[0].action =actionUrl;
            document.getElementById('fuyouReset').submit();
        },
        onHide: function () {

        }
    })
})