define(function (require) {
  var $         = require('jquery');
  var _         = require('underscore');
  var Backbone  = require('backbone');
  var EntryView = require('views/entry');
  var cart      = require('globals/cart');
  var template  = require('text!templates/cart.html');

  var CartView = Backbone.View.extend({
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
          cart.get('posts').each(self.addOne, self);
          self.renderSummary();
        }
      });

      $(document).scrollTop(0);

      return this;
    },

    renderSummary: function () {
      this.$('.summary .amount').html('￥' + cart.getSummary().price);
    },

    addOne: function (post) {
      var entryView = new EntryView({ model: post });
      this.$('.entries').append(entryView.render().el);
    }
  });

  return CartView;
});
