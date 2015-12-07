window.global_config = {
    "ver": "${version}",
    "router": {
        "root": '/',
        "pushState": false
    },
    "modules": [{
            "url": "",
            "controller": "index",
            "showLoading": true
        },
        {
            "url": "index(/:id)",
            "controller": "index"
        }, {
            "url": "reg",
            "controller": "reg"
        },
        {
            "url": "regYY",
            "controller": "regYY"
        },
        {
            "url": "login",
            "controller": "login"
        },
        {
            "url": "get_password",
            "controller": "get_password"
        }, {
            "url": "list",
            "controller": "list"
        }, {
            "url": "listForApp",
            "controller": "listForApp"
        }, {
            "url": "detail",
            "controller": "detail"
        },
        {
            "url": "setting",
            "controller": "setting"
        },
        {
            "url": "change_password",
            "controller": "change_password"
        },
        {
            "url": "translate_password",
            "controller": "translate_password"
        },
        {
            "url": "forget_password",
            "controller": "forget_password"
        },
        {
            "url": "forget_password_tips",
            "controller": "forget_password_tips"
        },
        {
            "url": "account",
            "controller": "account"
        },
        {
            "url": "my_invest",
            "controller": "my_invest"
        },
        {
            "url": "my_invest_record",
            "controller": "my_invest_record"
        },
        {
            "url": "my_invite",
            "controller": "my_invite"
        },
        {
            "url": "bonus",
            "controller": "bonus"
        },
        {
            "url": "bonusOpen",
            "controller": "bonusOpen"
        },
        {
            "url": "bonusExpired",
            "controller": "bonusExpired"
        },
        {
            "url": "my_wallet",
            "controller": "my_wallet"
        },

        {
            "url": "invest_history",
            "controller": "invest_history"
        },
        {
            "url": "detail_regular",
            "controller": "detail_regular"
        },
        {
            "url": "detail_float",
            "controller": "detail_float"
        },
        {
            "url": "bind_card_new",
            "controller": "bind_card_new"
        },
        {
            "url": "bind_card_new_step2",
            "controller": "bind_card_new_step2"
        },
        {
            "url": "bind_card_new_step3",
            "controller": "bind_card_new_step3"
        },
        {
            "url": "rebind_card_step3",
            "controller": "rebind_card_step3"
        },
        {
            "url": "rebind_card_step2",
            "controller": "rebind_card_step2"
        },
        {
            "url": "rebind_confirm_card",
            "controller": "rebind_confirm_card"
        },
        {
            "url": "amount_check",
            "controller": "amount_check"
        },
        {
            "url": "add_card",
            "controller": "add_card"
        },
        {
            "url": "bind_card",
            "controller": "bind_card"
        },
        {
            "url": "rebind_card",
            "controller": "rebind_card"
        },
        {
            "url": "confirm_card",
            "controller": "confirm_card"
        },
        {
            "url": "info_card",
            "controller": "info_card"
        },
        {
            "url": 'set_card_psw',
            'controller': 'set_card_psw'
        },
        {
            "url": "get_contract",
            "controller": "get_contract"
        },
        {
            "url": "invest_confirm",
            "controller": "invest_confirm"
        },
        {
            "url": "about_us",
            "controller": "about_us"
        },
        {
            "url": "bind",
            "controller": "bind"
        },
        {
            "url": "invest_finish_regular",
            "controller": "invest_finish_regular"
        },
        {
            "url": "invest_finish_float",
            "controller": "invest_finish_float"

        },
        {
            "url": "contract_one",
            "controller": "contract_one"
        },
        {
            "url": "contract_two",
            "controller": "contract_two"
        },
        {
            "url": "error",
            "controller": "error"
        },
        {
            "url": "test_pie",
            "controller": "test_pie"
        },
        {
            "url": "contract_three",
            "controller": "contract_three"
        },
        {
            "url": "redeem",
            "controller": "redeem"
        },
        {
            "url": "redemption",
            "controller": "redemption"
        },
        {
            "url": "redemption_finish",
            "controller": "redemption_finish"
        },  {
            "url": "redemption_detail",
            "controller": "redemption_detail"
        },
        {
            "url": "recommend",
            "controller": "recommend"
        }, {
            "url": "ttl_recommend",
            "controller": "ttl_recommend"
        }, {
            "url": "ttl_introduce",
            "controller": "ttl_introduce"
        }, {
            "url": "ttl_buy_one",
            "controller": "ttl_buy_one"
        }, {
            "url": "ttl_buy_two",
            "controller": "ttl_buy_two"
        }, {
            "url": "ttl_pay_test",
            "controller": "ttl_pay_test"
        }, {
            "url": "ttl_pay_success",
            "controller": "ttl_pay_success"}

    ],
    loader: requirejs
}

