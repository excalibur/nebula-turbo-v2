define(['jquery', 'underscore', 'backbone', 'helpers/load', 'config'], function($, _, Backbone, loadHelper, config) {
    var app = config.app;
    var DomainsView = Backbone.View.extend({
        el: "",
        template: "",
        initialize: function(){
            this.listenTo(this, "change:template", this.render);
            this.loadHtml();

            return this;
        },
        events: {
            "click .pager a" : "pagination",
            "click #query .btn" : "query"
        },

        render: function(){

            this.$el.html(this.template);
            $(window.document.body).animate({scrollTop:0}, '500', 'swing');

            return this;
        },
        // 查询
        query: function(el){

            var form = $(el.target).parents("form");
            this.loadHtml(form.serialize());
            return false;
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
                query = "";
            }else{
                query = "?" + query;
            }
            loadHelper.html({
                url: app.baseUrl + "/domains" + query
            }).done(function(html){
                that.template = html;
                that.trigger("change:template");
            });
        }
    });

    return DomainsView;
});