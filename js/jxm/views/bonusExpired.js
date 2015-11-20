define(function (require, exports, module) {
    var Model = require("jxm/model/model");
    var Store = require("jxm/model/store");
    var bonusExpired = require("jxm/tpl/bonusExpired.tpl");
    var myProperty = new Model.myProperty();
    var historyOrder = new Model.historyOrder();
    var Store = require("jxm/model/store");
    var bonusStore = new Store.bonusStore();
    var tool = require('jxm/utils/Tool')
    var handle = new tool();
    var payLayer = require("jxm/common/common");
    var self;
    var oldPhoneflag=false;
    //接口
    module.exports = App.Page.extend({
        template: bonusExpired,
        events: {
            'click #toJXM': 'toJXM'

        },
        toJXM:function(){
            var query = this.request.query;
            if(query.userMode=="01"){
                App.goTo("index")
            }else{
                if(sessionStorage.getItem("bonusLoginUrl")&&sessionStorage.getItem("bonusLoginUrl")!=""){
                    window.location.href=sessionStorage.getItem("bonusLoginUrl")
                }else{
                    App.goTo("index")
                }
            }
        },
        initialize: function () {
            self = this;
        },


        onShow: function () {
            handle.share();
            this.setHeader();
            var query = this.request.query;
            if(query){
                bonusStore.set(query.openId)
            }

            this.$el.append(this.template);
            self.setHeight();
            return;
        },
        afterMount: function () {


        },
        setHeight:function(){
            var query = this.request.query;
            if(query){
                self.$("#userInfo").html("目前您("+query.mobile+")账户，余额："+query.balance+"元")
                if(query.userMode=="03"){
                    self.$("#nerAdv").css("display","none")
                }

            }



            var width=document.body.clientWidth;
            var height=document.body.clientHeight;
            if(width<=375){
                self.$('.bonusExpired_bg3').css("height",height-220-44)
            }else if(width>375&&width<=414){
                self.$('.bonusExpired_bg3').css("height",height-280-44)
            }else{
                self.$('.bonusExpired_bg3').css("height",height-300-44)
            }


        },
        setHeader: function () {
            var header = new App.UI.UIHeader();
            header.set({
                view: this,
                back: {
                    'tagname': '',
                    callback: function () {
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