requirejs.config({
    baseUrl: "js",
    urlArgs: "v=${version}",
    paths: {
        'echarts': 'jxm/utils/echart',
        'echarts/chart/pie': 'jxm/utils/chart/pie',
        'echarts/chart/line': 'jxm/utils/chart/line',
        'hammer': 'jxm/utils/hammer',
        'login': 'jxm/views/login',
        'error': 'jxm/views/error',
        'index': 'jxm/views/index',
        'detail': 'jxm/views/detail',
        'list': 'jxm/views/list',
        'listForApp': 'jxm/views/listForApp',
        'reg': 'jxm/views/reg',
        'regYY': 'jxm/views/regYY',
        'get_password': 'jxm/views/get_password',
        'bind_card_new': 'jxm/views/bind_card_new',
        //        'bind_card_new_step2': 'jxm/views/bind_card_new_step2',
        //        'bind_card_new_step3': 'jxm/views/bind_card_new_step3',
        'rebind_card_step2': 'jxm/views/rebind_card_step2',
        'rebind_card_step3': 'jxm/views/rebind_card_step3',
        'rebind_confirm_card': 'jxm/views/rebind_confirm_card',
        //        'amount_check': 'jxm/views/amount_check',
        'setting': 'jxm/views/setting',
        'change_password': 'jxm/views/change_password',
        'translate_password': 'jxm/views/translate_password',
        'forget_password': 'jxm/views/forget_password',
        'forget_password_tips': 'jxm/views/forget_password_tips',
        'account': 'jxm/views/account',
        'my_invest': 'jxm/views/my_invest',
        'my_invest_record': 'jxm/views/my_invest_record',
        'bonus': 'jxm/views/bonus',
        'bonusOpen': 'jxm/views/bonusOpen',
        'bonusExpired': 'jxm/views/bonusExpired',
        'my_wallet': 'jxm/views/my_wallet',
        'my_invite': 'jxm/views/my_invite',
        'invest_history': 'jxm/views/invest_history',
        'detail_regular': 'jxm/views/detail_regular',
        'detail_float': 'jxm/views/detail_float',
        'add_card': 'jxm/views/add_card',
        'bind_card': 'jxm/views/bind_card',
        'confirm_card': 'jxm/views/confirm_card',
        'info_card': 'jxm/views/info_card',
        'set_card_psw': 'jxm/views/set_card_psw',
        'get_contract': 'jxm/views/get_contract',
        'invest_confirm': 'jxm/views/invest_confirm',
        'about_us': 'jxm/views/about_us',
        'bind': 'jxm/views/bind',
        'rebind_card': 'jxm/views/rebind_card',
        'invest_finish_regular': 'jxm/views/invest_finish_regular',
        'invest_finish_float': 'jxm/views/invest_finish_float',
        'test_pie': 'jxm/views/test_pie',
        'contract_one': 'jxm/views/contract_one',
        'contract_two': 'jxm/views/contract_two',
        'contract_three': 'jxm/views/contract_three',
        'redeem': 'jxm/views/redeem',
        'ttl_recommend': 'jxm/views/ttl_recommend',
        'ttl_introduce': 'jxm/views/ttl_introduce',
        'ttl_buy_one': 'jxm/views/ttl_buy_one',
        'ttl_buy_two': 'jxm/views/ttl_buy_two',
        'ttl_buy_three': 'jxm/views/ttl_buy_three',
        'ttl_pay_test': 'jxm/views/ttl_pay_test',
        'ttl_pay_success': 'jxm/views/ttl_pay_success',
        'redemption': 'jxm/views/redemption',
        'redemption_finish': 'jxm/views/redemption_finish',
        'redemption_detail': 'jxm/views/redemption_detail',
        'recommend':'jxm/views/recommend'
    }
})