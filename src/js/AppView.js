var AppView = Backbone.View.extend({

    className: 'WeatherApp',

    initialize: function (options) {
        this.cityView = new CityView({ model: options.city });
        this.forecastAverageView = new ForecastAverageView({ collection: options.forecast });
        this.inputView = new InputView();
        this.forecastView = new ForecastView({
            collection: options.forecast
        });
    },

    render: function () {
        this.$el.empty();
        this.inputView.render();
        this.$el.append(this.inputView.$el);
        this.cityView.render();
        this.$el.append(this.cityView.$el);
        this.forecastView.render();
        this.$el.append(this.forecastView.$el);
        this.forecastAverageView.render();
        this.$el.append(this.forecastAverageView.$el);
    }
});