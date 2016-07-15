define(function (require, exports, module) {
    var yujiaInvest = require('jxm/tpl/yujiaInvest.tpl');
    var footer = require('jxm/tpl/card.footer.tpl');
    var tool = require('jxm/utils/Tool');
    var model = require('jxm/model/model');
    var yujiaProperty = new model.yujiaProperty();
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
            'click .list_incount': 'toYujiaDetail',
            'click .js_history': 'toYujiaHistory'


        },
        toYujiaHistory:function(){
            App.goTo("yujiaHistory")
        },
        toYujiaDetail:function(e){
            App.goTo("yujiaDetail?orderNo="+e.currentTarget.dataset.order)
        },
        initData:function(){
            yujiaProperty.exec({
                type: 'get',
                success: function(data){
                    if(data.ret == 0){
                        self.$el.html(_.template(yujiaInvest)(data.data));
                        App.hideLoading()
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
