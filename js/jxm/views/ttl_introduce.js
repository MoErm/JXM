//天添利 介绍页
define(function(require, exports, module) {
    var Model = require("jxm/model/model");
    var introduce = require('jxm/tpl/ttl_introduce.tpl');
    var footer = require('jxm/tpl/footer.tpl');
    var hammer = require('hammer');
    var tool = require('jxm/utils/Tool')
    var handle = new tool();
    var getTtlProperty = new Model.getTtlProperty(); //获取灵活宝资产信息接口
    var getTtlRate = new Model.getTtlRate(); //获取收益率接口
    var getRollingNotice = new Model.getRollingNotice();
    var toRedeem = new Model.fuyouToRedeem();
    var initTtlBuyPage = new Model.fuyouInitTtlBuyPage();  //初始化购买页面
    var pool = new Array(1, 2, 3);
    var hidePool = new Array(4, 5, 6, 7, 8);
    var turnNum = 0;
    var RoundNum = 2;
    var cycleRound = 0;
    var nowRoundNum = 0;
    var self = null;
    var max;
    var min;
    var now;
    var startPoint;
    var today;



    /**
     * @version 1.0
     * @author cuisuqiang@163.com
     * 用于实现页面 Map 对象，Key只能是String，对象随意
     */
    var Map = function() {
        this._entrys = new Array();

        this.put = function(key, value) {
            if (key == null || key == undefined) {
                return;
            }
            var index = this._getIndex(key);
            if (index == -1) {
                var entry = new Object();
                entry.key = key;
                entry.value = value;
                this._entrys[this._entrys.length] = entry;
            } else {
                this._entrys[index].value = value;
            }
        };
        this.get = function(key) {
            var index = this._getIndex(key);
            return (index != -1) ? this._entrys[index].value : null;
        };
        this.remove = function(key) {
            var index = this._getIndex(key);
            if (index != -1) {
                this._entrys.splice(index, 1);
            }
        };
        this.clear = function() {
            this._entrys.length = 0;;
        };
        this.contains = function(key) {
            var index = this._getIndex(key);
            return (index != -1) ? true : false;
        };
        this.getCount = function() {
            return this._entrys.length;
        };
        this.getEntrys = function() {
            return this._entrys;
        };
        this._getIndex = function(key) {
            if (key == null || key == undefined) {
                return -1;
            }
            var _length = this._entrys.length;
            for (var i = 0; i < _length; i++) {
                var entry = this._entrys[i];
                if (entry == null || entry == undefined) {
                    continue;
                }
                if (entry.key === key) { //equal
                    return i;
                }
            }
            return -1;
        };
    }
    var map = new Map();
    //var chunjie=false
    module.exports = App.Page.extend({
        initialize: function() {
            return this;
        },
        events: {
            'click #action_buy': 'goBuyPage', //购买页面
            'click #action_redem': 'goRedemPage', //赎回页面
            'click #title_tip': 'actionTitleTip' //收益助手提示
        },
        onShow: function() {
            self = this.initialize();

            pool = new Array(1, 2, 3);
            hidePool = new Array(4, 5, 6, 7, 8);
            turnNum = 0;
            RoundNum = 2;
            cycleRound = 0;
            nowRoundNum = 0;
            max = 0;
            min = 0;
            //self.$("#cycle").on('touchstart',function(e){
            //    App.showToast("ssssss")
            //    e.stopPropagation();
            //    e.preventDefault();
            //});

            self.message = '网络错误，请稍后重试';
            handle.share();
            self.pageData = {};
            self.setHeader();
            self.initProperty();
            self.hideArrow();

        },
        hideArrow:function(){
            $(window).bind('scroll', function(){


                if ($(window).scrollTop() >= 0) {
                    self.$(".fixed_arrow").css("display","none")
                }
            })
        },
        setCycle: function() {

            var hit = document.querySelector("#tradeAmount");
            var mc = new hammer(hit);

            var cycle = window.document.getElementById("cycle")

            mc.get('pinch').set({
                enable: false
            });
            mc.on("hammer.input", function(ev) {
                //                self.cycleTime(ev.deltaX)
                //                console.log(ev)
//                console.log(ev.deltaTime + "  " + ev.srcEvent.type)
//                console.log(ev.deltaTime < 100 && ev.srcEvent.type == "touchend")
//                window.document.getElementById("cycle").addEventListener('touchmove',function(e){
//
//                });


                if (ev.deltaTime < 100 && ev.srcEvent.type == "touchend") {

                    console.log("循环起始" + Math.abs(RoundNum - 2))
                    var fuwei = RoundNum
                    if (fuwei == 2) {

                    } else if (fuwei > 2) {
                        console.log("》2循环起始" + Math.abs(fuwei - 2))
                        for (var s = 0; s < Math.abs(fuwei - 2); s++) {
                            console.log("转-1  " + s)
                            self.showRed(1)
                        }
                    } else if (fuwei < 2) {
                        console.log("《2循环起始" + Math.abs(fuwei - 2))
                        for (var q = 0; q < Math.abs(fuwei - 2); q++) {
                            self.showRed(-1)
                            console.log("转+1  " + q)
                        }
                    }
                    return
                }
                self.cycleTime(self.routeCal(ev.deltaX, ev.deltaY, ev.srcEvent.type))

                //                self.routeCal(ev.deltaX,ev.deltaY,ev.srcEvent.type)
                if (ev.srcEvent.type == "touchend") {

                    turnNum = 0
                }
            });
            return
        },
        routeCal: function(x, y, type) {
            //            console.log(window.event.changedTouches[0].clientX)
            var distance = 0;
            distance = Math.sqrt(x * x + y * y).toFixed(0)
                //            if(type=="touchstart"){
            startPoint = window.event.changedTouches[0].clientX
                //            }else if(type=="touchend"){
                //
                //            }
            if (x > 10) {
                if (y > 0) {
                    //                    console.log("右下")
                } else if (y < 0) {
                    //                    console.log("右上")
                }
            } else if (x < -5) {
                if (y > 0) {
                    distance = -distance
                        //                    console.log("左下")
                } else if (y < 0) {
                    distance = -distance
                        //                    console.log("左上")
                }
            } else {
                return 0
                if (startPoint > document.body.clientWidth / 2) {
                    if (y > 0) {

                    } else if (y < 0) {
                        distance = -distance
                    }
                } else {
                    if (y > 0) {
                        distance = -distance
                    } else if (y < 0) {

                    }

                }
            }
            return distance
        },
        cycleTime: function(deg) {
            var num = Math.round(deg / 130)
            if (num == 0) {
                return
            } else if (num != turnNum) {
                if (num > turnNum) {
                    if (max == now) {

                        return
                    } else {
                        self.showRed(1)
                    }
                } else {

                    if (min == now) {

                        return
                    } else {
                        self.showRed(-1)
                    }
                }
                turnNum = num;
            } else {
                return
            }
        },
        showRed: function(key) {
            if (key < 0) {
                RoundNum++;
                pool.push(hidePool.shift())
                hidePool.push(pool.shift())
            } else {
                RoundNum--;
                //                console.log("转-1")
                pool.reverse()
                hidePool.reverse()
                pool.push(hidePool.shift())
                hidePool.push(pool.shift())
                pool.reverse()
                hidePool.reverse()
            }
            var cycleRoundTemp = RoundNum / 8;
            if (RoundNum > 0) {
                cycleRoundTemp = Math.floor(cycleRoundTemp)
                nowRoundNum = RoundNum - cycleRoundTemp * 8
            } else {
                cycleRoundTemp = Math.ceil(cycleRoundTemp)
                nowRoundNum = Math.abs(RoundNum + Math.abs(cycleRoundTemp * 8))
            }

            cycleRound = cycleRoundTemp

            //            console.log("RoundNum="+RoundNum+"  cycleRoundTemp="+cycleRoundTemp+"   nowRoundNum="+nowRoundNum)
            var nowDate = new Date().getFullYear() + "-" + (new Date().getMonth() + 1) + "-" + new Date().getDate()
            var showDate_0 = self.addDate(nowDate, RoundNum - 4)
            var showDate_1 = self.addDate(nowDate, RoundNum - 3)
            var showDate_2 = self.addDate(nowDate, RoundNum - 2)
            var showDate_3 = self.addDate(nowDate, RoundNum - 1)
            var showDate_4 = self.addDate(nowDate, RoundNum)

            if(RoundNum==1){
                self.$("#right_arrow").css("display","none")
            }else if(RoundNum==9){
                self.$("#left_arrow").css("display","none")
            }else{
                self.$("#right_arrow").css("display","block")
                self.$("#left_arrow").css("display","block")
            }
            if(RoundNum>=8){
                self.$("#cycle_2").removeClass("cycleToday")
            }else{
                self.$("#cycle_2").addClass("cycleToday")
            }
                //            console.log(showDate_1+"  "+showDate_2+"  "+showDate_3)
            self.setRate(showDate_2)
            for (var i = 0; i < pool.length; i++) {
                self.$("#cycle_" + pool[i]).removeClass("cycleNow")
                if (i == 0) {
                    self.$("#cycle_" + pool[i]).html(showDate_1.substr(4, 2) + "/" + showDate_1.substr(6, 2))
                } else if (i == 1) {
                    self.$("#cycle_" + pool[i]).addClass("cycleNow")
                    self.$("#cycle_" + pool[i]).html(showDate_2.substr(4, 2) + "/" + showDate_2.substr(6, 2))
                } else if (i == 2) {
                    self.$("#cycle_" + pool[i]).html(showDate_3.substr(4, 2) + "/" + showDate_3.substr(6, 2))
                }
            }
            for (var i = 0; i < hidePool.length; i++) {
                self.$("#cycle_" + hidePool[i]).removeClass("cycleNow")
                if (i == 0) {
                    self.$("#cycle_" + hidePool[i]).html(showDate_4.substr(4, 2) + "/" + showDate_4.substr(6, 2))
                } else if (i == hidePool.length - 1) {
                    self.$("#cycle_" + hidePool[i]).html(showDate_0.substr(4, 2) + "/" + showDate_0.substr(6, 2))
                }
            }

            var cycle = window.document.getElementById("cycle")
            var deg = self.$("#cycle").css("-webkit-transform")
            //App.showToast("deg   " )
            deg = deg.substring(7, deg.length - 4)
            var mathDeg = parseInt(deg)
            cycle.style.webkitTransform = "rotate(" + (mathDeg + key * 45) + "deg)";
            cycle.style.MozTransform = "rotate(" + (mathDeg + key * 45) + "deg)";
            cycle.style.msTransform = "rotate(" + (mathDeg + key * 45) + "deg)";
            cycle.style.OTransform = "rotate(" + (mathDeg + key * 45) + "deg)";
            cycle.style.transform = "rotate(" + (mathDeg + key * 45) + "deg)";

            //self.$("#cycle").css({
            //    'transform':     'rotate('+ (mathDeg + key * 45) + 'deg)',
            //    '-moz-transform':'rotate('+ (mathDeg + key * 45) + 'deg)',
            //    '-o-transform':  'rotate('+ (mathDeg + key * 45) + 'deg)'
            //});
        },
        setRate: function(key) {
            var rate = map.get(key)
            now = key
            if (rate == null) {


                self.$("#cycle_num_1").html(0)
                self.$("#cycle_num_2").html(0)
                self.$("#cycle_num_3").html(0)
                self.$("#cycle_num_4").html(0)
                self.$("#cycle_num_5").html(0)

            } else {
                self.$("#cycle_num_1").html(rate.substr(2, 1))
                self.$("#cycle_num_2").html(rate.substr(3, 1))
                self.$("#cycle_num_3").html(rate.substr(4, 1))
                self.$("#cycle_num_4").html(rate.substr(5, 1))
                self.$("#cycle_num_5").html(rate.substr(6, 1))
            }
        },
        addDate: function(date, days) {
            var d = new Date();

//            console.log("change  "+  d.setDate(days+1))
//            console.log("show   "+new Date(d.setDate(days+1)))
            d.setDate(d.getDate() + days);
            //console.log("now  "+d)
//            d=new Date(d.setDate(days+1))
            var m = d.getMonth() + 1;
            m = m + ""
            if (m.length == 1) {
                m = "0" + m
            }
            var day = d.getDate() + ""
            if (day.length == 1) {
                day = "0" + day
            }
            //console.log(d.getFullYear() + '' + m + '' + day)
            return d.getFullYear() + '' + m + '' + day;
        },
        setHeader: function() {
            var header = new App.UI.UIHeader();
            header.set({
                view: this,
                title: '天添利',
                back: {
                    'tagname': 'back',
                    callback: function() {
                        var query = self.request.query;
                        if(handle.mobileType()=="android"){
                            window.app.ttlBack()
                        }else  if(handle.mobileType()=="ios") {
                            handle.setupWebViewJavascriptBridge(function(bridge) {
                                bridge.callHandler('ttlBack', null, function(response) {
                                })
                            })
                        }else{
                            if (_.isUndefined(query) || _.isUndefined(query.last)) {
                                App.goTo('ttl_recommend');
                            }else{
                                if(query.last==1){
                                    App.goTo('ttl_recommend');
                                }else{
                                    App.goTo('my_invest');
                                }
                            }
                        }


                    }
                },
                right: [{
                    'tagname': '',
                    'value': '交易记录&ensp;',
                    callback: function() {
                        if(handle.mobileType()=="android"){
                            window.app.ttlRedeem()
                        }else  if(handle.mobileType()=="ios") {
                            handle.setupWebViewJavascriptBridge(function(bridge) {
                                bridge.callHandler('ttlRedeem', null, function(response) {
                                })
                            })
                        }else{
                            App.goTo("redeem?type=1")
                        }

                    }
                }]
            });
        },
        format: function(num) {
            var temp_num = num * 100
            return temp_num.toFixed(3) + "%"
        },
        initProperty: function() {
            App.showLoading();
            getTtlProperty.exec({
                type: 'get',
                success: function(data) {
                    if (data.ret == 0) {
                        self.pageData.getTtlProperty = data.data;
                        self.initTemple();
                    } else if (data.ret == 999001) {
                        if(handle.mobileType()=="android"){
                            window.app.outTime()
                        }else  if(handle.mobileType()=="ios") {
                            handle.setupWebViewJavascriptBridge(function(bridge) {
                                bridge.callHandler('timeout', null, function(response) {
                                })
                            })
                        }else{
                            handle.goLogin();
                        }
                    } else {
                        App.showToast(data.msg || self.message);
                    }
                },
                error: function() {
                    App.hideLoading();
                }
            });
        },
        initRate: function() {
            getTtlRate.exec({
                type: 'get',
                success: function(data) {
                    App.hideLoading();
                    if (data.ret == 0) {
                        self.data = data.data
                            //                        console.log(self.data.rateList)
                        for (var i = 0; i < self.data.rateList.length; i++) {
                            if (i == 0) {
                                max = self.data.rateList[i].date
                            }
                            if (i == self.data.rateList.length - 1) {
                                min = self.data.rateList[i].date
                            }
                            //                            console.log("key="+self.data.rateList[i].date+";value="+self.data.rateList[i].rate)
                            map.put(self.data.rateList[i].date, (self.data.rateList[i].rate).toFixed(5))

                        }
                        var initNowDate
                        if (data.data.hasInvestingOrder == 1) {
                            initNowDate = data.data.todayYieldRate.toFixed(5)
                        } else {
                            initNowDate = (self.data.rateList[0].rate).toFixed(5)
                        }

                        self.$("#cycle_num_1").html(initNowDate.substr(2, 1))
                        self.$("#cycle_num_2").html(initNowDate.substr(3, 1))
                        self.$("#cycle_num_3").html(initNowDate.substr(4, 1))
                        self.$("#cycle_num_4").html(initNowDate.substr(5, 1))
                        self.$("#cycle_num_5").html(initNowDate.substr(6, 1))
                        var nowDate = new Date().getFullYear() + "-" + (new Date().getMonth() + 1) + "-" + new Date().getDate()

                        today = new Date().getFullYear() + "" + (new Date().getMonth() + 1) + "" + new Date().getDate()
                        var showDate_1 = self.addDate(nowDate, -1)
                        var showDate_2 = self.addDate(nowDate, 0)
                        var showDate_3 = self.addDate(nowDate, 1)
                        var showDate_4 = self.addDate(nowDate, 2)
                        var showDate_5 = self.addDate(nowDate, -2)
                        self.$("#cycle_1").html(showDate_1.substr(4, 2) + "/" + showDate_1.substr(6, 2))
                        self.$("#cycle_2").html(showDate_2.substr(4, 2) + "/" + showDate_2.substr(6, 2))
                        self.$("#cycle_3").html(showDate_3.substr(4, 2) + "/" + showDate_3.substr(6, 2))
                        self.$("#cycle_4").html(showDate_4.substr(4, 2) + "/" + showDate_4.substr(6, 2))
                        self.$("#cycle_8").html(showDate_5.substr(4, 2) + "/" + showDate_5.substr(6, 2))


                        self.$("#todayYieldRate").html(self.format(data.data.todayYieldRate))

                    } else if (data.ret == 999001) {
                        if(handle.mobileType()=="android"){
                            window.app.outTime()
                        }else  if(handle.mobileType()=="ios") {
                            handle.setupWebViewJavascriptBridge(function(bridge) {
                                bridge.callHandler('timeout', null, function(response) {
                                })
                            })
                        }else{
                            handle.goLogin();
                        }
                    } else {
                        App.showToast(data.msg || self.message);
                    }
                },
                error: function() {
                    App.hideLoading();
                }
            });
        },
        initTemple: function() {
            self.initBuyTime();
            self.$el.html(_.template(introduce)(self.pageData));
            //App.showToast("aaaaaaaa")
            document.getElementById("cycle").addEventListener('touchmove',function(e){
                //App.showToast("ssssss")
                e.stopPropagation();
                e.preventDefault();
            });
            self.initNotice()
            self.setCycle();
            self.initRate();

            App.hideLoading();
        },
        initBuyTime: function() {
            //初始化是否可购买
            self.serverTime = self.pageData.getTtlProperty.serverTime.slice(-6);
            self.saleStart = self.pageData.getTtlProperty.saleStartTime;
            self.saleEnd = self.pageData.getTtlProperty.saleEndTime;

            self.saleStatus=self.pageData.getTtlProperty.saleStatus;
            self.nextSaleDate=self.pageData.getTtlProperty.nextSaleDate;
            // console.log(self.serverTime);
            // console.log(self.saleStart);
            // console.log(self.saleEnd);

            //如果在售卖时间段内

            if (self.saleStatus=='01') {
                self.pageData.buttonText="购买"
                if (self.saleStart <= self.serverTime && self.serverTime <= self.saleEnd) {
                    self.pageData.getTtlProperty.isCanBuy = 1;
                }else{
                    self.pageData.getTtlProperty.isCanBuy = 0;
                }
            }else if (self.saleStatus=='03')  {
                self.pageData.buttonText="已售罄"
                self.pageData.getTtlProperty.isCanBuy = 0;
            } else  if (self.saleStatus=='02') {
                self.pageData.buttonText="还有机会"
                self.pageData.getTtlProperty.isCanBuy = 0;
            }else{
                self.pageData.buttonText="购买"
                self.pageData.getTtlProperty.isCanBuy = 0;
            }
            //var today=new Date()
            ////console.log(today>1454716800000&&today<1455494400000)
            //if(today>1454716800000&&today<1455494400000){
            //    self.pageData.getTtlProperty.isCanBuy = 0;
            //}

        },
        goBuyPage: function(e) {
            e.preventDefault(e);
            //如果在售卖时间段内
            if (self.saleStatus=='01') {
                if (self.saleStart <= self.serverTime && self.serverTime <= self.saleEnd) {
                    if(handle.mobileType()=="android"){
                        window.app.ttlBuy()
                    }else  if(handle.mobileType()=="ios") {
                        handle.setupWebViewJavascriptBridge(function(bridge) {
                            bridge.callHandler('ttlBuy', null, function(response) {
                            })
                        })
                    }else{
                       self.ToTtlBuy()
                    }

                }else{
                    self.getOrderInfoAlert = handle.alert('产品开放购买时间为06:00 ~ 22:00，请到时再来哦！', function () {
                    }).show();
                }
            } else if (self.saleStatus=='00')  {
                self.getOrderInfoAlert = handle.alert('下个开放购买日期为'+self.nextSaleDate, function () {
                }).show();
                return;
            }else if (self.saleStatus=='02')  {
                self.getOrderInfoAlert = handle.alert('暂无额度，但还有人未完成支付，5分钟后再来看看！', function () {
                }).show();
                return;
            }else if (self.saleStatus=='03')  {
                return;
            }
        },
        ToTtlBuy:function(){
            // 初始化购买页面
            App.showLoading();
            initTtlBuyPage.exec({
                type: 'get',
                success: function(data){

                    if(data.ret == 0){
                        sessionStorage.setItem("ttlBuyData",JSON.stringify(data.data))
                        App.goTo('ttl_buy_one');
                    } else if(data.ret == 999001){
                        //未登录
                        handle.goLogin();
                    }  else if (data.ret == 110001) { // 未完成实名绑卡
                        App.hideLoading();
                        self.promptAlert = handle.prompt('未完成实名绑卡,是否立即去绑卡？','放弃', '确定', function(){
                        },function(){
                            App.goTo('bind_card_new');
                        });
                        self.promptAlert.show();
                    }  else if (data.ret == 110210) { // 当前银行卡未签约，请先签约

                        App.hideLoading();
                        self.promptAlert = handle.prompt('当前银行卡未签约，是否去签约？','放弃', '确定', function(){
                        },function(){
                            App.goTo('fuyou_sign');
                        });
                        self.promptAlert.show();

                    } else if (data.ret == 100031) { // 余额查询失败，请稍后重试

                        App.hideLoading();
                        self.promptAlert = handle.prompt(data.msg,'放弃', '去设置',function(){
                            //解除锁定
                        }, function(){
                            //继续更换
                            App.goTo('bind_card_new');
                        });
                        self.promptAlert.show();
                    } else{
                        App.showToast(data.msg  || self.message);
                    }
                    App.hideLoading();
                },
                error: function(){
                    App.hideLoading();
                }
            });
        },
        goRedemPage: function() {
            var redemBtn = $("#action_redem");
            if (!redemBtn.hasClass('lock')) {
                if(handle.mobileType()=="android"){
                    window.app.ttlRedemption()
                }else  if(handle.mobileType()=="ios") {
                    handle.setupWebViewJavascriptBridge(function(bridge) {
                        bridge.callHandler('ttlRedemption', null, function(response) {
                        })
                    })
                }else{
                    self.ToRedemption()
                }

            } else {
                // App.showAlert("不可赎回");
                return;
            }
        },
        ToRedemption:function(){
            App.showLoading()
            toRedeem.exec({
                type: 'get',
                success: function(data){

                    App.hideLoading();
                    if(data.ret == 0){
                        sessionStorage.setItem("redemptionData",JSON.stringify(data.data))
                        App.goTo("redemption")
                    }else if(data.ret == 999001) {
                        handle.goLogin();
                    }else if(data.ret == 100301||data.ret == 100302||data.ret == 100303||data.ret == 100304||data.ret == 100305) {
                        self.promptAlert = handle.alert(data.msg);
                        self.promptAlert.show();
                    }else if (data.ret == 110001) { // 未完成实名绑卡
                        App.hideLoading();
                        self.promptAlert = handle.prompt('未完成实名绑卡,是否立即去绑卡？','放弃', '确定', function(){
                        },function(){
                            App.goTo('bind_card_new');
                        });
                        self.promptAlert.show();
                    }  else if (data.ret == 110210) { // 当前银行卡未签约，请先签约

                        App.hideLoading();
                        self.promptAlert = handle.prompt('当前银行卡未签约，是否去签约？','放弃', '确定', function(){
                        },function(){
                            App.goTo('fuyou_sign');
                        });
                        self.promptAlert.show();

                    }else if(data.ret == 100031) {
                        self.promptAlert = handle.prompt(data.msg,'放弃', '去设置',function(){
                            //解除锁定
                            if(handle.mobileType()=="android"){
                                window.app.goBack()
                            }else if(handle.mobileType()=="ios") {
                                handle.setupWebViewJavascriptBridge(function (bridge) {
                                    bridge.callHandler('back', null, function (response) {
                                    })
                                })
                            }else{
                                App.goTo("ttl_introduce")
                            }
                        }, function(){
                            //继续更换
                            App.goTo('bind_card_new');
                        });
                        self.promptAlert.show();
                    }else if(data.ret == 110210) {
                        self.promptAlert = handle.prompt(data.msg,'放弃', '去签约',function(){
                            //解除锁定
                            if(handle.mobileType()=="android"){
                                window.app.goBack()
                            }else if(handle.mobileType()=="ios") {
                                handle.setupWebViewJavascriptBridge(function (bridge) {
                                    bridge.callHandler('back', null, function (response) {
                                    })
                                })
                            }else{
                                App.goTo("ttl_introduce")
                            }
                        }, function(){
                            //继续更换
                            App.goTo('fuyou_sign');
                        });
                        self.promptAlert.show();
                    }else{
                        App.showToast(data.msg  ||message);
                    }


                },
                error: function(){
                    App.hideLoading();
                    App.showToast(message);
                }
            })
        },
        initNotice:function(){
            getRollingNotice.exec({
                type: 'get',
                data:{
                    index:'02'
                },
                success: function(data){
                    if(data.ret == 0){
                        if(data.data.isShow==1){
                            $(".notice").css("display","block")
                            $(".notice_text").html(data.data.content)
                            self.time=data.data.duration
                            self.noticeAni()
                        }
                    }else if(data.ret == 999001){
                        handle.goLogin();
                    }else{
                        App.showToast(data.msg  || self.message);
                    }
                },
                error: function(){
                    App.hideLoading();
                    App.showToast(self.message);
                }
            });
        },
        noticeAni:function(){
            $(".notice_text").css("marginLeft",document.body.clientWidth)
            require(["jquery"], function ($) {
                $(".notice_text").animate({marginLeft:-($(".notice_text")[0].scrollWidth+document.body.clientWidth)},self.time,"linear",self.noticeAni);
            });
        },
        onHide: function() {
            now = 0
        },
        actionTitleTip: function() {
            if(handle.mobileType()=="android"){
                window.app.ttlTipsOn()
            }else  if(handle.mobileType()=="ios") {
                handle.setupWebViewJavascriptBridge(function(bridge) {
                    bridge.callHandler('ttlTipsOn', null, function(response) {
                    })
                })
            }else{

            }
            var titleTip = '<article class="ttl_title_tip " id="ttl_title_tip">\
                    <h2 class="tip_head">收益率小助手</h2>\
                    <dl class="tip_list">\
                        <dt class="tip_list_title">一、什么是天添利？</dt>\
                        <dl class="tip_list_content">一款100元起投、收益率按天增涨的活期理财产品。</dl>\
                        <dt class="tip_list_title">二、收益率如何增涨？</dt>\
                        <dl class="tip_list_content">购买当天的起始收益率为5%，并按天增涨，最高可达11.2%。</dl>\
                        <dt class="tip_list_title">三、收益率转盘如何使用？</dt>\
                        <dl class="tip_list_content">根据转盘两侧的提示符，分别向右、向左转动转盘， 可查看昨日以及未来7日（共9天）年化收益率。</dl>\
                        <dt class="tip_list_title">四、什么是“当日最高收益率”？</dt>\
                        <dl class="tip_list_content">所有在投订单中拥有最高收益率订单的今日收益率（若无在投资产， 数值显示为起始收益率）。</dl>\
                        <dt class="tip_list_title">五、可售日期？</dt>\
                        <dl class="tip_list_content">周日~周四可售，如遇法定节假日：则节假日前一天停止售卖，直至节假日最后一天开放购买。（即：第一个工作日前一天起 ~ 第一个假期日前第二个工作日可售）</dl>\
                         <dt class="tip_list_title">六、购买时间？</dt>\
                          <dl class="tip_list_content">每个可售日期的06:00 ~ 22:00 开放购买</dl>\
                        <dt class="tip_list_title">七、何日起息？何日能看到收益？</dt>\
                        <dl class="tip_list_content">投资成功后，当日起息；次日显示收益（若收益少于0.01元，则不予显示）。</dl>\
                        <dt class="tip_list_title">八、何时可以赎回？是否需要手续费？</dt>\
                        <dl class="tip_list_content">投资成功后，随时可申请赎回，无任何手续费。</dl>\
                        <dt class="tip_list_title">九、赎回次数与金额？</dt>\
                        <dl class="tip_list_content">每日赎回限额为20万元，次数为5次（大额赎回通道即将开放）。</dl>\
                        <dt class="tip_list_title">十、赎回的金额什么时候到账？</dt>\
                        <dl class="tip_list_content">提交赎回后（t 日），一般为（t + 3 ）个工作日到账，如遇节假日， 将往后顺延，具体时间视银行而定（请关注平台交易记录中的赎回状态）。</dl>\
                        <dt class="tip_list_title">十一、资金赎回到哪里？</dt>\
                        <dl class="tip_list_content">赎回资金将返回现金余额账户， 请点击底部导航菜单“我”进行查看。</dl>\
                        <dt class="tip_list_title">十二、赎回规则？</dt>\
                        <dl class="tip_list_content">为了您的收益最大化，我们的赎回规则为：按订单的收益率从低到高开始赎回（即较晚投资的订单优先赎回）。</dl>\
                        <dt class="tip_list_title">十三、赎回当天是否计算收益？</dt>\
                        <dl class="tip_list_content">赎回当天不计算收益。</dl>\
                    </dl>\
                    <div class="tip_close"><em class="tip_close_btn" id="tip_close_btn"></em></div>\
                </article>';
            //显示收益小助手
            $("#ttl_title_tip").remove();
            $("body").append(titleTip);
            App.showToast($("#ttl_title_tip"));
            //隐藏收益小助手
            $("#tip_close_btn").on("click", function() {
                if(handle.mobileType()=="android"){
                    window.app.ttlTipsOff()
                }else  if(handle.mobileType()=="ios") {
                    handle.setupWebViewJavascriptBridge(function(bridge) {
                        bridge.callHandler('ttlTipsOff', null, function(response) {
                        })
                    })
                }else{

                }
                $("#ttl_title_tip").remove();
            });
        }
    })
});