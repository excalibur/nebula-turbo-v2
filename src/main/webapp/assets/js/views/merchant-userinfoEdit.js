define(['jquery', 'underscore', 'backbone', 'helpers/load', 'config'], function($, _, Backbone, loadHelper, config) {
    var app = config.app;
    var AppkeyView = Backbone.View.extend({
        el: "",
        template: "",
        initialize: function(options){
            this.listenTo(this, "change:template", this.render);
            this.loadHtml(options.id);

            return this;
        },
        events: {
            "click .pager a" : "pagination"
        },

        render: function(){

            this.$el.html(this.template);
            $(window.document.body).animate({scrollTop:0}, '500', 'swing');

            return this;
        },

        // 翻页控制
        pagination: function(el){

            var href = el.target.href;
            this.loadHtml(href.split("?")[1]);

            return false;
        },
        loadHtml: function(query){

            var that = this;
            if(!query){
                return;
            }
            loadHelper.html({
                url: app.baseUrl + "/merchant/" + query + "/userinfo/edit"
            }).done(function(html){
                that.template = html;
                that.trigger("change:template");
            });
        }
    });

    return AppkeyView;
});