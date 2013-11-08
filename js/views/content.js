define(function (require) {
  var _          = require('underscore');
  var $          = require('jquery');
  var Backbone   = require('backbone');
  var IndexView  = require('views/index');
  var DetailView = require('views/detail');
  var cart       = require('globals/cart');
  var CartView   = require('views/cart');

  var ContentView = Backbone.View.extend({
    initialize: function () {
      this.indexView = new IndexView();
      this.detailView = new DetailView();
      this.cartView = new CartView();
    },

    render: function (status, param1, param2) {
      var self = this;
      switch (status) {
        case 'index':
          this.indexView.setElement(this.$el).render();
          break;
        case 'detail':
          this.detailView.setElement(this.$el).render(param1);
          break;
        case 'cart':
          cart.set('isChecked', true);
          this.cartView.setElement(this.$el).render();
          break;
      }
      return this;
    }
  });

  return ContentView;
});

