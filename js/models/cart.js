define(function (require) {
  var Backbone = require('backbone');
  var Post     = require('models/post');
  var Posts    = require('collections/posts');

  var Cart = Backbone.Model.extend({
    defaults: {
      posts: new Posts(),
      amount: 0
    },

    url: '/api/cart',

    parse: function (res) {
      var cart = res.cart;
      var posts = new Posts(_.map(cart.items, function (item) {
        return Post.prototype.parse({ item: item });
      }));
      return { posts: posts };
    },

    empty: function () {
      var self = this;
      $.ajax({
        url: '/api/cart/empty',
        type: 'get',
        success: function () {
          self.fetch({ reset: true });
        }
      });
    },

    getSummary: function () {
      var price = 0;
      var quantity = 0;

      this.get('posts').each(function (post) {
        price += post.get('price_us_in_RMB') * post.get('quantity');
        quantity += post.get('quantity');
      });

      return {
        price: price,
        quantity: quantity
      };
    },

    getEntries: function () {
      var entries = {};

      this.get('posts').each(function (post) {
        entries[post.get('id')] = post.get('quantity');
      });

      return entries;
    }
  });

  return Cart;
});

