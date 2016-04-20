//天添利 购买页
define(function(require, exports, module) {
    var Model = require("jxm/model/model");    
    var footer = require('jxm/tpl/footer.tpl');
    var tool = require('jxm/utils/Tool');
    var common = require("jxm/common/common");
    var recharge = require('jxm/tpl/recharge_out.tpl');
    var handle = new tool();
    var self = null;
    module.exports = App.Page.extend({
        initialize: function() {
            return this;
        },
         events: {
            'click #cardSelect': 'goCardSelectWin'//选择银行卡
        },        
        onShow: function() {
            self = this.initialize();
            self.message = '网络错误，请稍后重试';           
            self.pageData= {};   
            // 定义初始化方法 
            self.setHeader();            
            self.initTemple();            
        }, 
        initTemple: function(){
           
            //添加内容
            self.$el.html(_.template(recharge)(self.pageData));
        },       
        setHeader: function () {
            var header = new App.UI.UIHeader();
            header.set({
                view: this,
                title: '提现',
                back: {
                    'tagname': 'back',
                    callback: function () {
                        App.goTo('ttl_introduce');
                    }
                },
                right: null
            });
            App.hideLoading();
        },   
        goCardSelectWin: function(){
            //传入当前银行卡ID
            self.currentCardBox= $(event.target).closest('#cardSelect');
            common.ttlSelectCard(self.currentCardBox,'02','');
        },
    });

})  