define(function (require, exports, module) {
	var tpl = '\
	<article class="mod_page mod_my_invest">\
	\
       <div class="redeem_select">\
       <div class="select_title_l selected" id="invest">投资</div>\
       <div class="select_title_r " id="redeem">赎回</div>\
       </div>\
       <div style="clear: both;height: 42px"></div>\
       <div id="invest_page">\
       <%if(touziFlag==1){%>\
           <ul class="invest_list" id="invest_record">\
            <% _.each(records, function(order){%>\
            <li  class="v_mod item investList" data-id="<%=order.orderNo%>">\
                <p class="status status2 <%if(order.orderStatus == "08") {%>status_fail<% } %>"><%=order.orderStatusDesc%></p>\
                <span >投资金额</span><span class="detail"><%=order.investAmount%></span><br>\
                <span >预计到期日</span><span class="detail"><%=order.orderDate%></span><br>\
                <span >今日收益率</span><span class="detail"><%=order.currentRate%>%</span><br>\
                <span class="logo"><img src="<%=order.bankLogo%>"   alt=""><%=order.bankName%>(尾号<%=order.cardTailNo%>)</span>\
            </li>\
            <% })%>\
          </ul>\
          <%}%>\
           <%if(touziFlag==0){%>\
           <div class="no_products ico_logo">暂无投资记录</div>\
          <%}%>\
        </div>\
       <div id="redeem_page" style="display: none">\
	  \
	 <%if(shuhuiFlag==1){%>\
	   <ul class="invest_list" id="redeem_record">\
	  	<% _.each(sended.records, function(order){%>\
	    <li  class="v_mod item redeem_list" data-id="<%=order.ransomId%>">\
	        <div class="afterArrow">\
	        <p class="status status2"><%=order.ransomStatusDesc%></p>\
	    	<span >赎回金额</span><span class="detail"><%=order.ransomAmount%></span><br>\
	    	<span >赎回日期</span><span class="detail"><%=order.ransomDate%></span><br>\
	    	</div>\
   		</li>\
   		<% })%>\
	  </ul>\
	 \
	  	\
	  	\
	   <%}%>\
           <%if(shuhuiFlag==0){%>\
           <div class="no_products ico_logo">暂无投资记录</div>\
      <%}%>\
      \
	  </div>\
	</article>';
	module.exports = tpl;
})