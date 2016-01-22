
$(document).ready(function(){
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

function sub(){
    var day=$("#select_day").val()
    var time=$("#select_time").val()
    var phone=$("#input_phone").val()
    if(phone==""||phone.length<11){
        showCover("请输入正确的手机号")
        return
    }


    $.ajax({

        type: 'GET',
        url: "../../apps/api/activity/yuanxiao",
//            url: "http://test.jiaxinmore.com/apps/api/activity/receiverInfo",
        data: {
            "dateCode":day,
            "timeCode":time,
            "mobile":phone
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





