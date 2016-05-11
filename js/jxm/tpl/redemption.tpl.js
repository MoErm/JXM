define(function (require, exports, module) {
	var tpl = '\
	<article class="mod_page redemption_art">\
	<div class="redemption_box">\
        <div class="redemption_div"><span>总资产</span><span id="totalAmount"><%=totalAmount%></span></div>\
        <div class="redemption_div"><span>赎回金额</span><span><input type="text" placeholder="<%=minRedeemAmount%>元起赎" id="redeemValue">&ensp;元</span></div>\
	</div>\
	<p class="redemption_tip1">今日还可以赎回<small><%=todaySurplusAmount%></small>&ensp;&ensp;剩余赎回次数<small><%=todaySurplusTimes%></small>次</p>\
	<button class="redemption_btn">确认赎回</button>\
    <div class="same_card_tip">\
					<h2 class="tip_head"><span class="text">Tips</span><em class="line"></em></h2>\
					<em class="tip_icon"></em>\
					<p class="tip_text">1.余额小于100元需一次性全额赎回</p>\
					<p class="tip_text">2.预计赎回金额t+3个工作日返回至现金余额账户<br></p>\
                    <p class="tip_text">3.若赎回金额大于20w， 请联系客服：4008-339-869</p>\
				</div>\
	</article>';
	module.exports = tpl;
})