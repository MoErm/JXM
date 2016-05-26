define(function (require, exports, module) {
	var tpl = '\
	<article class="mod_page mod_my_invest">\
	  \
	  \
	        <% if(orderListLength!=0) {%>\
          <% _.each(orderList, function(order){%>\
      <ul class="invest_list">\
        <li id="<%=order.orderNo%>" style="background-color: white" class="v_mod item <% if(order.productType == "01"){%>js_regular<% } else if(order.productType == "02"){%>js_float<% }%>">\
            <p class="status status2 <%if(order.orderStatus == "02" || order.orderStatus == "06"|| order.orderStatus == "03"|| order.orderStatus == "07") {%>status_fail<% } %>"><%=order.orderStatusDesc%></p>\
            <h3 class="hd_title"><%=order.productName%></h3>\
            <div class="v_item">\
                <div class="v_item_hd">\
                    <%if(order.productType == "01") {%>\
                        <p><span class="v_item_title">投资金额</span><span class="v_item_cont"><%=order.investAmout%></span></p>\
                        <p><span class="v_item_title">预计到期日</span><span class="v_item_cont"><%=order.expectExpire%></span></p>\
                        <p><span class="v_item_title">预期年化收益</span><span class="v_item_cont"><% if(order.incomeType == "01") {%><%=order.incomeRateCeiling%><% }else if(order.incomeType =="02"){%><%=order.incomeRateCeiling%>+<%=order.activityIncomeRate%><% }else if(order.incomeType =="04"){%><%=order.incomeRateFloor%>~<%=order.incomeRateCeiling%><% } %></span></p>\
                    <% }else if (order.productType == "02"){%>\
                        <p><span class="v_item_title">投资金额</span><span class="v_item_cont"><%=order.investAmout%></span></p>\
                        <p><span class="v_item_title">当前份额</span><span class="v_item_cont"><%=order.currentCount%></span></p>\
                        <p><span class="v_item_title">当前净值</span><span class="v_item_cont"><%=order.currnetNet%></span></p>\
                       <% } %>\
                </div>\
                <div class="v_item_bd">\
                    <%if(order.incomeType == "03"){%>\
                    <span class="v_item_title"><%=order.accProfit%></span><span class="v_item_cont">累计盈亏</span>\
                    <% } else if(order.incomeType == "01" ||order.incomeType == "02" ){%>\
                    <span class="v_item_title"><%=order.expectReturn%></span><span class="v_item_cont">预计到期收益</span>\
                    <%} else if(order.incomeType == "04"){%>\
                    <span class="v_item_title"><%=order.expectReturn%></span><span class="v_item_cont">最高收益可达</span>\
                    <% }%>\
                </div>\
            </div>\
           </li>\
           <% })%>\
      </ul>\
      <%} else{%>\
          \
          \
      <div class="no_products ico_logo">暂无在投产品</div>\
              <% } %>\
      <% if(hasHistoryOrders == 1) {%>\
      <div class="more_record ico_clock js_history" style="margin-bottom: 10px">查看历史投资记录</div>\
      <% } %>\
    \
	</article>';



	module.exports = tpl;
})