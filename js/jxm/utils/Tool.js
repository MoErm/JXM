//公用的一些方法
define(function(require, exports, module) {
    var model = require('jxm/model/model');
    var store = require('jxm/model/store');
    var wx = require('http://res.wx.qq.com/open/js/jweixin-1.0.0.js');
    var loginStore = new store.loginStore();
    var productLink = new store.productLink();
    var shareModel = new model.myShare();
    var alertTpl = '<div class="mod_popup" style="width: 280px;">\
                                    <div class="pop_cont">\
                                        <div class="pop_bd"><%=content%></div>\
                                        <div class="pop_ft">\
                                            <div class="btn_box">\
                                                <%_.each(btns, function(item){%><span class="btn_link <%=item.className%>"><%=item.name%></span><%})%>\
                                            </div>\
                                        </div>\
                                    </div>\
                                </div>';
    function Tool() {}
    //处理时间
    Tool.prototype.dealTime = function(str) {
        var array = str.split(' ');
        var date = array[0].split('/');
        var time = array[1].split(':');
        return new Date(date[0], parseInt(date[1], 10) - 1, parseInt(date[2], 10), parseInt(time[0], 10), parseInt(time[1], 10), parseInt(time[2], 10));
    }
    //判断登录环境
    Tool.prototype.mobileType = function() {
        var userAgent = window.navigator.userAgent.toLocaleLowerCase();

        if (userAgent.indexOf("hih5hybird") > -1) {
            return 'android'
        } else {
            return 'html'
        }
    }
    //Money
    Tool.prototype.dealMoney = function(str){
        var money = str.toString().split('.');
        if(parseInt(money[0], 10) > 9999){
            var str = ((money[0]/10000).toFixed(2)).toString();
            var arr = str.split('.');
            var wang = arr[0].toString();
            return wang.replace(/(\d{1,3})(?=(\d{3})+$)/g, '$1,')  + (_.isUndefined(arr[1]) || !(parseInt(arr[1], 10)) ? '' : '.' + arr[1]) +'万元';
        }else{
            return money[0].replace(/(\d{1,3})(?=(\d{3})+$)/g, '$1,') + (_.isUndefined(money[1]) ? '' : '.' + money[1]) + '元'
        }
      ;
    }
    Tool.prototype.showTag = function(type,isNew){
        var str=""
        if(isNew=="1"){
            str='<div style="position: relative;display: inline-block;width: 70px"><div class="listTag">新手专享</div></div>'
        }else{
            if(type=='02'){
                str='<div style="position: relative;display: inline-block;width: 70px"><div class="listTag">豪年计划</div></div>'
            }else{
                str=""
            }
        }
        return str;
    }
    //收益类型
    Tool.prototype.comeType = function(type, ceiling, rate, floor){
        var dealStr = function (str) {
            var str = str.replace(/%/,'');
            return str.indexOf('.') == -1 ? str + '.0' : str;
        };
        var str, ceiling = dealStr(ceiling), rate = dealStr(rate), floor = dealStr(floor);
        switch(type){
            case '01':
                str = ceiling;
                break;
            case '02':
                str = ceiling+ '<i class="activeRate" >+' + rate + '%</i>';
                break;
            case '03':
                str = '浮动';
                break;
            case '04':
                str = floor + '<i class="unit">~' + ceiling + '</i>';
                break;
            default:
                str = ceiling;
        }

        return str;
    }
    //需要重新登录
    Tool.prototype.goLogin = function(){
        var self = this;
        App.hideLoading();
        App.showToast('登录超时，请重新登录');
        setTimeout(function(){
            self.rmStore();
            App.goTo('login');
        },2000);
    }
    //清空缓存
    Tool.prototype.rmStore = function(){
        var exp = new Date();
        exp.setTime(exp.getTime() - 1);
        sessionStorage.removeItem("bind_info");
        document.cookie=document.cookie+";path=/;expires="+exp.toGMTString();
        productLink.remove();
        loginStore.remove();
    }
    //缩减时间
    Tool.prototype.cutTime = function(str){
        return str.substring(2, str.length - 3);
    }
    //删除空格
    Tool.prototype.deleteAllBlank = function(str) {

        return str.replace(/\s/g, '');
    }
    //验证手机号码
    Tool.prototype.checkTel = function(str) {
        return /^0?1\d{10}$/.test(str);
    }
    Tool.prototype.checkNum = function(str) {
        return /^[0-9]*$/.test(str);
    }
    //验证姓名
    Tool.prototype.checkName = function(str) {
        return /^[\u4e00-\u9fa5a-zA-Z. \/'-]+$/.test(str);
    }
    //按钮状态
    Tool.prototype.btnStatus = function(str){
        return ['立即投资', '即将开始', '已结束', '计息中', '封闭中', '已结息','已售罄'][parseInt(str, 10) -1];
    }
    //绑卡的返回
    Tool.prototype.getProductLink = function(){
        if(productLink && productLink.get()){
            App.goTo(productLink.get());
        }else{
            App.goTo('list');
        }
    }
    //设置绑卡的返回
    Tool.prototype.setProductLink = function(str){
        productLink.set(str);
    }
    //输出时间
    Tool.prototype.outputTime = function(time, type){
        return '<i class="webtxt">' + Math.floor(time/10) + time%10 +  '</i>' + type;
    }
    //是否登录
    Tool.prototype.isLogin = function(){
             if(loginStore && loginStore.get()){
            return loginStore.get();
        }
        return false;
    }
    //电话掩码
    Tool.prototype.dealTel =  function(str){
        var headStr = str.substr(0, 3);
        var tailStr = str.substr(-4);
        return headStr + '****' + tailStr;
    }
    //没有进度条
    Tool.prototype.noProgress = function(){
        return '<div class="item_progress js_progress" style="background-color:#f2f2f2"></div>';
    }
    //倒计时
    Tool.prototype.countDown = function(second){
        var day = Math.floor(second / 86400);
        var hour = Math.floor((second - day * 86400) / 3600);
        var minute = Math.floor((second - day * 86400 - hour * 3600) /60);
        var second = second  - day * 86400 - hour * 3600 - minute * 60;
        return this.outputTime(day, '天') + this.outputTime(hour, '小时')  + this.outputTime(minute, '分') + this.outputTime(second, '秒');
    }
    //单个按钮 Alert
    Tool.prototype.alert = function(str, fun) {
        return new App.UI.UIAlert({
            template: alertTpl,
            datamodel: {
                content: str,
                btns: [{
                    name: '知道了',
                    className: 'btn_link1'
                }]
            },
            events: {
                'click .btn_link1': 'okAction'
            },
            okAction: function() {
                this.hide();
                if(fun){
                    fun();
                }
            }
        });
    }
    //两个按钮 Alert
    Tool.prototype.prompt = function(str, btnA, btnB, funA, funB) {
        return new App.UI.UIAlert({
            template: alertTpl,
            datamodel: {
                content: str,
                btns: [{
                    name: btnA,
                    className: 'btn_link2'
                },{
                    name: btnB,
                    className: 'btn_link1'
                }]
            },
            events: {
                'click .btn_link2': 'okAction',
                'click .btn_link1': 'noAction'
            },
            okAction: function() {
                this.hide();
                if(funA){
                    funA();
                }
            },
            noAction: function() {
                this.hide();
                if(funB){
                    funB();
                }
            }
        });
    }
    //验证身份证
    Tool.prototype.checkIdCard = function(idcard) {
        //区域代号
        var areaCode = '11@22@35@44@53@12@23@36@45@54@13@31@37@46@61@14@32@41@50@62@15@33@42@51@63@21@34@43@52@64@65@71@81@82@91';
        var reg;
        var arr = idcard.split('');
        var isCard = true;
        if (areaCode.indexOf(idcard.substr(0, 2)) == -1 || idcard.length != 18) {
            isCard = false;
        }
        if (parseInt(idcard.substr(6, 4)) % 4 == 0 || (parseInt(idcard.substr(6, 4)) % 100 == 0 && parseInt(idcard.substr(6, 4)) % 4 == 0)) {
            //闰年出生日期的合法性正则表达式
            reg = /^[1-9][0-9]{5}(19|20)[0-9]{2}((01|03|05|07|08|10|12)(0[1-9]|[1-2][0-9]|3[0-1])|(04|06|09|11)(0[1-9]|[1-2][0-9]|30)|02(0[1-9]|[1-2][0-9]))[0-9]{3}[0-9Xx]$/;
        } else {
            //平年出生日期的合法性正则表达式
            reg = /^[1-9][0-9]{5}(19|20)[0-9]{2}((01|03|05|07|08|10|12)(0[1-9]|[1-2][0-9]|3[0-1])|(04|06|09|11)(0[1-9]|[1-2][0-9]|30)|02(0[1-9]|1[0-9]|2[0-8]))[0-9]{3}[0-9Xx]$/;
        }
        if (reg.test(idcard)){
            //计算校验位
            var checkCode = ((parseInt(arr[0]) + parseInt(arr[10])) * 7 + (parseInt(arr[1]) + parseInt(arr[11])) * 9 + (parseInt(arr[2]) + parseInt(arr[12])) * 10 + (parseInt(arr[3]) + parseInt(arr[13])) * 5 + (parseInt(arr[4]) + parseInt(arr[14])) * 8 + (parseInt(arr[5]) + parseInt(arr[15])) * 4 + (parseInt(arr[6]) + parseInt(arr[16])) * 2 + parseInt(arr[7]) * 1 + parseInt(arr[8]) * 6 + parseInt(arr[9]) * 3) % 11;
            if ('10x98765432'.substr(checkCode, 1) != arr[17] && '10X98765432'.substr(checkCode, 1) != arr[17]) {
                isCard = false;
            }
        }else{
            isCard = false;
        }
        return isCard;
    }
    Tool.prototype.inviteCode = function(){
        var loginData = this.isLogin();
       // var link = location.origin + '/index.html#reg';
        var link = location.origin + '/index.html#index';
        if(loginData){
            var invitecode = loginData.inviteCode || '';
            return invitecode ? link + '?invitecode=' + invitecode : link;
        }else{
            return link;
        }
    }
    //微信分享
    Tool.prototype.share = function(shareConfig){

//        if(!(navigator.userAgent.toLowerCase().indexOf('micromessenger') > -1)) return;

        var self = this;
        var loginData = this.isLogin();
        shareModel.set({'url': encodeURIComponent(location.href.split('#')[0])});
        shareModel.exec({
            type: 'get',
            success: function(data){
               if(!_.isNull(data)){
                   var defaultTitle = loginData ? '我正式邀请你加入加薪猫理财,秒拿微信现金红包' : '能送微信红包的理财平台，你听说过吗？';
                   var title = shareConfig && shareConfig.title || defaultTitle;
                   var link =  shareConfig && shareConfig.link || self.inviteCode();
                   var desc = shareConfig && shareConfig.desc || '加薪猫提供7%-13%年化收益率的理财产品,首次投资秒送最高35元微信现金红包,身边的好友都抢疯了!';//描述
                   var imgUrl =shareConfig && shareConfig.imgUrl || 'http://m.jiaxinmore.com/images/wx.png';//分享图标
                   wx.config({
                       debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
                       appId: data.appId, // 必填，公众号的唯一标识
                       timestamp: data.timestamp, // 必填，生成签名的时间戳
                       nonceStr: data.nonceStr, // 必填，生成签名的随机串
                       signature: data.signature,// 必填，签名，见附录1
                       jsApiList: ['onMenuShareTimeline', 'onMenuShareAppMessage', 'onMenuShareQQ', 'onMenuShareWeibo', 'onMenuShareQZone'] // 必填，需要使用的JS接口列表
                   });
                   //App.showToast(JSON.stringify(data),10000);
                   wx.ready(function(){
                       //分享到朋友圈
                       wx.onMenuShareTimeline({
                           title: title,
                           link: link,
                           imgUrl: imgUrl,
                           success: function () {
                               App.showToast('分享成功!');
                           },
                           cancel: function () {
                               App.showToast('分享取消!');
                           }
                       });
                       //分享给朋友
                       wx.onMenuShareAppMessage({
                           title: title,
                           desc: desc,
                           link: link,
                           imgUrl: imgUrl,
                           type: '', // 分享类型,music、video或link，不填默认为link
                           dataUrl: '', // 如果type是music或video，则要提供数据链接，默认为空
                           success: function () {
                               //App.showToast("分享成功!")
                           },
                           cancel: function () {
                               //App.showToast("分享取消!")
                           }
                       });
                       //分享到QQ
                       wx.onMenuShareQQ({
                           title: title,
                           desc: desc,
                           link: link,
                           imgUrl: imgUrl,
                           success: function () {
                               //App.showToast("分享成功!")
                           },
                           cancel: function () {
                               //App.showToast("分享取消!")
                           }
                       });
                       //分享到腾讯微博
                       wx.onMenuShareWeibo({
                           title: title,
                           desc: desc,
                           link: link,
                           imgUrl: imgUrl,
                           success: function () {
                               //App.showToast("分享成功!")
                           },
                           cancel: function () {
                              // App.showToast("分享取消!")
                           }
                       });
                       //分享到QQ空间
                       wx.onMenuShareQZone({
                           title: title,
                           desc: desc,
                           link: link,
                           imgUrl: imgUrl,
                           success: function () {
                               //App.showToast("分享成功!")
                           },
                           cancel: function () {
                               //App.showToast("分享取消!")
                           }
                       })
                   });
               }
            },
            error: function(){
            }
        })
    }
    Tool.prototype.orientationTips = function(){
        //判断手机横竖屏状态：
        function isOrientation(){
            if(window.orientation == 180 || window.orientation == 0){
                //alert("竖屏状态！")
            }
            if(window.orientation == 90 || window.orientation == -90){
                //alert("横屏状态！")
                App.showToast('竖屏体验更好哦!')
            }
        }
        window.addEventListener('onorientationchange' in window ? 'orientationchange' : 'resize', isOrientation, false);
    }
    module.exports = Tool;
})