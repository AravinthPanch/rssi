/**
 * Util contains functions of utilities which are used in APP
 *
 * @class utils
 */
var utils = {
    /**
     It calculates statistics such as mean, variance, deviation of RSSI
     @method statisticsCalculator
     @param {Array} data An Array of RSSI values
     @return {Number, Array} Statistics
     **/
    statisticsCalculator: function (a) {
        var r = {mean: 0, variance: 0, deviation: 0}, t = a.length;
        for (var m, s = 0, l = t; l--; s += a[l]);
        for (m = r.mean = s / t, l = t, s = 0; l--; s += Math.pow(a[l] - m, 2));
        return r.deviation = Math.sqrt(r.variance = s / t), r;
    }
}

