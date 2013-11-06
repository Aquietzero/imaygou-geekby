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
      buy_num: 0,

      post_type: 'NORMAL'
    },

    initialize: function () {
    },

    url: function () {
      return '/api/items/' + this.id;
    },

    parse: function (res) {
      return res.item;
    }
  });

  return Post;
});

