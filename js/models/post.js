define(function (require) {
  var Backbone = require('backbone');

  var Post = Backbone.Model.extend({
    defaults: {
      id: null,
      images: [],
      price_cn: 0,
      price_us: 0,
      price_us_in_RMB: 0,
      price_ref: [],
      delta: 0,
      product_src: {},
      title: '',
      sub_title: '',
      description: '',
      detail: [],
      view_num: 0,
      order_num: 0,

      post_type: 'NORMAL',
      quantity: 0
    },

    initialize: function () {
    },

    url: function () {
      return '/api/items/' + this.id;
    },

    parse: function (res) {
      res.item.price_cn = res.item.price_cn.toFixed(0);
      res.item.price_us = res.item.price_us.toFixed(0);
      res.item.price_us_in_RMB = res.item.price_us_in_RMB.toFixed(0);
      return res.item;
    }
  });

  return Post;
});

