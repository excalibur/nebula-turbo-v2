define(['jquery', 'underscore', 'backbone'], function($, _, Backbone) {

    var DashboardView = Backbone.View.extend({

        render: function(){
            return this.el;
        }
    });

    return DashboardView;
});