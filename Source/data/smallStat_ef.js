var small01 = ;

var small02 = ;

var small03 = ;

var small04 = ;


var smallStat = [];

function getSmallRepeatability() {
    console.log('Small_ef')

    $.each(small01, function (key, val) {
        smallStat.push({
            'x': val.x,
            'y': val.y,
            'small01_variance': val.variance,
            'small01_mean': val.mean * -1,
            'rssi': val.rssi,
            'room': val.room
        })
    });

    $.each(small02, function (key, val) {
        smallStat[key].small02_mean = val.mean * -1;
        smallStat[key].small02_variance = val.variance;
        smallStat[key].rssi = smallStat[key].rssi.concat(val.rssi)
    });

    $.each(small03, function (key, val) {
        smallStat[key].small03_mean = val.mean * -1;
        smallStat[key].small03_variance = val.variance;
        smallStat[key].rssi = smallStat[key].rssi.concat(val.rssi)
    });

    $.each(small04, function (key, val) {
        smallStat[key].small04_mean = val.mean * -1;
        smallStat[key].small04_variance = val.variance;
        smallStat[key].rssi = smallStat[key].rssi.concat(val.rssi)
    });

    $.each(smallStat, function (key, val) {
        if (val.rssi.length != 0) {
            smallStat[key].groupVariance = d3.round(app.utils.statisticsCalculator(val.rssi).variance, 2)
        } else {
            smallStat[key].groupVariance = 'No Data'
        }
    })

    smallStat.push({
        'small01_mean_variance': [],
        'small02_mean_variance': [],
        'small03_mean_variance': [],
        'small04_mean_variance': [],

        'small01_avg_mean': [],
        'small02_avg_mean': [],
        'small03_avg_mean': [],
        'small04_avg_mean': [],

        'small_mean_variance': []
    })

    $.each(smallStat, function (key, val) {
        if (key != 20
            && val.small01_variance != 'No Data'
            && val.small01_mean != 'No Data'
            && val.small02_variance != 'No Data'
            && val.small02_mean != 'No Data'
            && val.small03_variance != 'No Data'
            && val.small03_mean != 'No Data'
            && val.small04_variance != 'No Data'
            && val.small04_mean != 'No Data'
            && val.groupVariance != 'No Data'
            ) {
            smallStat[20].small01_mean_variance.push(val.small01_variance);
            smallStat[20].small02_mean_variance.push(val.small02_variance);
            smallStat[20].small03_mean_variance.push(val.small03_variance);
            smallStat[20].small04_mean_variance.push(val.small04_variance);

            smallStat[20].small_mean_variance.push(val.groupVariance);

            smallStat[20].small01_avg_mean.push(val.small01_mean);
            smallStat[20].small02_avg_mean.push(val.small02_mean);
            smallStat[20].small03_avg_mean.push(val.small03_mean);
            smallStat[20].small04_avg_mean.push(val.small04_mean);
        }
    })

    smallStat[20].small01_mean_variance = d3.round(app.utils.statisticsCalculator(smallStat[20].small01_mean_variance).mean, 2)
    smallStat[20].small02_mean_variance = d3.round(app.utils.statisticsCalculator(smallStat[20].small02_mean_variance).mean, 2)
    smallStat[20].small03_mean_variance = d3.round(app.utils.statisticsCalculator(smallStat[20].small03_mean_variance).mean, 2)
    smallStat[20].small04_mean_variance = d3.round(app.utils.statisticsCalculator(smallStat[20].small04_mean_variance).mean, 2)

    smallStat[20].small01_avg_mean = d3.round(app.utils.statisticsCalculator(smallStat[20].small01_avg_mean).mean, 2)
    smallStat[20].small02_avg_mean = d3.round(app.utils.statisticsCalculator(smallStat[20].small02_avg_mean).mean, 2)
    smallStat[20].small03_avg_mean = d3.round(app.utils.statisticsCalculator(smallStat[20].small03_avg_mean).mean, 2)
    smallStat[20].small04_avg_mean = d3.round(app.utils.statisticsCalculator(smallStat[20].small04_avg_mean).mean, 2)

//    console.log(smallStat[20].small_mean_variance)
    smallStat[20].small_mean_variance = d3.round(app.utils.statisticsCalculator(smallStat[20].small_mean_variance).mean, 2)

    var template = "<tr>" +
        "<td>Measurement Points</td>" +
        "<td>Room</td>" +
        "<td>X in meters</td>" +
        "<td>Y in meters</td>" +
        "<td>Experiment01 Variance</td><td>Experiment01 Mean in dBm</td>" +
        "<td>Experiment02 Variance</td><td>Experiment02 Mean in dBm</td>" +
        "<td>Experiment03 Variance</td><td>Experiment03 Mean in dBm</td>" +
        "<td>Experiment04 Variance</td><td>Experiment04 Mean in dBm</td>" +
        "<td>Group Variance</td>" +
        "</tr>";

    $('#smallTab').append(template)

    var i = 1;
    $.each(smallStat, function (key, val) {
        if (key <= 19) {

            template = '<tr>' +
                '<td>' + i + '</td>' +
                '<td>' + val.room + '</td>' +
                '<td>' + val.x + '</td>' +
                '<td>' + val.y + '</td>' +
                '<td>' + val.small01_variance + '</td>' +
                '<td>' + val.small01_mean + '</td>' +
                '<td>' + val.small02_variance + '</td>' +
                '<td>' + val.small02_mean + '</td>' +
                '<td>' + val.small03_variance + '</td>' +
                '<td>' + val.small03_mean + '</td>' +
                '<td>' + val.small04_variance + '</td>' +
                '<td>' + val.small04_mean + '</td>' +
                '<td>' + val.groupVariance + '</td>' +
                '</tr>';

            $('#smallTab').append(template)
            i++;
        }
    });

    template = '<tr>' +
        '<td>' + 'Average' + '</td>' +
        '<td>' + ' ' + '</td>' +
        '<td>' + ' ' + '</td>' +
        '<td>' + ' ' + '</td>' +
        '<td>' + smallStat[20].small01_mean_variance + '</td>' +
        '<td>' + ' ' + '</td>' +
        '<td>' + smallStat[20].small02_mean_variance + '</td>' +
        '<td>' + ' ' + '</td>' +
        '<td>' + smallStat[20].small03_mean_variance + '</td>' +
        '<td>' + ' ' + '</td>' +
        '<td>' + smallStat[20].small04_mean_variance + '</td>' +
        '<td>' + ' ' + '</td>' +
        '<td><div class="groupVariance">' + smallStat[20].small_mean_variance + '</div></td>' +
        '</tr>';

    $('#smallTab').append(template)

}
