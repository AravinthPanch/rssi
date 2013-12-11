/*
 * RSSI Distribution Visualization Tool
 * Author: Aravinth, S. Panchadcharam
 * Date: 20 November 2013
 * Email: panch.aravinth@gmail.com
 * */


/*
 * DOM Ready using Jquery
 * TODO: Modularity by Require.JS
 * */
$(function () {
    initiateUI();
    loadData();
});


/*
 * Constants - URI, UI DOM
 * */
var dataBaseUriRemote = 'http://ec2-54-217-136-137.eu-west-1.compute.amazonaws.com:5000/evarilos/raw_data/v1.0/database';
var dataBaseUriLocal = 'http://localhost:5000/evarilos/raw_data/v1.0/database';
var server = '';
var rssiData = []; // Complete JSON of selected Collection
var locationData = []; // All Locations of selected Collection
var nodeData = []; // Details of selected Node
var ssidData = []; // Complete JSON of grouped SSID of selected Node
var selectedSsidData = []; // Currently selected data of SSID
var chartData = []; // Chart Data of selected SSID

function clearCache(){
    rssiData = []
    locationData = []
    nodeData = []
    ssidData = []
    selectedSsidData = []
    chartData = []
}


/*
 * Initiates all Jquery UI. Tabs and Accordions are used.
 * TODO: Convert unwanted Tabs into DIVs with CSS
 * */
function initiateUI() {
    console.log('UI Initiated')
    $("#tabs").tabs();
    $("#infoTab").tabs();
    $("#servers").tabs();
    $("#radio").buttonset();
    $("#databases").tabs();
    $("#collections").tabs();
    $("#accesspoints").tabs();
    $("#floor_infos").tabs();
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
    $('#radio1').click(function () {
        server = 'local'
        $("#database-1").empty()
        $("#collection-1").empty()
        loadDatabaseList(dataBaseUriLocal);
    })
    $('#radio2').click(function () {
        server = 'remote'
        $("#database-1").empty()
        $("#collection-1").empty()
        loadDatabaseList(dataBaseUriRemote);
    })
}


/*
 * Sends AJAX Request to the given URI and returns the result in JSON
 * Load the list of Databases into UI
 * Binds Click events to load collection
 * TODO: Define UI Constants
 * */
function loadDatabaseList(uri) {
    $('#loader').show()
    $.getJSON(uri, function (results) {
        $('#loader').hide()
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
    $('#collection-1').empty()
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
    $(el).addClass('clicked')
    var uri = $(el).attr('href')

    clearCache()

    switch (server) {
        case 'local' :
            $.getJSON(uri, function (results) {
                rssiData = results
                loadLocations(rssiData)
            })
            break;
        case  'remote' :
            loadRssiListRemoteServer(uri)
            break;
        default :
            alert('Server URL Error')
    }
}


/*
 * Protocol for Remote
 * TODO: Bind data to synchronize
 * */
function loadRssiListRemoteServer(uri) {
    $.getJSON(uri, function (results) {
        $.each(results, function(i, field){
            $.getJSON(field.URI, function (results) {
                rssiData.push(results)
            })
        })
    })

    setTimeout(function(){
        loadLocations(rssiData)
    },4000)
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
}


/*
 * Convert the Locations into Co-Ordinate to fit the floor plan
 * */
function setPoints(data) {
    $('#ruler').empty()
    $('#accesspoint-1').empty()


    $.each(data, function (i, field) {
        locationData.push(field.location)

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

    updateFloorInfoUi(0)

    $("#accordion").accordion({
        active: 1
    })
}

function updateFloorInfoUi(scan){
    $('#floor_info-1').empty()
    $('#floor_info-1').append("<b>Number of Measurement Points : </b>" + locationData.length)
    $('#floor_info-1').append("<br>")
    $('#floor_info-1').append("<b>Number of RSSIs measured at Selected Point: </b>" + scan)
}


/*
 * Load list of Access Points
 * */
function loadAccessPoints(data) {
    var nodeLabel = data
    $('#accesspoint-1').empty()

    getNodeData(data);

    $.each(rssiData, function (i, field) {
        if (field.location.node_label == nodeLabel) {
            var rssi = field.rawRSSI

            updateFloorInfoUi(rssi.length)

            ssidData = _.groupBy(rssi, function (run) {
                return run.sender_ssid + '_' + run.sender_bssid
            })

            $.each(ssidData, function (i, field) {
                var template = '<div class=accessPointUri value=' + i + '>' + i + '</div>'
                $('#accesspoint-1').append(template)
            })

            $('.accessPointUri').click(function (event) {
                $(event.target).addClass('clicked')
                var ssid = $(event.target).attr('value')
                $.each(ssidData, function (i, field) {
                    if (i == ssid) {
                        processRssiData(field)
                    }
                })
            })

        }
    })

}


/*
 * Retrieve the node data
 * */
function getNodeData(data) {
    $.each(locationData, function (i, field) {
        if (field.node_label == data) {
            nodeData = field
        }
    })
}


/*
 * Process the data to input into the chart
 * */
function processRssiData(data) {
    selectedSsidData = data

    var result = []
    $.each(data, function (i, field) {
        result.push(field.rssi)
    })

    result = _.groupBy(result)
    var res = []
    $.each(result, function (i, field) {
        res.push({
            'rssi': i,
            'runs': field.length
        })
    })
    chartData = _.sortBy(res, function (field) {
        return -field.rssi
    })
    drawChart(chartData)
}


/*
 * Draw the chart
 * */
function drawChart(data) {
    var runs = []
    var rssi = []

    $.each(data, function (i, field) {
        rssi.push(field.rssi)
        runs.push(field.runs)
    })

    updateNodeDataUI(nodeData)

    var barChartData = {
        labels: rssi,
        datasets: [
            {
                fillColor: "orange",
                strokeColor: "orangered",
                data: runs
            }
        ]
    }
    new Chart(document.getElementById("canvas").getContext("2d")).Bar(barChartData);
    showGraphPanel()
}


/*
 * Update the node details in Tab
 * */
function updateNodeDataUI(data) {
    $('#infoTab-1').empty()
    $('#infoTab-1').append("<br>")
    $('#infoTab-1').append("<b>SSID : </b>" + selectedSsidData[0].sender_ssid)
    $('#infoTab-1').append("<br>")
    $('#infoTab-1').append("<b>BSSID : </b>" + selectedSsidData[0].sender_bssid)
    $('#infoTab-1').append("<br>")
    $('#infoTab-1').append("<b>Total Number of measurements: </b>" + selectedSsidData.length)
    $('#infoTab-1').append("<br>")
    $('#infoTab-1').append("<br>")
    $('#infoTab-1').append("<b>Node Label : </b>" + data.node_label)
    $('#infoTab-1').append("<br>")
    $('#infoTab-1').append("<b>Room Label : </b>" + data.room_label)
    $('#infoTab-1').append("<br>")
    $('#infoTab-1').append("<b>Coordinate X : </b>" + data.coordinate_x)
    $('#infoTab-1').append("<br>")
    $('#infoTab-1').append("<b>Coordinate Y : </b>" + data.coordinate_y)
}


/*
 * open up the graph Panel
 * */
function showGraphPanel() {
    $("#accordion").accordion({
        active: 2
    })
}


/*
* Toggle Click
* */
function toggleClick(){

}













