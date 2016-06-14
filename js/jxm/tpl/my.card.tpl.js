define(function (require, exports, module) {
    var tpl = '<article class="mod_user_center">\
                 \
                 <div class="add_card">\
                     <div class="stripe"></div>\
                     <div class="card_info"><span class="card_logo"><img src="<%=bankLogo%>" width="36" alt=""></span><span class="card_name"><%=bankName%></span><span class="card_type">借记卡</span></div>\
                        <p class="card_numb"><%=dealBankNum(cardNo)%></p>\
                        <p class="card_other">充值单笔<span class="numb"><%=transactLimit%></span>单日<span class="numb"><%if(dailyLimit==null){%>无限额<%}else{%><%=dailyLimit%><%}%></span></p>\
                   </div>\
                 </div>\
                 <%if(status=="01"){%>\
                <div class="btn_box_submit js_next">立即签约</div>\
                <%}%>\
                <div class="same_card_tip">\
					<h2 class="tip_head"><span class="text">Tips</span><em class="line"></em></h2>\
					<em class="tip_icon"></em>\
					<p class="tip_text">1.暂限绑定一张借记卡</p>\
					<p class="tip_text" style="margin-top: 10px">2.绑卡成功后，提现密码默认为平台登录账号的后6位，可到设置中修改</p>\
				</div>\
				<a href="tel:4008339869" class="js_customer" style="display:none"></a>\
               </article>\
              \
               ';
    module.exports = tpl;
//    <div class="my_card_seven">7天内仅能做一次银行卡的更换</div>
})


//<div class="card_cont">\
//<div class="stripe"></div>\
//<div class="cont">\
//    <div class="card_info"><span class="card_logo"><img src="<%=cardList[0].bankLogo%>" width="36" alt=""></span><span class="card_name"><%=cardList[0].bankName%></span><span class="card_type">借记卡</span></div>\
//        <p class="card_numb"><%=cardList[0].cardNo%></p>\
//            <p class="card_other">支付单笔<span class="numb"><%=cardList[0].transactLimit%></span>单日<span class="numb"><%=cardList[0].dailyLimit%></span></p>\
//            </div>\
//            </div>