define(function (require, exports, module) {
	var tpl = '\
	<article class="mod_page">\
	  <div class="finish_regular redemption_finish_bg" style="">\
	   <div class="item item_redeem ico_finish cur">成功支付<i class="numb"><%=investAmount%></i><br>\
	   <p><%=bankName%>(尾号<%=cardTailNo%>)</p>\
	   <p><%=orderTime%></p>\
	   </div>\
	    <div class="item item_start ico_book cur">\
	      <p class="txt"><%=valueDate%></p>\
	      <p class="tips">开始计算收益，今日收益率<%=format(startRate)%></p>\
	    </div>\
	    <div class="item item_end ico_coin cur">\
	      <p class="txt"><%=currentDate%></p>\
	      <p class="tips ">以获得收益<%=income%>元，今日收益率<%=format(currentRate)%><%if(isUp==1){%><i class="ico_up"></i><%}%></p>\
	    </div>\
	    <p style="text-align: right;margin-top: 30px">当前余额：<%=currentAmount%>元</p>\
	  </div>\
	  <ul class="invest_list" id="invest_record">\
	    <% _.each(records, function(order){%>\
	    <li  class="v_mod item investList">\
	    	<span class="redemption_span1">起息日期</span><span class="redemption_span2" ><%=order.clearingTime%></span><span class="redemption_span3" style="color: #000000"><%=order.clearingAmount%></span><br>\
	    	<span class="redemption_span1">赎回收益率</span><span class="redemption_span2"><%=format(order.clearingRate)%></span><span class="redemption_span3"><%=order.clearingPrincipal%>+<%=order.clearingInterest%></span><br>\
	    	<span class="logo"><img src="<%=bankLogo%>"   alt=""><%=bankName%>(尾号<%=cardTailNo%>)</span>\
   		</li>\
   		<% })%>\
	  </ul>\
	</article>\
	<footer class="mod_footer_btn">\
	  <div class="fixed">\
	    <div class="v_item btn_box">\
	      <div class="v_item_hd">请在<span class="webtxt js_time">-分-秒</span>内完成支付！</div>\
	      <div class="v_item_bd"><span class="btn_link btn_link1 js_pay">立即支付</span></div>\
	    </div>\
	  </div>\
	</footer>\
	';
	module.exports = tpl;
})