//我的银行卡
define(function (require, exports, module) {
    var test_pie = require('jxm/tpl/test_pie.tpl');
    var Model = require("jxm/model/model");
    var getAddrModel = new Model.getAddrModel();
    var tool = require('jxm/utils/Tool');
    var handle = new tool();
    var message = '网络错误，请稍后重试';
    var self;
    module.exports = App.Page.extend({
        events: {
            'click .js_add_card': 'goAddCard'
        },
        onShow: function () {
            self.setHeader()
            self.$el.html(test_pie);
            self.showPie();
//            self.showAddress();
            return
        },
        showPie:function(){
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
                        title: {
                            text: "对数轴示例",
                            x: "center"
                        },
                        tooltip: {
                            trigger: "item",
                            formatter: "{a} <br/>{b} : {c}"
                        },
                        legend: {
                            x: 'left',
                            data: ["2的指数", "3的指数"]
                        },
                        xAxis: [
                            {
                                type: "category",
                                name: "x",
                                splitLine: {show: false},
                                data: ["一", "二", "三", "四", "五", "六", "七", "八", "九"]
                            }
                        ],
                        yAxis: [
                            {
                                type: "log",
                                name: "y"
                            }
                        ],
                        toolbox: {
                            show: true,
                            feature: {
                                mark: {
                                    show: true
                                },
                                dataView: {
                                    show: true,
                                    readOnly: true
                                },
                                restore: {
                                    show: true
                                },
                                saveAsImage: {
                                    show: true
                                }
                            }
                        },
                        calculable: true,
                        series: [
                            {
                                name: "3的指数",
                                type: "line",
                                data: [1, 3, 9, 27, 81, 247, 741, 2223, 6669]

                            },
                            {
                                name: "2的指数",
                                type: "line",
                                data: [1, 2, 4, 8, 16, 32, 64, 128, 256]

                            }
                        ]
                    }
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
                    // 'tagname': 'back',
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










