define(function (require, exports, module) {
    var tpl ='<article class="ttl_pay_success">\
		<div class="ttl_pay_success_t">\
			<ul class="success_list">\
				<li class="card">\
					<em class="icon"></em>\
					<div class="info">\
						<p class="sub_total">成功支付  <%=successData.investAmount%> 元</p>\
						<p><%=successData.bankName%>（尾号<%=successData.cardNoTail%>）</p>\
						<p><%=successData.investTime%></p>\
					</div>\
				</li>\
				<li class="time">\
					<em class="icon"></em>\
					<div class="info">\
						<p class="sub_time"><%=successData.valueDate%></p>\
						<p>开始计算收益，今日收益率<%=successData.currentRate%></p>\
					</div>\
				</li>\
				<li class="show">\
					<em class="icon"></em>\
					<div class="info">\
						<p class="sub_show"><%=successData.incomeShowDate%></p>\
						<p>显示收益</p>\
					</div>\
				</li>\
			</ul>\
		</div>\
    </article>';

    module.exports = tpl;
})
