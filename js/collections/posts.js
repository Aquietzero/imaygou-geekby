define(function (require) {
  var _        = require('underscore');
  var Backbone = require('backbone');
  var Post     = require('models/post');

  var Posts = Backbone.Collection.extend({
    model: Post,

    initialize: function (models, options) {
      this.page = 0;
    },

    url: function () {
      var param = { page: this.page };
      return '/api/items?' + $.param(param);
    },

    parse: function (res) {
      console.log(res);
      return _.map(res.items, function (item) {
        return { item: item };
      });
    },

    loadMore: function () {
      this.page += 1;
      this.fetch({ remove: false });
    }
  });

  return Posts;
});

