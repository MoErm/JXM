define(function(require, exports, module) {
    var tpl = '<article class="mod_index">\
        <section class="page_box"">\
    <div class="mod_focus">\
        <div class="img_box">\
        </div>\
    </div>\
    <div class="mod_advantage">\
        <h2>为什么选择加薪猫理财？</h2>\
    <ul class="advantage_list">\
        <li>\
        <h3 class="index_icon_1">稀缺之选</h3>\
        <p>甄选顶级投资项目</p>\
        <p>仅需1,000元起投，便可尊享银行顶级投资产品</p>\
    </li>\
    <li>\
    <h3 class="index_icon_2">信任之选</h3>\
        <p>行业顶级投研团队筛选精品投资项目</p>\
        <p>中伦律所提供常年法律顾问,中信银行360度资金监管</p>\
    </li>\
    <li>\
    <h3 class="index_icon_3">财富之选</h3>\
        <p>平均年化收益12%，</p>\
    <p>银行活期的35倍，宝宝类的3倍</p>\
    </li>\
    </ul>\
    </div>\
    </section>\
    <section class="page_box"">\
    <div class="mod_superior">\
        <h2>加薪猫理财全明星产品介绍</h2>\
    <ul class="superior_list">\
        <li class="v_mod">\
        <div class="v_item">\
        <div class="v_item_hd"><span class="v_item_title">新手</span><span class="v_item_cont">专享产品</span></div>\
    <div class="v_item_bd"><span class="v_item_title"><span class="webtxt">9.0%</span></span><span class="v_item_cont">预期年化</span></div>\
    <div class="v_item_bd"><span class="v_item_title">1000<span class="unit">元</span></span><span class="v_item_cont">起投金额</span></div>\
    </div>\
    <div class="tips type1">为首次投资者精选定制，7天超短投资期限，每天早10:00准时限量开放购买。</div>\
    </li>\
    <li class="v_mod">\
        <div class="v_item">\
        <div class="v_item_hd"><span class="v_item_title">固定</span><span class="v_item_cont">预期年化收益</span></div>\
    <div class="v_item_bd"><span class="v_item_title"><span class="webtxt">7.0~13.0%</span></span><span class="v_item_cont">预期年化</span></div>\
    <div class="v_item_bd"><span class="v_item_title">1000<span class="unit">元</span></span><span class="v_item_cont">起投金额</span></div>\
    </div>\
    <div class="tips type2">T+0起息，银行VIP顶级投资产品，收益高且稳健，迄今本息100%安全兑付</div>\
    </li>\
        <div class="v_item">\
        <div class="v_item_hd"><span class="v_item_title">浮动</span><span class="v_item_cont">预期年化收益</span></div>\
    <div class="v_item_bd"><span class="v_item_title"><span class="webtxt">最高10倍</span></span><span class="v_item_cont">预期年化</span></div>\
    <div class="v_item_bd"><span class="v_item_title">1<span class="unit">万元</span></span><span class="v_item_cont">起投金额</span></div>\
    </div>\
    <div class="tips type3">行业顶级稀缺基金。收益可无限放大至无上限，但也可能出现亏损。</div>\
    </li>\
    </ul>\
    </div>\
    <div class="mod_process">\
        <h2>操作流程</h2>\
        <div class="process_list">\
        <ul>\
        <li class="index_process_1">手机注册</li>\
        <li class="index_process_2">绑定银行卡</li>\
        <li class="index_process_3">购买产品</li>\
        <li class="index_process_4">到期获得收益</li>\
        </ul>\
        </div>\
        </div>\
        </section>\
        <section class="page_box">\
        <div class="mod_staffers">\
        <h2>顶级投研团队介绍</h2>\
        <ul class="staffers_list">\
        <li>\
        <h3><span class="name">肖光伟</span><span class="grade">董事长</span></h3>\
    <span class="photos"><img src="images/img142x142_1.jpg" width="72" alt=""></span>\
        <p class="summary">原民生银行公司部总经理，工商企业金融事业部上海区域总裁,上海分行行长助理。</p>\
    <p class="summary">具有30年以上银行及金融行业从业经验。</p>\
    </li>\
    <li>\
    <h3><span class="name">杨  炯</span><span class="grade">&nbsp&nbsp&nbsp金融创新专家</span></h3>\
    <span class="photos"><img src="images/img142x142_2.jpg" width="72" alt=""></span>\
     <p class="summary">历任诺亚财富创新条线总监、上交所衍生品研发主管、永安期货宏观策略分析师。金融从业逾20年，拥有计算机和金融专业双硕士。</p>\
    </li>\
    <li>\
    <h3><span class="name">冯  斌</span><span class="grade">&nbsp&nbsp&nbsp投资理财专家</span></h3>\
    <span class="photos"><img src="images/img142x142_4.jpg" width="72" alt=""></span>\
        <p class="summary">原交通银行私人银行顾问。</p>\
        <p class="summary">交银国际信托财富管理部副总经理。</p>\
        <p class="summary">上银资产管理有限公司董事总经理。</p>\
        </li>\
        </ul>\
        </div>\
        <footer class="foot_copyright">\
        <div class="fixed">\
        <p class="security">账户资金安全由银行和第三方支付公司共同保障</p>\
        <p class="copyright">&copy;2015 加薪猫 jiaxinmore.com</p>\
    </div>\
    </footer>\
    </section>\
    </article>\
    <footer class="foot_index">\
        <div class="fixed opacity">\
        <div class="btn_box"> <a href="#" class="btn_link btn_link1"id="js_immediate_reg">5秒立即完成注册</a> </div>\
    <p class="other">已有账号？<a href="#" class="weblink" id="js_immediate_login">立即登录</a></p>\
    </div>\
    </footer>'

    module.exports = tpl;

})
