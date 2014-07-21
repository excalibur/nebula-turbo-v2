define(['jquery', 'underscore', 'backbone', 'helpers/load', 'config'], function($, _, Backbone, loadHelper, config) {
    var app = config.app;
    var PlaybacksAnalysis = Backbone.View.extend({
        el: "",
        template: "",
        initialize: function(options){
            this.listenTo(this, "change:template", this.render);
            this.loadHtml(options.id);

            return this;
        },
        events: {

        },

        render: function(){

            this.$el.html(this.template);
            $(window.document.body).animate({scrollTop:0}, '500', 'swing');

            return this;
        },

        loadHtml: function(id){

            var that = this;
            if(!id){
                return;
            }
            loadHelper.html({
                url: app.baseUrl + "/playback/analysis/" + id
            }).done(function(html){
                that.template = html;
                that.trigger("change:template");
            });
        }
    });

    return PlaybacksAnalysis;
});