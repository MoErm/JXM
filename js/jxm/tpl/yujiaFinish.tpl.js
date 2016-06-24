define(function (require, exports, module) {
    var tpl = '<article >\
                    <div id="finishPage">\
        <div class="finish_success">\
        <p class="finish_txt1 font12">成功支付{this.state.investAmount}</p>\
    <p class="finish_txt2 font8">{this.state.purchaseDate}</p>\
    </div>\
    <div class="finish_success">\
        <p class="finish_txt3 font12">首次回款{jsTools.fmtMoney(this.state.firstRetAmount)}</p>\
    <p class="finish_txt4 font8">{this.state.firstRetDate}</p>\
    </div>\
    <div class="finish_orderInfo font10">\
        <p>订单编号：</p><p>{this.state.orderNo}</p><br/>\
    <p>创建时间：</p><p>{this.state.createTime}</p>\
    </div>\
    <div class="finish_detail font10">\
        <span><p>投资金额：</p><p>{this.state.investAmount}</p></span>\
    <span><p>预期年化：</p><p>{this.state.expectIncomeRate}</p></span>\
    <span><p>投资期限：</p><p>{this.state.investPeriod}</p></span>\
    <span><p>购买日：</p><p>{this.state.purchaseDate}</p></span>\
    <span><p>回款日：</p><p>{"每月"+this.state.monthlyRetDate+"日（3个工作日内到帐）"}</p></span>\
    <span><p>月回款金额：</p><p>{jsTools.fmtMoney(this.state.monthlyRetAmount)}</p></span>\
    <span><p>首月回款金额：</p><p>{jsTools.fmtMoney(this.state.firstRetAmount)}</p></span>\
    <span><p>到期日：</p><p>{this.state.dueDate}</p></span>\
    </div>\
    </div>\
                </article>';
    module.exports = tpl;
})
