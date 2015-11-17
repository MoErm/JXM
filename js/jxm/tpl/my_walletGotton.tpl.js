define(function (require, exports, module) {
	var tpl = '<% _.each(items, function(order){%>\
	    <li  class="v_mod item ">\
	        <p class="status status2 <%if(order.status != "01") {%>status_fail<% } %>"><%=order.statusDesc%></p>\
	    	<h3 class="hd_title"><%=order.sourceName%></h3>\
	        <div class="v_item">\
	        	<div class="v_item_hd">\
		                    <br>	\
		            	<p><span class="v_item_title" style="width: 70px">有效期至：</span><span class="v_item_cont" style="width: 60%;color: #b5b5b5;"><%=order.expiringTime%></span></p>\
	            </div>\
	        	<div class="v_item_bd" style="width: 26%;">\
	            	<span class="v_item_title" style="font-size: 2rem;<%if(order.status != "01") {%>color:#797979<% } %>"><%=order.amount%></span>\
	            </div>\
	        </div>\
   		</li>\
   		<% })%>';
	module.exports = tpl;
})
