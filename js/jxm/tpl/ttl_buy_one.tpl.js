define(function (require, exports, module) {
    var tpl ='<article class="ttl_buy_one">\
    		<div class="ttl_buy_one_t">\
				<ul class="info_add">\
					<li>\
						<p class="percent"><%=cardData.miNRate%><em class="percent_unit">%</em>~<%=cardData.maXRate%><em class="percent_unit">%</em></p>\
						<p>收益率递增</p>\
					</li>\
					<li>\
						<p class="title">随时可赎</p>\
						<p>投资期限</p>\
					</li>\
					<li>\
						<p class="title"><em class="num"><%=cardData.maxInvestAmount%></em></p>\
						<p>剩余可投</p>\
					</li>\
				</ul>\
    		</div>\
			<div class="ttl_buy_one_m">\
				<div class="imoney">\
					<p class="head">投资金额</p>\
					<div class="imoney_content">\
						<input type="number" class="imoney_num" id="imoney_num" placeholder="<%=cardData.minInvestAmount%>元起投，<%=cardData.additionalAmount%>元递增"/>\
						<span class="imoney_text">元</span>\
					</div>\
				</div>\
				<div class="imoney_tip" hidden>财主,您的余额不足,请先充值</div>\
				<div class="cash_box">\
					现金余额<span class="cash_number"> <%=cardData.allAmount%> </span>元\
					<button class="cash_addbtn" id="cash_addbtn">充值</button>\
				</div>\
			</div>\
			<div class="ttl_buy_one_b">\
				<div class="action">\
					<input type="button" value="确认投资" class="action_buy" id="action_buy"/>\
					<div class="action_tip">投资并同意\
					<a href="javascript:void(0)" class="weblink js_tips">《风险提示书》</a><a href="javascript:void(0)" class="weblink js_transfer ">《债权收益权转让服务协议》</a>\
					<a href="javascript:void(0)" class="weblink js_zhifu">《加薪猫委托支付授权书》</a>所有条款，充分了解并清楚知晓相应权利义务，愿意承担相关风险</div>\
				</div>\
			</div>\
        </article>\
        <footer class="foot_copyright">\
		  <div class="fixed">\
		    <p class="security">账户资金安全由银行和第三方支付公司共同保障</p>\
		    <p class="copyright">©2015 加薪猫 jiaxinmore.com</p>\
		  </div>\
		</footer>'


    module.exports = tpl;
})
