define(function (require, exports, module) {
    var newsAnnDetail = require('jxm/tpl/newsAnnDetail.tpl');
    var tool = require('jxm/utils/Tool');
    var handle = new tool();
    var model = require('jxm/model/model');
    var msgAnnouncement = new model.msgAnnouncement();
    var message = '网络错误，请稍后重试';
    var self;
    module.exports = App.Page.extend({
        afterMount: function () {
            self=this
            App.hideLoading()
        },
        onShow: function () {
            this.setHeader();
            var query = this.request.query;
            if(_.isUndefined(query) || _.isUndefined(query.annId)){
                App.goTo('my_invest');
                return;
            }
            this.initData(query.annId)

        },
        initData:function(annId){
            msgAnnouncement.exec({
                type: 'get',
                data:{
                    annId:annId
                },
                success: function(data){
                    if(data.ret == 0){
                        self.$el.html(_.template(newsAnnDetail)(data.data));
                      //$("#detail").html(data.data.annContent)
                      //$("#title").html(data.data.annTitle)
                    }else if(data.ret == 999001){
                        handle.goLogin();
                    }else{
                        App.showToast(data.msg );
                    }
                },
                error: function(){
                    App.hideLoading();
                    App.showToast(message);
                }
            })
        },
        setHeader: function () {
            var header = new App.UI.UIHeader();
            header.set({
                view: this,
                title: '平台公告',
                back: {
                    'tagname': 'back',
                    callback: function () {
                        App.goTo("news");
                    }
                },
                right: null
            });
        }
    })
})
