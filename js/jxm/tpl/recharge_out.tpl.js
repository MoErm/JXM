define(function (require, exports, module) {
    var tpl ='<article class="recharge_section">\
            <div class="recharge_t">\
                <ul class="recharge_t_list">\
                    <li>现金余额(元) <span class="list_con number">88.88</span></li>\
                    <li>提现金额(元) <span class="list_con"><input type="number" class="recharge_money" id="recharge_money" placeholder="100元起"/></span><span class="get_all">全部提现</span></li>\
                </ul>\
            </div>\
            <div class="recharge_m">\
                <h2 class="recharge_m_head">提现银行卡</h2>\
                <div class="mycard" id="cardSelect">\
                    <p class="maycard_title"><img src="" alt="" class="banklogo" /></p>\
                    <div class="mycard_info"  data-cardid= "">\
                        <div class="card_detail">\
                            <p class="card_cur">光大银行(尾号000)</p>\
                            <p class="limit_text">单笔限额：'+ 000 +'，单日限额：'+ 000 +'</p>\
                        </div>\
                    </div>\
                </div>\
                <div class="recharge_m_times">今日剩余免费提现 <span class="times_num">3</span> 次</div>\
            </div>\
            <div class="recharge_b">\
                <button class="action_buy" id="recharge_btn">提现</button>\
                <div class="same_card_tip">\
                    <h2 class="tip_head"><span class="text">Tips</span><em class="line"></em></h2>\
                    <em class="tip_icon"></em>\
                    <p class="tip_text">1.提现成功后预计t+1个工作日到账</p>\
                    <p class="tip_text">2.只能提现到平台绑定的银行卡，单笔限额100万单日无限额</p>\
                    <p class="tip_text">3.现金余额小余100元，需一次性全额提现</p>\
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