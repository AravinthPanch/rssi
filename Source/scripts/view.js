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

    clearFloor: function () {
        $("#pointsList").empty()
    },

    createNodeList: function () {
        $('#floor').append('<ol id="pointsList" class="selectablePoints ruler"></ol>')
        $("#pointsList").selectable();
    },

    showFloorPanel: function () {
        $("#accordion").accordion({
            active: 1
        })
    },

    /*
     * Convert the Locations into Co-Ordinate to fit the floor plan
     * */
    updateNodeUi: function (data) {
        this.clearFloor();
        this.createNodeList()

        $.each(data, function (key, val) {
            app.nodeList.push(val.location)

            var template = '<li class="ui-widget-content node" id=node' + val.location.node_label + '/>'
            $('#pointsList').append(template)

            var nodeId = '#node' + val.location.node_label
            $(nodeId).css('left', val.location.coordinate_x + 'px')
            $(nodeId).css('top', val.location.coordinate_y + 'px')
        })

        $("#pointsList").on("selectableselected", function (event, ui) {
            var node_label = ui.selected.id.substr(4, 6)
            app.eventBus.publish("node:selected", node_label)
        })
    },

    clearAccesspointList: function () {
        $("#accesspoint-1").empty()
    },

    createAccesspointListUi: function () {
        $('#accesspoint-1').append('<ol id="accesspointList" class="selectableList"></ol>')
        $("#accesspointList").selectable();
    },

    /*
     * Load list of Access Points
     * */
    updateAccessPointUi: function (data) {
        this.clearAccesspointList();
        this.createAccesspointListUi();

        if ('latency' in data) {
            this.updateFloorInfoUi({scan: data.rawRSSI.length, latency: data.latency})
        } else {
            this.updateFloorInfoUi({scan: data.rawRSSI.length, latency: 'Unknown'})
        }

        var rssiDataGrouped = _.groupBy(data.rawRSSI, function (run) {
            return run.sender_ssid + '_' + run.sender_bssid
        })

        var rssiDataArrayed = [];

        $.each(rssiDataGrouped, function (i, field) {
            rssiDataArrayed.push({ssid: i, data: field})
        })

        app.processedRssiData = _.sortBy(rssiDataArrayed, function (d) {
            return d.ssid.toLowerCase()
        })

        $.each(app.processedRssiData, function (key, val) {
            var template = '<li class="ui-widget-content" value=' + val.ssid + '>' + val.ssid + '</li>'
            $('#accesspointList').append(template)
        })

        $("#accesspointList").on("selectableselected", function (event, ui) {
            var ssid = ui.selected.getAttribute("value")
            app.eventBus.publish("accessPoint:selected", ssid)
        })

    },

    /*
     * updateFloorInfoUi
     * */
    updateFloorInfoUi: function (data) {
        $('#floor_info-1').empty()
        $('#floor_info-1').append("<b>Number of Measurement Points : </b>" + app.nodeList.length)
        $('#floor_info-1').append("<br>")
        $('#floor_info-1').append("<b>Number of RSSIs measured at the selected Point: </b>" + data.scan)
        $('#floor_info-1').append("<br>")
        $('#floor_info-1').append("<b>Latency measured at the selected Point: </b>" + data.latency)
    },

    showGraphPanel: function () {
        $("#accordion").accordion({
            active: 2
        })
    },

    clearGraph: function () {
        $("#graph").empty()
    },

    clearDatabaseList: function () {
        $("#database-1").empty()
    },
    /*
     * Update the node details in Tab
     * */
    updateNodeDataUI: function (data) {
        var stat = controller.statisticsCalculator(app.graphData)
        $('#infoTab-1').empty()
        $('#infoTab-1').append("<br>")
        $('#infoTab-1').append("<b>SSID : </b>" + app.selectedSsidData.data[0].sender_ssid)
        $('#infoTab-1').append("<br>")
        $('#infoTab-1').append("<b>BSSID : </b>" + app.selectedSsidData.data[0].sender_bssid)
        $('#infoTab-1').append("<br>")
        $('#infoTab-1').append("<b>Total Number of measurements: </b>" + app.selectedSsidData.data.length)
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
        $('#infoTab-1').append("<b> Minimum : </b>" + d3.min(app.graphData))
        $('#infoTab-1').append("<br>")
        $('#infoTab-1').append("<b> Maximum : </b>" + d3.max(app.graphData))
        $('#infoTab-1').append("<br>")
        $('#infoTab-1').append("<b> Mean : </b>" + d3.round(d3.mean(app.graphData), 2))
        $('#infoTab-1').append("<br>")
        $('#infoTab-1').append("<b> Median : </b>" + d3.median(app.graphData))
        $('#infoTab-1').append("<br>")
        $('#infoTab-1').append("<b> Variance : </b>" + d3.round(stat.variance, 2))
        $('#infoTab-1').append("<br>")
        $('#infoTab-1').append("<b> Deviation : </b>" + d3.round(stat.deviation, 2))
    }


}











