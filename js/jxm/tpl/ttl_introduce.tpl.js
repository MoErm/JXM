define(function (require, exports, module) {
    var tpl ='<article class="ttl_introduce">\
    		<div class="ttl_introduce_t">\
				<div class="earn">\
					<p>昨日收益(元)</p>\
					<h2><%=getTtlProperty.yestIncome%></h2>\
				</div>\
    		</div>\
    		<div class="ttl_introduce_m">\
				<div class="total">\
					<p>总金额(元)</p>\
					<h2><%=getTtlProperty.allProperty%></h2>\
				</div>\
				<div class="history">\
					<p>历史收益(元)</p>\
					<h2><%=getTtlProperty.historyIncome%></h2>\
				</div>\
    		</div>\
			<div class="ttl_introduce_b">\
				<h3 class="title">\
					<em></em>\
					<span>收益率小助手</span>\
				</h3>\
				<div class="chart">\
					<div class="chart_head">\
						<p>今日最高收益率</p>\
						<h2 id="todayYieldRate">0.000%</h2>\
					</div>\
					 <div class="cycle_bg"  id="tradeAmount">\
                        <div id="cycle" style="-webkit-transform:rotate(0deg);-webkit-transition: -webkit-transform ease-out 1s;height: 300px;width: 300px;background-color:rgba(0,0,0,0);position: relative" class="cycle_rotate">\
                        <div class="cycleTest cycleTestRed cycle_1" id="cycle_1">12/11</div>\
                    <div class="cycleTest cycleTestRed cycle_2" id="cycle_2">12/12</div>\
                    <div class="cycleTest cycleTestRed cycle_3" id="cycle_3">12/13</div>\
                    <div class="cycleTest cycle_4" id="cycle_4">12/14</div>\
                    <div class="cycleTest cycle_5" id="cycle_5">12/15</div>\
                    <div class="cycleTest cycle_6" id="cycle_6">12/16</div>\
                    <div class="cycleTest cycle_7" id="cycle_7">12/17</div>\
                    <div class="cycleTest cycle_8" id="cycle_8">12/18</div>\
                        </div>\
                        <div class="chart_content" id="chart_content">\
					</div>\
				</div>\
				<div class="action">\
					<input type="button" value="购买" class="action_buy" id="action_buy" />\
					<input type="button" value="赎回" class="action_redem <%if(getTtlProperty.isCanRedeem!=1){%> lock<% } %>" id="action_redem" />\
				</div>\
			</div>\
        </article>';

    module.exports = tpl;
})
