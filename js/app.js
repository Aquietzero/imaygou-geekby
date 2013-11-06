define(function (require) {
  var $                = require('jquery');
  var Backbone         = require('backbone');
  var ContentView      = require('views/content');
  var template         = require('text!templates/app.html');
  require('cookie');

  var App = Backbone.View.extend({
    el: '#app',
    template: _.template(template),

    initialize: function () {
      this.contentView = new ContentView();
    },

    render: function (status, param1, param2) {
      this.$el.html(this.template());
      this.contentView.setElement(this.$('.content')).render(status, param1, param2);

      return this;
    }
  });

  return App;
});

