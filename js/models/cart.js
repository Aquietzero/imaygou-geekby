define(function (require) {
  var Backbone = require('backbone');
  var Posts = require('collections/posts');

  var Cart = Backbone.Model.extend({
    defaults: {
      posts: new Posts(),
      amount: 0
    },

    url: '/api/cart',

    parse: function (res) {
      var cart = res.cart;
      var posts = new Posts(cart.items);
      return { posts: posts };
    },

    getSummary: function () {
      var price = 0;
      var quantity = 0;

      this.get('post').each(function (post) {
        price += post.get('price_us_in_RMB') * post.get('quantity');
        quantity += post.get('quantity');
      });

      return {
        price: price,
        quantity: quantity
      };
    }
  });

  return Cart;
});

