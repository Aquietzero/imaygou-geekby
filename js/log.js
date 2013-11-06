define(function (require) {
  var _ = require('underscore');

  if (window.console && window.console.log &&
      _.isFunction(window.console.log)) {
    return _.bind(console.log, console);
  }
  return function () {};
});

