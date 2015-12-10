define(function (require, exports, module) {
	var tpl = '<% _.each(records, function(order){%>\
            <li  class="v_mod item investList" data-id="<%=order.orderNo%>">\
                <div class="afterArrow2">\
                <p class="status status2 <%if(order.orderStatus == "08"||order.orderStatus == "06"||order.orderStatus == "03"||order.orderStatus == "02") {%>status_fail<% } %>"><%=order.orderStatusDesc%></p>\
                <span >投资金额</span><span class="detail"><%=order.investAmount%></span><br>\
                <span >投资到期日</span><span class="detail"><%=order.orderDate%></span><br>\
                <span >今日收益率</span><span class="detail"><%=format(order.currentRate)%></span><br>\
                </div>\
            </li>\
            <% })%>';
	module.exports = tpl;
})
