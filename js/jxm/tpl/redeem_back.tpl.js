define(function (require, exports, module) {
	var tpl = '<% _.each(records, function(order){%>\
	    <li  class="redeem_list" data-id="<%=order.ransomId%>">\
	    	<span class="redeem_list_date"><%=order.ransomDate%></span><span class="detail redeem_list_money">-<%=order.ransomAmount%></span><br>\
	    	<span >赎回日期</span><span class="detail"><%=order.ransomStatusDesc%></span><br>\
   		</li>\
   		<% })%>';
	module.exports = tpl;
})
