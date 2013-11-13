require.config({
  paths: {
    jquery     : 'lib/require-jquery',
    cookie     : 'lib/jquery.cookie',
    underscore : 'lib/underscore',
    backbone   : 'lib/backbone',
    text       : 'lib/text'
  },
  /*
  shim: {
    'jquery': {
      exports: '$'
    },
    'cookie': {
      deps: ['jquery']
    },
    'backbone': {
      deps: ['underscore', 'jquery'],
      exports: 'Backbone',
      init: function() {
        Backbone.$ = window.$;
      }
    },
    'underscore': {
      exports: '_'
    }
  },
  */
  urlArgs: "bust=" + Date.now()
});

define(function (require) {
  var $        = require('jquery');
  var _        = require('underscore');
  var Backbone = require('backbone');
  var Router   = require('router');
  var App      = require('app');
  var utils    = require('utils');
  var log      = require('log');

  // for android share.
  var href = window.location.href;

  if (href.split('?').length > 1) {
    var query = _.last(href.split('?'));
  }

  if (query) {
    window.location = _.first(href.split('?'));
  }

  // $.ajaxSetup({cache: false});

  // log ajax requests
  // $.ajaxPrefilter(function (options) {
  //   switch (options.type) {
  //     case 'GET':
  //       log('GET', options.url);
  //       break;
  //     case 'POST':
  //       log('POST', options.url, options.data);
  //       break;
  //   }
  // });

  var app = new App();
  
  // initialize router
  var router = new Router(app);
  Backbone.history.start({pushState: false});
});

