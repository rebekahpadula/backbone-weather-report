// Creating a new view with the giving the element a class,
// giving it a template, CityView will rerender every time the
// change event is triggered. 'this' will be assigned to whatever
// the calling object is when you create a new instance of CityView.
var CityView = Backbone.View.extend({

    className: 'city',

    template: _.template($('#weather-info-template').html()),

    initialize: function () {
        this.listenTo(this.model, 'change', this.render);
    },

    render: function () {
        this.$el.html(this.template(this.model.attributes));
    }
});

// function createCityView (model) {
//     var weatherInfoTemplate = _.template($('#weather-info-template').html());
//     var el = $('<div>');

//     function render () {
//         var contents = weatherInfoTemplate(model);
//         el.html(contents);
//     }

//     model.on('change', render);

//     render();

//     return {
//         el: el,
//         destroy: function () {
//             model.off('change', render);
//             el.remove();
//         }
//     };
// }