define(function (require, exports, module) {
	var tpl = '<% _.each(records, function(order){%>\
            <li  class="v_mod item investList" data-id="<%=order.orderNo%>">\
                <div class="afterArrow2">\
                <p class="status status2 <%if(order.orderStatus == "08"||order.orderStatus == "06"||order.orderStatus == "03"||order.orderStatus == "02") {%>status_fail<% } %>"><%=order.orderStatusDesc%></p>\
                <span >投资金额</span><span class="detail"><%=order.investAmount%></span><br>\
                <span >剩余金额</span><span class="detail"><%=order.surplusAmount%>元</span><br>\
                <span >投资日期</span><span class="detail"><%=order.orderDate%></span><br>\
                <span >今日收益率</span><span class="detail"><%=format(order.currentRate)%></span><br>\
              <div class="redeem_shouyi"> <%if(order.income!=0) {%><p style="color: #d53925">+<%=order.income%>元<% }else{ %><p> - -<% } %></p>预期累计收益</div>\
                </div>\
            </li>\
            <% })%>';
	module.exports = tpl;
})
