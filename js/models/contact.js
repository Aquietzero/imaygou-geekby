define(function (require) {
  var Backbone = require('backbone');

  var Contact = Backbone.Model.extend({
    defaults: {
      userContact: {
        phoneNumber: '',
        customer: '',
        address: {
          province: '',
          city: '',
          district: '',
          street: ''
        }
      },
      hierarchy: {
      }
    }
  });

  return Contact;
});

