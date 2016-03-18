// creating a new model for the name lat lon and country view
// giving default values
var CityModel = Backbone.Model.extend({
    defaults: {
        name: '',
        lat: 0,
        lon: 0,
        country: ''
    }
});