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
					<p>累计收益(元)</p>\
					<h2><%=getTtlProperty.historyIncome%></h2>\
				</div>\
    		</div>\
			<div class="ttl_introduce_b">\
				<h3 class="title" id="title_tip">\
					<em></em>\
					<span>收益率小助手</span>\
				</h3>\
				<div class="chart">\
					<div class="chart_head">\
						<p>当日最高收益率</p>\
						   <div class="cycle_num">\
                            <div id="cycle_num_1">0</div>\
                            <div id="cycle_num_2">0</div>\
                            <div>.</div>\
                            <div id="cycle_num_3">0</div>\
                            <div id="cycle_num_4">0</div>\
                            <div id="cycle_num_5">0</div>\
                            <div>%</div>\
                        </div>\
					</div>\
					<div style="width: 100%" id="tradeAmount">\
					    <div class="cycle_bg">\
                        <div id="cycle" style="-webkit-transform:rotate(0deg);-webkit-transition: -webkit-transform ease-out 1s;height: 300px;width: 300px;background-color:rgba(0,0,0,0);position: relative" class="cycle_rotate">\
                            <div class="cycleTest cycleTestRed cycle_1" id="cycle_1"></div>\
                            <div class="cycleTest cycleTestRed cycle_2 cycleToday cycleNow" id="cycle_2"></div>\
                            <div class="cycleTest cycleTestRed cycle_3" id="cycle_3"></div>\
                            <div class="cycleTest cycleTestRed cycle_4" id="cycle_4"></div>\
                            <div class="cycleTest cycleTestRed cycle_5" id="cycle_5"></div>\
                            <div class="cycleTest cycleTestRed cycle_6" id="cycle_6"></div>\
                            <div class="cycleTest cycleTestRed cycle_7" id="cycle_7"></div>\
                            <div class="cycleTest cycleTestRed cycle_8" id="cycle_8"></div>\
                        </div>\
                     \
                            <div style="position: absolute;top: 75px;right: 50%;margin-right: -18px"><img src="images/cycle_arrow.png" width="36px" alt=""></div>\
                            <div style="position: absolute;top: 15px;left: 2px;" id="left_arrow"><img src="images/cycle_leftArrow.png" width="50px" alt=""></div>\
                            <div style="position: absolute;top: 15px;right:2px;" id="right_arrow"><img src="images/cycle_rightArrow.png" width="50px" alt=""></div>\
                        </div>\
                     </div>\
                     <div class="next_arrow"></div>\
                     <div class="next_arrow"></div>\
				</div>\
			</div>\
            <div class="ttl_introduce_d">\
                <div class="detail">\
                    <div class="detail_a">\
                        <em class="title"></em>\
                        <h2 class="head">收益率按天增涨的活期理财</h2>\
                        <ul class="list">\
                            <li><p class="list_box"><span>5%<br/>年化起</span></p></li>\
                            <li><p class="list_box"><span>12%<br/>年化最高</span></p></li>\
                            <li><p class="list_box"><span>t+0<br/>当日起息</span></p></li>\
                        </ul>\
                    </div>\
                    <div class="detail_b">\
                        <div class="detail_line_a"></div>\
                        <h2 class="head">用户定位</h2>\
                        <ul class="list">\
                            <li>\
                                <em class="list_icon_a"></em>\
                                <p class="list_head">低门槛</p>\
                                <p class="list_txt">100元<br/>起投金额</p>\
                            </li>\
                            <li>\
                                <em class="list_icon_b"></em>\
                                <p class="list_head">灵活性</p>\
                                <p class="list_txt">在投资产<br/>随时可赎</p>\
                            </li>\
                            <li>\
                                <em class="list_icon_c"></em>\
                                <p class="list_head">高收益</p>\
                                <p class="list_txt">收益率<br/>按天增涨 </p>\
                            </li>\
                        </ul>\
                        <div class="detail_line_b"></div>\
                    </div>\
                    <div class="detail_c">\
                        <h2 class="head">投资模式</h2>\
                        <div class="content">\
                            <ul class="list">\
                                <li class="list_con_a">01 注册加薪猫</li>\
                                <li class="list_con_b">02 购买天添利</li>\
                                <li class="list_con_c">03 收益率按天增涨</li>\
                                <li class="list_con_d">04 随时可赎</li>\
                            </ul>\
                        </div>\
                    </div>\
                </div>\
                <div class="action">\
                    <ul class="action_list">\
                        <li><input type="button" value="购买" class="action_buy <%if(getTtlProperty.isCanBuy!=1){%> lock<% } %>" id="action_buy" /></li>\
                        <li><input type="button" value="赎回" class="action_redem <%if(getTtlProperty.isCanRedeem!=1){%> lock<% } %>" id="action_redem" /></li>\
                    </ul>\
                </div>\
            </div>\
        </article>';

    module.exports = tpl;
})
