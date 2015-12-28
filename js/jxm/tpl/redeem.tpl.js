define(function (require, exports, module) {
	var tpl = '\
	<article class="mod_page mod_my_invest">\
	\
       <div class="redeem_select">\
       <div class="select_title_l selected" id="invest">投资</div>\
       <div class="select_title_r " id="redeem">赎回</div>\
       </div>\
       <div style="clear: both;height: 48px"></div>\
       <div id="invest_page">\
       \
       <%if(touziFlag==1){%>\
           <ul class="invest_list" id="invest_record">\
            <% _.each(records, function(order){%>\
            <li class="v_mod item investList" data-id="<%=order.orderNo%>">\
            <p class="status status2 <%if(order.orderStatus == "08"||order.orderStatus == "06"||order.orderStatus == "03"||order.orderStatus == "02") {%>status_fail<% } %>"><%=order.orderStatusDesc%></p>\
            <h3 class="hd_title"><small style="font-size: 1.6rem;color: #b5b5b5">当前余额&ensp;&ensp;&ensp;</small> <%=order.surplusAmount%> 元</h3>\
            <div class="v_item">\
                <div class="v_item_hd">\
                        <p><span class="v_item_title">投资金额</span><span class="v_item_cont"><%=order.investAmount%></span></p>\
                        <p><span class="v_item_title">投资日期</span><span class="v_item_cont"><%=order.orderDate%></span></p>\
                        <p><span class="v_item_title"><%if(order.orderStatus==08) {%>最终收益率<% }else{ %>昨日收益率<% } %></span><span class="v_item_cont"><%=format(order.rate)%><%if(order.isUp==1){%><i class="ico_up"></i><%}%></span></p>\
                </div>\
                <div class="v_item_bd">\
                    <span class="v_item_title"><%if(order.income==0){%>- -<%}else{%>+<%=order.income%>元<%}%></span><span class="v_item_cont">累计收益</span>\
                </div>\
            </div>\
           </li>\
             <% })%>\
          </ul>\
          <%}%>\
           <%if(touziFlag==0){%>\
           <div class="no_products ico_logo">暂无投资记录</div>\
          <%}%>\
        </div>\
       <div id="redeem_page" style="display: none">\
	  \
	 <%if(shuhuiFlag==1){%>\
	   <ul class="invest_list redeem_list_ul" id="redeem_record" >\
	  	<% _.each(sended.records, function(order){%>\
	    <li  class="redeem_list" data-id="<%=order.ransomId%>">\
	    	<span class="redeem_list_date"><%=order.ransomDate%></span><span class="detail redeem_list_money">-<%=order.ransomAmount%></span><br>\
	    	<span >赎回日期</span><span class="detail"><%=order.ransomStatusDesc%></span><br>\
   		</li>\
   		<% })%>\
	  </ul>\
	 \
	  	\
	  	\
	   <%}%>\
           <%if(shuhuiFlag==0){%>\
           <div class="no_products ico_logo">暂无赎回记录</div>\
      <%}%>\
      \
	  </div>\
	</article>';
	module.exports = tpl;

//    <span class="logo"><img src="<%=order.bankLogo%>"   alt=""><%=order.bankName%>(尾号<%=order.cardTailNo%>)</span>
})