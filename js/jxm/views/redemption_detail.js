define(function (require, exports, module) {
    var Model = require("jxm/model/model");
    var Chart = require("jxm/utils/Chart");
    var Template = require("jxm/tpl/redemption_detail.tpl");
    var tool = require('jxm/utils/Tool')
    var handle = new tool();
    var payLayer = require("jxm/common/common");
    var getRansomDetails = new Model.getRansomDetails();
    //接口
    module.exports = App.Page.extend({
        events: {
            'click .redemption_btn': 'payRedeem'
        },
        initialize: function () {
            self = this;
        },
        goTop:function(){
            $(window).scrollTop(0)
        },

        onShow: function () {
            self = this;
            handle.share();
            this.setHeader();
            self.showPage()

        },
        format:function(num){
            var temp_num=num*100
            return temp_num.toFixed(3)+"%"
        },
        showPage:function(){
            App.showLoading()
            var query = this.request.query;
            var ransomId=query&&query.ransomId||"";
            if(ransomId==""){
                App.showToast("赎回编号错误")
                window.setTimeout(function(){
                    App.goTo("my_invest")
                },2000)
                return
            }
            getRansomDetails.set({ransomId:ransomId})
            getRansomDetails.exec({
                type: 'get',
                success: function(data){
                    App.hideLoading();
                    if(data.ret == 0){
                        self.data=data.data
                        self.data.format=self.format
                        self.$el.html(_.template(Template)(self.data));

                    }else if(data.ret == 999001) {
                        handle.goLogin();
                    }else{
                        App.showToast(data.msg);
                    }


                },
                error: function(){
                    App.hideLoading();
                    App.showToast("网络错误");
                }
            })
        },
        setHeader: function () {
            var header = new App.UI.UIHeader();
            header.set({
                view: this,
                back: {
                    'tagname': 'back',
                    callback: function () {
                        var query = this.request.query;
                        var type=query&&query.type||"";
                        if(type==1){
                            App.goTo("redeem?type=1&from=1")
                        }else{
                            App.goTo("redeem")
                        }
                    }
                },
                center: {
                    'tagname': 'title', 'value': ['赎回详情']
                },
                right: null
//                    [{
//                    'tagname': '', 'value': '完成&ensp;',
//                    callback: function () {
//                        App.goTo("my_invest")
//                    }
//                }]
            });
        },

        onHide: function () {
            self.$el.html("")
        }
    })
})