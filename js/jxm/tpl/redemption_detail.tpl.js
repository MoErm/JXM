define(function (require, exports, module) {
	var tpl = '\
	<article class="mod_page">\
	  <div class="finish_regular redemption_finish_bg" style="">\
	    <div class="item item_redeem ico_finish ">赎回金额<i class="numb"><%=ransomAmount%>元&ensp;</i><br>\
	    <p><%=ransomTime%></p>\
	    </div>\
	    <div class="item  ico_chart">\
	      <p class="txt">到账时间</p>\
	      <p class="tips"><%=arrivedDate%></p>\
	    </div>\
	  </div>\
	  <h3 class="redemption_title">从以下订单赎回:</h3>\
	 <div id="invest_page">\
       <ul class="invest_list" id="invest_record">\
	    <% _.each(records, function(order){%>\
	    <li  class="v_mod item investList">\
	    	<span class="redemption_span1">起息日期</span><span class="redemption_span2"><%=order.valueDate%></span><span class="redemption_span3" style="color: #000000">-<%=order.clearingAmount%></span><br>\
	    	<span class="redemption_span1">赎回收益率</span><span class="redemption_span2"><%=format(order.ransomRate)%></span><span class="redemption_span3"><%=order.clearingPrincipal%>+<%=order.clearingInterest%></span><br>\
	    	<span class="logo"><img src="<%=order.bankLogo%>"   alt=""><%=order.bankName%>(尾号<%=order.cardTailNo%>)</span>\
   		</li>\
   		<% })%>\
	  </ul>\
        </div>\
	</article>';
	module.exports = tpl;
})