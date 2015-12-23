
$(document).ready(function(){
   // initHero();
//    wxshare();
    for(var i=1;i<=3;i++){
        setRadius("#test"+i)
    }
    initHeight()
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
                hideInput()
            }else{
                showCover(data.msg);
            }
        },
        error : function() {
            showCover('网络异常');
        }
    });

}

var giftData={
        gifts:
            [
                {date:"12月25日",
                 name:"周大福小金猴转运珠 R16729",
                pro:"季季加薪"
            }


            ]


}