
$(document).ready(function(){
   // initHero();
//    wxshare();
    for(var i=1;i<=3;i++){
        setRadius("#test"+i)
    }
    initHeight()
    var year,month,day;
    if(new Date().getMonth()+1==12&&new Date().getDate()>=25){
        var num=new Date().getDate()-24
        showDetail(num)
        year=2015;
        month=12;
        day=new Date().getDate()
    }else if(new Date().getMonth()+1==1&&new Date().getDate()<=3){
        var num=new Date().getDate()+7
        showDetail(num)
        year=2016;
        month=1;
        day=new Date().getDate()
    }else{
        showDetail(1)
        year=2015;
        month=12;
        day=25
    }
    var date=year+"年"+month+"月"+day+"日"
    $("#Xmas_date").html(date)
});
function initHeight(){
    var g_width=document.body.clientWidth
    var imgHeight=g_width/640*495
    $("#banner").css("height",imgHeight)
    $(".Xmas_calendar").css("height",g_width/611*805)

    $(".address_banner_txt").css("marginTop",g_width/640*315)
    $(".Xmas_line").css("paddingTop",g_width/640*170)
    if(g_width>=414){
        $(".Xmas_detail_box").css("height",g_width/611*740-$(".Xmas_line").height()-g_width/640*170-20)
        $(".Xmas_detail_box").css("marginTop",20)
    }else{
        $(".Xmas_detail_box").css("height",g_width/611*740-$(".Xmas_line").height()-g_width/640*170)
    }

}


function showDetail(num){
    $(".Xmas_active").removeClass("Xmas_active"). addClass("Xmas_normal")
    $("#Xmas_span_"+num).addClass("Xmas_active")

    var item=giftData.gifts[num-1]
    var data = {
        item : item,
        num:num
    };
    var html = template('showXmas', data);
    $(".Xmas_detail_box").html(html);
}

function hideInput(){
    $("#area_ok").css("display","block")
    $("#area_input").css("display","none")
}

function backToIndex(){
    window.location.href="../../index.html#list"
}

function showCover(msg) {
    $("#cover").css("height",document.body.scrollHeight)
    $("#cover").css("width",document.body.clientWidth)
    $("#coverText").css("margin-top",window.innerHeight/2)
    $("#coverText").css("width",document.body.clientWidth*0.6)

    $("#coverText").html(msg)
    window.setTimeout("closeCover()",1500);

}
function closeCover(){
    $("#cover").css("height",0);
    $("#coverText").css("width",0);
    $("#coverText").html("");
}
function setRadius(divId){
    var height=$(divId).height()
    $(divId).css("border-radius",height/2)
}
function submit(){
    if($("#jxmAccount").val()==""||$("#jxmAccount").val()==null){
        showCover("请输入平台注册手机号码");
        return;
    }
    var jxmAccount = $("#jxmAccount").val(); //获取手机号
    var telReg = !!jxmAccount.match(/^(0|86|17951)?(13[0-9]|15[012356789]|17[678]|18[0-9]|14[57])[0-9]{8}$/);
    //如果手机号码不能通过验证
    if(telReg == false){
        showCover("请正确输入手机号码");
        return;
    }
    if($("#receiverName").val()==""||$("#receiverName").val()==null){
        showCover("请输入收货人姓名");
        return;
    }
    if($("#receiverAddress").val()==""||$("#receiverAddress").val()==null){
        showCover("请输入收货地址");
        return;
    }
    if($("#receiverCellphone").val()==""||$("#receiverCellphone").val()==null){
        showCover("请输入收货人手机号码");
        return;
    }
    var receiverCellphone = $("#receiverCellphone").val(); //获取手机号


    var receiverName=$("#receiverName").val();
    var receiverAddress=$("#receiverAddress").val();

    $.ajax({

        type: 'GET',
        url: "../../apps/api/activity/receiverInfo",
//            url: "http://test.jiaxinmore.com/apps/api/activity/receiverInfo",
        data: {
            "jxmAccount":jxmAccount,
            "receiverName":receiverName,
            "receiverAddress":receiverAddress,
            "receiverCellphone":receiverCellphone
        },
        success: function(data) {
            if(data.ret=='0'){
                showCover("提交成功");
            }else{
                showCover(data.msg);
            }
        },
        error : function() {
            showCover('网络异常');
        }
    });

}

var giftData= {
    gifts: [
        {date: "12月25日",
            name: "周大福小金猴转运珠 R16729",
            pro: "季季加薪",
            amount: "50000",
            value: "880"
        },
        {date: "12月26日",
            name: "brita净水壶3.5L (一壶6芯)",
            pro: "六六加薪",
            amount: "8000",
            value: "459"
        },
        {date: "12月27日",
            name: "艾美特欧式快热电暖炉 HC2425R",
            pro: "年年加薪",
            amount: "6000",
            value: "899"
        },
        {date: "12月28日",
            name: "膳魔师焖烧杯",
            pro: "月月加薪",
            amount: "30000",
            value: "298"
        },
        {date: "12月29日",
            name: "飞利浦料理机HR1608",
            pro: "六六加薪",
            amount: "8000",
            value: "449"
        },
        {date: "12月30日",
            name: "ventry泰国乳胶枕",
            pro: "季季加薪",
            amount: "10000",
            value: "560"
        },
        {date: "12月31日",
            name: "欧姆龙血压仪HEM-7052",
            pro: "年年加薪",
            amount: "5000",
            value: "599"
        },
        {date: "1月1日",
            name: "apple watch sport",
            pro: "六六加薪",
            amount: "60000",
            value: "2588"
        },
        {date: "1月2日",
            name: "小米体重秤",
            pro: "月月加薪",
            amount: "15000",
            value: "99"
        },
        {date: "1月3日",
            name: "帕缇欧天丝绒厚毯",
            pro: "年年加薪",
            amount: "10000",
            value: "1870"
        }
    ]
}




