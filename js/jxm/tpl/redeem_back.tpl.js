define(function (require, exports, module) {
	var tpl = '<% _.each(items, function(order){%>\
	    <li  class="v_mod item investList">\
	        <p class="status status2 <%if(order.status != "01") {%>status_fail<% } %>"><%=order.statusDesc%></p>\
	    	<span >投资金额</span><span class="detail">1000元</span><br>\
	    	<span >预计到期日</span><span class="detail">2015/11/15</span><br>\
	    	<span >今日收益率</span><span class="detail">5.000%</span><br>\
	    	<span class="logo"><img src="http://test.jiaxinmore.com/resource/bankLogo/guangda.png"   alt="">招商银行(尾号1233)</span>\
   		</li>\
   		<% })%>';
	module.exports = tpl;
})
