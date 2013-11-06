define(function (require) {
  var $        = require('jquery');
  var Backbone = require('backbone');
  require('cookie');

  var Router = Backbone.Router.extend({
    routes: {
      '': 'index',
      'posts/(:postId)': 'detail',
      'cart': 'cart'
    },

    /*
    pushState: function () {
      $.cookie('prevState', $.cookie('currState') || null);
      $.cookie('currState', window.location.href);
    },

    markDealsPage: function () {
      $.cookie('dealsPage', window.location.href);
    },
    */

    initialize: function (app) {
      this.app = app;
    },

    index: function () {
      this.app.render('index');
    },

    detail: function (postId) {
      this.app.render('detail', postId);
    },

    cart: function () {
      this.app.render('cart');
    }
  });

  return Router;
});

