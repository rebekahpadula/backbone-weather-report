var ForecastView = Backbone.View.extend({

    className: 'Forecast',

    initialize: function () {
        this.childViews = [];
        this.listenTo(this.collection, 'add', this.render);
    },

    render: function () {
        var _this = this;

        this.$el.empty();

        this.childViews.forEach(function (view) {
            view.remove();
        });

        this.childViews = this.collection.map(function (model) {
            return new ForecastDayView({ model: model });
        });

        this.childViews.forEach(function (view) {
            view.render();
            _this.$el.append(view.$el);
        });
    }
});