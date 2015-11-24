define(function (require, exports, module) {
    var tpl = '<article class="mod_page page_invest">\
                    <ul class="listing">\
                        <li class="item">\
                            <%=showTag(incomeType,isForNew,investDeadline)%><h3 class="item_title"><%if(productName.length <=20){%><%=productName%><%}else{%><%=productName.substr(0,20)%>...<%}%></h3>\
                                <div class="item_cont v_item">\
                                    <div class="v_item_hd"><span class="v_item_title webtxt"><%if(incomeType != "03"){%><%=comeType(incomeType, incomeRateCeiling, activityIncomeRate, incomeRateFloor)%><i class="unit">%</i><%}else{%>浮动<%}%></span><span class="v_item_cont">预期年化收益</span></div>\
                                     <%if(!_.isNull(investDeadline)){%><div class="v_item_hd dd"><span class="v_item_title"><i class="webtxt" style="color:#d34013; font-size:2rem"><%=investDeadline%></i></span><span class="v_item_cont">投资期限</span></div><%}%>\
                                    <%if(!_.isNull(minInvestAmount)){%><div class="v_item_bd"><span class="v_item_title"><i class="webtxt"><%=minInvestAmount%></i></span><span class="v_item_cont">起投金额</span></div><%}%>\
                                    <%if(history && !_.isNull(surplusAmount)){%><div class="v_item_bd"><span class="v_item_title"><i class="webtxt"><%=surplusAmount%></i></span><span class="v_item_cont">剩余可投</span></div>\
                                    <%}else if(!history  && !_.isNull(saledAmount)){%><div class="v_item_bd"><span class="v_item_title"><i class="webtxt"><%=saledAmount%></i></span><span class="v_item_cont">累计投资</span></div><%}%>\
                                </div>\
                                <%if(history){%><div class="item_progress js_progress"><i class="progress" style="width:<%=progressRate*100%>%"></i></div><%}else{%><%=noProgress%><%}%>\
                                <div class="item_status v_item">\
                                <div class="v_item_hd js_status">\
                                    <%if(saleStatus == 1){%>距离购买结束：<%=getSaleEndString%>\
                                    <%}else if(saleStatus == 2){%>距离购买开始：<%=getSaleStartString%>\
                                    <%}else{%>购买结束时间：<%=cutTime(saleEndTime)%><%}%>\
                                </div>\
                                <%if(purchaseCount){%><div class="v_item_bd"><%=purchaseCount%>人已购买</div><%}%>\
                            </div>\
                        </li>\
                    </ul>\
                    <%if(investLight){%>\
                        <div class="v_mod invest_tips">\
                            <p class="txt"><%=investLight%></p>\
                        </div>\
                    <%}%>\
                    <div class="v_mod mod_invest_info">\
                        <h3 class="hd_title">基本信息</h3>\
                        <ul class="list">\
                            <%if(totalAmount){%>\
                                <li class="item">\
                                    <div class="v_item">\
                                        <div class="v_item_hd">产品总额</div>\
                                        <div class="v_item_bd"><%=totalAmount%></div>\
                                    </div>\
                                </li>\
                            <%}%>\
                            <%if(incomeType == "03"){%>\
                            <%if(fundCustodian){%>\
                                <li class="item">\
                                    <div class="v_item">\
                                        <div class="v_item_hd">基金管理人</div>\
                                        <div class="v_item_bd"><%=fundCustodian%></div>\
                                    </div>\
                                </li>\
                            <%}%>\
                            <%if(historyPerformance){%>\
                                <li class="item">\
                                    <div class="v_item">\
                                        <div class="v_item_hd">历史业绩</div>\
                                        <div class="v_item_bd"><%=historyPerformance%></div>\
                                    </div>\
                                </li>\
                            <%}%>\
                            <%if(redeemMode){%>\
                                <li class="item">\
                                    <div class="v_item">\
                                        <div class="v_item_hd">赎回方式</div>\
                                        <div class="v_item_bd"><%=redeemMode%></div>\
                                    </div>\
                                </li>\
                            <%}%>\
                            <%if(bonusMode){%>\
                                <li class="item">\
                                    <div class="v_item">\
                                        <div class="v_item_hd">分红方式</div>\
                                        <div class="v_item_bd"><%=bonusMode%></div>\
                                    </div>\
                                </li>\
                            <%}%>\
                            <%}else{%>\
                              <%if(fundCustodian){%>\
                                <li class="item">\
                                    <div class="v_item">\
                                        <div class="v_item_hd">基金管理人</div>\
                                        <div class="v_item_bd"><%=fundCustodian%></div>\
                                    </div>\
                                </li>\
                            <%}%>\
                            <%if(valueDate){%>\
                                <li class="item">\
                                    <div class="v_item">\
                                        <div class="v_item_hd">起息日期</div>\
                                        <div class="v_item_bd"><%=valueDate%></div>\
                                    </div>\
                                </li>\
                            <%}%>\
                             <%if(expectedExpiringDate){%>\
                                <li class="item">\
                                    <div class="v_item">\
                                        <div class="v_item_hd">预计到期日</div>\
                                        <div class="v_item_bd"><%=expectedExpiringDate%></div>\
                                    </div>\
                                </li>\
                            <%}%>\
                            <li class="item">\
                                    <div class="v_item">\
                                        <div class="v_item_hd">是否可提前结束</div>\
                                        <div class="v_item_bd"><%if(canFinishedEarly == "1"){%>是<%}else{%>否<%}%></div>\
                                    </div>\
                            </li>\
                            <%if(repaymentMode){%>\
                                <li class="item">\
                                    <div class="v_item">\
                                        <div class="v_item_hd">还款方式</div>\
                                        <div class="v_item_bd"><%=repaymentMode%></div>\
                                    </div>\
                                </li>\
                            <%}%>\
                           <%}%>\
                              <%if(investFactorage){%>\
                                <li class="item">\
                                    <div class="v_item">\
                                        <div class="v_item_hd">投资手续费</div>\
                                        <div class="v_item_bd"><%=investFactorage%></div>\
                                    </div>\
                                </li>\
                            <%}%>\
                        </ul>\
                    </div>\
                    <div class="js_content" style="<%if(isShow){%>display:none<%}%>">\
                    <div class="mod_top_tabs js_tabs">\
                        <div class="tabs_handle tabs_col3 js_tab">\
                            <%if(productDetail){%><div class="tabs_item">产品详情</div><%}%>\
                            <%if(riskControll){%><div class="tabs_item">风险控制</div><%}%>\
                            <div class="tabs_item <%if(!isShow){%>js_investHistory<%}%>">投资历史</div>\
                            <i class="slide_border"></i>\
                        </div>\
                    </div>\
                    <div class="v_mod tabs_con mod_details" style="min-height:150px">\
                    <%if(productDetail){%>\
                        <div class="mod_pro_detail js_explain" style="margin-top:20px">\
                            <%if(typeof images!="undefined"){%>\
                             <%_.each(images, function(item){%>\
                                <img src="<%=item.imagePath%>" width="100%"/>\
                             <%})%>\
                             <%}%>\
                            <div><%=productDetail%></div>\
                        </div>\
                    <%}%>\
                    <%if(riskControll){%>\
                        <div class="mod_venture js_explain" style="margin-top:20px;display:none">\
                            <div><%=riskControll%></div>\
                        </div>\
                    <%}%>\
                    <div class="mod_invest js_explain js_history" style="margin-top:20px;display:none"><p style="text-align:center">加载中...</p></div>\
                </div>\
            </div>\
            </article>\
            <footer class="foot_copyright foot_btns">\
                <div class="fixed">\
                    <div class="btn_link js_buy <%if(saleStatus == 1){%>btn_link2<%}else if(saleStatus == 2){%> btn_link3 <%}else{%>btn_link1<%}%>">\
                        <p class="btn_txt js_btn_name"><%=btnStatus(saleStatus)%></p>\
                        <p class="security">账户资金安全由银行和第三方支付公司共同保障</p>\
                    </div>\
                </div>\
        </footer>';
    module.exports = tpl;
})
