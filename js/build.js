({
  appDir: '../',
  baseUrl: 'js/',
  dir: '../built',
  paths: {
    jquery     : 'lib/require-jquery',
    underscore : 'lib/underscore',
    backbone   : 'lib/backbone',
    text       : 'lib/text',
    cookie     : 'lib/jquery.cookie'
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
  modules: [{
    name: 'main'
  }]
})
