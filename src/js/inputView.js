var InputView = Backbone.View.extend({

    className: 'CityInput',

    tagName: 'input',

    events: {
        'keydown': 'onKeydown'
    },

    onKeydown: function (e) {
        if (e.keyCode === 13) {
            app.trigger('forecast', this.$el.val());
        }
    }
});