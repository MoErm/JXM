//天添利 介绍页
define(function(require, exports, module) {
    var Model = require("jxm/model/model");
    var introduce = require('jxm/tpl/ttl_introduce.tpl');
    var footer = require('jxm/tpl/footer.tpl');
    var hammer = require('hammer');
    var tool = require('jxm/utils/Tool')
    var handle = new tool();
    var getTtlProperty = new Model.getTtlProperty();    //获取灵活宝资产信息接口
    var getTtlRate = new Model.getTtlRate();    //获取收益率接口
    // var goTtlBuyPage = new Model.goTtlBuyPage();  //购买页面跳转
    var pool= new Array(1,2,3);
    var hidePool= new Array(4,5,6,7,8);
    var turnNum=0;
    var RoundNum=2;
    var cycleRound=0;
    var self = null;
    var nowRoundNum=0;
    /**
     * @version 1.0
     * @author cuisuqiang@163.com
     * 用于实现页面 Map 对象，Key只能是String，对象随意
     */
    var Map = function(){
        this._entrys = new Array();

        this.put = function(key, value){
            if (key == null || key == undefined) {
                return;
            }
            var index = this._getIndex(key);
            if (index == -1) {
                var entry = new Object();
                entry.key = key;
                entry.value = value;
                this._entrys[this._entrys.length] = entry;
            }else{
                this._entrys[index].value = value;
            }
        };
        this.get = function(key){
            var index = this._getIndex(key);
            return (index != -1) ? this._entrys[index].value : null;
        };
        this.remove = function(key){
            var index = this._getIndex(key);
            if (index != -1) {
                this._entrys.splice(index, 1);
            }
        };
        this.clear = function(){
            this._entrys.length = 0;;
        };
        this.contains = function(key){
            var index = this._getIndex(key);
            return (index != -1) ? true : false;
        };
        this.getCount = function(){
            return this._entrys.length;
        };
        this.getEntrys =  function(){
            return this._entrys;
        };
        this._getIndex = function(key){
            if (key == null || key == undefined) {
                return -1;
            }
            var _length = this._entrys.length;
            for (var i = 0; i < _length; i++) {
                var entry = this._entrys[i];
                if (entry == null || entry == undefined) {
                    continue;
                }
                if (entry.key === key) {//equal
                    return i;
                }
            }
            return -1;
        };
    }
    var map = new Map();
    module.exports = App.Page.extend({
        initialize: function() {
            return this;
        },
        events: {
            'click #action_buy': 'goBuyPage',
            'click #action_redem': 'goRedemPage'            
        },
        onShow: function() {
            self = this.initialize();
            self.pageData= {};
            self.setHeader();
            self.initProperty();

        },
        setCycle: function () {

            var hit = document.querySelector("#tradeAmount");
            var mc = new hammer(hit);

            var cycle=window.document.getElementById("cycle")

            mc.get('pinch').set({ enable: true });
            mc.on("hammer.input", function(ev) {
                self.cycleTime(ev.deltaX)
                if(ev.srcEvent.type=="touchend"){
                    turnNum=0
                }
            });
            return
        },
        cycleTime:function(deg){
            var num=Math.round(deg/100)
            if(num==0){
                return
            }else if(num!=turnNum){
                if(num>turnNum){
                    self.showRed(1)
                }else{
                    self.showRed(-1)
                }

                turnNum=num;
            }else{
                return
            }

        },
        showRed:function(key){
            if(key<0){
                RoundNum++;
                console.log("转+1")
                pool.push(hidePool.shift())
                hidePool.push(pool.shift())
            }else{
                RoundNum--;
                console.log("转-1")
                pool.reverse()
                hidePool.reverse()
                pool.push(hidePool.shift())
                hidePool.push(pool.shift())
                pool.reverse()
                hidePool.reverse()
            }
            var cycleRoundTemp=RoundNum/8;
            if(RoundNum>0){
                cycleRoundTemp=Math.floor(cycleRoundTemp)
                nowRoundNum=RoundNum-cycleRoundTemp*8
            }else{
                cycleRoundTemp=Math.ceil(cycleRoundTemp)
                nowRoundNum=Math.abs(RoundNum+Math.abs(cycleRoundTemp*8))
            }

            cycleRound=cycleRoundTemp

            console.log("RoundNum="+RoundNum+"  cycleRoundTemp="+cycleRoundTemp+"   nowRoundNum="+nowRoundNum)
//            console.log(pool)
//            console.log(hidePool)
            for(var i=0;i<pool.length;i++){
                self.$("#cycle_"+pool[i]).addClass("cycleTestRed")
            }
            for(var i=0;i<hidePool.length;i++){
                self.$("#cycle_"+hidePool[i]).removeClass("cycleTestRed")
            }
            var cycle=window.document.getElementById("cycle")
            var deg=cycle.style.webkitTransform;
            deg=deg.substring(7,deg.length-4)
            var mathDeg=parseInt(deg)
            cycle.style.webkitTransform="rotate(" + (mathDeg+key*45) + "deg)";
        },


        initChart: function(){
            // var chartLine= Snap("#chart_line");
        },
        setHeader: function () {
            var header = new App.UI.UIHeader();
            header.set({
                view: this,
                title: '天添利',
                back: {
                    'tagname': 'back',
                    callback: function () {
                        App.goTo('ttl_recommend');
                    }
                },
                right: [{
                    'tagname': '', 'value': '交易记录&ensp;',
                    callback: function () {
                        App.goTo("redeem?type=1")
                    }
                }]
            });
        },
        initProperty: function(){
            App.showLoading();
            getTtlProperty.exec({
                type: 'get',
                success: function(data){
                    if(data.ret == 0){
                        self.pageData.getTtlProperty = data.data; 

                        self.initTemple();
                    }else if(data.ret == 999001){
                        handle.goLogin();
                    }else{
                        App.showToast(data.msg  || message);
                    }
                },
                error: function(){
                    App.hideLoading();
                }
            });
        },
        format:function(num){
            var temp_num=num*100
            return temp_num.toFixed(3)+"%"
        },
        initRate: function(){
            getTtlRate.exec({
                type: 'get',
                success: function(data){
                    App.hideLoading();
                    if(data.ret == 0){

                        var temp=data.data
                        console.log(data)
                        for(var i=0;i<temp.length-2;i++){
                            console.log("key="+(temp[temp.length-1]-i)+";value="+temp[i])
                            map.put(temp[temp.length-1])
                        }
                        self.$("#todayYieldRate").html(self.format(data.data.todayYieldRate))

                    }else if(data.ret == 999001){
                        handle.goLogin();
                    }else{
                        App.showToast(data.msg  || message);
                    }
                },
                error: function(){
                    App.hideLoading();
                }
            });
        },        
        initTemple: function(){
            self.$el.html(_.template(introduce)(self.pageData));
            self.setCycle();
            self.initRate();
            App.hideLoading();
            self.initChart();
        },

        goBuyPage: function(e){
            e.preventDefault(e);
            App.goTo("ttl_buy_one");
        },
        goRedemPage: function(){
            var redemBtn= $("#action_redem");
            if(!redemBtn.hasClass('lock')){
                App.goTo("redemption");
            }
            else{
                // App.showAlert("不可赎回");
                return;
            }
        }
    })
})