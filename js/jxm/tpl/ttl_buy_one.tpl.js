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
						<p class="title"><em class="num"><%=cardData.surplusAmount%></em></p>\
						<p>剩余可投</p>\
					</li>\
				</ul>\
    		</div>\
			<div class="ttl_buy_one_m">\
				<div class="mycard">\
					<p class="head"><img src="<%=cardData.bankLogo%>" alt="" class="banklogo" /></p>\
					<div class="mycard_info">\
						<div class="card_detail">\
							<p class="card_cur" data-cardid= "<%=cardData.cardId%>"><%=cardData.bankName%>(尾号<%=cardData.cardNoTail%>)</p>\
							<p class="limit_text">单笔限额：<%=cardData.transactLimit%>，单日限额：<%=cardData.dailyLimit%></p>\
						</div>\
					</div>\
				</div>\
				<div class="imoney">\
					<p class="head">投资金额</p>\
					<div class="imoney_content">\
						<input type="number" class="imoney_num" id="imoney_num" placeholder="<%=cardData.minInvestAmount%>元起投，<%=cardData.additionalAmount%>元递增"/>\
						<span class="imoney_text">元</span>\
					</div>\
				</div>\
			</div>\
			<div class="ttl_buy_one_b">\
				<div class="action">\
					<input type="button" value="确认投资" class="action_buy" id="action_buy"/>\
					<div class="action_tip">投资并同意\
					<a href="javascript:void(0)" class="weblink js_tips">《风险提示书》</a><a href="javascript:void(0)" class="weblink js_transfer ">《债权收益权转让服务协议》</a>\
					所有条款，充分了解并清楚知晓相应权利义务，愿意承担相关风险</div>\
				</div>\
				<div class="same_card_tip">\
					<h2 class="tip_head"><span class="text">Tips</span><em class="line"></em></h2>\
					<em class="tip_icon"></em>\
					<p class="tip_text">为了您的资金安全， 您的银行卡绑定加薪猫账户后，  买入和赎回将为您同一张银行卡。</p>\
				</div>\
			</div>\
        </article>';

    module.exports = tpl;
})
