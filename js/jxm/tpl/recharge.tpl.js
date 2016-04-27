define(function (require, exports, module) {
    var tpl ='<article class="recharge_section">\
            <div class="recharge_t">\
                <ul class="recharge_t_list">\
                    <li>现金余额(元) <span class="list_con number"><%=chargeData.amount%></span></li>\
                    <li>充值金额(元) <span class="list_con"><input type="number" class="recharge_money" id="recharge_money" placeholder="100元起"/></span></li>\
                </ul>\
            </div>\
            <div class="recharge_m">\
                <h2 class="recharge_m_head">充值银行卡</h2>\
                <div class="mycard" id="cardSelect">\
                    <p class="maycard_title"><img src="<%=chargeData.bankLogo%>" alt="" class="banklogo" /></p>\
                    <div class="mycard_info"  data-cardid= "">\
                        <div class="card_detail">\
                            <p class="card_cur"><%=chargeData.bankName%>(尾号<%=chargeData.cardTailNo%>)</p>\
                            <p class="limit_text">单笔限额：<%=chargeData.transactLimit%> ，单日限额：<%=chargeData.dailyLimit%> </p>\
                        </div>\
                    </div>\
                </div>\
            </div>\
            <div class="recharge_b">\
                <button class="action_buy" id="recharge_btn">充值</button>\
                <div class="same_card_tip">\
                    <h2 class="tip_head"><span class="text">Tips</span><em class="line"></em></h2>\
                    <em class="tip_icon"></em>\
                    <p class="tip_text">单笔充值金额100元起</p>\
                </div>\
            </div>\
        </article>\
        <footer class="foot_copyright">\
          <div class="fixed">\
            <p class="security">账户资金安全由银行和第三方支付公司共同保障</p>\
            <p class="copyright">©2015 加薪猫 jiaxinmore.com</p>\
          </div>\
        </footer>'

    module.exports = tpl;
})