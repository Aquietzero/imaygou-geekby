define(function (require) {
  var $               = require('jquery');
  var _               = require('underscore');
  var Backbone        = require('backbone');
  var EntryView       = require('views/entry');
  var AddressView     = require('views/address');
  var cart            = require('globals/cart');
  var contact         = require('globals/contact');
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
      'click .edit-cart': 'editCart',
      'click .contact-back': 'backToCart',
      'click .address-back': 'backToContact',
      'click .finish-address': 'finishAddress',
      'click .finish-contact': 'finishContact',

      'blur input.phone-number': 'editPhoneNumber',
      'blur input.contact-user': 'editContactUser'
    },

    initialize: function () {
      this.listenTo(cart, 'reset', this.render);
      this.listenTo(cart, 'change', this.renderSummary);
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
      this.$el.html(this.templates[this.state]());
      cart.get('posts').each(this.addOne, this);
      this.renderSummary();
    },

    renderContact: function () {
      $(document).scrollTop(0);
      this.$el.html(this.templates[this.state]({
        contact: contact
      }));
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
      this.addressView = new AddressView();
      this.$el.html(this.addressView.render().el);
    },

    editCart: function (e) {
      var $btn = $(e.currentTarget);

      this.$('.entry-deletion').addClass('hide');
      this.$('.entry-quantity').addClass('hide');

      if ($btn.hasClass('selected')) {
        $btn.removeClass('selected');
        this.$('.entry-quantity').removeClass('hide');
      } else {
        $btn.addClass('selected');
        this.$('.entry-deletion').removeClass('hide');
      }
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
    },

    editPhoneNumber: function () {
      var phoneNumber = this.$('input.phone-number').val();
      
      if (!phoneNumber) {
        this.$('.errors').html('请输入手机号码');
      } else {
        this.$('.errors').html('');
        contact.set('phoneNumber', phoneNumber);
      }
    },

    editContactUser: function () {
      var contactUser = this.$('input.contact-user').val();
      contact.set('contactUser', contactUser);
    },

    finishAddress: function () {
      this.addressView.finishAddress();
      this.backToContact();
    },

    finishContact: function (e) {
      var $btn = $(e.currentTarget);
      var phoneNumber = contact.get('phoneNumber');
      
      if (!phoneNumber) {
        this.$('.errors').html('请输入手机号码');
        return;
      }

      var contactUser = this.$('input.contact-user').val();
      var address = contact.get('address');
      var entries = cart.getEntries();

      var order = {
        phone_number: phoneNumber,
        contact_user: contactUser,
        address: address,
        entries: entries
      };

      $.ajax({
        url: '/api/orders/add',
        type: 'post',
        data: {
          order: JSON.stringify(order)
        },
        success: function (res) {
          if (res.message === 'OK') {
            $btn.html('订单已成功提交，请留意手机短信。');
            cart.empty();
          }
        }
      });
    }
  });

  return CartView;
});
