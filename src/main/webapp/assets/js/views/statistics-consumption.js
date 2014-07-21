define(['jquery', 'underscore', 'backbone', 'helpers/load', 'config', "highstock", "highstock-exporting"], function($, _, Backbone, loadHelper, config) {
    var app = config.app;
    var StatisticsRoomView = Backbone.View.extend({
        el: "",
        template: "",
        initialize: function(){
            this.listenTo(this, "change:template", this.render);
            this.loadHtml();
            Highcharts.setOptions({
                lang: {
                    weekdays: ['星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六'],
                    rangeSelectorZoom: "时段选择",
                    rangeSelectorFrom: "从",
                    rangeSelectorTo: "到",
                    printChart: "打印图表",
                    downloadSVG: "下载SVG图片",
                    downloadPNG: "下载PNG图片",
                    downloadPDF: "下载PDF文档",
                    downloadJPEG: "下载JPEG图片",
                    numericSymbols: ["千" , "百万"],
                    shortMonths:["1月","2月","3月","4月","5月","6月","7月","8月","9月","10月","11月","12月"]
                }
            });
            return this;
        },
        events: {
            "click #changeShow .btn" : "changeShow"
        },
        changeShow: function(ev){

            var el = ev.target;

            var dataAll =  $("#data-days").highcharts();
            if(el.id == "auto"){

                dataAll.series[0].update({
                    dataGrouping: {
                        forced: false,
                        units: [ ['week', [1]] ]
                    }
                });
            }else if(el.id == "month4"){

                dataAll.series[0].update({

                    dataGrouping: {
                        forced: true,
                        units: [ ['month', [4]] ]
                    }
                });
            }else if(el.id == "month"){
                dataAll.series[0].update({

                    dataGrouping: {
                        forced: true,
                        units: [ ['month', [1]] ]
                    }
                });
            }else if(el.id == "year"){

                dataAll.series[0].update({
                    dataGrouping: {
                        forced: true,
                        units: [ ['year', [1]] ]
                    }
                });
            }
        },
        render: function(){

            this.$el.html(this.template);
            $(window.document.body).animate({scrollTop:0}, '500', 'swing');

            this.$('#data-days').highcharts('StockChart', {

                credits: {
                    enabled: true,
                    href: "http://www.jiangzuotong.com",
                    text: "http://www.jiangzuotong.com"
                },

                title : {
                    text : '讲座通消费统计'
                },
                yAxis: {
                    min: 0,
                    allowDecimals: false,
                    title: {
                        text: '消费额 (元)'
                    }
                },
                xAxis:{
                    dateTimeLabelFormats:{
                        millisecond: '%H:%M:%S.%L',
                        second: '%H:%M:%S',
                        minute: '%H:%M',
                        hour: '%H:%M',
                        day: '%m月%d',
                        week: '%m月%d',
                        month: '%y年%m月',
                        year: '%Y年'
                    }
                },
                tooltip: {
//                          xDateFormat: '%Y-%m-%d, %A',//鼠标移动到趋势线上时显示的日期格式
                    valueSuffix: "元",
                    valueDecimals: 2
                },
                rangeSelector: {
                    selected: 4, // 默认选中今年
                    inputDateFormat: '%Y-%m-%d',
                    inputEnabled: true,
                    buttons: [{//定义一组buttons,下标从0开始
                        type: 'day',
                        count: 1,
                        text: '一天'
                    },{//定义一组buttons,下标从0开始
                        type: 'week',
                        count: 1,
                        text: '一周'
                    },{
                        type: 'month',
                        count: 1,
                        text: '一月'
                    }, {
                        type: 'month',
                        count: 4,
                        text: '一季'
                    }, {
                        type: 'month',
                        count: 6,
                        text: '半年'
                    }, {
                        type: 'ytd',
                        text: '今年'
                    }, {
                        type: 'year',
                        count: 1,
                        text: '1年'
                    }, {
                        type: 'all',
                        text: '全部'
                    }]
                },
                series : [{
                    name : '消费额',
                    data : [[]],
                    type: "column",
                    dataGrouping: {
                        approximation: "sum",
                        dateTimeLabelFormats:{
                            millisecond: ['%A, %b %e, %H:%M:%S.%L', '%A, %b %e, %H:%M:%S.%L', '-%H:%M:%S.%L'],
                            second: ['%A, %b %e, %H:%M:%S', '%A, %b %e, %H:%M:%S', '-%H:%M:%S'],
                            minute: ['%A, %b %e, %H:%M', '%A, %b %e, %H:%M', '-%H:%M'],
                            hour: ['%A, %b %e, %H:%M', '%A, %b %e, %H:%M', '-%H:%M'],
                            day: ['%A, %b %e, %Y', '%A, %b %e', '-%A, %b %e, %Y'],
                            week: ['一周从 %A, %b %e, %Y开始', '%A, %b %e', '-%A, %b %e, %Y'],
                            month: ['%Y年 %b', '%b', '-%b(不包括) %Y'],
                            year: ['%Y', '%Y', '-%Y']
                        },
                        units: [
                            [
                                'week',
                                [1]
                            ]]
                    }                      }]
            });
            // 初始化数据
            this.loadDaysData();
            var that = this;
            $('a[data-toggle="tab"]').on('shown.bs.tab', function (e) {

                var id = $(this).attr("href");

                if(id == '#people'){
                    $("#data-people").highcharts('StockChart', {

                        credits: {
                            enabled: true,
                            href: "http://www.jiangzuotong.com",
                            text: "http://www.jiangzuotong.com"
                        },

                        title : {
                            text : '讲座通消费人次统计'
                        },
                        yAxis: {
                            min: 0,
                            allowDecimals: false,
                            title: {
                                text: '消费人 (次)'
                            }
                        },
                        xAxis:{
                            allowDecimals: false,
                            dateTimeLabelFormats:{
                                millisecond: '%H:%M:%S.%L',
                                second: '%H:%M:%S',
                                minute: '%H:%M',
                                hour: '%H:%M',
                                day: '%m月%d',
                                week: '%m月%d',
                                month: '%y年%m月',
                                year: '%Y年'
                            }
                        },
                        tooltip: {
//                          xDateFormat: '%Y-%m-%d, %A',//鼠标移动到趋势线上时显示的日期格式
                            valueSuffix: "人次"
//                          valueDecimals: 2
                        },
                        rangeSelector: {
                            selected: 4, // 默认选中今年
                            inputDateFormat: '%Y-%m-%d',
                            inputEnabled: true,
                            buttons: [{//定义一组buttons,下标从0开始
                                type: 'day',
                                count: 1,
                                text: '一天'
                            },{//定义一组buttons,下标从0开始
                                type: 'week',
                                count: 1,
                                text: '一周'
                            },{
                                type: 'month',
                                count: 1,
                                text: '一月'
                            }, {
                                type: 'month',
                                count: 4,
                                text: '一季'
                            }, {
                                type: 'month',
                                count: 6,
                                text: '半年'
                            }, {
                                type: 'ytd',
                                text: '今年'
                            }, {
                                type: 'year',
                                count: 1,
                                text: '1年'
                            }, {
                                type: 'all',
                                text: '全部'
                            }]
                        },
                        series : [{
                            name : '消费人数',
                            data : [[]],
//                type: "column",
                            valueDecimals: 0,
                            dataGrouping: {

                                dateTimeLabelFormats:{
                                    millisecond: ['%A, %b %e, %H:%M:%S.%L', '%A, %b %e, %H:%M:%S.%L', '-%H:%M:%S.%L'],
                                    second: ['%A, %b %e, %H:%M:%S', '%A, %b %e, %H:%M:%S', '-%H:%M:%S'],
                                    minute: ['%A, %b %e, %H:%M', '%A, %b %e, %H:%M', '-%H:%M'],
                                    hour: ['%A, %b %e, %H:%M', '%A, %b %e, %H:%M', '-%H:%M'],
                                    day: ['%A, %b %e, %Y', '%A, %b %e', '-%A, %b %e, %Y'],
                                    week: ['一周从 %A, %b %e, %Y开始', '%A, %b %e', '-%A, %b %e, %Y'],
                                    month: ['%Y年 %b', '%b', '-%b(不包括) %Y'],
                                    year: ['%Y', '%Y', '-%Y']
                                }

                            }                      }]
                    });
                    that.loadPeopleData();
                }else if(id == '#money'){

                }
            });
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
                url: app.baseUrl + "/statistics/consumption" + query
            }).done(function(html){
                that.template = html;
                that.trigger("change:template");
            });
        },
        loadDaysData: function(){
            $.getJSON(app.baseUrl + '/statistics/consumption/days', function(data) {
                // Create the chart
                var dataAll =  $("#data-days").highcharts();
                dataAll.series[0].update({
                    data: data
                });

                var len = data.length;
                var totalM = 0;
                for(var i = 0; i< len; i++){
                    totalM += data[i][1];
                }
                $("#totalMoney").html(parseFloat(Math.round(totalM * 100) / 100).toFixed(2) + " 元");
            });
        },
        loadPeopleData: function(){
            $.getJSON(app.baseUrl + '/statistics/consumption/people', function(data) {
                // Create the chart
                var dataAll =  $("#data-people").highcharts();
                dataAll.series[0].update({
                    data: data
                });


            });
        }
    });

    return StatisticsRoomView;
});