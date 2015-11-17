//实名绑卡
define(function (require, exports, module) {

        var bindCard_new_step2 = require('jxm/tpl/bind.card_new_step2.tpl');
        var tool = require('jxm/utils/Tool');
        var model = require('jxm/model/model');
        var Store = require("jxm/model/store");
        var getBankInfoModel = new model.getBankInfoModel();
        var getAddrModel = new model.getAddrModel();
        var realStatusCheck = new model.realStatusCheck();
        var getBankByBin = new model.getBankByBin();
        var realCheck = new model.realCheck();
        var sendDribblet = new model.sendDribblet();
        var loginStore = new Store.loginStore();
        var footer = require('jxm/tpl/card.footer.tpl');
        var handle = new tool();
        var message = '网络错误，请稍后重试';
        var bankIndex = 0;
        var self;
        var isAmountBank=false;
         var cardbin=false;
         var cardChecked=false;
        module.exports = App.Page.extend({
            initialize:function(){
                self = this;
            },
            afterMount: function(){


            },
            notice:function(){
                var urlhref="http://mp.weixin.qq.com/s?__biz=MzA5NDk4NDA5Ng==&mid=400082926&idx=1&sn=f3c1486ae959330abe726931bd6a0c9d#rd"
                if(window.WebViewJavascriptBridge){

                    window.WebViewJavascriptBridge.callHandler('openUrl',{"url": urlhref},function(response) {})

                }else{
                    window.location.href=urlhref;
                }
            },
            showBind:function(data){



                self.$el.html(_.template(bindCard_new_step2)(data)+footer);
                self.regClear();

            },
            checkCardBin:function(){
                if(!cardbin){
                    return;
                }
                var card_num=handle.deleteAllBlank(self.$('.js_card_number').val())

                if(!card_num || card_num.length < 16){
                    App.showToast('请输入正确的银行卡号');

                    return;
                }

                isAmountBank=false;
                App.showLoading();
                getBankByBin.exec({
                    type: 'get',
                    data:{
                        'cardNo':card_num
                    },
                    success: function(data){
                        App.hideLoading();
                        if(data.ret == 0){
                        //存变量
                            self.bankData = {
                                'bankCode': data.bankCode,
                                'bankName': data.bankName
                            };
                            self.$('#js_card_bankName').val(data.bankName+"  借记卡")
                            cardbin=false;
                            cardChecked=true;

                        }else if(data.ret == 999001){
                            handle.goLogin();
                        }else{
                            //App.UI.UIInputClear(self.$('#js_card_bankName'), '', null, {'right': 5});
                            self.$('#js_card_bankName').val("")
                            App.showToast(data.msg  || message);
                        }
                    },
                    error: function(){
                        App.hideLoading();
                        App.showToast(message);
                    }
                })
            },
            submit:function(){
                if(cardChecked){
                    self.next();
                    return;
                }
                var card_num=handle.deleteAllBlank(self.$('.js_card_number').val())

                if(!card_num || card_num.length < 16){
                    App.showToast('请输入正确的银行卡号');
                    return;
                }

                App.showLoading();
                getBankByBin.exec({
                    type: 'get',
                    data:{
                        'cardNo':card_num
                    },
                    success: function(data){
                        App.hideLoading();
                        if(data.ret == 0){
                            //存变量
                            self.bankData = {
                                'bankCode': data.bankCode,
                                'bankName': data.bankName
                            };
                            self.$('#js_card_bankName').val(data.bankName)
                            cardbin=false;
                            self.next();

                        }else if(data.ret == 999001){
                            handle.goLogin();
                        }else{
                            //App.UI.UIInputClear(self.$('#js_card_bankName'), '', null, {'right': 5});
                            self.$('#js_card_bankName').val("")
                            App.showToast(data.msg  || message);
                        }
                    },
                    error: function(){
                        App.hideLoading();
                        App.showToast(message);
                    }
                })
            },
            checkStep:function(){
                App.showLoading();
                realStatusCheck.exec({
                    type: 'get',
                    success: function(data){
                       // console.log(data)
                        App.hideLoading();
                        if(data.ret == 0){
//                            sessionStorage.setItem("bind_card_info", JSON.stringify(data))

//                          if(self.request.query&&self.request.query.phase){
//                              self.showBind(data);
//                              bindStep=self.request.query.phase;
//                              //从手机验证页面返回时显示
//                          }else{
                              if(data.phase==1){
                                  self.$el.html(bindCard_new + footer);
                              }else if(data.phase==2){
                                  self.showBind(data)
                              }else if(data.phase==3){
//                                  if(data.defaultCheckMode=='02'){
//                                      App.goTo('amount_check')
//                                  }else{
//                                      App.showLoading();
//                                      App.goTo('bind_card_new_step3');
//                                  }
                                  App.showLoading();
                                  App.goTo('bind_card_new_step3');
                                  //跳转至手机号check
                              }else if(data.phase==4){
                                  App.goTo("set_card_psw")
                              }else{
                                  App.showToast("您已绑卡成功");
                                  window.setTimeout(function(){
                                      handle.getProductLink();
                                  },2000)
                              }
//                          }

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
            events: {
                'click .js_agreement a': 'agreementLink',//《委托支付服务协议》
                'click .js_agreement': 'agreement',//是否同意《委托支付服务协议》
                'click .js_next': 'submit',//下一步
                'click .js_notice': 'notice',
               // 'input .js_card_number' : 'clearBrank',//不让输入空格
              //  'click .js_band_card': 'showCard',//获取银行卡信息
                'click .js_address': 'showAddress',//获取开户行信息
                'change .js_card_number': 'inputCard',//获取开户行信息
                'click .js_name': 'checkCardBin',//获取开户行信息
                'click .js_id_card': 'checkCardBin',//获取开户行信息
                'click .js_band_card': 'checkCardBin',//check卡bin
                'click .bind_bank_tips':'showBankTips'
            },
            inputCard: function () {
                cardChecked=false;
                cardbin=true;
            },
            clearBrank: function(e){
                var val = $(e.target).val();
                $(e.target).val(handle.deleteAllBlank(val));
            },

            onShow: function () {
                App.hideLoading();
                cardbin=false;
                self.setHeader();
                self.cityData=null;
                self.bankData=null;

                self.checkStep();

            },
            setHeader: function () {
                var header = new App.UI.UIHeader();
                header.set({
                    view: this,
                    title: '实名认证',
                    back: {
                        'tagname': 'back',
                        callback: function () {

                                self.promptAlert = handle.prompt('未完成设置将无法进行交易。<br>要继续完成设置吗？','放弃', '继续', function(){
                                    handle.getProductLink();
                                });
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

                    self.checkCardBin()

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
            getDribblet:function(){
                App.showLoading();
                sendDribblet.exec({
                    type: 'post',
                    success: function(data){
                        App.hideLoading();
                        if(data.ret == 0){
                            self.promptAlert = handle.alert('验证金额已发送，收到验证金额请在24小时之内完成验证',function(){
                                App.goTo('amount_check');
                            });

                            self.promptAlert.show();

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
            next: function(){
                    var error = [];
                    var cardNumber = handle.deleteAllBlank(self.$('.js_card_number').val());




                    if(!self.cityData){
                        error.push('请选择银行卡开户省份');
                    }

                    if(!cardNumber || cardNumber.length < 16){
                        error.push('请输入正确的银行卡号');
                    }

                    if(error.length){
                        App.showToast(error[0]);
                        return;
                    }

                    App.showLoading();
                     realCheck.set({
                        'idNo':  "",
                        'name': "",
                        'cardNo': cardNumber,
                        'bankCode': self.bankData.bankCode,
                        'bankName': self.bankData.bankName,
                        'bankProvinceCode': self.cityData.bankProvinceCode,
                        'bankProvinceName': self.cityData.bankProvinceName,
                        'cityName': self.cityData.cityName,
                        'cityCode':   self.cityData.cityId
                    });
                     realCheck.exec({
                        type: 'post',
                        success: function(data){
                            App.hideLoading();
                            if(data.ret == 0){
                                var loginData = handle.isLogin();
                                if(loginData){
                                    loginStore.set(loginData);
                                   // console.log(data.defaultCheckMode)
                                    if(data.defaultCheckMode=='02'){
                                        self.getDribblet();
                                    }else{
                                        App.showLoading();
                                        App.goTo('bind_card_new_step3');
                                    }

                                }else{
                                    handle.goLogin();
                                }
                            }else if(data.ret == 999001){
                                handle.goLogin();
                            }else if(data.ret == 110199){
                                self.promptAlert = handle.alert(data.msg);
                                self.promptAlert.show();
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

                    console.log(self.$('#js_card_bankName'))
                    App.UI.UIInputClear(self.$('#js_card_number'), '', null, {'right': 5});


            },
            onHide: function(){
                self.$('#js_card_bankName').val("");
                self.$('.js_card_number').val("")
                self.$('.inpt_readonly').val("");

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
