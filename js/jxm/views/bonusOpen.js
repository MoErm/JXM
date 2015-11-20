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
            var query = this.request.query;
            if(self.data.isRegistered=='0'){
                App.goTo("index")
                return
            }else{
                if(sessionStorage.getItem("bonusLoginUrl")&&sessionStorage.getItem("bonusLoginUrl")!=""){
                    window.location.href=sessionStorage.getItem("bonusLoginUrl")
                }else{
                    App.goTo("index")
                }
            }
//
//            if((_.isUndefined(query.userMode))||query.userMode=="01"){
//                App.goTo("index")
//            }else{
//
//            }
        },
        onShow: function () {
            self.showBonus();
            //handle.share();
            this.setHeader();
            self.sendChange()

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
        sendChange:function(){
            var query = this.request.query;
            var url="http://"+location.hostname+"/index.html#bonus?appid="+query.appid+"&cid="+query.cid;

            if(handle.mobileType()=='android'){
                var shareConfig={'title': '我刚刚投资了加薪猫理财，得到一个抵现礼包，快来抢啊！','url':url,'desc':'红包来了！加薪猫理财，怎么开心怎么来!',"imgUrl":"http://m.jiaxinmore.com/images/bonus_icon.jpg"};
                window.WebViewJavascriptBridge.callHandler('doShare',shareConfig,function(response) {
                    //TODO
                })
            }else {

                var shareConfig = {"link": url, "title": "我刚刚投资了加薪猫理财，得到一个抵现礼包，快来抢啊！","desc":"红包来了！加薪猫理财，怎么开心怎么来!","imgUrl":"http://m.jiaxinmore.com/images/bonus_icon.jpg"};
                handle.share(shareConfig);
            }

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