define(function (require, exports, module) {
	var tpl = '\
	<article class="mod_page">\
	<div class="redemption_box">\
        <div class="redemption_div"><span>总资产</span><span id="totalAmount"><%=totalAmount%>&ensp;元</span></div>\
        <div class="redemption_div"><span>赎回金额</span><span><input type="text" placeholder="<%=minRedeemAmount%>元起赎" id="redeemValue">&ensp;元</span></div>\
	</div>\
	<p class="redemption_tip1">今日还可以赎回<small><%=todaySurplusAmount%></small>&ensp;&ensp;剩余赎回次数<small><%=todaySurplusTimes%></small>次</p>\
	<button class="redemption_btn">确认赎回</button>\
	<div class="redemption_tip2">余额小于100元需一次性全额赎回<br>\
    预计赎回金额t+3个工作日返回至银行账户<br>\
    实际到账时间根据银行而定</div>\
	</article>';
	module.exports = tpl;
})