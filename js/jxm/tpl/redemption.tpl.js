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
       <ul class="invest_list" id="invest_record">\
	  	<% _.each(items, function(order){%>\
	    <li  class="v_mod item investList">\
	        <p class="status status2 <%if(order.status != "01") {%>status_fail<% } %>"><%=order.statusDesc%></p>\
	    	<span >投资金额</span><span class="detail">1000元</span><br>\
	    	<span >预计到期日</span><span class="detail">2015/11/15</span><br>\
	    	<span >今日收益率</span><span class="detail">5.000%</span><br>\
	    	<span class="logo"><img src="http://test.jiaxinmore.com/resource/bankLogo/guangda.png"   alt="">招商银行(尾号1233)</span>\
   		</li>\
   		<% })%>\
	  </ul>\
        </div>\
       <div id="redeem_page" style="display: none">\
	  \
	  <% if(isEmpty==0) {%>\
	   <ul class="invest_list" id="redeem_record">\
	  	<% _.each(sended.items, function(order){%>\
	    <li  class="v_mod item redeem_list" data-id="<%=order.cid%>">\
	        <div class="afterArrow">\
	        <p class="status status2 <%if(order.status != "01") {%>status_fail<% } %>"><%=order.statusDesc%></p>\
	    	<span >赎回金额</span><span class="detail">1000元</span><br>\
	    	<span >赎回日期</span><span class="detail">2015/11/15</span><br>\
	    	</div>\
   		</li>\
   		<% })%>\
	  </ul>\
	  <%} else{%>\
	  	\
	  	\
	  <div class="no_products ico_logo">暂无投资记录</div>\
	  \
	  <% } %>\
	  </div>\
	</article>';
	module.exports = tpl;
})