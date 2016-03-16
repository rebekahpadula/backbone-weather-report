(function () {
    var collection = new Backbone.Collection();
    var city = new Backbone.Model();
    var cityEl = document.querySelector('#city');

    var apiKey = '21cb4ea719835bf2f0d647f66a658b16';
    var input = $('<input>');
    var button = $('<button>').text('change city');
    $(document.body).append(input);
    $(document.body).append(button);

    // To fahrenheit
    // var WeatherModel = Backbone.Model.extend({
    //     getLo: function () {
    //         return toFahrenheit(this.get('temp').min);
    //     },
    //     getHi: function () {
    //         return toFahrenheit(this.get('temp').max);
    //     }
    // });

    // var WeatherCollection = Backbone.Collection.extend({
    //     model: WeatherModel
    // });

    // var collection = new WeatherCollection();

    // Function for converting directions
    function Direction (input) {
        var cardinalDirections = ['N', 'NE', 'E', 'SE', 'S', 'SW', 'W', 'NW'];
        var range = 360 / cardinalDirections.length;
        var output = cardinalDirections[0];

        for (var i = cardinalDirections.length, j = 360; input > 0 && j > input - 22.5; (i--, j -= range)) {
            output = cardinalDirections[i];
        }
        return output;
    }

    // Updates view with info
    function updateData (data) {
        collection.reset();
        collection.add(data.list);
        city.set('name', data.city.name);
        city.set('country', data.city.country);
        city.set('lat', data.city.coord.lat);
        city.set('lon', data.city.coord.lon);
    }

    // Makes a request to openweathermap with apiKey for specified city, callback
    // function insures readyState
    function getWeatherForcast (cityId, callback) {
        $.ajax({
            url: 'http://api.openweathermap.org/data/2.5/forecast/daily?count=7&id=' + cityId + '&appid=' + apiKey,
            method: 'GET',
            success: callback
        });
    };

    // Creates default view with Moscow
    getWeatherForcast('524901', updateData);

    // Creating elements for templates and appending them
    function createInfoView (model) {
        var weatherInfoTemplate = _.template($('#weather-info-template').html());
        var el = $('<div>');
      
        function render () {
            var contents = weatherInfoTemplate(model);
            el.html(contents);
        }

        model.on('change', render);

        render();

        return {
            el: el,
            destroy: function () {
                model.off('change', render);
                el.remove();
            }
        };
    }

    function createListView (collection) {
        var el = $('<div>');

        function render () {
            el.empty();

            var children = collection.map(createWeatherView);
            var childEls = children.map(function (x) {
                return x.el;
            });

            el.append(childEls);
        }

        collection.on('add', render);

        render();

        return {
            el: el,
            destroy: function () {
                collection.off('add', render);
                el.remove();
            }
        };
    }

    function createWeatherView (model) {
        var weatherViewTemplate = _.template($('#weather-template').html());
        var el = $('<div>');

        function render () {
            var contents = weatherViewTemplate(model);
            el.html(contents);
        }

        model.on('change', render);

        render();        

        return {
            el: el,
            destroy: function () {
                model.off('change', render);
                el.remove();
            }
        };
    }

    // Function that the event listener is executing. Reseting collection and adding a new one.
    // mapping it to new views
    // function renderWeatherView (collection) {
    //     $('#main').html('');
    //     var children = collection.map(createWeatherView);
    //     var childEls = children.map(function (x) {
    //         return x.el;
    //     });

    //     $('#main').append(childEls);
    // }

    var infoView = createInfoView(city);

    $('#weather-info').append(infoView.el);

    var listView = createListView(collection);

    $('#main').append(listView.el);

    // rendering city name/country/lat/lon view
    // function renderWeatherInfoView (model) {
    //     $('#weather-info').html('');
    //     var childView = createInfoView(model);
    //     $('#weather-info').append(childView.el);
    // }

    // Begin event listeners

    button.on('click', function () {
        getWeatherForcast(input.val(), updateData);
        input.val('');
    });
    // End event listeners
})();