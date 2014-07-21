define(['jquery', 'underscore', 'backbone', 'helpers/load', 'config', "bootstrap-datepicker", "bootstrap-datepicker-zh"], function($, _, Backbone, loadHelper, config) {
    var app = config.app;
    var PlaybacksView = Backbone.View.extend({
        el: "",
        template: "",
        initialize: function(){
            this.listenTo(this, "change:template", this.render);
            this.loadHtml();

            return this;
        },
        events: {
            "click .pager a" : "pagination",
            "click #query .btn" : "query",
            "click .playbackAnalysis": "playbackAnalysis"
        },

        render: function(){

            this.$el.html(this.template);
            $(window.document.body).animate({scrollTop:0}, '500', 'swing');
            $('.input-group.date').datepicker({
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
        // 翻页控制
        pagination: function(el){

            var href = el.target.href;
            this.loadHtml(href.split("?")[1]);

            return false;
        },
        // 回放统计
        playbackAnalysis: function(ev){
            var href = ev.target.href;
            var strs = href.split("/");

            console.log(strs[strs.length-1]);
            config.app.workspace.navigate('/playbacks/analysis/'+ strs[strs.length-1], {
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
                url: app.baseUrl + "/playbacks" + query
            }).done(function(html){
                that.template = html;
                that.trigger("change:template");
            });
        }
    });

    return PlaybacksView;
});