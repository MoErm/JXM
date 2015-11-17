/**
 * Created by Administrator on 2015/8/25.
 */

    var interval = 1000;
    function ShowCountDown(year,month,day,divname)
    {
        var now = new Date();
        var endDate = new Date(year, month-1, day);
        var leftTime=endDate.getTime()-now.getTime();
        var cc = document.getElementById(divname);
        if(leftTime<0){
            cc.innerHTML = "活动已结束";
            return;
        }
        var leftsecond = parseInt(leftTime/1000);
		//var day1=parseInt(leftsecond/(24*60*60*6));
        var day1=Math.floor(leftsecond/(60*60*24));
        var hour=Math.floor((leftsecond-day1*24*60*60)/3600);
        var minute=Math.floor((leftsecond-day1*24*60*60-hour*3600)/60);
        var second=Math.floor(leftsecond-day1*24*60*60-hour*3600-minute*60);

        cc.innerHTML = "  活动还有:<h1>"+day1+"</h1>天<h1>"+hour+"</h1>小时<h1>"+minute+"</h1>分<h1>"+second+"</h1>秒结束";
    }
    function isLeapYear (Year) {

        if (((Year % 4)==0) && ((Year % 100)!=0) || ((Year % 400)==0)) {

            return (true);

        } else { return (false); }

    }
	function backToIndex(){
		 window.location.href="../../index.html#list"
	}

    function GetRequest() {

        var url = location.search; //获取url中"?"符后的字串
        var theRequest = new Object();
        if (url.indexOf("?") != -1) {
            var str = url.substr(1);
            strs = str.split("&");
            for(var i = 0; i < strs.length; i ++) {
                theRequest[strs[i].split("=")[0]]=(strs[i].split("=")[1]);
            }
        }
        return theRequest;
    }
//    function testInit(){
//        window.setInterval(function(){ShowCountDown(2015,12,1,'Countdown');}, interval);//更新倒计时endMonth+1下月1日0点之前
//
//
//        var data={"ret":0,"msg":"成功","data":[{"payAmount":61000.00,"userCount":1,"cellphone":"旺*"},{"payAmount":12000.00,"userCount":1,"cellphone":"思*"},{"payAmount":0.00,"userCount":0,"cellphone":"六*"},{"payAmount":0.00,"userCount":0,"cellphone":"赵**"},{"payAmount":0.00,"userCount":0,"cellphone":"尹**"},{"payAmount":0.00,"userCount":0,"cellphone":"东**"},{"payAmount":0.00,"userCount":0,"cellphone":"东**"},{"payAmount":0.00,"userCount":0,"cellphone":"东**"},{"payAmount":0.00,"userCount":0,"cellphone":"东**"},{"payAmount":0.00,"userCount":0,"cellphone":"东**"},{"payAmount":0.00,"userCount":0,"cellphone":"东**"},{"payAmount":0.00,"userCount":0,"cellphone":"东**"},{"payAmount":0.00,"userCount":0,"cellphone":"东**"},{"payAmount":0.00,"userCount":0,"cellphone":"东**"},{"payAmount":0.00,"userCount":0,"cellphone":"东**"},{"payAmount":0.00,"userCount":0,"cellphone":"东**"},{"payAmount":0.00,"userCount":0,"cellphone":"东**"},{"payAmount":0.00,"userCount":0,"cellphone":"东**"},{"payAmount":0.00,"userCount":0,"cellphone":"东**"},{"payAmount":0.00,"userCount":0,"cellphone":"东**"},{"payAmount":0.00,"userCount":0,"cellphone":"东**"},{"payAmount":0.00,"userCount":0,"cellphone":"东**"},{"payAmount":0.00,"userCount":0,"cellphone":"东**"},{"payAmount":0.00,"userCount":0,"cellphone":"何*"}],"userRanking":3,"userName":"倪日天"}
//        var rankText;
//        if(data.userName==null||data.userName==""){
//            rankText="亲爱的用户，您还没有上榜哦！"
//        }else if(data.userRanking==99){
//            rankText="亲爱的<h1>"+data.userName+"</h1>，您还没有上榜哦！"
//        }else{
//            rankText="亲爱的<h1>"+data.userName+"</h1>,您的排名是第<h1>"+data.userRanking+"</h1>名,加油哦！"
//        }
//
//
//        $("#rank").html(rankText);
//        var heroList=data.data;
//        var data = {
//            list : heroList,
//            userRanking:data.userRanking,
//            userName:data.userName
//        };
//        template.helper("fmtName", fmtName);
//        template.helper("fmtAmount", fmtAmount);
//        var html = template('showList', data);
//        $("#heroList").html(html);
//    }


    function toBind(){
        $.ajax({

            type: 'GET',

//            url: "http://test.jiaxinmore.com/apps/api/user/myBankCard",
			url: "../../apps/api/user/myBankCard",


            success: function(data) {
                if(typeof data==="string"){
                    data=eval("("+data+")");
                }
                console.log(data);

//                return



                if(data.ret == 0){
                    if(data.data!=null){
                        if(data.data.cardList[0].status==02) {
                                window.location.href="../../index.html#add_card"
                        }else{
                            showCover("您已绑定银行卡");
                        }
                    }else{
                            window.location.href="../../index.html#bind_card_new"
                    }
                }else if(data.ret == 999001){
                    window.location.href="../../index.html#login"
                }else {
                    showCover(data.msg );
                }




//                if(data.ret == 0){
//                    if(data.phase==1){
//                        window.location.href="../../index.html#bind_card_new"
//                    }else if(data.phase==2){
//                        window.location.href="../../index.html#bind_card_new_step2"
//                    }else if(data.phase==3){
//                        window.location.href="../../index.html#bind_card_new_step3"
//                    }else if(data.phase==4){
//                        window.location.href="../../index.html#set_card_psw"
//                    }else{
//                        window.location.href="../../index.html#list"
//                    }
//                }else if(data.ret == 999001){
//
//                }else{
//
//                }

            },

            error : function() {
                showCover("网络错误，请稍后再试")
            }

        });
    }
    var showList;
    var userRanking;
    function initHero(){



        window.setInterval(function(){ShowCountDown(2015,12,1,'Countdown');}, interval);//更新倒计时endMonth+1下月1日0点之前



        $.ajax({

            type: 'GET',

//               url: "http://test.jiaxinmore.com/apps/api/activity/activityRank",
			url: "../../apps/api/activity/activityRank",


            success: function(data) {
                if(typeof data==="string"){
                    data=eval("("+data+")");
                }
                if(data.ret==0){
                    var rankText;
                    if(data.currentUserName==null||data.currentUserName==""){
                        rankText="亲爱的用户，您还没有上榜哦！"
                    }else if(data.currentUserRank==99){
                        rankText="亲爱的<h1>"+data.currentUserName+"</h1>，您还没有上榜哦！"
                    }else{
                        rankText="亲爱的<h1>"+data.currentUserName+"</h1>,您的排名是第<h1>"+data.currentUserRank+"</h1>名,加油哦！"
                    }


                    $("#rank").html(rankText);
                    userRanking=data.currentUserRank;
                    var heroList=data.data;
                    var data = {
                        list : heroList,
                        userRanking:userRanking,
						userName:data.currentUserName
                    };
                    template.helper("fmtAmount", fmtAmount);
                    var html = template('showList', data);
                    $("#heroList").html(html);
                }else{
                    showCover(data.msg);
                    window.setTimeout(function(){
                        window.location.href=("../../index.html#login?backurl="+encodeURIComponent("./activity/818hero/heroList.html"))


                    },1500)

                }

            },

            error : function() {
                showCover("网络错误，请稍后再试")
            }

        });
    }
    function oddCheck(num){
        if(num==userRanking){
            return "you"
        }
        if(num%2==0){
            return "odd"
        }else{
            return "even"
        }
    }





    function fmtAmount(num){
        if(num==null||num==Number.NaN){
            return 0+"W";
        }
        return (num/10000).toFixed(1)+"W";
        //  return "20W"
    }

