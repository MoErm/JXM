define(function (require, exports, module) {
    var yujiaHistory = require('jxm/tpl/yujiaHistory.tpl');
    var tool = require('jxm/utils/Tool');
    var model = require('jxm/model/model');
    var yujiaHistoryOrders = new model.yujiaHistoryOrders();
    var message = '网络错误，请稍后重试';
    var handle = new tool();
    var self;
    module.exports = App.Page.extend({
        afterMount: function () {
           self=this
            App.hideLoading()
        },
        onShow: function () {
            this.setHeader();
            this.initData();
        },
        events: {
            'click .list_incount': 'toYujiaDetail'
        },
        toYujiaDetail:function(e){
            App.goTo("yujiaDetail?orderNo="+e.currentTarget.dataset.order)
        },
        initData:function(){
            yujiaHistoryOrders.exec({
                type: 'get',
                success: function(data){
                    if(data.ret == 0){
                        self.$el.html(_.template(yujiaHistory)(data.data));
                    }else if(data.ret == 999001){
                        handle.goLogin();
                    }else{
                        App.showToast(data.msg );
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
                title: '御驾系列',
                back: {
                    'tagname': 'back',
                    callback: function () {
                        App.goBack();
                    }
                },
                right: null
            });
        }
    })
})
