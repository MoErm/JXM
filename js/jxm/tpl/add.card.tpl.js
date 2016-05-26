define(function (require, exports, module) {
    var tpl = '<article class="mod_user_center ">\
                    <div class="js_add_card add_card">\
                        <div class="stripe"></div>\
                        <div class="icon_add">添加银行卡</div>\
                    </div>\
                    <div class="same_card_tip">\
					<h2 class="tip_head"><span class="text">Tips</span><em class="line"></em></h2>\
					<em class="tip_icon"></em>\
					<p class="tip_text">1.暂限绑定一张借记卡</p>\
					<p class="tip_text" style="margin-top: 10px">2.绑卡成功后，提现密码默认为平台登录账号的后6位，可到设置中修改</p>\
					<p class="tip_text" style="margin-top: 10px">3. 绑卡签约将扣除您绑定银行卡的0.01元进行验证，并在验证成功后进行返还</p>\
				</div>\
                </article>';
    module.exports = tpl;
})
