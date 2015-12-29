define(function (require, exports, module) {
    var tpl = '<%if(show){%><article class="mod_page mod_list js_list"><%}%>\
                <div class="new_active" >\
	12月全民邀请争霸赛 <a href="javascript:void(0)"style="color:#f60;" class="js_situation">查看详情</a>\
	</div>\
                <div class="mod_listing">\
                    <%if(show){%><h2 class="hd_title"><span>每天10点，优质放送 </span></h2><%}%>\
                    <%if(showhistory){%><h2 class="hd_title js_history_title"><span>历史优质产品</span></h2><%}%>\
                    <ul class="listing js_listing" data-history="<%=showhistory%>">\
                        <%_.each(items, function(item){%>\
                            <li id="<%=item.productNo%>" class="<%if(item.productSubject!=00){%>skin_<%=item.productSubject%><%}else{%>item<%}%> js_list_item"  data-time="<%=item.saleStartTime%>" data-sale="<%=item.saleStatus%>">\
                                <%=showTag(item.incomeType,item.isForNew,item.investDeadline,item.saleStartTime,item.productTag) %><h3 class="item_title"><%if(item.productName.length <=20){%><%=item.productName%><%}else{%><%=item.productName.substr(0,20)%>...<%}%></h3>\
                                    <%if(item.productSubject!=00){%>\
                                        <div class="img_<%=item.productSubject%>"></div>\
                                       <%}%>\
                                       <%if(item.productSource==01){%>\
                                       <div class="logo_ZX"></div>\
                                    <%}%>\
                                    <div class="item_cont v_item">\
                                    <div class="v_item_hd"><span class="v_item_title webtxt" style="position:relative"><%=comeType(item.incomeType, item.incomeRateCeiling, item.activityIncomeRate, item.incomeRateFloor)%><%if(item.incomeType != "03"&&item.incomeType != "02"){%><i class="unit">%</i><%}%><%if(item.incomeType == "02"){%><i class="unit">%</i><%}%></span><span class="v_item_cont">预期年化收益</span></div>\
                                    <%if(!_.isNull(item.investDeadline)){%><div class="v_item_hd dd" ><span class="v_item_title" ><i class="webtxt" style="color:#d34013; font-size:2rem"><%=item.investDeadline%></i></span><span class="v_item_cont" >投资期限</span></div><%}%>\
                                    <%if(!_.isNull(item.minInvestAmount)){%><div class="v_item_bd"><span class="v_item_title"><i class="webtxt"><%=item.minInvestAmount%></i></span><span class="v_item_cont">起投金额</span></div><%}%>\
                                    <%if(!showhistory && !_.isNull(item.surplusAmount)){%><div class="v_item_bd"><span class="v_item_title"><i class="webtxt"><%=item.surplusAmount%></i></span><span class="v_item_cont">剩余可投</span></div>\
                                    <%}else if(showhistory && !_.isNull(item.saledAmount)){%><div class="v_item_bd"><span class="v_item_title"><i class="webtxt"><%=item.saledAmount%></i></span><span class="v_item_cont">累计投资</span></div><%}%>\
                                </div>\
                                <%if(!showhistory){%><div class="item_progress js_progress"><i class="progress" style="width:<%=item.progressRate*100%>%;"></i></div><%}else{%><%=noProgress%><%}%>\
                                <div class="item_status v_item">\
                                    <%if(item.saleStatus == "1"){%>\
                                        <div class="v_item_hd js_list_time">距离购买结束：<%=item.getSaleEndString%></div>\
                                        <div class="v_item_bd js_list_btn"><span class="btn_link btn_link1">立即投资</span></div>\
                                    <%}else if(item.saleStatus == "2"){%>\
                                        <div class="v_item_hd js_list_time">距离购买开始：<%=item.getSaleStartString%></div>\
                                        <div class="v_item_bd js_list_btn"><span class="btn_link btn_link3">即将开始</span></div>\
                                     <%}else{%>\
                                        <div class="v_item_hd js_list_time">购买结束时间：<%=cutTime(item.saleEndTime)%></div>\
                                        <div class="v_item_bd js_list_btn"><span class="btn_link btn_link2"><%=item.btnText%></span></div>\
                                    <%}%>\
                                </div>\
                            </li>\
                        <%})%>\
                    </ul>\
                </div>\
        <%if(show){%><p class="js_loading" style="padding:10px 0 60px 0;text-align:center;color:#898989;display:none">加载中...</p></article><%}%>';
    module.exports = tpl;
})
