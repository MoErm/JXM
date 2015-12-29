define(function (require, exports, module) {
	var tpl = '<% _.each(records, function(order){%>\
            <ul class="invest_list" id="invest_record">\
            <% _.each(records, function(order){%>\
            <li class="v_mod item investList" data-id="<%=order.orderNo%>">\
            <p class="status status2 <%if(order.orderStatus == "08"||order.orderStatus == "06"||order.orderStatus == "03"||order.orderStatus == "02") {%>status_fail<% } %>"><%=order.orderStatusDesc%></p>\
            <h3 class="hd_title"><small style="font-size: 1.6rem;color: #b5b5b5">当前余额&ensp;&ensp;&ensp;</small><%if(order.orderStatus == "08"||order.orderStatus == "06"||order.orderStatus == "03"||order.orderStatus == "02"||order.orderStatus == "04") {%>- -<% }else{ %> <%=order.surplusAmount%> 元<% } %></h3>\
            <div class="v_item">\
                <div class="v_item_hd">\
                        <p><span class="v_item_title">投资金额</span><span class="v_item_cont"><%=order.investAmount%></span></p>\
                        <p><span class="v_item_title">投资日期</span><span class="v_item_cont"><%=order.orderDate%></span></p>\
                        <p><span class="v_item_title"><%if(order.orderStatus==08) {%>最终收益率<% }else{ %>昨日收益率<% } %></span><span class="v_item_cont"><%if(order.rate==0){%>- -<%}else{%><%=format(order.rate)%><%}%><%if(order.isUp==1){%><i class="ico_up"></i><%}%></span></p>\
                </div>\
                <div class="v_item_bd">\
                    <span class="v_item_title"><%if(order.income==0){ if(order.orderStatus==08){%>0.00<%}else{%>- -<%}%><%}else{%>+<%=order.income%>元<%}%></span><span class="v_item_cont">累计收益</span>\
                </div>\
            </div>\
           </li>\
             <% })%>\
          </ul>\
            <% })%>';
	module.exports = tpl;
})
