define(function (require) {
  var $        = require('jquery');
  var _        = require('underscore');
  var Backbone = require('backbone');
  var template = require('text!templates/post.html');

  var PostView = Backbone.View.extend({
    className: 'post',
    template: _.template(template),

    render: function () {
      this.$el.html(this.template(this.model.attributes));
      this.$el.addClass(this.model.get('post_type').toLowerCase());
      return this;
    }
  });

  return PostView;
});
