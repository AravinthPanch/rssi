var view = {

    /*
     * Initiates all Jquery UI. Tabs and Accordions are used.
     * TODO: Convert unwanted Tabs into DIVs with CSS
     * */

    initiateUI: function () {
        $("#serverList").selectable();
        this.bindServerListUi();
        $("#tabs").tabs();
        $("#infoTab").tabs();
        $("#servers").tabs();
        $("#databases").tabs();
        $("#collections").tabs();
        $("#accesspoints").tabs();
        $("#floor_infos").tabs();
        $("#accordion").accordion({
            collapsible: true,
            active: 0
        });
    },

    bindServerListUi: function () {
        $("#serverList").on("selectableselected", function (event, ui) {
            app.eventBus.publish("server:selected", ui.selected.id)
        });
    },

    showLoader: function () {
        $('#loader').show()
    },

    hideLoader: function () {
        $('#loader').hide()
    },

    createDatabaseListUi: function () {
        $('#database-1').append('<ol id="databaseList" class="selectableList"></ol>')
        $("#databaseList").selectable();
    },

    updateDatabaseListUi: function (data) {
        $.each(data, function (key, val) {
            var template = '<li class="ui-widget-content" href=' + val + '>' + key + '</li>'
            $("#databaseList").append(template)
        })
        $("#databaseList").on("selectableselected", function (event, ui) {
            app.eventBus.publish("database:selected", ui.selected.getAttribute('href'))
        })
    },

    clearCollectionList: function () {
        $("#collection-1").empty()
    },

    createCollectionListUi: function () {
        $('#collection-1').append('<ol id="collectionList" class="selectableList"></ol>')
        $("#collectionList").selectable();
    },

    updateCollectionListUi: function (data) {
        $.each(data, function (key, val) {
            var template = '<li class="ui-widget-content" href=' + val + '>' + key + '</li>'
            $('#collectionList').append(template)
        })
        $("#collectionList").on("selectableselected", function (event, ui) {
            app.eventBus.publish("collection:selected", ui.selected.getAttribute('href'))
        })
    },

    showGraphPanel: function () {
        $("#accordion").accordion({
            active: 2
        })
    },
    showFloorPanel: function () {
        $("#accordion").accordion({
            active: 1
        })
    },
    clearGraph: function () {
        $("#graph").empty()
    },
    clearFloor: function () {
        $("#pointsList").empty()
    },
    clearDatabaseList: function () {
        $("#database-1").empty()
    },

    clearAccesspointList: function () {
        $("#accesspoint-1").empty()
    },


}


function createMeasurementPointsList() {
    $('#floor').append('<ol id="pointsList" class="selectablePoints ruler"></ol>')
    $("#pointsList").selectable();
}


function createAccesspointListUI() {
    $('#accesspoint-1').append('<ol id="accesspointList" class="selectableList"></ol>')
    $("#accesspointList").selectable();
}

/*
 * updateFloorInfoUi
 * */
function updateFloorInfoUi(data) {
    $('#floor_info-1').empty()
    $('#floor_info-1').append("<b>Number of Measurement Points : </b>" + locationData.length)
    $('#floor_info-1').append("<br>")
    $('#floor_info-1').append("<b>Number of RSSIs measured at the selected Point: </b>" + data.scan)
    $('#floor_info-1').append("<br>")
    $('#floor_info-1').append("<b>Latency measured at the selected Point: </b>" + data.latency)
}

/*
 * Update the node details in Tab
 * */
function updateNodeDataUI(data) {
    var stat = statistic(graphData)
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
    $('#infoTab-1').append("<br>")
    $('#infoTab-1').append("<b>Coordinate Z : </b>" + data.coordinate_z)
    $('#infoTab-1').append("<br>")
    $('#infoTab-1').append("<br>")
    $('#infoTab-1').append("<b> Minimum : </b>" + d3.min(graphData))
    $('#infoTab-1').append("<br>")
    $('#infoTab-1').append("<b> Maximum : </b>" + d3.max(graphData))
    $('#infoTab-1').append("<br>")
    $('#infoTab-1').append("<b> Mean : </b>" + d3.round(d3.mean(graphData), 2))
    $('#infoTab-1').append("<br>")
    $('#infoTab-1').append("<b> Median : </b>" + d3.median(graphData))
    $('#infoTab-1').append("<br>")
    $('#infoTab-1').append("<b> Variance : </b>" + d3.round(stat.variance, 2))
    $('#infoTab-1').append("<br>")
    $('#infoTab-1').append("<b> Deviation : </b>" + d3.round(stat.deviation, 2))
}






