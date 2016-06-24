define(function (require, exports, module) {
    var tpl = '\
  <div class="list_select_box">\
       <div class="select_left selected" id="jiaxin">加薪系列</div>\
       <div class="select_right" id="yujia">御驾系列</div>\
  </div>\
  <div id="jiaxinList"  <%if(!showhistory){%>style="padding-top:51px"<%}%>>\
    <%if(show){%><article class="mod_page mod_list js_list"><%}%>\
                <div class="mod_listing">\
                    <%if(show){%><h2 class="hd_title"><span>每天10点，优质放送 </span></h2>\
                    <div id="titletest" style="display:none"></div><%}%>\
                    <%if(showhistory){%><h2 class="hd_title js_history_title"><span>历史优质产品</span></h2><%}%>\
                    <ul class="listing js_listing" data-history="<%=showhistory%>">\
                        <%_.each(items, function(item){%>\
                            <li id="<%=item.productNo%>" class="<%if(item.productSubject!=00){%>skin_<%=item.productSubject%><%}else{%>item<%}%> js_list_item"  data-time="<%=item.saleStartTime%>" data-sale="<%=item.saleStatus%>">\
                                <%=showTag(item.incomeType,item.isForNew,item.investDeadline,item.saleStartTime,item.productTag) %>\
                                <h3 class="item_title"><%if(item.productName.length <=20){%><%=item.productName%><%}else{%><%=item.productName.substr(0,20)%>...<%}%></h3>\
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
                                     <%}else if(item.saleStatus == "8"){%>\
                                        <div class="v_item_hd js_list_time">距离购买结束：<%=item.getSaleStartString%></div>\
                                        <div class="v_item_bd js_list_btn"><span class="btn_link btn_link2">还有机会</span></div>\
                                     <%}else{%>\
                                        <div class="v_item_hd js_list_time">购买结束时间：<%=cutTime(item.saleEndTime)%></div>\
                                        <div class="v_item_bd js_list_btn"><span class="btn_link btn_link2"><%=item.btnText%></span></div>\
                                    <%}%>\
                                </div>\
                            </li>\
                        <%})%>\
                    </ul>\
                </div>\
                \
        <%if(show){%><p class="js_loading" style="padding:10px 0 60px 0;text-align:center;color:#898989;display:none">加载中...</p></article><%}%>\
        </div>\
        <%if(yujiaFlag){%>\
        <div id="yujiaList">\
        <section class="recommend">\
        <div class="recommend_t">\
            <div class="part_one">\
                <ul class="part_list">\
                    <li class="part_l">\
                    <p class="sub_head">5万元</p>\
                    <p class="sub_title">起投金额</p>\
                    </li>\
                    <li class="part_m">\
                        <div class="part_m_box">\
                            <p class="sub_title">预期年化收益率</p>\
                            <p class="sub_head">11%</p>\
                        </div>\
                    </li>\
                    <li class="part_r">\
                         <p class="sub_head">12/18/24/36</p>\
                        <p class="sub_title">投资期限(月)</p>\
                    </li>\
                </ul>\
            </div>\
        <div class="part_two">\
            <ul class="part_list">\
                <li class="part_l">\
                <em></em>\
                <p>期限灵活</p>\
                </li>\
                <li class="part_m">\
                <em></em>\
                <p>固定收益</p>\
                </li>\
                <li class="part_r">\
                <em></em>\
                <p>方便省心</p>\
                </li>\
            </ul>\
        </div>\
        <div class="recommend_b">\
            <div class="part_one">\
                <h2 class="sub_head">核心价值</h2>\
                <p class="sub_text">御驾1号是加薪猫推出的一款以多种回收期数，对接不同的银行/金融公司债权的回款方式，实现每月整体收益至少覆盖购车贷款金额的,以金融产品养车为目的的购车理财模式。</p>\
            </div>\
            <div class="part_two">\
                <h2 class="sub_head">回款模式</h2>\
                <p class="sub_text">5万元起，整万元累加。投资期限可选12、18、24、36个自然月为期数，完善您的资产配置需求。回收日期可选每月中指定的任意一天，回收资金更加灵活。每月固定收益，真正做到以金融的杠杆实现购车无压力，非常适合每月有车贷等固定资金需求的人群。</p>\
            </div>\
            <div class="part_three">\
                <h2 class="sub_head">适用人群</h2>\
                <p class="sub_text">适用于有5万元以上闲置资金的理财人群，将资金最大程度利用起来。将每月固定收益偿还银行贷款，实现财务自由支配及资产盈余的人群。</p>\
            </div>\
        </div>\
        \
    </section>\
    <footer class="foot_copyright foot_btns">\
                <div >\
                    <div class="btn_link btn_link2">\
                        <p class="btn_txt js_buy_yujia">立即购买</p>\
                        <p class="security">账户资金安全由银行和第三方支付公司共同保障</p>\
                    </div>\
                </div>\
        </footer>\
        <%}%>';
    module.exports = tpl;
})

//<%if(notice){%><div class="new_active" >\
//12月全民邀请争霸赛 <a href="javascript:void(0)"style="color:#f60;" class="js_situation">查看详情</a>\
//</div><%}%>