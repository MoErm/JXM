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
                            <div class="cycleTest cycleTestRed cycle_1" id="cycle_1"></div>\
                            <div class="cycleTest cycleTestRed cycle_2" id="cycle_2"></div>\
                            <div class="cycleTest cycleTestRed cycle_3" id="cycle_3"></div>\
                            <div class="cycleTest cycleTestRed cycle_4" id="cycle_4"></div>\
                            <div class="cycleTest cycleTestRed cycle_5" id="cycle_5"></div>\
                            <div class="cycleTest cycleTestRed cycle_6" id="cycle_6"></div>\
                            <div class="cycleTest cycleTestRed cycle_7" id="cycle_7"></div>\
                            <div class="cycleTest cycleTestRed cycle_8" id="cycle_8"></div>\
                        </div>\
					<div class="cycle_num">\
					    <div id="cycle_num_1">0</div>\
					    <div id="cycle_num_2">0</div>\
					    <div>.</div>\
					    <div id="cycle_num_3">0</div>\
					    <div id="cycle_num_4">0</div>\
					    <div id="cycle_num_5">0</div>\
					    <div>%</div>\
					</div>\
					<div style="position: absolute;top: 75px;right: 50%;margin-right: -8px"><img src="images/cycle_arrow.png" width="16px" alt=""></div>\
					<div style="position: absolute;top: 15px;left: 2px;"><img src="images/cycle_leftArrow.png" width="50px" alt=""></div>\
					<div style="position: absolute;top: 15px;right:2px;"><img src="images/cycle_rightArrow.png" width="50px" alt=""></div>\
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
