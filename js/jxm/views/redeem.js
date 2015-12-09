define(function (require, exports, module) {
    var Model = require("jxm/model/model");
    var Store = require("jxm/model/store");
    var Chart = require("jxm/utils/Chart");
    var Template = require("jxm/tpl/redeem.tpl");
    var redeem_invest = require("jxm/tpl/redeem_invest.tpl");
    var redeem_back= require("jxm/tpl/redeem_back.tpl");
    var Footer = require("jxm/tpl/footer.tpl");
    var myChange = new Model.myChange();
    var sendedChange = new Model.sendedChange();
    var getUserOrderRecords = new Model.getUserOrderRecords();
    var getUserRansomRecords = new Model.getUserRansomRecords();
    var Store = require("jxm/model/store");
    var loginStore = new Store.loginStore();
    var tool = require('jxm/utils/Tool')
    var handle = new tool();
    var payLayer = require("jxm/common/common");
    var showPageFlag=1;
    var self;
    var outPageNum=1;
    var outPageTotal;
    var inPageTotal;
    var inPageNum=1;
    //接口
    module.exports = App.Page.extend({
        events: {
            'click #invest': 'chang2',
            'click #redeem': 'chang',
            'click .js_float': 'goFloat',
            'click .ico_arrow': 'goTop',
            'click .redeem_list': 'listBtn',
            'click .investList': 'invest',
            'click .change_btn': 'sendChange'
        },
        initialize: function () {
            self = this;
        },
        goTop:function(){
            $(window).scrollTop(0)
        },
        scrollTopListener:function(){
            $(window).bind('scroll', function(){
                if ($(window).scrollTop() >= $(document).height() - $(window).height()) {
                    if(showPageFlag==1){
                        if(inPageNum>inPageTotal){
                            return
                        }
                        self.showMoreIn()
                    }else{
                        if(outPageNum>outPageTotal){
                            return
                        }
                        self.showMoreOut()
                    }
                }
            })
        },
        invest: function(e){
            e.stopImmediatePropagation();
            var closest = $(e.currentTarget).closest('.investList');
            var status = $(closest).data('id');
            App.goTo("redemption_investDetail?orderNo="+status)
        },
        listBtn: function(e){
            e.stopImmediatePropagation();
            var closest = $(e.currentTarget).closest('.redeem_list');
            var status = $(closest).data('id');
            App.goTo("redemption_detail?ransomId="+status)
        },
        showMoreIn: function () {
            var self = this;
            getUserOrderRecords.set({
                'page':inPageNum
            });
            return getUserOrderRecords.exec({
                type: 'get',
                success: function (data) {

                    if (data.ret == 0) {
                        inPageNum++;
                        data.data.format=self.format
                        var inHtml=_.template(redeem_invest)(data.data)
                        var html=self.$('#invest_record')[0].innerHTML
                        html=html+inHtml
                        self.$('#invest_record').html(html)

                    } else if (data.ret == 999001) {
                        handle.goLogin();
                    } else {
                        App.showToast(data.msg || '网络错误');
                    }
                },
                error: function () {
                    App.hideLoading();
                    App.showToast('网络错误');
                }
            })
        },
        showMoreOut:function(){

            getUserRansomRecords.set({
                'page':outPageNum
            });
            return getUserRansomRecords.exec({
                type: 'get',
                success: function (data) {

                    if (data.ret == 0) {
                        outPageNum++;
                        data.data.format=self.format
                       var outHtml= _.template(redeem_back)(data.data)
                        var html=self.$('#redeem_record')[0].innerHTML
                        html=html+outHtml
                        self.$('#redeem_record').html(html)

                    } else if (data.ret == 999001) {
                        handle.goLogin();
                    } else {
                        App.showToast(data.msg || '网络错误');
                    }
                },
                error: function () {
                    App.hideLoading();
                    App.showToast('网络错误');
                }
            })
        },


//        invest: function(){
//            App.goTo('my_invest');
//        },
        chang:function(){
            var className=document.getElementById('invest').className;
            if(className.indexOf("selected")>0){
                showPageFlag=0
                $(window).scrollTop(0)
                self.$('#redeem').addClass("selected");
                self.$('#invest').removeClass("selected");
                self.$('#redeem_page').css("display","block")
                self.$('#invest_page').css("display","none")
            }
        },
        chang2:function(){
            var className=document.getElementById('redeem').className;
            if(className.indexOf("selected")>0){
                showPageFlag=1
                $(window).scrollTop(0)
                self.$('#invest').addClass("selected");
                self.$('#redeem').removeClass("selected");
                self.$('#redeem_page').css("display","none")
                self.$('#invest_page').css("display","block")
            }
        },



        onShow: function () {
            handle.share();
            this.setHeader();
            outPageNum=1;
            inPageNum=1;
            return this.myChange();
        },


        sendedChange:function(){
            App.showLoading();
            getUserRansomRecords.set({
                'page':outPageNum
            });
            return getUserRansomRecords.exec({
                type: 'get',
                success: function (data) {
                    App.hideLoading();
                    if (data.ret == 0) {
                        outPageNum++;
                        outPageTotal=data.data.totalPages;
                        self.data.sended = data.data

                        var shuhuiFlag=0;

                        if(data.data.records.length==0){
                            shuhuiFlag=0;
                        }else{
                            shuhuiFlag=1;
                        }
                        self.data.format=self.format
                        self.data.shuhuiFlag=shuhuiFlag
                        self.$el.html(_.template(Template)(self.data));
                        self.scrollTopListener()

                    } else if (data.ret == 999001) {
                        handle.goLogin();
                    } else {
                        App.showToast(data.msg || '网络错误');
                    }
                },
                error: function () {
                    App.hideLoading();
                    App.showToast('网络错误');
                }
            })
        },
        format:function(num){
            var temp_num=num*100
            return temp_num.toFixed(3)+"%"
        },
        myChange: function () {
            var self = this;
            App.showLoading();
            getUserOrderRecords.set({
                'page':inPageNum
            });
            return getUserOrderRecords.exec({
                type: 'get',
                success: function (data) {

                    if (data.ret == 0) {
                        self.data = data.data
                        var touziFlag=0;
                        if(data.data.records.length==0){
                            touziFlag=0;
                        }else{
                            touziFlag=1;
                        }
                        self.data.touziFlag=touziFlag
                        self.sendedChange()
                        inPageNum++;
                        inPageTotal=data.data.totalPages;
                    } else if (data.ret == 999001) {
                        handle.goLogin();
                    } else {
                        App.showToast(data.msg || '网络错误');
                    }
                },
                error: function () {
                    App.hideLoading();
                    App.showToast('网络错误');
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
                    'tagname': 'title', 'value': ['交易详情']
                },
                right:null
            });
        },

        onHide: function () {
            self.$el.html("")
        }
    })
})