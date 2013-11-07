define(function (require) {
  var $        = require('jquery');
  var _        = require('underscore');
  var Backbone = require('backbone');
  var template = require('text!templates/address.html');

  var AddressView = Backbone.View.extend({
    template: _.template(template),

    events: {
    },

    initialize: function () {
    },

    render: function () {
      this.$el.html(this.template());
      return this;
    }
  });

  return AddressView;
});
