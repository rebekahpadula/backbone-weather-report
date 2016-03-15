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
        var url = 'http://api.openweathermap.org/data/2.5/forecast/daily?count=7&id=' + cityId;

        url += '&appid=' + apiKey;

        var request = new XMLHttpRequest();
        // Callback function to be executed with the data
        request.onreadystatechange = function () {
            if (request.readyState === 4) {
                callback(JSON.parse(request.responseText));
            }
        };

        request.open('GET', url);

        request.send();
    };
    // Creates default view with Moscow
    getWeatherForcast('524901', updateData);

    // Creating templates
    var weatherViewTemplate = _.template($('#weather-template').html());

    var weatherInfoTemplate = _.template($('#weather-info-template').html());

    // Creating elements for templates and appending them
    function createInfoView (model) {
        var el = $('<div>');
        var info = weatherInfoTemplate(model);

        el.html(info);

        return {
            el: el
        };
    }

    function createWeatherView (model) {
        var el = $('<div>');
        var contents = weatherViewTemplate(model);

        el.html(contents);

        return {
            el: el
        };
    }

    // Function that the event listener is executing. Reseting collection and adding a new one.
    // mapping it to new views
    function renderWeatherView (collection) {
        $('#main').html('');
        var children = collection.map(createWeatherView);
        var childEls = children.map(function (x) {
            return x.el;
        });

        $('#main').append(childEls);
    }
    // rendering city name/country/lat/lon view
    function renderWeatherInfoView (model) {
        $('#weather-info').html('');
        var childView = createInfoView(model);
        $('#weather-info').append(childView.el);
    }
    // Begin event listeners
    collection.on('add', function () {
        renderWeatherView(collection);
    });

    city.on('change', function () {
        renderWeatherInfoView(city);
    });

    button.on('click', function () {
        getWeatherForcast(input.val(), updateData);
        input.val('');
    });
    // End event listeners
})();