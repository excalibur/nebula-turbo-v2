define(['jquery', 'underscore', 'backbone', 'helpers/load', 'config', "helpers/bootstrap-vali", "bootstrap-datepicker", "bootstrap-datepicker-zh"],
        function($, _, Backbone, loadHelper, config, bootstrapValiHelper) {
    var app = config.app;
    var MerchantCreateView = Backbone.View.extend({
        el: "",
        template: "",
        initialize: function(){
            this.listenTo(this, "change:template", this.render);
            this.loadHtml();

            return this;
        },
        events: {
            "change [name=\"playbackValidType\"]" : "changePlaybackValidType",
            "submit": "submitForm"
        },
        submitForm: function(ev){
            console.log(ev.target);
            var form = $(ev.target);
            var that = this;
            $.post(app.baseUrl+"/merchant/create?"+form.serialize()).done(function(){
                alert("添加成功！！！");
            }).fail(function(html){
                if(html)
//                that.template = html;
//
//                that.trigger("change:template");
                alert("添加失败！！！");
            });
            return false;
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

            // 手机
            var mobile = $("#mobile");
            mobile.focusin(function(){
                var parent = $(this).parent(".form-group");
                parent.addValiStates("");
            });

            mobile.focusout(function(){
                var value = this.value;
                var parent = $(this).parent(".form-group");
                // 1.，验证
                if(/^1[3|4|5|8][0-9]\d{4,8}$/.test(value)){
                    parent.addValiStates("success");
                }else{
                    parent.addValiStates("error");
                    return;
                }
            })


            // 验证账号是否存在
            var username = $("#username");
            username.focusin(function(){
                var parent = $(this).parent(".form-group");
                parent.addValiStates("");
            });
            username.focusout(function(){
                var value = this.value;
                var parent = $(this).parent(".form-group");
                // 1.，验证
                if(/^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(.[a-zA-Z0-9_-])+/.test(value)){
                    parent.addValiStates("success");
                }else{
                    parent.addValiStates("error");
                    return;
                }

                $.ajax({
                    url: "merchant/search/exist",
                    data: {username: value},
                    context: this,
                    success: function(data){
                        var parent = $(this).parent(".form-group");
                        // 判断是否可以使用
                        if(data.exist){
                            parent.addValiStates("error");
                        }else{
                            parent.addValiStates("success");
                        }
                    }
                });
            });


            $('form').on('submit', function(){
                var flag = true;

                $('[required="true"]').each(function(){
                    var parent = $(this).parent("div");
                    if(this.value == ''){
                        parent.addValiStates("error");
                    }

                    if($(this).attr("name") == "username"){
                        $(this).focusout();
                    }
                    if(parent.hasClass("has-error")){
                        flag = false;
                        $(this).focus();
                        return;
                    }
                });


                if(!flag) {
                    alert('信息输入不完整.');
                    return false;
                }

            });
            return this;
        },

        loadHtml: function(query){

            var that = this;
            if(!query){
                query = "";
            }else{
                query = "?" + query;
            }
            loadHelper.html({
                url: app.baseUrl + "/merchant/create" + query
            }).done(function(html){
                that.template = html;
                that.trigger("change:template");
            });
        },
        changePlaybackValidType: function(el){

            if(el.target.value === '5'){
                this.$('#playbackContractStartTime').parent("div").parent("div").removeClass("hide");
            }else{
                this.$('#playbackContractStartTime').parent("div").parent("div").addClass("hide");
            }
        }
    });

    return MerchantCreateView;
});