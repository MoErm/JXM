define(function (require, exports, module) {
    var tpl = '<div class="investDetail">\
        <div class="text_1"> <div \
       <%if(orderStatus=="01"||orderStatus=="04"||orderStatus=="05"||orderStatus=="11"||orderStatus=="12"||orderStatus=="14"){%>class="text_stats"<%}else{%>class="text_stats_fail"<%}%>>\
     \
       <%=orderStatusDesc%></div>  <h4 class="text_1_title"><%=productName%>（<%=investPeriod%>期）</h4>\
    <p>订单编号：</p><p><%=orderNo%></p><br/>\
    <p>创建时间：</p><p><%=createTime%></p>\
    </div>\
    <div class="text_2">\
    <div><h4 class="text_2_title">回款信息</h4>\
         <%if(orderStatus=="05"||orderStatus=="11"||orderStatus=="12"){%>\
         <ul>\
        <li><span>下一次回款日：<%=nextRetDate%></span></li>\
    <li><span>下一次回款金额：<%=nextRetAmount%></span></li>\
    <li><span>已累计回款：<%=totalReturnedAmount%></span></li>\
    </ul>\
        <%}else if(orderStatus=="14"){%>\
         <ul>\
    <li><span>已累计回款：<%=totalReturnedAmount%></span></li>\
    </ul>\
        <%}else if(orderStatus=="01"){%>\
        <div class="investDetail_fail"><i class="gantan"></i>付款成功后，即可随时查询产品存续信息</div>\
        <%}else if(orderStatus=="03"){%>\
        <div class="investDetail_fail"><i class="gantan"></i>由于您在该笔订单支付过程中创建了另一笔支付订单，该笔订单已被强制关闭</div>\
        <%}else if(orderStatus=="07"){%>\
        <div class="investDetail_fail"><i class="gantan"></i>由于您在时限内未完成支付，该笔订单被强制关闭</div>\
        <%}else {%>\
        <div class="investDetail_fail"><i class="gantan"></i><%=orderStatusReason%></div>\
        <%}%>\
    </div>\
    </div>\
    <div class="text_2 text_bottom">\
        <h4 class="text_2_title">订单信息</h4>\
        <ul>\
        <li><span>投资金额：<%=investAmount%></span></li>\
    <li><span>预期年化：<%=expectIncomeRate%></span></li>\
    <li><span>投资期限：<%=investPeriod%>期</span></li>\
    <li><span>购买日：<%=purchaseDate%></span></li>\
    <li><span>回款日：每月<%=returnedDate%>日（3个工作日内到帐）</span></li>\
    <li><span>月回款金额：<%=monthlyRetAmount%></span></li>\
    <li><span>首月回款金额：<%=firstRetAmount%></span></li>\
    <li><span>到期日：<%=dueDate%></span></li>\
    </ul>\
    </div>\
    <%if(orderStatus=="05"||orderStatus=="11"||orderStatus=="12"||orderStatus=="14"){%>\
       <div class="investDetail_fixed_1"><div class="huikuan" >回款计划</div></div>\
    <%}else if(orderStatus=="01"){%>\
       <div class="investDetail_fixed_2"><div class="huikuan"><p>请在<span id="investDetail_CD">-分-秒</span>内完成支付</p></div><div class="zhifu" >立即支付</div></div>\
    <%}%>\
    </div>';
    module.exports = tpl;
})
