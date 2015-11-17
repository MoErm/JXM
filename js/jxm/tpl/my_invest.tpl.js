define(function (require, exports, module) {
	var tpl = '\
	<article class="mod_page mod_my_invest">\
	<div class="new_active" >\
	11月全面邀请争霸赛 <a href="javascript:void(0)"style="color:#f60;" class="js_situation">查看详情</a>\
	</div>\
	  <div class="v_mod invest_base_info">\
	    <div class="item">\
	      <div class="my_invest">\
	      <div class="invest_title">我的资产(元)</div>\
	      <div class="invest_money"><%=totalProp%></div>\
	      </div>\
	    </div>\
	    <div class="item">\
	      <div class="v_item v_item2" style="text-align: left">\
	        <div class="v_item_bd" style="padding-left:10px "><span class="v_item_title js_test">当前收益(元)</span><span class="v_item_cont" style="font-size: 2rem"><%=currentIncome%></span></div>\
	        <div style="padding-left:20px;" class="v_item_bd <% if(hasHistoryOrders == 1) {%>triangle<% } %>" ><span class="v_item_title">历史收益(元)</span><span class="v_item_cont" style="font-size: 2rem"><%=historyIncome%></span></div>\
	      </div>\
	    </div>\
	    \
	  </div>\
	    <div class="my_change ico_hongbao">\
	    <span>我的红包</span>\
	    <span class="change"><%=change%></span>\
	    </div>\
	  <% if(orderListLength!=0) {%>\
	  	<% _.each(orderList, function(order){%>\
	  <ul class="invest_list">\
	    <li id="<%=order.orderNo%>" class="v_mod item <% if(order.productType == "01"){%>js_regular<% } else if(order.productType == "02"){%>js_float<% }%>">\
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
	  \
	  <% } %>\
	  <% if(hasHistoryOrders == 1) {%>\
	  <div class="more_record ico_clock js_history">查看历史投资记录</div>\
	  <% } %>\
	  \
	  \
	</article>';

    var rm='<div class="figure">\
	      	<div style ="width:140px;margin:0 auto">\
	        <canvas id="canvas" height="140px" width="140px" style=""></canvas>\
	        </div>\
	        <div class="figure_item item1">\
	          <h3>我的资产</h3>\
	          <p style="font-size:1.2rem"><%=totalProp%></p>\
	        </div>\
	        <div class="figure_item item2">\
	          <h3>浮动收益产品</h3>\
	          <ul>\
	            <li><%=floatProp%></li>\
	            <li>占比 <%=floatPropRate%>%</li>\
	          </ul>\
	        </div>\
	        <div class="figure_item item3">\
	          <h3>固定收益产品</h3>\
	          <ul>\
	            <li><%=fixedProp%></li>\
	            <li>占比 <%=fixedPropRate%>%</li>\
	          </ul>\
	        </div>\
	      </div>';

	module.exports = tpl;
})