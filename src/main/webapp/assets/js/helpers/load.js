// 工具类 主要冲服务器载入模板
define(['jquery'], function($) {
    var load = {
        html:function(obj){
            return $.ajax(obj);
        },
        template:function(){

        }
    };

    return load;
});