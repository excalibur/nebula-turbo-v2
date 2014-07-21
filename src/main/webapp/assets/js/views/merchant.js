define(['jquery', 'underscore', 'backbone', 'helpers/load', 'config'], function($, _, Backbone, loadHelper, config) {
    var app = config.app;
    var MerchantView = Backbone.View.extend({
        el: "",
        template: "",
        initialize: function(){
          this.listenTo(this, "change:template", this.render);
          this.loadHtml();

          return this;
        },
        events: {
          "click .pager a" : "pagination",
          "click table td a": "detail"
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
        detail: function(ev){
            var href = ev.target.href;
            var id = href.substring(href.lastIndexOf("/") + 1);
            config.app.workspace.navigate('merchant/'+ id, {
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
                url: app.baseUrl + "/merchant" + query
            }).done(function(html){
                that.template = html;
                that.trigger("change:template");
            });
        }
    });

    return MerchantView;
});