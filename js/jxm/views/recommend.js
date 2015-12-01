//推荐页面
define(function (require, exports, module) {
    var recommend = require('jxm/tpl/recommend.tpl');
    var footer = require('jxm/tpl/footer.tpl');
    var self='';
        module.exports = App.Page.extend({
            initialize:function(){
                self = this;
            },
            afterMount: function(){
                self.$el.html(recommend + footer);
            },
            
        })
})










