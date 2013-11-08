define(function (require) {
  var $         = require('jquery');
  var _         = require('underscore');
  var Backbone  = require('backbone');
  var cart      = require('globals/cart');
  var template  = require('text!templates/entry.html');

  var EntryView = Backbone.View.extend({
    className: 'cart-entry',
    template: _.template(template),

    events: {
      'click .entry-deletion': 'entryDelection'
    },

    initialize: function () {
    },

    entryDelection: function () {
      var self = this;
      $.ajax({
        url: '/api/cart/del_from_cart/' + this.model.get('id'),
        type: 'get',
        success: function (res) {
          if (res.message === 'OK') {
            cart.get('posts').remove(self.model);
            cart.getSummary();
            self.remove();
          }
        }
      });
    },

    render: function () {
      this.$el.html(this.template(this.model.attributes));
      return this;
    }
  });

  return EntryView;
});
