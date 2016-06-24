define(function (require, exports, module) {
    var tpl = '<article class="mod_user_center ">\
    <div class="business_container">\
        <div class="div_both" >\
            <span>预期年化收益率</span>\
            <span class="showRate"><%=incomeRate%></span>\
        </div>\
        <div class="div_bottom">\
                <span class="time_span">投资期限</span>\
                <span class="time_select_span">\
                <% _.each(investPeriods, function(item){%>\
                <div <%if(item.isUsable==1){%>class="time_select"<%}else{%>class="time_disable"<%}%> data-code="<%=item.periodCode%>" ><%=item.periodName%></div>\
                <%})%>\
            </span>\
        </div>\
    <div class="div_bottom">\
        <span>投资金额</span>\
        <span><input type="text" placeholder="<%=minInvestAmount%>元起投，<%=additionalAmount%>元递增" maxLength="9" id="totalAmount"/>元</span>\
        </div>\
        <div class="div_bottom">\
        <span>月回款金额</span>\
        <span><input type="text" placeholder="大于等于<%=minMonthlyRetAmount%>元"  maxLength="9" id="monthAmount"/>元</span>\
        </div>\
        <div class="div_bottom">\
        <span>首月回款金额</span>\
        <span><input type="text" placeholder="大于等于<%=minFirstRetAmount%>元"  maxLength="9" id="firstAmount"/>元</span>\
        </div>\
        <div class="div_bottom">\
        <span>回款日</span>\
        <span><select id="dateSelect" style="width: 100%" >\
             <% _.each(dates, function(date){%>\
             <option value="<%=date%>"><%=date%></option>\
         <%})%>\
    </select></span>\
    </div>\
    <div class="div_top">\
        <span>首次回款日</span>\
        <span id="firstRetDate"></span>\
        </div>\
        <div class="div_both">\
        <span>预期净收益</span>\
        <span id="expectIncome">元</span>\
    </div>\
    <div class="div_bottom">\
        <span>月回款计划</span>\
        <span class="goldFont" id="showDetail">查看详情</span>\
        </div>\
        <div class="div_top div_bottom">\
        <span>销售员编号</span>\
        <span><input type="text" placeholder="必填" id="salesCode"/></span>\
        </div>\
        <button class="btn" id="toBuy">确认投资</button>\
    <p class="tips">我已阅读并同意<a id="xieYi">《债权转让服务协议》</a></p>\
    <div class="same_card_tip">\
        <h2 class="tip_head"><div class="text">Tips</div><em class="line"></em></h2>\
        <em class="tip_icon"></em>\
        <div class="tip_text">\
        <p>建议设置还贷日提前三个工作日为您的回款日；</p>\
    <p >回款日后0~3个工作日到账。</p>\
    </div>\
    </div>\
    </div>\
                </article>';
    module.exports = tpl;
})
