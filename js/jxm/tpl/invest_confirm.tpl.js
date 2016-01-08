define(function (require, exports, module) {
    var tpl= '<div class="notice "><div class="notice_tran">接支付机构通知，农业银行今天起代扣和绑卡业务暂不支持，恢复时间待定，特此通知。由此给您带来的不便，敬请见谅。 </div></div>\
    <div style="clear: both"></div>\
	<article class="mod_page v_mod page_invest_confim">\
	    <ul class="invest_list invest_confim">\
	      <li class="item invest_regular">\
	        <p class="status status3"><% if (productType == "01") {%>固收类产品<% } else if(productType == "02") {%>浮动类产品<%} %></p>\
	        <h3 class="hd_title"><%=productName%></h3>\
	        <div class="v_item v_item1">\
	          <div class="v_item_hd"><span class="v_item_title" style="position: relative"><i class="webtxt js_rate"><%if(incomeType == "01"){%><%=incomeceiling%><%}else if(incomeType == "02"){%><%=showNum(incomeceiling,activityrate)%><%} else if(incomeType == "03"){%>浮动<%} else if(incomeType == "04") {%><%=incomefloor%>~<%=incomeceiling%><% }else{%>0<% } %></i><span class="unit"><% if(incomeType != "03") {%>%<% } %></span></span><span class="v_item_cont">预期年化收益</span></div>\
	          <div class="v_item_bd"> <span class="v_item_title"><i class="webtxt2"><%=investDeadline%></i></span><span class="v_item_cont">投资期限</span> </div>\
	          <div class="v_item_bd"> <span class="v_item_title"><i class="webtxt2"><%=surplusAmount_show%></i></span><span class="v_item_cont">剩余可投</span> </div>\
	        </div>\
	        <div class="ttl_buy_one_m">\
				<div class="mycard" id="cardSelect">\
					<p class="head"><img src="<%=bankLogo%>" alt="" class="banklogo" /></p>\
					<div class="mycard_info"  data-cardid= "<%=cardInfoId%>">\
						<div class="card_detail">\
							<p class="card_cur" ><%=bankName%>(尾号<%=cardNoTail%>)</p>\
						</div>\
					</div>\
				</div>\
				<div class="imoney">\
					<p class="head">金额</p>\
					<div class="imoney_content">\
						<input type="number" class="imoney_num js_amount" id="imoney_num" placeholder="<%=minInvestAmount_show%>起投，<%=additionalAmount_show%>递增"/>\
						<span class="imoney_text">元</span>\
					</div>\
				</div>\
			</div>\
	        <% if ("s" != "") {%><div class="invest_change">红包：<p id="change"><%=change%></p></div><% }%>\
	        <div class="v_item v_item2">\
	          <div class="v_item_hd"><span class="v_item_title"><i class="webtxt js_profit">--</i><span class="unit">元</span></span><span class="v_item_cont"><% if (incomeType == "04") {%>最高收益可达<%} else {%>预计到期收益<% } %></span></div>\
	          <div class="v_item_bd"><span class="v_item_title">\
	          	<i class="webtxt2 js_fee" ><% if (productType == "01") {%><%if(investFactorage!="--"){%> <%=investFactorage%><%}else{%>免费<%}%> <% } else if(productType == "02") {%><%if(salesCharge=="0.0%" && serviceCharge=="0.0%"){%>免手续费<%} else {%>--<%}%><%} %></i>\
	          	<% if (productType == "01") {%><span class="unit"></span><% } else if(productType == "02") {%><%if(salesCharge=="0.0%" && serviceCharge=="0.0%"){%><%} else {%><span class="unit">元</span><%}%><%} %></span>\
	          	<span class="v_item_cont">手续费</span>\
	          </div>\
	          <div class="v_item_bd"><% if (productType == "01") {%><span class="ico_query js_regular_pop">收益说明</span><% } else if(productType == "02") {%><%if(salesCharge=="0.0%" && serviceCharge=="0.0%"){%><span class="ico_query js_float_pop">手续费说明</span><%}else{%><span class="ico_query js_float_pop">手续费说明</span><%} %><%} %></div>\
	        </div>\
	      </li>\
	    </ul>\
	    <div class="btn_box_submit js_invest" id="<%=investfactorage%>">立即投资</div>\
	    <div class="agreement" style="overflow: hidden">\
			<span style = "font-size: 1rem;color: #9d9d9d;top: 3px;position: relative; float: left;width: 98%;padding-left: 2%">\
			<span>投资并同意</span>\
			<a href="javascript:void(0)" class="weblink js_contract" data-contractno="17" data-productno="<%=productNo%>">《风险提示书》</a>\
			<a href="javascript:void(0)" class="weblink js_contract" data-contractno="19" data-productno="<%=productNo%>"><%if(productNature==11){%>《债权转让服务协议》<%}else{%>《产品收益权转让及服务协议》<%}%></a>\
			<span class="js_agree" style="">所有条款，充分了解并清楚知晓相应权利义务，愿意承担相关风险.</span>\
			</span>\
	    </div>\
	</article>\
	<footer class="foot_copyright">\
	  <div class="fixed">\
	    <p class="security">账户资金安全由银行和第三方支付公司共同保障</p>\
	    <p class="copyright">©2015 加薪猫 jiaxinmore.com</p>\
	  </div>\
	</footer>\
	';
	module.exports = tpl;
})
//滚动广告栏
// <div class="notice "><div class="notice_tran">当日继续投资任意活动产品XXXX元，您即可获取双旦大礼</div></div><div class="notice_detail"><a class="js_notice">填写地址</a></div>\
//<div style="clear: both"></div>