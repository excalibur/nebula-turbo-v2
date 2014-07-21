define(['jquery', 'underscore', 'backbone', 'helpers/load', 'config', "bootstrap-datepicker", "bootstrap-datepicker-zh"], function($, _, Backbone, loadHelper, config) {
    var app = config.app;
    var CountView = Backbone.View.extend({
        el: "",
        template: "",
        initialize: function(){
            this.listenTo(this, "change:template", this.render);
            this.loadHtml();

            return this;
        },
        events: {
            "click #query .btn" : "query"
        },

        render: function(){

            this.$el.html(this.template);
            $(window.document.body).animate({scrollTop:0}, '500', 'swing');
            this.$('.input-group.date').datepicker({
                format: "yyyy-mm-dd",
                language: "zh-CN",
                todayBtn: "linked",
                autoclose: true,
                todayHighlight: true
            });
            return this;
        },
        // 查询
        query: function(el){

            var form = $(el.target).parents("form");
            this.loadHtml(form.serialize());
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
                url: app.baseUrl + "/count" + query
            }).done(function(html){
                that.template = html;
                that.trigger("change:template");
            });
        }
    });

    return CountView;
});