//    function fmtName(name){
//       var str;
//        str=name.substring(0,1);
//
////        return str+"**";
//        return "136**584";
//    }

    function showCover(msg) {
        console.log("显示")
        $("#cover").css("height",document.body.scrollHeight)
        $("#cover").css("width",document.body.clientWidth)
        $("#coverText").css("margin-top",window.innerHeight/2)
        $("#coverText").css("width",document.body.clientWidth*0.6)

        $("#coverText").html(msg)
        window.setTimeout(function(){
            console.log("消除");
            $("#cover").css("height",0);
            $("#coverText").css("width",0);
            $("#coverText").html("");
        },1500);

    }

    var closeCover=function(){
        console.log("消除");
        $("#cover").css("height",0);
        $("#coverText").css("width",0);
        $("#coverText").html("");
    }


//var log="";
function showTitle(){
    //log+="into showTitle<br>"
   // $("#testUserAgent").html(log);
    var userAgent = window.navigator.userAgent.toLocaleLowerCase();
  //  log+=userAgent+"  <br>showTitle:"+(userAgent.indexOf("hih5hybird") > -1)+"<br>"
  //  $("#testUserAgent").html(log);
    if (userAgent.indexOf("hih5hybird") > -1) {
        var title=$("#eventTitle")
        var box=$("#padBox")
        title.remove()
        box.remove()
//            $("#eventTitle").hide()
//           $("#padBox").css("height",0)
        return true
    } else {
        return false
    }
}

var wxshare = function(shareConfig){
//    if(!(navigator.userAgent.toLowerCase().indexOf('micromessenger') > -1)) return;
    //var self = this;
    var loginData = localStorage.getItem("S_JXM_LOGIN_STATUS");

    var apidomain=window.location.host.indexOf("localhost")>-1?"test.jiaxinmore.com":window.location.host;
    var apihost="http://"+apidomain+"/apps";
    var model=App.Model.extend({"url": apihost + '/api/webChat/jsSignature'});
    var shareModel=new model();
    shareModel.set({'url': encodeURIComponent(location.href.split('#')[0])});
    shareModel.exec({
        type: 'get',
        success: function(data){
            if(!_.isNull(data)){
                var title =  "加薪猫11月邀请争霸赛排行榜";
                var link =  window.location.href;
                var desc = '狂欢升级，更加刺激！iPhone6S plus、iPhone6S……还有更多豪礼等着你！';//描述
                var imgUrl = 'http://m.jiaxinmore.com/activity/818hero/img/heroList_outImg.png';//分享图标
                wx.config({
                    debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
                    appId: data.appId, // 必填，公众号的唯一标识
                    timestamp: data.timestamp, // 必填，生成签名的时间戳
                    nonceStr: data.nonceStr, // 必填，生成签名的随机串
                    signature: data.signature,// 必填，签名，见附录1
                    jsApiList: ['onMenuShareTimeline', 'onMenuShareAppMessage', 'onMenuShareQQ', 'onMenuShareWeibo', 'onMenuShareQZone'] // 必填，需要使用的JS接口列表
                });
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
$(document).ready(function(){
    // showTitle();
    initHero();
    wxshare();
//        testInit()
});

