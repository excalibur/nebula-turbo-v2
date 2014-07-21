// 工具类 主要冲服务器载入模板
define(['jquery'], function($) {
    'use strict';
    var statesStyle = {
        span: "<span class=\"glyphicon form-control-feedback\"></span>",
        successClass: "glyphicon-ok",
        errorClass: "glyphicon-remove",
        parentErrorClass: "has-error",
        parentSuccessClass: "has-success",
        feedback: "has-feedback"
    }




    $.fn.addValiStates = function (options) {

        var feedback = this.children(".form-control-feedback");
        var span = $(statesStyle.span);
        if(feedback.length > 0){
            feedback.remove();
            this.removeClass(statesStyle.parentErrorClass);
            this.removeClass(statesStyle.parentSuccessClass);
            this.removeClass(statesStyle.feedback);

        }

        // 调用
        if(options == "success"){
            this.addClass(statesStyle.parentSuccessClass);
            this.addClass(statesStyle.feedback);
            span.addClass(statesStyle.successClass);
            this.append(span);
        }else if(options == "error"){
            this.addClass(statesStyle.parentErrorClass);
            this.addClass(statesStyle.feedback);
            span.addClass(statesStyle.errorClass);
            this.append(span);
        }else{

        }

        return this
    };

    return $;
});