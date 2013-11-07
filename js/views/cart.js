define(function (require) {
  var $         = require('jquery');
  var _         = require('underscore');
  var Backbone  = require('backbone');
  var EntryView = require('views/entry');
  var cart      = require('globals/cart');
  var template  = require('text!templates/cart.html');

  var CartView = Backbone.View.extend({
    className: 'cart',
    template: _.template(template),

    initialize: function () {
      this.listenTo(cart, 'reset', this.render);
    },

    render: function () {
      this.$el.html(this.template());

      var self = this;
      cart.fetch({
        reset: true,
        success: function () {
          console.log(cart);
          cart.get('posts').each(self.addOne, self);
        }
      });
      return this;
    },

    addOne: function (post) {
      var entryView = new EntryView({ model: post });
      this.$('.entries').append(entryView.render().el);
    }
  });

  return CartView;
});
