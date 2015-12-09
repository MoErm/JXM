define(function (require, exports, module) {
	var tpl = '\
	<%if(orderStatus=="05"||orderStatus=="07"||orderStatus=="08"){%>\
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
	      <p class="tips ">已获得收益<%=income%>元，今日收益率<%=format(currentRate)%><%if(isUp==1){%><i class="ico_up"></i><%}%></p>\
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
	<%}else{%>\
	<article class="mod_page page_details_regular">\
	  <div class="v_mod">\
	    <ul class="invest_list">\
	      <li class="v_mod item">\
	        <p class="status status2 ">\
	        <%=orderStatusDesc%>\
	        </p>\
	        <h3 class="hd_title">天添利</h3>\
	           <% if (orderStatus == "01") {%>\
	        	<p class="info">存续信息</p>\
        		<p class="v_tips ico_tips">付款成功后，即可随时查询产品存续信息</p>\
	        <%}else if (orderStatus == "06") {%>\
	        	<p class="info"><%=orderStatusDesc%></p>\
        		<p class="v_tips ico_tips">由于您在时限内未完成支付，该笔订单被强制关闭</p>\
	        <%}else if (orderStatus == "03") {%>\
	        	<p class="info"><%=orderStatusDesc%></p>\
        		<p class="v_tips ico_tips">由于您在该笔订单支付过程中创建了另一笔支付订单，该笔订单已被强制关闭</p>\
	        <%}else if (orderStatus == "02") {%>\
	        	<p class="info">失败原因</p>\
        		<p class="v_tips ico_tips"><%=failedReason%></p>\
        		<%}%>\
	      </li>\
	    </ul>\
	    <div style="height:20px"></div>\
	  </div>\
	</article>\
	<%}%>\
	<%if(orderStatus=="01"){%>\
	<footer class="mod_footer_btn">\
	  <div class="fixed">\
	    <div class="v_item btn_box">\
	      <div class="v_item_hd">请在<span class="webtxt js_time">-分-秒</span>内完成支付！</div>\
	      <div class="v_item_bd"><span class="btn_link btn_link1 js_pay">立即支付</span></div>\
	    </div>\
	  </div>\
	</footer>\
        <%}%>\
	';
	module.exports = tpl;
})