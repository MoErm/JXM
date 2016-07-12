define(function (require, exports, module) {
    var tpl = '<article >\
    <section class="acount">\
    <div class="acount_b">\
        <ul class="acount_b_list">\
       	<% _.each(orderList, function(order){%>\
       <li class="list_item list_incount" data-order="<%=order.orderNo%>">\
        <div class="sub_head">\
        <span class="sub_head_text"><%=order.productName%>(<%=order.investPeriod%>期)</span><span <%if(order.orderStatus=="01"||order.orderStatus=="04"||order.orderStatus=="05"||order.orderStatus=="11"||order.orderStatus=="12"||order.orderStatus=="14"){%>class="sub_head_title"<%}else{%>class="sub_head_title_fail"<%}%>><%=order.orderStatusDesc%></span></div>\
    <div class="sub_content">\
        <ul class="sub_content_list">\
        <li>\
        <span class="sub_content_title">投资金额</span>\
        <span class="sub_content_text"><%=order.investAmount%></span>\
    </li>\
    <li>\
    <span class="sub_content_title">到期日</span>\
        <span class="sub_content_text"><%=order.dueDate%></span>\
    </li>\
    <li>\
    <span class="sub_content_title">年化收益率</span>\
        <span class="sub_content_text"><%=order.yearRate%></span>\
    </li>\
    </ul>\
    <div class="sub_content_income">\
        <p <%if(order.orderStatus=="01"||order.orderStatus=="04"||order.orderStatus=="05"||order.orderStatus=="11"||order.orderStatus=="12"||order.orderStatus=="14"){%>class="income_head"<%}else{%>class="income_fail"<%}%>>+<%=order.actualIncome%></p>\
        <p class="income_title">实际到期收益</p>\
        </div>\
        </div>\
        </li>\
        <% })%>\
        \
    </ul>\
    </div>\
    </section>\
        </article>';
    module.exports = tpl;
})
