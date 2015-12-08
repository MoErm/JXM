define(function (require, exports, module) {
	var tpl = '<% _.each(records, function(order){%>\
            <li  class="v_mod item investList" data-id="<%=order.orderNo%>">\
                <p class="status status2 <%if(order.orderStatus == "08") {%>status_fail<% } %>"><%=order.orderStatusDesc%></p>\
                <span >投资金额</span><span class="detail"><%=order.investAmount%></span><br>\
                <span >预计到期日</span><span class="detail"><%=order.orderDate%></span><br>\
                <span >今日收益率</span><span class="detail"><%=format(order.currentRate)%></span><br>\
                <span class="logo"><img src="<%=order.bankLogo%>"   alt=""><%=order.bankName%>(尾号<%=order.cardTailNo%>)</span>\
            </li>\
            <% })%>';
	module.exports = tpl;
})
