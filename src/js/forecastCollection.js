var ForecastCollection = Backbone.Collection.extend({

    model: ForecastDayModel,

    getAverageMaxTemp: function () {
        return this.reduce(function (prev, model) {
            return model.get('temp').max + prev;
        }, 0) / this.length;
    },

    getAverageMinTemp: function () {
        return this.reduce(function (prev, model) {
            return model.get('temp').min + prev;
        }, 0) / this.length;
    },

    getAverageHumidity: function () {
        return this.reduce(function (prev, model) {
            return model.get('humidity') + prev;
        }, 0) / this.length;
    },

    getAverageSpeed: function () {
        return this.reduce(function (prev, model) {
            return model.get('speed') + prev;
        }, 0) / this.length;
    },

    getAverageDescription: function () {
        var modeValue;
        var modeCount = 0;
        var _this = this;

        this.forEach(function (x) {
            var total = 0;

            _this.forEach(function (y) {
                if (x.get('weather')[0].description === y.get('weather')[0].description) {
                    total++;
                }
            });

            if (total > modeCount) {
                modeCount = total;
                modeValue = x.get('weather')[0].description;
            }
        });

        return modeValue;
    },

    getAverageDirection: function () {
        return this.reduce(function (prev, model) {
            return model.get('deg') + prev;
        }, 0) / this.length;
    }

});