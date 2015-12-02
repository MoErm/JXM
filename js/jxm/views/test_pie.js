//我的银行卡
define(function (require, exports, module) {
    var test_pie = require('jxm/tpl/test_pie.tpl');
    var hammer = require('hammer');
    var Model = require("jxm/model/model");
    var getAddrModel = new Model.getAddrModel();
    var tool = require('jxm/utils/Tool');
    var handle = new tool();
    var message = '网络错误，请稍后重试';
    var self;
    var timeTemp=0;
    var pool= new Array(1,2,3);
    var hidePool= new Array(4,5,6,7,8);
    var turnNum=0;
    module.exports = App.Page.extend({
        events: {
            'click .js_add_card': 'goAddCard',
            'click .tradeTotal_1': 'setCycle',
            'click #abcd': 'test',
            'click #abc': 'test1'
        },
        test:function(){

        },
        test1:function(){
            console.log("asd11")
        },
        onShow: function () {
            self.setHeader()
            self.$el.html(test_pie);
//            self.showPie();
//            self.showAddress();
            console.log(Date.now())

            var hit = document.querySelector("#tradeAmount");

            var mc = new hammer(hit);

            var cycle=window.document.getElementById("cycle")

            mc.get('pinch').set({ enable: true });
//            var debug = document.querySelector("#debug");
            mc.on("hammer.input", function(ev) {
//                console.log([ev.srcEvent.type, ev.pointers.length, ev.isFinal, ev.deltaX, ev.deltaY].join("<br>"))
                if(ev.deltaX!=0){
                  //  var deg=cycle.style.webkitTransform;
                   // deg=deg.substring(7,deg.length-4)
                   // console.log(cycle.style.webkitTransform+"  "+deg)
                   // var mathDeg=parseInt(deg)
//                    cycle.style.transition="-webkit-transform 1500ms ease-out";


//                    cycle.style.webkitTransform="rotate(" + (mathDeg+parseInt(500)) + "deg)";
                }
                self.cycleTime(ev.deltaX)
                if(ev.srcEvent.type=="touchend"){
                    turnNum=0
                }
            });
            return
        },
        cycleTime:function(deg){
            var num=Math.floor(deg/60)
            if(num==0){
                return
            }else if(num!=turnNum){
                if(num>turnNum){
                    console.log("+1")
                    self.showRed(1)
                }else{
                    console.log("-1")
                    self.showRed(-1)
                }

                turnNum=num;
            }else{
                return
            }

        },
        setCycle:function(){
//          var key= -3;
//            self.showRed(key)
        },
        showRed:function(key){
            if(key<0){
                console.log("转-1")
                pool.push(hidePool.shift())
                hidePool.push(pool.shift())
            }else{
                console.log("转+1")
                pool.reverse()
                hidePool.reverse()
                pool.push(hidePool.shift())
                hidePool.push(pool.shift())
                pool.reverse()
                hidePool.reverse()
            }
            console.log(pool)
            console.log(hidePool)
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
        checkSpeed:function(stauts,crossX,crossY){
            var touchTime;
            var speed;
             if(stauts=="touchstart"){
                 timeTemp=Date.now()
                 return 0
             }else  if(stauts=="touchend"){
                 touchTime=Date.now()-timeTemp
                 speed=-Math.sqrt(crossX*crossX+crossY*crossY)/touchTime
                 console.log(speed)
                 return speed
             }else{
                 return 0
             }

        },
        showPie:function(){
            console.log(App)
            var dataStyle = {
                normal: {
                    label: {show:false},
                    labelLine: {show:false}
                }
            };
            var placeHolderStyle = {
                normal : {
                    color: 'rgba(0,0,0,0)',
                    label: {show:false},
                    labelLine: {show:false}
                },
                emphasis : {
                    color: 'rgba(0,0,0,0)'
                }
            };

            require(
                [
                    'echarts',
                    'echarts/chart/pie',
                    'echarts/chart/line'
                ],
                function (ec) {
                    var myChart = ec.init(document.getElementById('main'));
                    var option = {
//                        tooltip : {
//                            formatter: "{a} <br/>{b} : {c}%"
//                        },
//
//                        series : [
//                            {
//                                name:'业务指标',
//                                type:'gauge',
//                                startAngle: 180,
//                                endAngle: 0,
//                                center : ['50%', '90%'],    // 默认全局居中
//                                radius : 200,
//                                axisLine: {            // 坐标轴线
//                                    lineStyle: {       // 属性lineStyle控制线条样式
//                                        width: 150
//                                    }
//                                },
//                                axisTick: {            // 坐标轴小标记
//                                    splitNumber: 2,   // 每份split细分多少段
//                                    length :12        // 属性length控制线长
//                                },
//                                axisLabel: {           // 坐标轴文本标签，详见axis.axisLabel
//                                    formatter: function(v){
//                                        switch (v+''){
//                                            case '10': return '低';
//                                            case '50': return '中';
//                                            case '90': return '高';
//                                            default: return '';
//                                        }
//                                    },
//                                    textStyle: {       // 其余属性默认使用全局文本样式，详见TEXTSTYLE
//                                        color: '#fff',
//                                        fontSize: 15,
//                                        fontWeight: 'bolder'
//                                    }
//                                },
//                                pointer: {
//                                    width:10,
//                                    length: '90%',
//                                    color: 'rgba(255, 255, 255, 0.8)'
//                                },
//                                title : {
//                                    show : true,
//                                    offsetCenter: [0, '-60%'],       // x, y，单位px
//                                    textStyle: {       // 其余属性默认使用全局文本样式，详见TEXTSTYLE
//                                        color: '#fff',
//                                        fontSize: 30
//                                    }
//                                },
//                                detail : {
//                                    show : true,
//                                    backgroundColor: 'rgba(0,0,0,0)',
//                                    borderWidth: 0,
//                                    borderColor: '#ccc',
//                                    width: 100,
//                                    height: 40,
//                                    offsetCenter: [0, -40],       // x, y，单位px
//                                    formatter:'{value}%',
//                                    textStyle: {       // 其余属性默认使用全局文本样式，详见TEXTSTYLE
//                                        fontSize : 20
//                                    }
//                                },
//                                data:[{value: 50, name: '完成率'}]
//                            }
//                        ]
                    }


//                    var ecConfig = require('echarts/config');
//                    function eConsole(param) {
//                        var mes = '【' + param.type + '】';
//                        if (typeof param.seriesIndex != 'undefined') {
//                            mes += '  seriesIndex : ' + param.seriesIndex;
//                            mes += '  dataIndex : ' + param.dataIndex;
//                        }
//                        if (param.type == 'hover') {
//                         console.log( 'Event Console : ' + mes);
//                        }
//                        else {
//                            console.log( 'Event Console : ' + mes);
//
//                        }
//                        console.log(param);
//                    }
                    /*
                     // -------全局通用
                     REFRESH: 'refresh',
                     RESTORE: 'restore',
                     RESIZE: 'resize',
                     CLICK: 'click',
                     DBLCLICK: 'dblclick',
                     HOVER: 'hover',
                     MOUSEOUT: 'mouseout',
                     // -------业务交互逻辑
                     DATA_CHANGED: 'dataChanged',
                     DATA_ZOOM: 'dataZoom',
                     DATA_RANGE: 'dataRange',
                     DATA_RANGE_HOVERLINK: 'dataRangeHoverLink',
                     LEGEND_SELECTED: 'legendSelected',
                     LEGEND_HOVERLINK: 'legendHoverLink',
                     MAP_SELECTED: 'mapSelected',
                     PIE_SELECTED: 'pieSelected',
                     MAGIC_TYPE_CHANGED: 'magicTypeChanged',
                     DATA_VIEW_CHANGED: 'dataViewChanged',
                     TIMELINE_CHANGED: 'timelineChanged',
                     MAP_ROAM: 'mapRoam',
//                     */
//                    myChart.on(ecConfig.EVENT.CLICK, eConsole);
//                    myChart.on(ecConfig.EVENT.DBLCLICK, eConsole);
////myChart.on(ecConfig.EVENT.HOVER, eConsole);
//                    myChart.on(ecConfig.EVENT.DATA_ZOOM, eConsole);
//                    myChart.on(ecConfig.EVENT.LEGEND_SELECTED, eConsole);
//                    myChart.on(ecConfig.EVENT.MAGIC_TYPE_CHANGED, eConsole);
//                    myChart.on(ecConfig.EVENT.DATA_VIEW_CHANGED, eConsole);

                    myChart.setOption(option);
            }
        );


        },

        //地址信息
        showAddress: function(){


            if(!self.provinces){
                console.log(111)
                App.showLoading();
                getAddrModel.exec({
                    type: 'get',
                    success: function(data){
                        App.hideLoading();
                        console.log(data)
                        if(data.ret == 0){
                            if(data.data && data.data.provinces && data.data.provinces.length){
                                self.provinces = data.data.provinces;
                                _.each(self.provinces, function(provincesItem,provincesIndex) {
                                    provincesItem.index = provincesIndex;
                                    _.each(provincesItem.cities, function(citiesItem, citiesIndex) {
                                        citiesItem.index = citiesIndex;
                                    })
                                });
                                self.selectAddress();
                            }else{
                                App.showToast('出现错误，请稍后重试');
                            }
                        }else if(data.ret == 999001){
                            handle.goLogin();
                        }else{
                            App.showToast(data.msg  || message);
                        }
                    },
                    error: function(){
                        App.hideLoading();
                        App.showToast(message);
                    }
                })
            }else{
                self.selectAddress();
            }
        },
        //选择地址
        selectAddress: function(){
            var province = [];
            var cities = [];
            var cityX = 0;
            var cityY = 0;
            var input = self.$('.js_address input');
            var findProvince = null;
//            var txt = input.val();
//            var arr = txt.split(' ');
//            if(txt){
//                findProvince = _.find(self.provinces, function(o) { return o.provinceName == arr[0]});
//                if(findProvince){
//                    cityX = findProvince.index;
//                    if(arr[1]){
//                        var findCity = _.find(findProvince.cities, function(o) { return o.cityName == arr[1]});
//                        cityY = findCity ? findCity.index : 0;
//                    }
//                }
//            }
            _.each(self.provinces, function(o, k) {
                province.push({
                    id: o.provCode,
                    name: o.provName,
                    index: k
                })
            })
            _.each(findProvince ? findProvince.cities : self.provinces[0].cities, function(o, k) {
                cities.push({
                    id: o.cityId,
                    name: o.cityName,
                    index: k
                })
            })
            self.selectCity = new App.UI.UISelectGroup({
                data: [province, cities],
                indexArr: [cityX, cityY],
                maskToHide:false,
                datamodel: {
                    title: '请选择日期',
                    tips: ''
                },
                changedArr: [
                    function(item) {
                        cities = [];
                        var findData = _.find(self.provinces, function(o) { return o.provCode == item.id});
                        _.each(findData.cities, function(o) {
                            cities.push({
                                id: o.cityId,
                                name: o.cityName
                            })
                        });
                        self.selectCity.scrollArr[1].reload(cities);
                    }
                ],
                onHide: function () {
                    this._destroyScroll();
                },
                onOkAction: function(items) {
                    self.cityData = {
                        'bankProvinceName': items[0].name,
                        'bankProvinceCode': items[0].id,
                        'cityName': items[1].name,
                        'cityId': items[1].id
                    };
                    console.log(items)
                    self.$('.js_address input').val(items[0].name == items[1].name ? items[0].name : items[0].name + ' ' + items[1].name);
                    this.hide();
                },
                onCancelAction: function() {
                    this.hide();
                }
            });
            self.selectCity.show();
        },
        setHeader: function () {
            var header = new App.UI.UIHeader();
            header.set({
                view: this,
                title: '加薪猫月度对账单',
                back: {
                    'tagname': 'invite', 'value': '',
                    itemFn: function () {
                        return '<span class="right_txt_btn user js_invite" id="abcd">邀请好友</span>';
                    },
                    callback: function () {
                        //      App.goBack()
                    }
                },
                right: null
            });
        },
        afterMount: function () {
            self=this
        },
        onHide: function(){
            this.$el.html('');
        }
    })
})










