define(function (require, exports, module) {
    var Model = require("jxm/model/model");
    var Store = require("jxm/model/store");
    var Chart = require("jxm/utils/Chart");
    var Template = require("jxm/tpl/my_wallet.tpl");
    var TemplateSent = require("jxm/tpl/my_walletSent.tpl");
    var TemplateGotton= require("jxm/tpl/my_walletGotton.tpl");
    var Footer = require("jxm/tpl/footer.tpl");
    var myChange = new Model.myChange();
    var sendedChange = new Model.sendedChange();
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
            'click #in_change': 'chang2',
            'click #out_change': 'chang',
            'click .js_float': 'goFloat',
            'click .ico_arrow': 'goTop',
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
        showMoreIn: function () {
            var self = this;
            myChange.set({
                'page':inPageNum
            });
            return myChange.exec({
                type: 'get',
                success: function (data) {

                    if (data.ret == 0) {
                        inPageNum++;

                        var inHtml=_.template(TemplateGotton)(data.data)
                        var html=self.$('#inList')[0].innerHTML
                        html=html+inHtml
                        self.$('#inList').html(html)

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

            sendedChange.set({
                'page':outPageNum
            });
            return sendedChange.exec({
                type: 'get',
                success: function (data) {

                    if (data.ret == 0) {
                        outPageNum++;

                       var outHtml= _.template(TemplateSent)(data.data)
                        var html=self.$('#outList')[0].innerHTML
                        html=html+outHtml
                        self.$('#outList').html(html)
                        if(data.data.items){


                            for(var i=0;i<self.data.sended.items.length;i++){
                                var item=self.data.sended.items[i]

                                self.showChange(item.cid,item.totalCount,item.surplusCount)
                            }
                        }
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
        regQR:function(){
            App.Bridge(function(bridge,scope){
                //bridge.init();
                //注册返回函数
                bridge.registerHandler('showQR', function(data, responseCallback) {
                    payLayer.sendBonus(true,self.shareUrl);
                    //$(".js_two_dimension").click();
                })
            },self);
        },
        sendChange:function(e){

            var url=$(e.currentTarget).attr('id');

            e.preventDefault();

            self.shareUrl=url;
            self.regQR()
            if(handle.mobileType()=='android'){
                var shareConfig={'title': '我刚刚投资了加薪猫理财，得到一个抵现礼包，快来抢啊！','url':url,'desc':'红包来了！加薪猫理财，怎么开心怎么来!',"imgUrl":"http://m.jiaxinmore.com/images/bonus_icon.jpg"};
                window.WebViewJavascriptBridge.callHandler('doShare',shareConfig,function(response) {
                    //TODO
                })
            }else {
                payLayer.sendBonus();
                var shareConfig = {"link": url, "title": "我刚刚投资了加薪猫理财，得到一个抵现礼包，快来抢啊！","desc":"红包来了！加薪猫理财，怎么开心怎么来!","imgUrl":"http://m.jiaxinmore.com/images/bonus_icon.jpg"};
                handle.share(shareConfig);
            }

        },

        invest: function(){
            App.goTo('my_invest');
        },
        chang:function(){
            var className=document.getElementById('in_change').className;
            if(className=="selected"){
                showPageFlag=0
                $(window).scrollTop(0)
                self.$('#in_change').removeClass("selected");
                self.$('#in_change').addClass("select_title");
                self.$('#out_change').addClass("selected");
                self.$('#out_change').removeClass("select_title");
                self.$('#change_out').css("display","block")
                self.$('#change_in').css("display","none")
            }
        },
        chang2:function(){
            var className=document.getElementById('out_change').className;
            if(className=="selected"){
                showPageFlag=1
                $(window).scrollTop(0)
                self.$('#out_change').removeClass("selected");
                self.$('#out_change').addClass("select_title");
                self.$('#in_change').addClass("selected");
                self.$('#in_change').removeClass("select_title");
                self.$('#change_out').css("display","none")
                self.$('#change_in').css("display","block")
            }
        },
        showChange:function(cid,total,surplus){
           var cid=window.document.getElementsByName(cid)

           var rount = cid[0],
                rount2 =cid[1];

                var n =surplus/total*100;

                if(n==0){
                    rount.style.display="none";
                    rount2.style.display="none";
                }else if(n<=50){
                    rount.style.display="block";
                    rount.style.webkitTransform="rotate(" + 3.6*n + "deg)";
                    rount2.style.display="none";
                }else{
                    rount.style.display="block";
                    rount.style.webkitTransform="rotate(180deg)";
                    rount2.style.display="block";
                    rount2.style.webkitTransform="rotate(" + 3.6*(n-50) + "deg)";
                }

        },


        onShow: function () {
            handle.share();
            this.setHeader();
            //self.$el.html(Footer);

            return this.myChange();
        },


        sendedChange:function(){
            App.showLoading();
            sendedChange.set({
                'page':outPageNum
            });
            return sendedChange.exec({
                type: 'get',
                success: function (data) {
                    App.hideLoading();
                    if (data.ret == 0) {
                        outPageNum++;
                        outPageTotal=data.data.totalPages;
                        self.data.sended = data.data

                        self.$el.html(_.template(Template)(self.data));
                        self.scrollTopListener()
                        if(self.data.sended.items){


                        for(var i=0;i<self.data.sended.items.length;i++){
                            var item=self.data.sended.items[i]

                            self.showChange(item.cid,item.totalCount,item.surplusCount)
                        }
                        }
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
        myChange: function () {
            var self = this;
            App.showLoading();
            myChange.set({
                'page':inPageNum
            });
            return myChange.exec({
                type: 'get',
                success: function (data) {

                    if (data.ret == 0) {
                        self.data = data.data
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
                    'tagname': 'title', 'value': ['我的红包']
                },
                right:null
            });
        },

        onHide: function () {
        }
    })
})