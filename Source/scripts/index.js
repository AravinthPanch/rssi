/*
 * RSSI Distribution Visualization Tool
 * Author: Aravinth, S. Panchadcharam
 * Date: 20 November 2013
 * Email: panch.aravinth@gmail.com
 * */



/*
 * DOM Ready
 * */
$(function () {
    initiateUI();
    loadData();
});


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
 * Load list of Access Points
 * */
function loadAccessPoints(data) {
    var nodeLabel = data
    $('#accesspoint-1').empty()

    getNodeData(data);

    $.each(rssiData, function (i, field) {
        if (field.location.node_label == nodeLabel) {

            var rssi = field.rawRSSI

            if('latency' in field){
                updateFloorInfoUi({scan:rssi.length,latency:field.latency})
            }else {
                updateFloorInfoUi({scan:rssi.length,latency:'Unknown'})
            }

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
 * Process the data to input into the chart.JS
 * */
function processRssiData(data) {
    selectedSsidData = data
    graphData = _.map(selectedSsidData, function(d){ return d.rssi})
    drawGraph(graphData)
}

















