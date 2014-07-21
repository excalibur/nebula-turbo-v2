'use strict';
// requirejs 全局配置
require.config({
    shim: {
        underscore: {
            exports: '_'
        },
        backbone: {
            deps: ['underscore', 'jquery'],
            exports: 'Backbone'
        },
        bootstrap: {
            deps: ['jquery'],
            exports: 'jquery'
        },
        metisMenu: {
            deps: ['jquery'],
            exports: 'jquery'
        },
        "bootstrap-datepicker-zh": {
            deps: ['jquery', 'bootstrap', 'bootstrap-datepicker'],
            exports: 'jquery'
        },
        "highstock-exporting":{
            deps: ['highstock'],
            exports: 'Highcharts'
        }
    },
    paths: {
        jquery: '../components/jquery/dist/jquery',
        backbone: '../components/backbone/backbone',
        underscore: '../components/underscore/underscore',
        bootstrap: '../components/bootstrap/js/bootstrap',
        metisMenu: '../components/metisMenu/jquery.metisMenu',
        "bootstrap-datepicker": "../components/bootstrap-datepicker/js/bootstrap-datepicker",
        "bootstrap-datepicker-zh": "../components/bootstrap-datepicker/js/locales/bootstrap-datepicker.zh-CN",
        highstock: "../components/highchart/highstock",
        "highstock-exporting": "../components/highchart/modules/exporting"

    }
});

// 主方法入口
require(['backbone', 'routes/router', 'config'], function(Backbone, Workspace, config) {
    var workspace;
    workspace = new Workspace();
    config.app.workspace = workspace;
    Backbone.history.start();
});