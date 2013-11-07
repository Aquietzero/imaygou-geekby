define(function (require) {
  var $        = require('jquery');
  var _        = require('underscore');
  var Backbone = require('backbone');
  var contact  = require('globals/contact');
  var template = require('text!templates/address.html');

  var AddressView = Backbone.View.extend({
    template: _.template(template),

    events: {
      'change select#province-selection': 'loadCities',
      'change select#city-selection': 'loadDistricts'
    },

    initialize: function () {
    },

    loadProvinces: function () {
      var self = this;
      $.ajax({
        url: '/api/meta/hierarchy',
        type: 'get'
      }).done(function (res) {
        if (res.message === 'OK') {
          _.each(res.provinces, function (province) {
            var $option = $('<option value="' + province + '">' + province + '</options>');
            self.$('#province-selection').append($option);
          }, self);
          self.$('#province-selection').prepend($('<option>'));
        }
      });
    },

    loadCities: function () {
      var $province = this.$('#province-selection option:selected');
      var province = $province.val();

      if (!province) {
        return;
      }

      var self = this;
      $.ajax({
        url: '/api/meta/hierarchy/' + province,
        type: 'get'
      }).done(function (res) {
        self.$('#city-selection').empty();
        self.$('#district-selection').empty();
        _.each(res.cities, function (city) {
          var $option = $('<option value="' + city + '">' + city + '</options>');
          self.$('#city-selection').append($option);
        }, self);
      });
    },

    loadDistricts: function () {
      var $province = this.$('#province-selection option:selected');
      var province = $province.val();
      var $city = this.$('#city-selection option:selected');
      var city = $city.val();

      var self = this;
      $.ajax({
        url: '/api/meta/hierarchy/' + province + '/' + city,
        type: 'get'
      }).done(function (res) {
        self.$('#district-selection').empty();
        _.each(res.districts, function (district) {
          var $option = $('<option value="' + district + '">' + district + '</options>');
          self.$('#district-selection').append($option);
        }, self);
      });
    },

    finishAddress: function () {
      var $province = this.$('#province-selection option:selected');
      var province = $province.val();

      var $city = this.$('#city-selection option:selected');
      var city = $city.val();
      
      var $district = this.$('#district-selection option:selected');
      var district = $district.val();

      var $street = this.$('.street input');
      var street = $street.val();

      var address = contact.get('address');

      contact.set('address', {
        province: province || address.province,
        city: city || address.city,
        district: district || address.district,
        street: street || address.street
      });
    },

    render: function () {
      this.$el.html(this.template());
      this.loadProvinces();
      $(document).scrollTop(0);
      return this;
    }
  });

  return AddressView;
});
