define(function (require) {
  var $         = require('jquery');
  var _         = require('underscore');
  var Backbone  = require('backbone');
  var TestPosts = require('collections/test_posts');
  var Post      = require('models/post');
  var template  = require('text!templates/detail.html');

  var DetailView = Backbone.View.extend({
    className: 'post-detail',
    template: _.template(template),

    initialize: function () {
      this.model = new Post();
    },

    render: function (postId) {
      this.model.id = postId;

      var self = this;
      this.model.fetch({
        reset: true,
        success: function (res) {
          self.$el.html(self.template(self.model.attributes));
        }
      })
      return this;
    }
  });

  return DetailView;
});
