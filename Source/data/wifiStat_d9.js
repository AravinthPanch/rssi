var wifiStat1 = ;

var wifiStat2 = ;

var wifiStat = [];

function getWifiStatRepeatability() {
    console.log('Wifi_d9')

    $.each(wifiStat1, function (key, val) {
        wifiStat.push({
            'x': val.x,
            'y': val.y,
            'small01_variance': val.variance,
            'small01_mean': val.mean * -1,
            'rssi': val.rssi,
            'room': val.room
        })
    });

    $.each(wifiStat2, function (key, val) {
        wifiStat[key].small02_mean = val.mean * -1;
        wifiStat[key].small02_variance = val.variance;
        wifiStat[key].rssi = wifiStat[key].rssi.concat(val.rssi)
    });

    $.each(wifiStat, function (key, val) {
        if (val.rssi.length != 0) {
            wifiStat[key].groupVariance = d3.round(app.utils.statisticsCalculator(val.rssi).variance, 2)
        } else {
            wifiStat[key].groupVariance = 'No Data'
        }
    })

    wifiStat.push({
        'small01_mean_variance': [],
        'small02_mean_variance': [],

        'small01_avg_mean': [],
        'small02_avg_mean': [],

        'small_mean_variance': []
    })

    $.each(wifiStat, function (key, val) {
        if (key != 20
            && val.small01_variance != 'No Data'
            && val.small01_mean != 'No Data'
            && val.small02_variance != 'No Data'
            && val.small02_mean != 'No Data'
            && val.groupVariance != 'No Data'
            ) {
            wifiStat[20].small01_mean_variance.push(val.small01_variance);
            wifiStat[20].small02_mean_variance.push(val.small02_variance);

            wifiStat[20].small01_avg_mean.push(val.small01_mean);
            wifiStat[20].small02_avg_mean.push(val.small02_mean);

            wifiStat[20].small_mean_variance.push(val.groupVariance);
        }
    })

    wifiStat[20].small01_mean_variance = d3.round(app.utils.statisticsCalculator(wifiStat[20].small01_mean_variance).mean, 2)
    wifiStat[20].small02_mean_variance = d3.round(app.utils.statisticsCalculator(wifiStat[20].small02_mean_variance).mean, 2)

    wifiStat[20].small01_avg_mean = d3.round(app.utils.statisticsCalculator(wifiStat[20].small01_avg_mean).mean, 2)
    wifiStat[20].small02_avg_mean = d3.round(app.utils.statisticsCalculator(wifiStat[20].small02_avg_mean).mean, 2)

    console.log(wifiStat[20].small_mean_variance)
    wifiStat[20].small_mean_variance = d3.round(app.utils.statisticsCalculator(wifiStat[20].small_mean_variance).mean, 2)

    var template = "<tr>" +
        "<td>Measurement Points</td>" +
        "<td>Room</td>" +
        "<td>X in meters</td>" +
        "<td>Y in meters</td>" +
        "<td>Experiment01 Variance</td><td>Experiment01 Mean in dBm</td>" +
        "<td>Experiment02 Variance</td><td>Experiment02 Mean in dBm</td>" +
        "<td>Group Variance</td>" +
        "</tr>";

    $('#wifiTab').append(template)

    var i = 1;
    $.each(wifiStat, function (key, val) {
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
                '<td>' + val.groupVariance + '</td>' +
                '</tr>';

            $('#wifiTab').append(template)
            i++;
        }
    });

    template = '<tr>' +
        '<td>' + 'Average' + '</td>' +
        '<td>' + ' ' + '</td>' +
        '<td>' + ' ' + '</td>' +
        '<td>' + ' ' + '</td>' +
        '<td>' + wifiStat[20].small01_mean_variance + '</td>' +
        '<td>' + ' ' + '</td>' +
        '<td>' + wifiStat[20].small02_mean_variance + '</td>' +
        '<td>' + ' ' + '</td>' +
        '<td><div class="groupVariance">' + wifiStat[20].small_mean_variance + '</div></td>' +
        '</tr>';
    $('#wifiTab').append(template)

}
