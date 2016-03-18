// Creating a new view for averages, giving the element a class, changing 
// the element from a div to a ul, giving it a template, 
var ForecastAverageView = Backbone.View.extend({

    className: 'ForecastAverage',

    tagName: 'ul',

    template: _.template($('#weather-averages-template').html()),

    initialize: function () {
        this.listenTo(this.collection, 'add', this.render);
    },

    render: function () {
        var hi = Math.floor(this.collection.getAverageMaxTemp());
        var lo = Math.floor(this.collection.getAverageMinTemp());

        this.$el.html(this.template({
            hi: hi,
            lo: lo,
            avgHumidity: Math.floor(this.collection.getAverageHumidity()),
            avgSpeed: Math.floor(this.collection.getAverageSpeed()),
            avgDescription: this.collection.getAverageDescription(),
            avgDirection: directions(this.collection.getAverageDirection())
        }));
    }
});