var sigGen1 = ;

var sigGen2 = ;

var sigGenStat = [];

function getSigGenRepeatability() {
    console.log('SigGen_d9')

    $.each(sigGen1, function (key, val) {
        if (val.mean != 'No Data') {
            val.mean = val.mean * -1;
        }

        sigGenStat.push({
            'x': val.x,
            'y': val.y,
            'small01_variance': val.variance,
            'small01_mean': val.mean,
            'rssi': val.rssi,
            'room': val.room
        })
    });

    $.each(sigGen2, function (key, val) {

        if (val.mean != 'No Data') {
            val.mean = val.mean * -1;
        }

        sigGenStat[key].small02_mean = val.mean;
        sigGenStat[key].small02_variance = val.variance;
        sigGenStat[key].rssi = sigGenStat[key].rssi.concat(val.rssi)
    });

    $.each(sigGenStat, function (key, val) {
        if (val.rssi.length != 0) {
            sigGenStat[key].groupVariance = d3.round(app.utils.statisticsCalculator(val.rssi).variance, 2)
        } else {
            sigGenStat[key].groupVariance = 'No Data'
        }
    })

    sigGenStat.push({
        'small01_mean_variance': [],
        'small02_mean_variance': [],

        'small01_avg_mean': [],
        'small02_avg_mean': [],

        'small_mean_variance': []
    })
    $.each(sigGenStat, function (key, val) {
        if (key != 20
            && val.small01_variance != 'No Data'
            && val.small01_mean != 'No Data'
            && val.small02_variance != 'No Data'
            && val.small02_mean != 'No Data'
            && val.groupVariance != 'No Data'
            ) {

            sigGenStat[20].small01_mean_variance.push(val.small01_variance);
            sigGenStat[20].small02_mean_variance.push(val.small02_variance);

            sigGenStat[20].small01_avg_mean.push(val.small01_mean);
            sigGenStat[20].small02_avg_mean.push(val.small02_mean);

            sigGenStat[20].small_mean_variance.push(val.groupVariance);
        }
    })


    sigGenStat[20].small01_mean_variance = d3.round(app.utils.statisticsCalculator(sigGenStat[20].small01_mean_variance).mean, 2)
    sigGenStat[20].small02_mean_variance = d3.round(app.utils.statisticsCalculator(sigGenStat[20].small02_mean_variance).mean, 2)

    sigGenStat[20].small01_avg_mean = d3.round(app.utils.statisticsCalculator(sigGenStat[20].small01_avg_mean).mean, 2)
    sigGenStat[20].small02_avg_mean = d3.round(app.utils.statisticsCalculator(sigGenStat[20].small02_avg_mean).mean, 2)

    console.log(sigGenStat[20].small_mean_variance)

    sigGenStat[20].small_mean_variance = d3.round(app.utils.statisticsCalculator(sigGenStat[20].small_mean_variance).mean, 2)

    var template = "<tr>" +
        "<td>Measurement Points</td>" +
        "<td>Room</td>" +
        "<td>X in meters</td>" +
        "<td>Y in meters</td>" +
        "<td>Experiment01 Variance</td><td>Experiment01 Mean in dBm</td>" +
        "<td>Experiment02 Variance</td><td>Experiment02 Mean in dBm</td>" +
        "<td>Group Variance</td>" +
        "</tr>";

    $('#sigGenTab').append(template)

    var i = 1;
    $.each(sigGenStat, function (key, val) {
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

            $('#sigGenTab').append(template)
            i++;
        }
    });

    template = '<tr>' +
        '<td>' + 'Average' + '</td>' +
        '<td>' + ' ' + '</td>' +
        '<td>' + ' ' + '</td>' +
        '<td>' + ' ' + '</td>' +
        '<td>' + sigGenStat[20].small01_mean_variance + '</td>' +
        '<td>' + ' ' + '</td>' +
        '<td>' + sigGenStat[20].small02_mean_variance + '</td>' +
        '<td>' + ' ' + '</td>' +
        '<td><div class="groupVariance">' + sigGenStat[20].small_mean_variance + '</div></td>' +
        '</tr>';
    $('#sigGenTab').append(template)

}

