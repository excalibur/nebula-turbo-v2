define(['jquery', 'underscore', 'backbone', 'helpers/load', 'config'], function($, _, Backbone, loadHelper, config) {
    var app = config.app;
    var StatisticsConsumptionView = Backbone.View.extend({
        el: "",
        template: "",
        initialize: function(){
            this.listenTo(this, "change:template", this.render);
            this.loadHtml();

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
                query = "";
            }else{
                query = "?" + query;
            }
            loadHelper.html({
                url: app.baseUrl + "/statistics/room" + query
            }).done(function(html){
                that.template = html;
                that.trigger("change:template");
            });
        }
    });

    return StatisticsConsumptionView;
});