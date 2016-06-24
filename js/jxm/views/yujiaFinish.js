define(function (require, exports, module) {
    var yujiaFinish = require('jxm/tpl/yujiaFinish.tpl');
    var footer = require('jxm/tpl/card.footer.tpl');
    var tool = require('jxm/utils/Tool');
    var handle = new tool();
    module.exports = App.Page.extend({
        afterMount: function () {
            this.$el.html(yujiaFinish);
            App.hideLoading()
        },
        onShow: function () {
                this.setHeader();

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
