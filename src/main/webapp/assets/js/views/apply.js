define(['jquery', 'underscore', 'backbone', 'helpers/load', 'config'], function($, _, Backbone, loadHelper, config) {
    var app = config.app;
    var ApplyView = Backbone.View.extend({
        el: "",
        template: "",
        initialize: function(){
            this.listenTo(this, "change:template", this.render);
            this.loadHtml();

            return this;
        },
        events: {
            "click table a" : "create"
        },

        render: function(){

            this.$el.html(this.template);
            $(window.document.body).animate({scrollTop:0}, '500', 'swing');

            return this;
        },
        // 翻页控制
        create: function(el){
            var href = el.target.href;
            config.app.workspace.navigate('merchant/create?'+ href.split("?")[1], {
                trigger: true
            });
            return false;
        },
        loadHtml: function(query){

            var that = this;
            if(!query){
                query = "";
            }else{
                query = "?" + query;
            }
            loadHelper.html({
                url: app.baseUrl + "/apply" + query
            }).done(function(html){
                that.template = html;
                that.trigger("change:template");
            });
        }
    });

    return ApplyView;
});