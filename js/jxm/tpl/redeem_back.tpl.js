define(function (require, exports, module) {
	var tpl = '<% _.each(items, function(order){%>\
	    <li  class="v_mod item redeem_list" data-id="<%=order.cid%>">\
	        <div class="afterArrow">\
	        <p class="status status2 <%if(order.status != "01") {%>status_fail<% } %>"><%=order.statusDesc%></p>\
	    	<span >赎回金额</span><span class="detail">1000元</span><br>\
	    	<span >赎回日期</span><span class="detail">2015/11/15</span><br>\
   		</div>\
   		</li>\
   		<% })%>';
	module.exports = tpl;
})
