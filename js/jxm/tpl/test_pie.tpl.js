define(function (require, exports, module) {
    var tpl = '\
    <article class="monthBill" style="" >\
                    <div class="billName"><span style="width: 40%;"><p style="padding: 10px">亲爱的小薪薪</p></span><span style="width: 60%;text-align: right;"><p style="padding: 10px">2015年8月1日-2015年8月31日</p></span></div>\
                    \
                        <div class="tradeTotal">\
                        <div class="tradeTotal_1" >总在投金额(元)\
                        <p>123456.00</p></div>\
                        \
                        <div class="tradeTotal_2" >预期收益(元)\
                        <p>123456.00</p></div>\
                        </div>\
                    \
                    <div class="tradeAmount">\
                    <p style="color:#4f4f4f;">8月已获收益：1234.00元</p>\
                    <p>8月回款金额：1234.00元</p>\
                    <p>8月投资总额：1234.00元</p>\
                    </div>\
                    <div class="tradeTitle"  >8月投资往来</div>\
                    <div class="tradeListTitle">\
                    <span style="width: 13%">时间</span>\
                    <span style="width: 13%">交易类型</span>\
                    <span style="width: 15%;">投资(元)</span>\
                    <span style="width: 15%;">到账(元)</span>\
                    <span style="width: 34%">备注</span>\
                    </div>\
                    <div class="tradeList " >\
                    <span style="width: 13%">2015.8.18</span>\
                    <span style="width: 13%">投资放款</span>\
                    <span style="width: 15%;color: #029ecb">-100000.00</span>\
                    <span style="width: 15%;color: #d01b02">+100000.00</span>\
                    <span style="width: 34%">新手产品<br>单号：0000000154020412</span>\
                   </div>\
                   <div class="tradeList gray" >\
                    <span style="width: 13%">2015.8.18</span>\
                    <span style="width: 13%">投资放款</span>\
                    <span style="width: 15%;color: #029ecb">-100000.00</span>\
                    <span style="width: 15%;color: #d01b02">+100000.00</span>\
                    <span style="width: 34%">新手产品<br>单号：0000000154020412</span>\
                   </div>\
                   <div class="tradeList " >\
                    <span style="width: 13%">2015.8.18</span>\
                    <span style="width: 13%">投资放款</span>\
                    <span style="width: 15%;color: #029ecb">-100000.00</span>\
                    <span style="width: 15%;color: #d01b02">+100000.00</span>\
                    <span style="width: 34%">新手产品<br>单号：0000000154020412</span>\
                   </div>\
                   <div class="tradeMore"  >查看更多</div>\
                   <div class="tradeTitle" style="border-bottom: 1px solid #f2f2f2">8月投资比例</div>\
                    <div id="main" style="height:300px;"></div>\
                   <div class="tradeTitle"  >近期回款计划如下</div>\
                </article>';
    module.exports = tpl;
})
