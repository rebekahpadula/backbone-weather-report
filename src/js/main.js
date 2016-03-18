// (function () {
    var apiKey = '21cb4ea719835bf2f0d647f66a658b16';
    var forecastCollection = new ForecastCollection();
    var cityModel = new CityModel();
    var forecastDayView = new ForecastDayView();

    var app = {};

    _.extend(app, Backbone.Events);

    var appView = new AppView({
        city: cityModel,
        forecast: forecastCollection,
        forecastDayView: forecastDayView
    });

    function getWeatherForecast (cityId, callback) {
        $.ajax({
            url: 'http://api.openweathermap.org/data/2.5/forecast/daily?count=7&id=' + cityId + '&appid=' + apiKey,
            method: 'GET',
            success: callback
        });
    };

    app.on('forecast', function (code) {
        getWeatherForecast(code, function (data) {
            forecastCollection.reset();
            forecastCollection.add(data.list);
            cityModel.set('name', data.city.name);
        });
    });

    function updateData (data) {
        forecastCollection.reset();
        forecastCollection.add(data.list);
        cityModel.set('name', data.city.name);
        cityModel.set('country', data.city.country);
        cityModel.set('lat', data.city.coord.lat);
        cityModel.set('lon', data.city.coord.lon);
    }

    app.trigger('forecast', '4256038');

    // getWeatherForcast('524901', updateData);

    appView.render();

    $('#app').append(appView.$el);

    // var apiKey = '21cb4ea719835bf2f0d647f66a658b16';
    // var input = $('<input>', { class: 'input' });
    // var button = $('<button>', { class: 'input' }).text('change city');
    // $(document.body).append(input);
    // $(document.body).append(button);

    // // Updates view with info
    // function updateData (data) {
    //     console.log(data);
    //     collection.reset();
    //     collection.add(data.list);
    //     city.set('name', data.city.name);
    //     city.set('country', data.city.country);
    //     city.set('lat', data.city.coord.lat);
    //     city.set('lon', data.city.coord.lon);
    // }

    // // Makes a request to openweathermap with apiKey for specified city, callback
    // // function insures readyState
    // function getWeatherForcast (cityId, callback) {
    //     $.ajax({
    //         url: 'http://api.openweathermap.org/data/2.5/forecast/daily?count=7&units=imperial&id=' + cityId + '&appid=' + apiKey,
    //         method: 'GET',
    //         success: callback
    //     });
    // };

    // // Creates default view with Moscow
    // getWeatherForcast('524901', updateData);

    // // Creating elements for templates and appending them
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

    // function createListView (collection) {
    //     var el = $('<div>');

    //     function render () {
    //         el.empty();

    //         var children = collection.map(createWeatherView);
    //         var childEls = children.map(function (x) {
    //             return x.el;
    //         });

    //         el.append(childEls);
    //     }

    //     collection.on('add', render);

    //     render();

    //     return {
    //         el: el,
    //         destroy: function () {
    //             collection.off('add', render);
    //             el.remove();
    //         }
    //     };
    // }

    // function createWeatherView (model) {
    //     var el = $('<div>');

    //     function render () {
    //         var data = _.extend({}, model.attributes, {
    //             cardinal: directions(model.get('deg'))
    //         });
    //         var weatherViewTemplate = _.template($('#weather-template').html());
    //         var contents = weatherViewTemplate(data);
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

    // function createAverageView (collection) {
    //     var el = $('<div>');
    //     var template = _.template($('#weather-averages-template').html());

    //     function render () {
    //         var contents = template({
    //             maxTemp: Math.floor(collection.getAverageMaxTemp()),
    //             minTemp: Math.floor(collection.getAverageMinTemp()),
    //             avgHumidity: Math.floor(collection.getAverageHumidity()),
    //             avgSpeed: Math.floor(collection.getAverageSpeed()),
    //             avgDescription: collection.getAverageDescription(),
    //             avgDirection: Math.floor(collection.getAverageDirection())
    //         });
    //         el.empty();
    //         el.html(contents);
    //     }
    //     collection.on('add', render);
    //     return { el: el };
    // }
    // // Appending views to DOM elements
    // var infoView = createCityView(city);

    // $('#weather-info').append(infoView.el);

    // var listView = createListView(collection);

    // $('#main').append(listView.el);

    // var avgView = createAverageView(collection);

    // $('#averages').append(avgView.el);

    // // Event listener
    // button.on('click', function () {
    //     getWeatherForcast(input.val(), updateData);
    //     input.val('');
    // });
// })();