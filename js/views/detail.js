define(function (require) {
  var $         = require('jquery');
  var _         = require('underscore');
  var Backbone  = require('backbone');
  var Post      = require('models/post');
  var cart      = require('globals/cart');
  var template  = require('text!templates/detail.html');

  var DetailView = Backbone.View.extend({
    className: 'post-detail',
    template: _.template(template),

    events: {
      'click .buy-button': 'toggleBuySelection',
      'click .buy-selection .quantity': 'selectQuantity',
      'click .add-to-cart': 'addToCart'
    },

    initialize: function () {
      this.model = new Post();
    },

    toggleBuySelection: function (e) {
      var $btn = $(e.currentTarget);
      var $selection = this.$('.buy-selection');

      if ($btn.hasClass('selected')) {
        $selection.hide();
        $btn.removeClass('selected');
      } else {
        $selection.show();
        $btn.addClass('selected');
      }
    },

    selectQuantity: function (e) {
      var $quantity = $(e.currentTarget);

      this.$('.buy-selection .quantity').removeClass('selected');
      $quantity.addClass('selected');
    },

    addToCart: function (e) {
      var $btn = $(e.currentTarget);
      var id = this.model.get('id');
      var qty = this.$('.buy-selection .quantity.selected').html();

      $btn.text('正在加入购物车');
      var self = this;
      $.ajax({
        url: '/api/cart/add_to_cart/' + id + '/' + qty,
        type: 'get',
        success: function (res) {
          if (res.message === 'OK') {
            $btn.text('已加入购物车');
            cart.set('isChecked', false);
            self.$('.topbar .cart img').attr('src', '/img/cart-notice@2x.png');
          }
        }
      });
    },

    render: function (postId) {
      this.model.id = postId;

      var self = this;
      this.model.fetch({
        reset: true,
        success: function (res) {
          var args = self.model.attributes;
          args['cart'] = cart;
          self.$el.html(self.template(args));
          document.title = args.title + ' - ' + args.sub_title;
        }
      });

      $(document).scrollTop(0);

      return this;
    }
  });

  return DetailView;
});
