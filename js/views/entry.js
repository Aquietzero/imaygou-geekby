define(function (require) {
  var $         = require('jquery');
  var _         = require('underscore');
  var Backbone  = require('backbone');
  var template  = require('text!templates/entry.html');

  var EntryView = Backbone.View.extend({
    className: 'cart-entry',
    template: _.template(template),

    initialize: function () {
    },

    render: function () {
      this.$el.html(this.template(this.model.attributes));
      return this;
    }
  });

  return EntryView;
});
