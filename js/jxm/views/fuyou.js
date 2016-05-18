define(function (require, exports, module) {
    var Model = require("jxm/model/model");
    var Store = require("jxm/model/store");
    var Chart = require("jxm/utils/Chart");
    var Template = require("jxm/tpl/fuyou.tpl");
    var TemplateList = require("jxm/tpl/fuyouList.tpl");
    var fuyouTradeRecords = new Model.fuyouTradeRecords();
    var fuyouBalance = new Model.fuyouBalance();

    var Store = require("jxm/model/store");
    var loginStore = new Store.loginStore();
    var tool = require('jxm/utils/Tool')
    var handle = new tool();
    var payLayer = require("jxm/common/common");
    var self;
    var totalPages=0;
    var currentPage=1;
    var showFlag=false;
    //接口
    module.exports = App.Page.extend({
        events: {
            'click .fuyou_list': 'toDetail',
            'click .currentIncome': 'rechargeOut',
            'click .historyIncome': 'recharge'
        },
        initialize: function () {
            self = this;
        },
        recharge:function(){
            App.goTo("recharge")
        },
        rechargeOut:function(){
            App.goTo("recharge_out")
        },
        onShow: function () {
            handle.share();
            this.setHeader();

            App.showLoading();
            this.initData()
            this.scrollTopListener()
            return
        },
        initData:function(){
            fuyouTradeRecords.exec({
                type: "get",
                success: function (data){


                    if(data.ret == 0){
                        self.data=data.data
                        currentPage++;
                        totalPages=data.data.totalPages
                        self.initYuE()
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
        initYuE:function(){
            fuyouBalance.exec({
                type: 'get',
                success: function(data){
                    if(data.ret == 0){
                        self.data.amount=data.data.amount
                        self.data.showName=self.showName
                        self.data.dealMoney2=handle.dealMoney2
                        self.data.dealMoney3=handle.dealMoney3
                        self.$el.html(_.template(Template)(self.data));
                        App.hideLoading();
                    }else if(data.ret == 999001){
                        handle.goLogin();
                    }else{
                        App.showToast(data.msg  || self.message);
                    }
                },
                error: function(){
                    App.hideLoading();
                    App.showToast(self.message);
                }
            });
        },
        showName:function(tradeType,productName){
            //if((tradeType!="01"&&tradeType!="02")&&productName.length>10){
            //    productName=productName.substr(0, 10);
            //    switch (tradeType){
            //        case "03":
            //            return productName+"...";
            //        case "04":
            //            return productName+"...";
            //        case "05":
            //            return productName+"...";
            //        case "06":
            //            return productName+"...";
            //    }
            //}else{
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
                }
            //}

        },
        scrollTopListener:function(){
            $(window).bind('scroll', function(){
                if ($(window).scrollTop() >= $(document).height() - $(window).height()) {
                    console.log(currentPage+"   "+totalPages)
                        if(currentPage>totalPages){
                            return
                        }else{
                            if(showFlag){
                                return
                            }else{
                                self.showMoreIn()
                            }

                        }

                }
            })
        },
        showMoreIn: function () {
            var self = this;
            showFlag=true;
            return fuyouTradeRecords.exec({
                type: 'get',
                data:{
                    'page':currentPage
                },
                success: function (data) {

                    if (data.ret == 0) {
                        showFlag=false;
                        var moreData={};
                        moreData=data.data
                        moreData.showName=self.showName
                        moreData.dealMoney2=handle.dealMoney2
                        currentPage++;

                        var inHtml=_.template(TemplateList)(moreData)
                        var html=self.$('#ListArea')[0].innerHTML
                        html=html+inHtml
                        self.$('#ListArea').html(html)

                    } else if (data.ret == 999001) {
                        handle.goLogin();
                    } else {
                        App.showToast(data.msg || '网络错误');
                    }
                },
                error: function () {
                    App.hideLoading();
                    App.showToast('网络错误');
                }
            })
        },
        toDetail:function(e){
            var id=$(e.currentTarget).attr('id');
            App.goTo("fuyouDetail?serialNo="+id)
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
                        App.goTo("my_invest")
                    }
                },
                center: {
                    'tagname': 'title', 'value': ['现金余额']
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