define(function (require, exports, module) {
    var Model = require("jxm/model/model");
    var Store = require("jxm/model/store");
    var Template = require("jxm/tpl/fuyouDetail.tpl");
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

            'click .js_situation':'goHeroList'
        },
        initialize: function () {
            self = this;
        },
        onShow: function () {
            handle.share();
            this.setHeader();
            this.initData()

            App.hideLoading()
            return
        },
        initData:function(){
            var query = this.request.query;
            fuyouTradeInfo.exec({
                type: "get",
                data:{
                    serialNo:  query.serialNo
                },
                success: function (data){
                    App.hideLoading();
                    if(data.ret == 0){
                        self.data=data.data
                        if(_.isUndefined(data.data.remark)){
                            self.data.remark="无"
                        }
                        if(_.isUndefined(data.data.chargeWay)){
                            self.data.chargeWay=""
                        }
                        self.data.serialNo=query.serialNo

                        self.data.dealMoney3=handle.dealMoney3
                        self.data.showName=self.showName
                        console.log(self.data)
                        self.$el.html(_.template(Template)(self.data));
                    }else if(data.ret == 999001){
                        handle.goLogin();
                    }
                },
                error:function(){
                    App.hideLoading();
                    App.showToast(message);
                }
            })
        },
        showName:function(tradeType,productName,chargeWay){
            switch (tradeType){
                case "01":
                    return "充值";
                case "02":
                    return "提现";
                case "03":
                    return productName+"投资";
                case "04":
                    return productName+"到期";
                case "05":
                    return productName+"投资";
                case "06":
                    return productName+"赎回";
                case "07":
                    return chargeWay;
                case "08":
                    return "购买御驾";
                case "09":
                    return "御驾回款";
            }
        },
        setHeader: function () {
            var header = new App.UI.UIHeader();

            header.set({
                view: this,
                events: {
                    'click .js_setting': 'setting'
                },
                back: {
                    'tagname': 'back',
                    callback: function () {
                        App.goTo("fuyou")
                    }
                },
                center: {
                    'tagname': 'title', 'value': ['交易详情']
                },
                setting: function () {
                    App.goTo('setting');
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