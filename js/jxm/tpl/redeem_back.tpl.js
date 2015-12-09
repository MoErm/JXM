define(function (require, exports, module) {
	var tpl = '<% _.each(records, function(order){%>\
	    <li  class="v_mod item redeem_list" data-id="<%=order.ransomId%>">\
	        <div class="afterArrow">\
	        <p class="status status2"><%=order.ransomStatusDesc%></p>\
	    	<span >赎回金额</span><span class="detail"><%=order.ransomAmount%></span><br>\
	    	<span >赎回日期</span><span class="detail"><%=order.ransomDate%></span><br>\
	    	</div>\
   		</li>\
   		<% })%>';
	module.exports = tpl;
})
