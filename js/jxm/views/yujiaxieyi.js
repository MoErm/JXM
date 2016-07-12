define(function (require, exports, module) {
    var yujiaxieyi = require('jxm/tpl/yujiaxieyi.tpl');
    var yujiaxieyikong = require('jxm/tpl/yujiaxieyikong.tpl');
    var tool = require('jxm/utils/Tool');
    var Model = require("jxm/model/model");
    var yujiaGetCarContract = new Model.yujiaGetCarContract();
    var handle = new tool();
    var self;
    module.exports = App.Page.extend({
        afterMount: function () {
        self=this
            App.hideLoading()
        },
        onShow: function () {
            var query = this.request.query;
            if(_.isUndefined(query) || _.isUndefined(query.orderNo)){
                this.$el.html(yujiaxieyikong);
            }else{
                yujiaGetCarContract.exec({
                    type: "get",
                    data:{
                        orderNo:  query.orderNo
                    },
                    success: function (data){
                        App.hideLoading();
                        if(data.ret == 0){
                            self.data=data.data
                            if(_.isUndefined(data.data.bankAccount  )){
                                self.data.bankAccount=false
                            }
                            self.$el.html(_.template(yujiaxieyi)(self.data));
                        }else if(data.ret == 999001){
                            handle.goLogin();
                        }
                    },
                    error:function(){
                        App.hideLoading();
                        App.showToast("网络错误");
                    }
                })

            }
                this.setHeader();


        },
        setHeader: function () {
            var header = new App.UI.UIHeader();
            header.set({
                view: this,
                title: '协议',
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
