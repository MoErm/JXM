define(function (require, exports, module) {
	var tpl = '\
	<article class="mod_page mod_my_invest">\
	\
       <div class="redeem_select">\
       <div class="select_title_l selected" id="invest">投资</div>\
       <div class="select_title_r " id="redeem">赎回</div>\
       </div>\
       <div style="clear: both;height: 42px"></div>\
       <div id="invest_page">\
       <%if(touziFlag==1){%>\
           <ul class="invest_list" id="invest_record">\
            <% _.each(records, function(order){%>\
            <li  class="v_mod item investList" data-id="<%=order.orderNo%>">\
                <div class="afterArrow2">\
                <p class="status status2 <%if(order.orderStatus == "08"||order.orderStatus == "06"||order.orderStatus == "03"||order.orderStatus == "02") {%>status_fail<% } %>"><%=order.orderStatusDesc%></p>\
                <span >投资金额</span><span class="detail"><%=order.investAmount%></span><br>\
                <span >剩余金额</span><span class="detail"><%=order.surplusAmount%> 元</span><br>\
                <span >投资日期</span><span class="detail"><%=order.orderDate%></span><br>\
                <span ><%if(order.orderStatus==08) {%>最终收益率<% }else{ %>昨日收益率<% } %></span><span class="detail"><%=format(order.rate)%><%if(order.isUp==1){%><i class="ico_up"></i><%}%></span><br>\
                 <div class="redeem_shouyi"> <%if(order.income!=0) {%><p style="color: #d53925">+<%=order.income%>元<% }else{ %><p> - -<% } %></p>预期累计收益</div>\
               \
                <div>\
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
	   <ul class="invest_list" id="redeem_record">\
	  	<% _.each(sended.records, function(order){%>\
	    <li  class="v_mod item redeem_list" data-id="<%=order.ransomId%>">\
	        <div class="afterArrow">\
	        <p class="status status2"><%=order.ransomStatusDesc%></p>\
	    	<span >赎回金额</span><span class="detail"><%=order.ransomAmount%>元</span><br>\
	    	<span >赎回日期</span><span class="detail"><%=order.ransomDate%></span><br>\
	    	</div>\
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