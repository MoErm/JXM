define([], function () {
    var initStore=function(opts){
        var store = App.Util.LocalStorage.extend(opts);
        return store;
    }
    var Store = {
        loginStore: initStore({
            key: 'S_JXM_LOGIN_STATUS',
            lifeTime: '7D'
        }),
        bonusStore: initStore({
            key: 'S_JXM_BONUS_STATUS',
            lifeTime: '7D'
        }),
        productLink: initStore({
            key: 'S_JXM_PRODUCT_LINK',
            lifeTime: '1D'
        })
    };
    return Store;
});