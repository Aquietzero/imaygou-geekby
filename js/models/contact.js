define(function (require) {
  var Backbone = require('backbone');

  var Contact = Backbone.Model.extend({
    defaults: {
      phoneNumber: '',
      customer: '',
      address: {
        province: '',
        city: '',
        district: '',
        street: ''
      }
    }
  });

  return Contact;
});

