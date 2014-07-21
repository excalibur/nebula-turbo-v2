define(['backbone', 'jquery', 'config', 'helpers/load','bootstrap', 'metisMenu'], function(Backbone, $, config, loadHelper) {
    var app = config.app;

    $(document).ready(function(){
        $('#side-menu').metisMenu();
    });

    $(window).bind("load resize", function() {
        if ($(this).width() < 768) {
            $('div.sidebar-collapse').addClass('collapse');
        } else {
            $('div.sidebar-collapse').removeClass('collapse');
        }
    });

    var Workspace = Backbone.Router.extend({
        routes : {
            '' : 'dashboard',
            "merchant": "merchant",
            "merchant/create": "merchantCreate",
            "merchant/:id": "merchantDetail",
            "merchant/:id/charge": "merchantCharge",
            "merchant/:id/appkey": "merchantAppkey",
            "merchant/:id/userinfo/edit": "merchantUserinfoEdit",
            "merchant/:id/account/edit": "merchantAccountEdit",
            "merchant/:id/labs": "merchantLabs",
            "apply": "apply",
            "meeting/everyday": "meetingEveryday",
            "count": "count",
            "statistics/room": "statisticsRoom",
            "statistics/consumption": "statisticsConsumption",
            "domains": "domains",
            "playbacks": "playbacks",
            "playbacks/analysis/:id": "playbackAnalysis"
        },
        dashboard : function() {
            console.log('载入控制面板');



        },

        merchant:function(){
            if(app.currentView){
                app.currentView.remove();
            }
            require(['views/merchant'], function(MerchantView) {
                app.currentView = new MerchantView({
                    el: $("<div/>").appendTo("#wrapper")
                });


            });
        },
        merchantCreate: function(){
            if(app.currentView){
                app.currentView.remove();
            }
            require(['views/merchant-create'], function(MerchantCreateView) {
                app.currentView = new MerchantCreateView({
                    el: $("<div/>").appendTo("#wrapper")
                });


            });
        },
        merchantDetail: function(id){
            if(app.currentView){
                app.currentView.remove();
            }
            require(['views/merchant-detail'], function(ApplyView) {
                app.currentView = new ApplyView({
                    el: $("<div/>").appendTo("#wrapper"),
                    id:id
                });
            });
        },
        merchantCharge: function(id){
            if(app.currentView){
                app.currentView.remove();
            }
            require(['views/merchant-charge'], function(ApplyView) {
                app.currentView = new ApplyView({
                    el: $("<div/>").appendTo("#wrapper"),
                    id:id
                });
            });
        },
        merchantAppkey: function(id){
            if(app.currentView){
                app.currentView.remove();
            }
            require(['views/merchant-appkey'], function(ApplyView) {
                app.currentView = new ApplyView({
                    el: $("<div/>").appendTo("#wrapper"),
                    id:id
                });
            });
        },
        merchantUserinfoEdit: function(id){
            if(app.currentView){
                app.currentView.remove();
            }
            require(['views/merchant-userinfoEdit'], function(ApplyView) {
                app.currentView = new ApplyView({
                    el: $("<div/>").appendTo("#wrapper"),
                    id:id
                });
            });
        },
        merchantAccountEdit: function(id){
            if(app.currentView){
                app.currentView.remove();
            }
            require(['views/merchant-accountEdit'], function(ApplyView) {
                app.currentView = new ApplyView({
                    el: $("<div/>").appendTo("#wrapper"),
                    id:id
                });
            });
        },
        merchantLabs: function(id){
            if(app.currentView){
                app.currentView.remove();
            }
            require(['views/merchant-labs'], function(ApplyView) {
                app.currentView = new ApplyView({
                    el: $("<div/>").appendTo("#wrapper"),
                    id:id
                });
            });
        },
        apply: function(){
            if(app.currentView){
                app.currentView.remove();
            }
            require(['views/apply'], function(ApplyView) {
                app.currentView = new ApplyView({
                    el: $("<div/>").appendTo("#wrapper")
                });
            });
        },
        meetingEveryday: function(){
            if(app.currentView){
                app.currentView.remove();
            }
            require(['views/meeting-everyday'], function(MeetingEverydayView) {
                app.currentView = new MeetingEverydayView({
                    el: $("<div/>").appendTo("#wrapper")
                });
            });
        },
        count: function(){
            if(app.currentView){
                app.currentView.remove();
            }
            require(['views/count'], function(CountView) {
                app.currentView = new CountView({
                    el: $("<div/>").appendTo("#wrapper")
                });
            });
        },
        statisticsRoom: function(){
            if(app.currentView){
                app.currentView.remove();
            }
            require(['views/statistics-room'], function(StatisticsRoomView) {
                app.currentView = new StatisticsRoomView({
                    el: $("<div/>").appendTo("#wrapper")
                });
            });
        },
        statisticsConsumption: function(){
            if(app.currentView){
                app.currentView.remove();
            }
            require(['views/statistics-consumption'], function(StatisticsConsumptionView) {
                app.currentView = new StatisticsConsumptionView({
                    el: $("<div/>").appendTo("#wrapper")
                });
            });
        },
        domains: function(){
            if(app.currentView){
                app.currentView.remove();
            }
            require(['views/domains'], function(DomainsView) {
                app.currentView = new DomainsView({
                    el: $("<div/>").appendTo("#wrapper")
                });
            });
        },
        playbacks: function(){
            if(app.currentView){
                app.currentView.remove();
            }
            require(['views/playbacks'], function(PlaybacksView) {
                app.currentView = new PlaybacksView({
                    el: $("<div/>").appendTo("#wrapper")
                });
            });
        },
        playbackAnalysis: function(id){
            console.log("-----------");
            if(app.currentView){
                app.currentView.remove();
            }
            require(['views/playbacks-analysis'], function(PlaybackAnalysisView) {
                app.currentView = new PlaybackAnalysisView({
                    el: $("<div/>").appendTo("#wrapper"),
                    id: id
                });
            });
        }
    });


    return Workspace;
});
