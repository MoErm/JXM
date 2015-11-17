define(function (require, exports, module) {
	var tpl = '\
	<article class="mod_page page_details_regular">\
	  <div class="v_mod">\
	    <ul class="invest_list">\
	      <li class="v_mod item">\
	        <p class="status status2 <%if(orderStatus == "02" || orderStatus == "06") {%>status_fail<% } %>"><%=orderStatusDesc%></p>\
	        <h3 class="hd_title"><%=productName%></h3>\
	        <% if (orderStatusDesc=="份额确认中") {%>\
	        <p class="v_tips ico_tips"> 该产品需要等待募集期结束和基金经理确认后才能确认份额，请耐心等待</p>\
	      	<% } %>\
	      </li>\
	    </ul>\
	    <div class="invest_hold"   <%if(orderStatus == "02"||orderStatus == "06") {%>style="display:none"<% } %>>\
	    <% if(orderStatusDesc=="已赎回") {%>\
	    	<h2 class="hd_title">赎回信息</h2>\
		    <ul class="list">\
		      <li class="item">\
		        <div class="v_item">\
		          <div class="v_item_hd">赎回金额</div>\
		          <div class="v_item_bd"><%=floatProdInfo.currentValue%></div>\
		        </div>\
		      </li>\
		      <li class="item">\
		        <div class="v_item">\
		          <div class="v_item_hd">赎回份额</div>\
		          <div class="v_item_bd"><%=floatProdInfo.currentCount%></div>\
		        </div>\
		      </li>\
		      <li class="item">\
		        <div class="v_item">\
		          <div class="v_item_hd">赎回净值</div>\
		          <div class="v_item_bd"><%=floatProdInfo.currentNet%></div>\
		        </div>\
		      </li>\
		      <li class="item">\
		        <div class="v_item">\
		          <div class="v_item_hd">赎回日期</div>\
		          <div class="v_item_bd"><%=floatProdInfo.updateDate%></div>\
		        </div>\
		      </li>\
		      <li class="item">\
		        <div class="v_item">\
		          <div class="v_item_hd">赎回手续费</div>\
		          <div class="v_item_bd"><%=floatProdInfo.factorage%></div>\
		        </div>\
		      </li>\
		      <li class="item">\
		        <div class="v_item">\
		          <div class="v_item_hd">累计盈亏</div>\
		          <div class="v_item_bd"><%=floatProdInfo.accProfit%></div>\
		        </div>\
		      </li>\
		    </ul>\
	    <%} else {%>\
	      <h2 class="hd_title">持仓信息</h2>\
	      <ul class="list">\
	        <li class="item">\
	          <div class="v_item">\
	            <div class="v_item_hd">当前市值</div>\
	            <div class="v_item_bd"><%=floatProdInfo.currentValue%></div>\
	          </div>\
	        </li>\
	        <li class="item">\
	          <div class="v_item">\
	            <div class="v_item_hd">当前份额</div>\
	            <div class="v_item_bd"><%=floatProdInfo.currentCount%></div>\
	          </div>\
	        </li>\
	        <li class="item">\
	          <div class="v_item">\
	            <div class="v_item_hd">当前净值</div>\
	            <div class="v_item_bd"><%=floatProdInfo.currentNet%></div>\
	          </div>\
	        </li>\
	        <li class="item">\
	          <div class="v_item">\
	            <div class="v_item_hd">更新日期</div>\
	            <div class="v_item_bd"><%=floatProdInfo.updateDate%></div>\
	          </div>\
	        </li>\
	        <li class="item">\
	          <div class="v_item">\
	            <div class="v_item_hd">累计盈亏</div>\
	            <div class="v_item_bd"><%=floatProdInfo.accProfit%></div>\
	          </div>\
	        </li>\
	      </ul>\
	    <% } %>\
	    </div>\
	    <ul class="v_mod invest_details">\
	      <li class="v_item">\
	        <div class="v_item_hd">投资金额</div>\
	        <div class="v_item_bd"><%=floatProdInfo.investAmout%></div>\
	      </li>\
	      <li class="v_item">\
	        <div class="v_item_hd">认购手续费</div>\
	        <div class="v_item_bd"><%=floatProdInfo.factorage%></div>\
	      </li>\
	      <li class="v_item">\
	        <div class="v_item_hd">净认购金额</div>\
	        <div class="v_item_bd"><%=floatProdInfo.netAmount%></div>\
	      </li>\
	      <li class="v_item">\
	        <div class="v_item_hd">权益确认日期</div>\
	        <div class="v_item_bd"><%=floatProdInfo.rightConfirmDate%></div>\
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
	  	<% }%>\
	  </div>\
	</article>\
	<% if (orderStatusDesc=="等待支付") {%>\
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