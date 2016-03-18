var ForecastDayView = Backbone.View.extend({

    tagName: 'ul',

    className: 'ForecastDay',

    template: _.template($('#weather-template').html()),

    render: function () {
        var attributes = this.model.attributes;

        var data = Object.assign({}, attributes, {
            dayHi: toFahrenheit(attributes.temp.max),
            dayLo: toFahrenheit(attributes.temp.min),
            cardinal: directions(attributes.deg)
        });

        this.$el.html(this.template(data));
    }
});