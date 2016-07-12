define(function (require, exports, module) {
    var yujia = require('jxm/tpl/yujia.tpl');
    var tool = require('jxm/utils/Tool');
    var handle = new tool();
    var model = require('jxm/model/model');
    var common = require("jxm/common/common")
    var yujiaValidateInvestData = new model.yujiaValidateInvestData();
    var yujiaCreateCarOrder = new model.yujiaCreateCarOrder();
    var self;
    var dates=["请选择日期",1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28];
    var message = '网络错误，请稍后重试';
    var list;
    var firstBuy=false;
    var validate={
        investPeriodCode:"",
        investAmount:"",
        monthlyRetAmount:"",
        firstRetAmount:"",
        returnedDate:""
    };
    module.exports = App.Page.extend({
        afterMount: function () {
            self=this
        },
        events: {
            'click .time_select_span>div': 'setPeriodCode',//代码
            'change #totalAmount': 'setInvestAmount',//总金额
            'change #monthAmount': 'setMonthAmount',//月回款
            'change #firstAmount': 'setFirstAmount',//首月
            'change #dateSelect': 'setDateSelect',//日期
            'click #toBuy': 'toBuy',//购买
            'click #xieYi': 'xieYi',//协议
            'click #showDetail': 'showDetail'//日期

        },
        xieYi:function(){
            App.goTo('yujiaxieyi')
        },
        onShow: function () {
            if(sessionStorage.getItem("yujiaData")&&sessionStorage.getItem("yujiaData")!=""){
                self.data= JSON.parse(sessionStorage.getItem("yujiaData"))
                self.data.dates=dates
            }else{
                App.goTo("list")
            }
            validate={
                investPeriodCode:"",
                investAmount:"",
                monthlyRetAmount:"",
                firstRetAmount:"",
                returnedDate:""
            };
            this.$el.html(_.template(yujia)(self.data));
            App.hideLoading();
            this.setHeader();
            list=null;
        },
        showDetail:function(){
            if(list){
                common.showyujiaList(list)
            }

        },
        setPeriodCode:function(e){
            var code=e.currentTarget.dataset.code;
            $(".selected").removeClass("selected")
            e.currentTarget.className="time_select selected"
            validate.investPeriodCode=code;
            self.checkInvest()
        },
        setInvestAmount: function () {
            validate.investAmount=handle.deleteAllBlank(self.$('#totalAmount').val());
            self.checkInvest()
        },
        setMonthAmount: function () {
            validate.monthlyRetAmount=handle.deleteAllBlank(self.$('#monthAmount').val());
            self.checkInvest()
        },
        setFirstAmount: function () {
            validate.firstRetAmount=handle.deleteAllBlank(self.$('#firstAmount').val());
            self.checkInvest()
        },
        setDateSelect: function () {
            validate.returnedDate=self.$('#dateSelect').val()
            self.checkInvest()
        },
        checkInput:function(){
            if(validate.investAmount==""){
                return false
            }
            if(validate.monthlyRetAmount==""){
                return false
            }
            if(validate.firstRetAmount==""){
                return false
            }
            if(validate.returnedDate==""){
                return false
            }
            if(validate.returnedDate=="请选择日期"){
                return false
            }
            return true
        },
        checkInvest:function(){
            if(!self.checkInput()){
                return
            }
            yujiaValidateInvestData.exec({
                type: 'post',
                data:validate,
                success: function(data){
                    if(data.ret == 0){
                        self.$('#firstRetDate').html(data.data.firstRetDate)
                        self.$('#expectIncome').html(data.data.expectIncome)
                        list=data.data.returnedList
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
        toBuy:function(){
            if(validate.investAmount==""){
                App.showToast("请输入金额")
                return
            }
            if(validate.monthlyRetAmount==""){
                App.showToast("请输入每月回款金额")
                return
            }
            if(validate.firstRetAmount==""){
                App.showToast("请输入首月回款金额")
                return
            }
            if(validate.returnedDate==""){
                App.showToast("请选择日期")
                return
            }
            if(validate.returnedDate=="请选择日期"){
                App.showToast("请选择日期")
                return
            }
            validate.salesmenNo=handle.deleteAllBlank(self.$('#salesCode').val());
            if(validate.salesmenNo==""){
                App.showToast("请输入销售员编号")
                return
            }
            if(firstBuy){
                return
            }
            firstBuy=true
            yujiaCreateCarOrder.exec({
                type: 'post',
                data:validate,
                success: function(data){
                    firstBuy=false
                    if(data.ret == 0){
                        common.buyYujia(data.data)
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
        setHeader: function () {
            var header = new App.UI.UIHeader();
            header.set({
                view: this,
                title: '御驾',
                back: {
                    'tagname': 'back',
                    callback: function () {
                        App.goBack();
                    }
                },
                right: null
            });
        }
    })
})
