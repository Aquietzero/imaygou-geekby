define(function (require) {
  var $             = require('jquery');
  var _             = require('underscore');
  var Backbone      = require('backbone');
  var Posts         = require('collections/posts');
  var PostView      = require('views/post');

  var PostsView = Backbone.View.extend({
    initialize: function () {
      this.listenTo(this.collection, 'reset', this.render);
      this.listenTo(this.collection, 'add', this.addOne);
    },

    render: function () {
      this.collection.each(this.addOne, this);
      return this;
    },

    addOne: function (post) {
      var postView = new PostView({ model: post });
      this.$el.append(postView.render().el);
    }
  });

  return PostsView;
});
