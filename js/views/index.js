define(function (require) {
  var $         = require('jquery');
  var _         = require('underscore');
  var Backbone  = require('backbone');
  var Posts     = require('collections/posts');
  var PostsView = require('views/posts');
  var template  = require('text!templates/index.html');
  var log       = require('log');

  var IndexView = Backbone.View.extend({
    template: _.template(template),

    events: {
      'click #load-more': 'loadMore'
    },

    initialize: function () {
      this.posts = new Posts();
      this.postsView = new PostsView({
        collection: this.posts
      });
    },

    render: function () {
      log('RENDER home');

      var self = this;

      this.$el.html(this.template());
      this.posts.fetch({
        reset: true,
        success: function () {
          self.postsView.setElement(this.$('.posts')).render();
        }
      });

      return this;
    },

    loadMore: function () {
      this.posts.loadMore();
    }
  });

  return IndexView;
});
