define(function (require, exports, module) {
    var tpl = '<article class="mod_user_center">\
                 <% _.each(cardList, function(card){%>\
                 <div class="add_card">\
                     <div class="stripe"></div>\
                     <div class="card_info"><span class="card_logo"><img src="<%=cardList.bankLogo%>" width="36" alt=""></span><span class="card_name"><%=card.bankName%></span><span class="card_type">借记卡</span></div>\
                        <p class="card_numb"><%=card.cardNo%></p>\
                        <p class="card_other">支付单笔<span class="numb"><%=card.transactLimit%></span>单日<span class="numb"><%=card.dailyLimit%></span></p>\
                   </div>\
                 </div>\
                <% })%>\
                \
                \
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