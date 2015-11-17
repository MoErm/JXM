//实名绑卡
define(function (require, exports, module) {
        var bindCard = require('jxm/tpl/bind.card.tpl');
        var tool = require('jxm/utils/Tool');
        var model = require('jxm/model/model');
        var Store = require("jxm/model/store");
        var verifyIdentityModel = new model.verifyIdentityModel();
        var getBankInfoModel = new model.getBankInfoModel();
        var getAddrModel = new model.getAddrModel();
        var loginStore = new Store.loginStore();
        var footer = require('jxm/tpl/card.footer.tpl');
        var handle = new tool();
        var message = '网络错误，请稍后重试';
        var bankIndex = 0;
        var self;
        module.exports = App.Page.extend({
            initialize:function(){
                self = this;
            },
            afterMount: function(){
                    self.$el.html(bindCard + footer);
                    self.regClear();

            },
            events: {
                'click .js_agreement a': 'agreementLink',//《委托支付服务协议》
                'click .js_agreement': 'agreement',//是否同意《委托支付服务协议》
                'click .js_next': 'next',//下一步
                'input .js_card_number' : 'clearBrank',//不让输入空格
                'click .js_band_card': 'showCard',//获取银行卡信息
                'click .js_address': 'showAddress',//获取开户行信息
                'click .bank_tips':'showBankTips'
            },
            clearBrank: function(e){
                var val = $(e.target).val();
                $(e.target).val(handle.deleteAllBlank(val));
            },
            onShow: function () {
                self.setHeader();
            },
            setHeader: function () {
                var header = new App.UI.UIHeader();
                header.set({
                    view: this,
                    title: '实名绑卡',
                    back: {
                        'tagname': 'back',
                        callback: function () {
                            if(!self.promptAlert){
                                self.promptAlert = handle.prompt('未完成设置将无法进行交易。要继续完成设置吗？','放弃', '继续', function(){
                                    handle.getProductLink();
                                });
                            }
                            self.promptAlert.show();
                        }
                    },
                    right: null
                });
            },
            agreement: function(e){
                $(e.target).toggleClass('checked')
            },
            agreementLink: function(e){
                e.stopImmediatePropagation();
                App.goTo('get_contract?cid=13&type=2');
            },
            clearBrank: function(e){
                var val = $(e.target).val();
                $(e.target).val(handle.deleteAllBlank(val));
            },
            showBankTips:function(){
                    App.showLoading();
                    getBankInfoModel.exec({
                        type: 'get',
                        success: function(data){
                            App.hideLoading();
                            if(data.ret == 0){
                                if(data.data && data.data.banks && data.data.banks.length){
                                    self.banklist = [];
                                    var html="";
                                    _.each(data.data.banks, function(i, k) {
                                        var index=k+1;
                                        html+="<tr><td>"+index+"</td><td>"+i.bankName+"</td><td>"+i.transactLimit+"</td><td>"+i.dailyLimit+"</td></tr>";
                                        self.banklist.push({
                                            'name':'<img src="'+ i.bankLogo+'" width="30px" height="30px" /> <span style="display: inline-block;height: 30px;line-height: 30px;vertical-align: top">'+ i.bankName+'(限额<span style="display:inline-block;width:60px;text-align: left">'+ i.transactLimit+')</span></span>',
                                            'selectName': i.bankName,
                                            'id': i.bankCode,
                                            'index': k
                                        })
                                    })
                                    var tpl="<table class='limit_info'><caption>银行卡支付限额信息表</caption>" +
                                        "<tr><td>序号</td><td>银行名称</td><td>单笔限额</td><td>单日限额</td></tr>"
                                        +html+
                                        "</table>";
                                    var banktips=handle.alert(tpl);
                                    banktips.show();
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
            },
            //获取银行卡数据
            showCard: function(){
                if(!self.banklist){
                    App.showLoading();
                    getBankInfoModel.exec({
                        type: 'get',
                        success: function(data){
                            App.hideLoading();
                            if(data.ret == 0){
                                if(data.data && data.data.banks && data.data.banks.length){
                                    self.banklist = [];
                                    _.each(data.data.banks, function(i, k) {
                                        self.banklist.push({
                                            'name':'<img src="'+ i.bankLogo+'" width="30px" height="30px" /> <span style="display: inline-block;height: 30px;line-height: 30px;vertical-align: top">'+ i.bankName+'(限额<span style="display:inline-block;width:60px;text-align: left">'+ i.transactLimit+')</span></span>',
                                            'selectName': i.bankName,
                                            'id': i.bankCode,
                                            'index': k
                                        })
                                    })
                                    self.selectBank();
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
                    self.selectBank();
                }
            },
            //显示银行卡
            selectBank: function(){
                if(!self.bank){
                    self.bank = new App.UI.UIList({
                        //maskToHide:false,
                        datamodel: {
                            title: '银行卡列表',
                            data: self.banklist,
                            index: bankIndex
                        },
                        displayNum: 5,
                        onClick: function(data) {
                            self.$('.js_band_card input').val(data.selectName);
                            bankIndex = data.index;
                            self.bankData = {
                                'bankCode': data.id,
                                'bankName': data.name
                            };
                            this.hide();
                        }
                    });
                }
                self.bank.show();
            },
            //地址信息
            showAddress: function(){
                if(!self.provinces){
                    App.showLoading();
                    getAddrModel.exec({
                        type: 'get',
                        success: function(data){
                            App.hideLoading();
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
                    var txt = input.val();
                    var arr = txt.split(' ');
                    if(txt){
                        findProvince = _.find(self.provinces, function(o) { return o.provinceName == arr[0]});
                        if(findProvince){
                            cityX = findProvince.index;
                            if(arr[1]){
                                var findCity = _.find(findProvince.cities, function(o) { return o.cityName == arr[1]});
                                cityY = findCity ? findCity.index : 0;
                            }
                        }
                    }
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
                            title: '请选择开户行省市',
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
                            self.$('.js_address input').val(items[0].name == items[1].name ? items[0].name : items[0].name + ' ' + items[1].name);
                            this.hide();
                        },
                        onCancelAction: function() {
                            this.hide();
                        }
                    });
                    self.selectCity.show();
            },
            next: function(){
                App.goTo('confirm_card');
                return;
                    var error = [];
                    var name = handle.deleteAllBlank(self.$('.js_name').val());
                    var idCard = handle.deleteAllBlank(self.$('.js_id_card').val());
                    var cardNumber = handle.deleteAllBlank(self.$('.js_card_number').val());
                    var tel = self.$('.js_tel').val();
                    if(!name){
                        error.push('请输入姓名');
                    }else if(!handle.checkName(name)){
                        error.push('姓名不正确');
                    }
                    if(!idCard){
                        error.push('请输入身份证号');
                    }else if(!handle.checkIdCard(idCard)){
                        error.push('身份证号不正确');
                    }
                    if(!self.bankData){
                        error.push('请选择开户银行');
                    }
                    if(!self.cityData){
                        error.push('请选择银行卡开户省份');
                    }
                    if(!cardNumber || cardNumber.length < 16){
                        error.push('请输入正确的银行卡号');
                    }
                    if(!tel){
                        error.push('请输入手机号');
                    }else if(!handle.checkTel(tel)){
                        error.push('手机号不正确');
                    }
                    if(!self.$('.js_agreement').hasClass('checked')){
                        error.push('请阅读并同意 《用户委托支付协议');
                    }
                    if(error.length){
                        App.showToast(error[0]);
                        return;
                    }
                    App.showLoading();
                    verifyIdentityModel.set({
                        'username': name,
                        'identityNo': idCard,
                        'bankCode': self.bankData.bankCode,
                        'bankName': self.bankData.bankName,
                        'bankProvinceCode': self.cityData.bankProvinceCode,
                        'bankProvinceName': self.cityData.bankProvinceName,
                        'cityName': self.cityData.cityName,
                        'cityId':   self.cityData.cityId,
                        'cardNo': cardNumber,
                        'cardMobile': tel
                    });
                    verifyIdentityModel.exec({
                        type: 'post',
                        success: function(data){
                            App.hideLoading();
                            if(data.ret == 0){

                                    loginData.banktel = tel;
                                    loginStore.set(loginData);
                                    App.goTo('confirm_card');


                            }else if(data.ret == 999001){
                                handle.goLogin();
                            }else{
                                App.showToast(data.msg || message);
                            }
                        },
                        error: function(){
                            App.hideLoading();
                            App.showToast(message);
                        }
                    })
            },
            regClear:function(){
                _.each(['js_name', 'js_id_card', 'js_card_number', 'js_tel'], function(item){
                    App.UI.UIInputClear(self.$('.' + item), '', null, {'right': 5});
                })
            },
            onHide: function(){
                if(self.promptAlert){
                    self.promptAlert.hide();
                }
                if(self.bank){
                    self.bank.hide();
                }
                if(self.selectCity){
                    self.selectCity.hide();
                }
            }
        })
})
