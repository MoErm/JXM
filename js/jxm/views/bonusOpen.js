define(function (require, exports, module) {
    var Model = require("jxm/model/model");
    var bonusOpen = require("jxm/tpl/bonusOpen.tpl");
    var getRecord = new Model.getRecord();
    var Store = require("jxm/model/store");
    var bonusStore = new Store.bonusStore();
    var tool = require('jxm/utils/Tool')
    var handle = new tool();
    var payLayer = require("jxm/common/common");
    var self;
    var oldPhoneflag=false;
    //接口
    module.exports = App.Page.extend({

        events: {
            'click .bonus_btn': 'changePhone',
            'click .bonus_open': 'openBonus',
            'click #toJXM': 'toJXM',
            'input .bonus_input': 'openCheck'

        },


        initialize: function () {
            self = this;
        },
        toJXM:function(){
            if(sessionStorage.getItem("bonusLoginUrl")&&sessionStorage.getItem("bonusLoginUrl")!=""){
                window.location.href=sessionStorage.getItem("bonusLoginUrl")
            }else{
                App.goTo("index")
            }
        },
        onShow: function () {
            self.showBonus();
            handle.share();
            this.setHeader();

            return;
        },
        afterMount: function () {


        },
        showBonus:function(){
            App.showLoading();
            var sendData;

                var query = this.request.query;
                if(query){
                    bonusStore.set(query.openId)
                }
                sendData={
                    'cid': query.cid,
                    'mobile': query.mobile,
                    'openId':  query.openId
                }


            getRecord.set(sendData);
            getRecord.exec({
                type: 'get'
            }).then(function (data) {
                App.hideLoading();
                self.data=data.data
                self.data.mobile=query.mobile;
                if(data&&data.ret==0){

                    self.$el.html(_.template(bonusOpen)(self.data));
                }else{
                    App.hideLoading();
                    App.showToast(data.msg || '网络错误')
                }
            }).catch(function (error) {
                App.hideLoading();
                App.showToast(error.msg || '网络错误')
            })


        },

        setHeader: function () {
            var header = new App.UI.UIHeader();
            header.set({
                view: this,
                back: {
                    'tagname': 'back',
                    callback: function () {
                        App.goTo("index")
                    }
                },
                center: {
                    'tagname': 'title', 'value': ['加薪猫理财']
                },
                right: null
            });
        },

        onHide: function () {
        }
    })
})