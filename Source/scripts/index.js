/*
 * DOM Ready using Jquery
 * TODO: Modularity by Require.JS
 * */
$(function () {
    initiateUI();
//    loadAccessPoints('229');
    loadData();
});

/*
 * Constants - URI, UI DOM
 * */
var dataBaseUriRemote = 'http://ec2-54-217-136-137.eu-west-1.compute.amazonaws.com:5000/evarilos/raw_data/v1.0/database';
var dataBaseUriLocal = 'http://localhost:5000/evarilos/raw_data/v1.0/database';
var rssiData = [];
var ssidData = [];
var chartData = [];

/*
 * Initiates all Jquery UI. Tabs and Accordions are used.
 * TODO: Convert unwanted Tabs into DIVs with CSS
 * */
function initiateUI() {
    console.log('UI Initiated')
    $("#tabs").tabs();
    $("#infoTab").tabs();
    $("#databases").tabs();
    $("#collections").tabs();
    $("#accesspoints").tabs();
    $("#accordion").accordion({
        collapsible: true,
        active: 0
    });
}

/*
 * Load data from Evarilos Cloud Server.
 * 3 Sets of Ajax Requests are sent to retrieve JSON Data of
 * List of Databases, List of Collections and Location Specific Messages
 * TODO: Input Local and Remote Database URI
 * */
function loadData() {
    loadDatabaseList(dataBaseUriLocal);
}

/*
 * Sends AJAX Request to the given URI and returns the result in JSON
 * Load the list of Databases into UI
 * Binds Click events to load collection
 * TODO: Define UI Constants
 * */
function loadDatabaseList(uri) {
    $.getJSON(uri, function (results) {
        $.each(results, function (i, field) {
            var template = '<div class=dataBaseUri href=' + field + '>' + i + '</div>'
            $("#database-1").append(template)
        })
        $('.dataBaseUri').click(function (event) {
            //TODO: toggle click
            loadCollectionList(event.target)
        })
    })
}

/*
 * Load the list of Collections into UI
 *
 * */
function loadCollectionList(el) {
    $('#collection-1').html('')
    $(el).addClass('clicked')

    var uri = $(el).attr('href')
    $.getJSON(uri, function (results) {
        $.each(results, function (i, field) {
            var template = '<div class=collectionUri href=' + field + '>' + i + '</div>'
            $('#collection-1').append(template)
        })
        $('.collectionUri').click(function (event) {
            loadRssiList(event.target)
        })
    })
}

/*
 * Get the RSSI data , cache it in the variable RssiData and Load Locations on the floor plan
 * */
function loadRssiList(el) {
    var uri = $(el).attr('href')
    $.getJSON(uri, function (results) {
        rssiData = results
        loadLocations(results)
    })
}


/*
 * Extract the locations from Data and load it onto floor plan
 * */
function loadLocations(data) {
    var locations = []
    $.each(data, function (i, field) {
        locations.push(field)
    })
    floorMapper(locations)
}

/*
 * Convert the Locations into Co-Ordinate and Set the points in the floor
 * */
function floorMapper(data) {
    var nodes = $.each(data, function (i, field) {
        // due to the bug in the python backend x and y must be interchanged
        var axis = pixelConverter(field.location.coordinate_y, field.location.coordinate_x);
        field.location.coordinate_x = axis[0]
        field.location.coordinate_y = axis[1]
    })
    setPoints(nodes)
}

/*
 * Convert the Locations into Co-Ordinate to fit the floor plan
 * */
function pixelConverter(x, y) {
    var xPix = x * 25.4;
    var yPix = y * 25.2;

    //adjusted to calibrate
    //var xAxis = 0 + xPix;
    //var yAxis = 366 - yPix;

    var xAxis = -15 + xPix;
    var yAxis = 380 - yPix;

    var axis = [xAxis, yAxis];
    return axis
};

/*
 * Convert the Locations into Co-Ordinate to fit the floor plan
 * */
function setPoints(data) {
    $.each(data, function (i, field) {
        var template = '<div id="node' + field.location.node_label + '" class="pointer"/>'
        $('#ruler').append(template)

        var node = '#node' + field.location.node_label
        $(node).css('left', field.location.coordinate_x + 'px')
        $(node).css('top', field.location.coordinate_y + 'px')
    })

    $('.pointer').click(function (event) {
        var node_label = (event.target.id).substr(4, 6)
        loadAccessPoints(node_label)
    })

    $("#accordion").accordion({
        active: 1
    })
}

/*
 * Load list of Access Points
 * */
function loadAccessPoints(data) {
    var nodeLabel = data
    $('#accesspoint-1').html('')

    $.each(rssiData, function (i, field) {
        if (field.location.node_label == nodeLabel) {
            var rssi = field.rawRSSI
            ssidData = _.groupBy(rssi, function(run){ return run.sender_ssid })

            $.each(ssidData, function (i, field) {
                var template = '<div class=accessPointUri value=' + i + '>' + i + '</div>'
                $('#accesspoint-1').append(template)
            })

            $('.accessPointUri').click(function (event) {
                var ssid = $(event.target).attr('value')
                console.log(ssid)
            })

        }
    })
}



/*------------------------------------*/
function extractRssi(node) {
    console.log()
    var extractedRssi = []
    _.each(rawDataRssi[0], function (i) {
        if (i.location.node_label == node) {
            updateNodeDetailUI(i.location.node_label, i.location.room_label)
            _.each(i.rawRSSI, function (n) {
                console.log(n.sender_ssid)
                extractedRssi.push(n.rssi)
            })
        }
    })

    var groupedRssi = _.sortBy(_.groupBy(extractedRssi))
    var resultRssi = []
    var resultLabel = []
    var resultData = []

    _.each(groupedRssi, function (i) {
//        console.log(i[0] + ' ' + i.length)
        resultLabel.push(i[0])
        resultData.push(i.length)
        resultRssi.push({
            'rssi': i[0],
            'run': i.length
        })
    })

//    console.log(resultLabel)
//    console.log(resultData)
//    console.log(groupedRssi)
//    console.log(resultRssi)
//    console.log(JSON.stringify(resultRssi))

    return { 'label': resultLabel, 'rssi': resultData }
}



function drawChart(data) {
    var barChartData = {
        labels: data.label,
        datasets: [
            {
                fillColor: "orange",
                strokeColor: "orangered",
                data: data.rssi
            }
        ]
    }
    new Chart(document.getElementById("canvas").getContext("2d")).Bar(barChartData);

};



function showGraphPanel(node_label) {
    var data = extractRssi(node_label)
    drawChart(data);
    $("#accordion").accordion({
        active: 2
    });

};


function updateNodeDetailUI(node, room) {
    $('#infoTab-1').html("")
    $('#infoTab-1').append("<b>Node Label : </b>" + node)
    $('#infoTab-1').append("<br>")
    $('#infoTab-1').append("<b>Room Label : </b>" + room)

};






