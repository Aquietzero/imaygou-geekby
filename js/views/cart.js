define(function (require) {
  var $               = require('jquery');
  var _               = require('underscore');
  var Backbone        = require('backbone');
  var EntryView       = require('views/entry');
  var AddressView     = require('views/address');
  var cart            = require('globals/cart');
  var cartTemplate    = require('text!templates/cart.html');
  var contactTemplate = require('text!templates/contact.html');

  var CartView = Backbone.View.extend({
    templates: {
      cart: _.template(cartTemplate),
      contact: _.template(contactTemplate)
    },

    events: {
      'click .payment-button': 'editContact',
      'click .edit-address': 'editAddress',
      'click .contact-back': 'backToCart',
      'click .address-back': 'backToContact'
    },

    initialize: function () {
      this.listenTo(cart, 'reset', this.render);
      this.state = 'cart';
    },

    render: function () {
      var self = this;
      cart.fetch({
        reset: true,
        success: function () {
          switch (self.state) {
            case 'cart':
              self.renderCart();
              break;
            case 'contact':
              self.renderContact();
              break;
          }
        }
      });

      $(document).scrollTop(0);

      return this;
    },

    renderCart: function () {
      $(document).scrollTop(0);
      this.$el.html(this.templates[this.state]);
      cart.get('posts').each(this.addOne, this);
      this.renderSummary();
    },

    renderContact: function () {
      $(document).scrollTop(0);
      this.$el.html(this.templates[this.state]);
    },

    renderSummary: function () {
      this.$('.summary .amount').html('￥' + cart.getSummary().price);
    },

    addOne: function (post) {
      var entryView = new EntryView({ model: post });
      this.$('.entries').append(entryView.render().el);
    },

    editContact: function () {
      this.state = 'contact';
      this.renderContact();
    },

    editAddress: function () {
      this.state = 'address';
      var addressView = new AddressView();
      this.$el.html(addressView.render().el);
    },

    backToCart: function () {
      this.state = 'cart';
      this.renderCart();
      return false;
    },

    backToContact: function () {
      this.state = 'contact';
      this.renderContact();
      return false;
    }
  });

  return CartView;
});
