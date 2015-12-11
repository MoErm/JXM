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
    var pool = new Array(1, 2, 3);
    var hidePool = new Array(4, 5, 6, 7, 8);
    var turnNum = 0;
    var RoundNum = 2;
    var cycleRound = 0;
    var nowRoundNum = 0;
    var self = null;

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

    function addDate(date, days) {
        var d = new Date(date);
        d.setDate(d.getDate() + days);
        var m = d.getMonth() + 1;
        m = m + ""
        if (m.length == 1) {
            m = "0" + m
        }
        var day = d.getDate() + ""
        if (day.length == 1) {
            day = "0" + day
        }
        return d.getFullYear() + '' + m + '' + day;
    }
    module.exports = App.Page.extend({
        initialize: function() {
            return this;
        },
        events: {
            'click #action_buy': 'goBuyPage', //购买页面
            'click #action_redem': 'goRedemPage', //赎回页面
            'click #title_tip': 'goTitleTipPage' //收益助手提示
        },
        onShow: function() {
            pool = new Array(1, 2, 3);
            hidePool = new Array(4, 5, 6, 7, 8);
            turnNum = 0;
            RoundNum = 2;
            cycleRound = 0;
            nowRoundNum = 0;
            self = this.initialize();
            handle.share();
            self.pageData = {};
            self.setHeader();
            self.initProperty();
        },
        setCycle: function() {

            var hit = document.querySelector("#tradeAmount");
            var mc = new hammer(hit);

            var cycle = window.document.getElementById("cycle")

            mc.get('pinch').set({
                enable: true
            });
            mc.on("hammer.input", function(ev) {
                self.cycleTime(ev.deltaX)
                if (ev.srcEvent.type == "touchend") {
                    turnNum = 0
                }
            });
            return
        },
        cycleTime: function(deg) {
            var num = Math.round(deg / 100)
            if (num == 0) {
                return
            } else if (num != turnNum) {
                if (num > turnNum) {
                    self.showRed(1)
                } else {
                    self.showRed(-1)
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
            var showDate_1 = self.addDate(nowDate, RoundNum - 3)
            var showDate_2 = self.addDate(nowDate, RoundNum - 2)
            var showDate_3 = self.addDate(nowDate, RoundNum - 1)
                //            console.log(showDate_1+"  "+showDate_2+"  "+showDate_3)
            self.setRate(showDate_2)
            for (var i = 0; i < pool.length; i++) {
                //                self.$("#cycle_"+pool[i]).addClass("cycleTestRed")
                if (i == 0) {
                    self.$("#cycle_" + pool[i]).html(showDate_1.substr(4, 2) + "/" + showDate_1.substr(6, 2))
                } else if (i == 1) {
                    self.$("#cycle_" + pool[i]).html(showDate_2.substr(4, 2) + "/" + showDate_2.substr(6, 2))
                } else if (i == 2) {
                    self.$("#cycle_" + pool[i]).html(showDate_3.substr(4, 2) + "/" + showDate_3.substr(6, 2))
                }
            }
            for (var i = 0; i < hidePool.length; i++) {
                //                self.$("#cycle_"+hidePool[i]).removeClass("cycleTestRed")
            }
            var cycle = window.document.getElementById("cycle")
            var deg = cycle.style.webkitTransform;
            deg = deg.substring(7, deg.length - 4)
            var mathDeg = parseInt(deg)
            cycle.style.webkitTransform = "rotate(" + (mathDeg + key * 45) + "deg)";
        },
        setRate: function(key) {
            var rate = map.get(key)
                //            console.log("rate"+rate+" key"+key)
            if (rate == null) {

                self.$("#cycle_num_1").html("转")
                self.$("#cycle_num_2").html("你")
                self.$("#cycle_num_3").html("妹")
                self.$("#cycle_num_4").html("转")
                self.$("#cycle_num_5").html("啊")

            } else {
                self.$("#cycle_num_1").html(rate.substr(2, 1))
                self.$("#cycle_num_2").html(rate.substr(3, 1))
                self.$("#cycle_num_3").html(rate.substr(4, 1))
                self.$("#cycle_num_4").html(rate.substr(5, 1))
                self.$("#cycle_num_5").html(rate.substr(6, 1))
            }
        },
        addDate: function(date, days) {
            var d = new Date(date);
            d.setDate(d.getDate() + days);
            var m = d.getMonth() + 1;
            m = m + ""
            if (m.length == 1) {
                m = "0" + m
            }
            var day = d.getDate() + ""
            if (day.length == 1) {
                day = "0" + day
            }
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
                        App.goTo('ttl_recommend');
                    }
                },
                right: [{
                    'tagname': '',
                    'value': '交易记录&ensp;',
                    callback: function() {
                        App.goTo("redeem?type=1")
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
                        handle.goLogin();
                    } else {
                        App.showToast(data.msg || message);
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
                            //                            console.log("key="+self.data.rateList[i].date+";value="+self.data.rateList[i].rate)
                            map.put(self.data.rateList[i].date, (self.data.rateList[i].rate).toFixed(5))
                        }
                        var initNowDate = data.data.todayYieldRate.toFixed(5)
                        self.$("#cycle_num_1").html(initNowDate.substr(2, 1))
                        self.$("#cycle_num_2").html(initNowDate.substr(3, 1))
                        self.$("#cycle_num_3").html(initNowDate.substr(4, 1))
                        self.$("#cycle_num_4").html(initNowDate.substr(5, 1))
                        self.$("#cycle_num_5").html(initNowDate.substr(6, 1))
                        var nowDate = new Date().getFullYear() + "-" + (new Date().getMonth() + 1) + "-" + new Date().getDate()
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
                        handle.goLogin();
                    } else {
                        App.showToast(data.msg || message);
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
            self.setCycle();
            self.initRate();
            App.hideLoading();
        },
        initBuyTime: function(){
            //初始化是否可购买
            self.serverTime = self.pageData.getTtlProperty.serverTime.slice(-6);
            self.saleStart = self.pageData.getTtlProperty.saleStartTime;
            self.saleEnd = self.pageData.getTtlProperty.saleEndTime;
            
            // console.log(self.serverTime);
            // console.log(self.saleStart);
            // console.log(self.saleEnd);

            //如果在售卖时间段内
            if(self.saleStart <= self.serverTime && self.serverTime <= self.saleEnd ){
                self.pageData.getTtlProperty.isCanBuy= 1;
            }
            else{
                self.pageData.getTtlProperty.isCanBuy= 0;
            }

        },
        goBuyPage: function(e) {
            e.preventDefault(e);
            getTtlProperty.exec({
                type: 'get',
                success: function(data) {
                    if (data.ret == 0) {
                        self.pageData.getTtlProperty = data.data;

                    } else if (data.ret == 999001) {
                        handle.goLogin();
                    } else {
                        App.showToast(data.msg || message);
                    }
                },
                error: function() {
                    App.hideLoading();
                }
            });

            // console.log(self.serverTime);
            // console.log(self.saleStart);
            // console.log(self.saleEnd);

             //如果在售卖时间段内
            if(self.saleStart <= self.serverTime && self.serverTime <= self.saleEnd ){
                App.goTo("ttl_buy_one");
            }
            else{
                App.showToast("产品开放购买时间为06:00 ~ 22:00，请到时再来哦！");
                return;
            }
        },
        goRedemPage: function() {
            var redemBtn = $("#action_redem");
            if (!redemBtn.hasClass('lock')) {
                App.goTo("redemption");
            } else {
                // App.showAlert("不可赎回");
                return;
            }
        },
        goTitleTipPage: function() {

            App.goTo("ttl_title_tip");
        }
    })
})