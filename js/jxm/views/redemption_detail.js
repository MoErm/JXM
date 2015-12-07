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
            handle.share();
            this.setHeader();
            self.showPage()

        },
        showPage:function(){
            var query = this.request.query;
            console.log(query)
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
                    console.log(data)
                    if(data.ret == 0){
                        self.data=data.data
                        self.$el.html(_.template(Template)(data.data));

                    }else if(data.ret == 999001) {
                        handle.goLogin();
                    }


                },
                error: function(){
                    App.hideLoading();
                    App.showToast(message);
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
                        App.goTo("my_invest")
                    }
                },
                center: {
                    'tagname': 'title', 'value': ['赎回成功']
                },
                right: [{
                    'tagname': '', 'value': '完成&ensp;',
                    callback: function () {
                        App.goTo("my_invest")
                    }
                }]
            });
        },

        onHide: function () {
        }
    })
})