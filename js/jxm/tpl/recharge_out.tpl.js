define(function (require, exports, module) {
    var tpl ='<article class="recharge_section recharge_out">\
            <div class="recharge_t">\
                <ul class="recharge_t_list">\
                    <li>现金余额(元) <span class="list_con number"><%=chargeData.allAmount%></span></li>\
                    <li>提现金额(元) <span class="list_con"><input type="text" class="recharge_money" id="recharge_out_money" placeholder="100元起"  style="width: 45%;"/></span><span class="get_allmoney" id="get_allmoney">全部提现</span></li>\
                </ul>\
            </div>\
            <div class="recharge_m">\
                <h2 class="recharge_m_head">提现银行卡</h2>\
                <div class="mycard" id="cardSelect">\
                     <p class="maycard_title"><img src="<%=chargeData.bankLogo%>" alt="" class="banklogo" /></p>\
                    <div class="mycard_info"  data-cardid= "">\
                        <div class="card_detail" style="padding-top: 0">\
                            <p class="card_cur" style="height: 50px;line-height: 50px;padding-top: 0"><%=chargeData.bankName%>(尾号<%=chargeData.cardTailNo%>)</p>\
                        </div>\
                    </div>\
                </div>\
                <div class="recharge_m_times">今日剩余提现 <span class="times_num"><%=chargeData.surplusCount%></span> 次</div>\
            </div>\
            <div class="recharge_b">\
                <button class="action_buy" id="recharge_btn">提现</button>\
                <div class="same_card_tip">\
                    <h2 class="tip_head"><span class="text">Tips</span><em class="line"></em></h2>\
                    <em class="tip_icon"></em>\
                    <p class="tip_text">1.提现成功后预计t+1个工作日到账</p>\
                    <p class="tip_text">2.只能提现到平台绑定的银行卡，单笔限额100万单日无限额</p>\
                    <p class="tip_text">3.现金余额小于100元，需一次性全额提现</p>\
                </div>\
            </div>\
        </article>\
        '

    module.exports = tpl;
})