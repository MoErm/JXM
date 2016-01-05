define(function (require, exports, module) {
	var tpl = '\
	<% if(orderStatus == 14) {%>\
		<article class="mod_page page_details_regular">\
	  <div class="v_mod">\
	    <ul class="invest_list">\
	      <li class="v_mod item">\
	        <p class="status status2"><%=orderStatusDesc%></p>\
	        <h3 class="hd_title"><%=productName%></h3>\
	        <% if (orderStatus == "01") {%>\
	        	<p class="info">存续信息</p>\
        		<p class="v_tips ico_tips">付款成功后，即可随时查询产品存续信息</p>\
	        <%} else {%>\
	        	<div class="invest_chart" style="height: 274px;">\
		          <div class="item item_buy ico_finish cur">\
		            <p class="txt">购买日</p>\
		            <p class="tips"><%=fixedProdInfo.purchaseDate%></p>\
		          </div>\
		          <div class="item item_start ico_chart cur">\
		            <p class="txt">起息日</p>\
		            <p class="tips"><%=fixedProdInfo.valueDate%></p>\
		          </div>\
		          <div class="item item_end ico_clock2 cur">\
		            <p class="txt">到期日</p>\
		            <p class="tips"><%=fixedProdInfo.actualExpiringDate%></p>\
		          </div>\
		          <div class="progress" style="left: 60px;top: -105px;">\
		                <div class="item_cont">\
		               	<div class="txt_cont"><span>实际赚取收益  <%=fixedProdInfo.actualIncome%></span></div>\
		                </div>\
		           </div>\
		        </div>\
	        <%}%>\
	      </li>\
	    </ul>\
	    <ul class="v_mod invest_details">\
	      <li class="v_item">\
	        <div class="v_item_hd">投资金额</div>\
	        <div class="v_item_bd"><%=fixedProdInfo.investAmout%></div>\
	      </li>\
	      <li class="v_item">\
	        <div class="v_item_hd">投资银行卡</div>\
	        <div class="v_item_bd"><%=fixedProdInfo.investCardName%><%=fixedProdInfo.investCardNum%></div>\
	      </li>\
	      <li class="v_item">\
	        <div class="v_item_hd"><% if(fixedProdInfo.incomeType == "04") {%>最高收益可达<% } else {%>实际赚取收益<% } %></div>\
	        <div class="v_item_bd"><%=fixedProdInfo.actualIncome%></div>\
	      </li>\
	      <li class="v_item">\
	        <div class="v_item_hd">起息日</div>\
	        <div class="v_item_bd"><%=fixedProdInfo.valueDate%></div>\
	      </li>\
	      <li class="v_item">\
	        <div class="v_item_hd">到期日</div>\
	        <div class="v_item_bd"><%=fixedProdInfo.actualExpiringDate%></div>\
	      </li>\
	      <li class="v_item">\
	        <div class="v_item_hd">订单编号</div>\
	        <div class="v_item_bd"><%=orderNo%></div>\
	      </li>\
	      <li class="v_item">\
	        <div class="v_item_hd">创建时间</div>\
	        <div class="v_item_bd"><%=createTime%></div>\
	      </li>\
	    </ul>\
	    <% if (orderStatusDesc!="等待支付") {%>\
	    <div class="btn_box"><span class="btn_link btn_link1 js_product" id="<%=productNo%>">产品详情</span></div>\
	    <% } %>\
	  </div>\
	</article>\
	<% } else {%>\
	<article class="mod_page page_details_regular">\
	  <div class="v_mod">\
	    <ul class="invest_list">\
	      <li class="v_mod item">\
	        <p class="status status2 <%if(orderStatus == "02"||orderStatus == "06"||orderStatus == "03"||orderStatus == "07") {%>status_fail<% } %>">\
	        <%=orderStatusDesc%>\
	        </p>\
	        <h3 class="hd_title"><%=productName%></h3>\
	        <% if (orderStatus == "01") {%>\
	        	<p class="info">存续信息</p>\
        		<p class="v_tips ico_tips">付款成功后，即可随时查询产品存续信息</p>\
	        <%}else if (orderStatus == "07") {%>\
	        	<p class="info"><%=orderStatusDesc%></p>\
        		<p class="v_tips ico_tips">由于您在时限内未完成支付，该笔订单被强制关闭</p>\
	        <%}else if (orderStatus == "03") {%>\
	        	<p class="info"><%=orderStatusDesc%></p>\
        		<p class="v_tips ico_tips">由于您在该笔订单支付过程中创建了另一笔支付订单，该笔订单已被强制关闭</p>\
	        <%}else if (orderStatus == "02") {%>\
	        	<p class="info">失败原因</p>\
        		<p class="v_tips ico_tips"><%=failedReason%></p>\
	        <%} else {%>\
	        	<div class="invest_chart" <%if(orderStatus == "02"||orderStatus == "06"||orderStatus == "03"||orderStatus == "07") {%>style="display:none"<% } %>>\
		          <div class="item item_buy ico_finish cur">\
		            <p class="txt">购买日</p>\
		            <p class="tips"><%=fixedProdInfo.purchaseDate%></p>\
		          </div>\
		          <div class="item item_start ico_chart">\
		            <p class="txt">起息日</p>\
		            <p class="tips"><%=fixedProdInfo.valueDate%></p>\
		            <div class="progress">\
		            	<span class="rate"><i data-tips="如是动态在此标签动态增加top的值，如top:10%;"></i></span>\
		                <div class="item_cont">\
		               	 <div class="txt_cont" data-tips="如是动态在此标签动态增加top的值，如top:10%; 当是0是添加类名:zero,100%时添加类名:hundred"><span>预计已赚取收益  <%=fixedProdInfo.expectGotProfit%></span></div>\
		                </div>\
		            </div>\
		          </div>\
		          <div class="item item_end ico_clock2">\
		            <p class="txt">预计到期日</p>\
		            <p class="tips"><%=fixedProdInfo.expectExpiringDate%></p>\
		          </div>\
		        </div>\
	        <%}%>\
	      </li>\
	    </ul>\
	    <ul class="v_mod invest_details">\
	      <li class="v_item">\
	        <div class="v_item_hd">投资金额</div>\
	        <div class="v_item_bd"><%=fixedProdInfo.investAmout%></div>\
	      </li>\
	      <li class="v_item">\
	        <div class="v_item_hd">投资银行卡</div>\
	        <div class="v_item_bd"><%=fixedProdInfo.investCardName%><%=fixedProdInfo.investCardNum%></div>\
	      </li>\
	      <li class="v_item">\
	        <div class="v_item_hd">预期年化收益</div>\
	        <div class="v_item_bd"><%if(fixedProdInfo.incomeType =="01") {%><%=fixedProdInfo.incomeRateCeiling%><% }else if(fixedProdInfo.incomeType =="02"){%><%=fixedProdInfo.incomeRateCeiling%>+<%=fixedProdInfo.activityIncomeRate%><% }else if(fixedProdInfo.incomeType =="04"){%><%=fixedProdInfo.incomeRateFloor%>~<%=fixedProdInfo.incomeRateCeiling%><% }%></div>\
	      </li>\
	      <li class="v_item">\
	        <div class="v_item_hd"><% if(fixedProdInfo.incomeType == "04") {%>最高收益可达<% } else {%>预计到期收益<% } %></div>\
	        <div class="v_item_bd"> <%if(orderStatus == "02"||orderStatus == "06"||orderStatus == "03"||orderStatus == "07") {%>--<% }else{ %> <%=fixedProdInfo.expectReturn%> （以实际到账为准）<%}%> </div>\
	      </li>\
	      <li class="v_item">\
	        <div class="v_item_hd">起息日</div>\
	        <div class="v_item_bd"><%=fixedProdInfo.valueDate%></div>\
	      </li>\
	      <li class="v_item">\
	        <div class="v_item_hd">预计到期日</div>\
	        <div class="v_item_bd"><%=fixedProdInfo.expectExpiringDate%></div>\
	      </li>\
	      <li class="v_item">\
	        <div class="v_item_hd">订单编号</div>\
	        <div class="v_item_bd"><%=orderNo%></div>\
	      </li>\
	      <li class="v_item">\
	        <div class="v_item_hd">创建时间</div>\
	        <div class="v_item_bd"><%=createTime%></div>\
	      </li>\
	    </ul>\
	    <% if (orderStatus != "01") {%>\
	    <div class="btn_box"><span class="btn_link btn_link1 js_product" id="<%=productNo%>">产品详情</span></div>\
	    <% } %>\
	  </div>\
	</article>\
	<% } %>\
	<% if (orderStatus == "01") {%>\
	<footer class="mod_footer_btn">\
	  <div class="fixed">\
	    <div class="v_item btn_box">\
	      <div class="v_item_hd">请在<span class="webtxt js_time">-分-秒</span>内完成支付！</div>\
	      <div class="v_item_bd"><span class="btn_link btn_link1 js_pay">立即支付</span></div>\
	    </div>\
	  </div>\
	</footer>\
	<% } %>\
	';
	module.exports = tpl
})