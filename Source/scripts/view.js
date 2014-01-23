var view = {

    /*
     * Initiates all Jquery UI. Tabs and Accordions are used.
     * TODO: Convert unwanted Tabs into DIVs with CSS
     * */

    initialize: function () {
        $("#serverList").selectable();
        this.bindServerListUi();
        $("#floorPlanList").selectable();
        this.bindFlooPlanListUi();
        $("#tabs").tabs();
        $("#infoTab").tabs();
        $("#servers").tabs();
        $("#databases").tabs();
        $("#collections").tabs();
        $("#floorPlans").tabs();
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

    bindFlooPlanListUi: function () {
        $("#floorPlanList").on("selectableselected", function (event, ui) {
            app.selectedFloorPlan = ui.selected.id
            app.eventBus.publish("floorPlan:selected")
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
            app.selectedDatabase = {
                name: $(ui.selected).text(),
                uri: ui.selected.getAttribute('href')
            }
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
            app.selectedCollection = {
                name: $(ui.selected).text(),
                uri: ui.selected.getAttribute('href')
            }
            app.eventBus.publish("collection:selected", ui.selected.getAttribute('href'))
        })
    },

    clearFloor: function () {
        $("#floor").empty()
    },

    createNodeList: function () {
        $('#floor').append('<ol id="pointsList" class="selectablePoints"></ol>')
        $("#pointsList").selectable();
    },

    showFloorPanel: function () {
        $("#accordion").accordion({
            active: 1
        })
    },

    createFloorPlan: function(){
        $('#floor').removeClass()
        $('#floor').addClass(app.selectedFloorPlan)
    },

    resetFloorPlanList: function(){
        $('#floorPlanList').selectable("destroy")
        $("#floorPlanList").selectable()
    },

    /*
     * Convert the Locations into Co-Ordinate to fit the floor plan
     * */
    updateNodeUi: function (data) {
        view.createFloorPlan()
        view.clearFloor()
        view.clearAccesspointList()
        view.createNodeList()

        app.nodeList = []
        $.each(data, function (key, val) {
            var node = val.location
            node.data_id = val.data_id
            app.nodeList.push(node)

            var template = '<li class="ui-widget-content node" id=node' + val.data_id + '/>'
            $('#pointsList').append(template)

            var nodeId = '#node' + val.data_id
            $(nodeId).css('left', val.location.coordinate_x_translated + 'px')
            $(nodeId).css('top', val.location.coordinate_y_translated + 'px')
        })

        $("#pointsList").on("selectableselected", function (event, ui) {
            var nodeId = ui.selected.id.substr(4)
            app.eventBus.publish("node:selected", nodeId)
        })
    },

    activateChannelMenu: function(){
        $("#channelMenu").menu();
        $("#channelMenu").show();
    },

    clearChannelMenu: function () {
        $("#channelList").empty()
    },

    updateChannelList: function(data){
        view.clearChannelMenu()
//        view.clearAccesspointList()

        $.each(data, function (key, val) {
            var template = '<li id=channel' + val + '>' + '<a>' + val + '</a>' + '</li>'
            $('#channelList').append(template)
        })

        view.activateChannelMenu()

        $("#channelMenu").on("menuselect", function (event, ui) {
            var channel = ui.item.context.id.substr(7)
            app.eventBus.publish("channel:selected", channel)
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
        view.clearAccesspointList();
        view.createAccesspointListUi();
        view.updateFloorInfo(app.selectedNodeData)

        $.each(data, function (key, val) {
            var template = '<li class="ui-widget-content" value=' + val.ssid + '>' + val.ssid + '</li>'
            $('#accesspointList').append(template)
        })

        $("#accesspointList").on("selectableselected", function (event, ui) {
            var ssid = ui.selected.getAttribute("value")
            app.eventBus.publish("accessPoint:selected", ssid)
        })

    },

    updateFloorInfo: function (data) {
        if ('latency' in data) {
            view.updateFloorInfoUi({scan: data.rawRSSI.length, latency: data.latency})
        } else {
            view.updateFloorInfoUi({scan: data.rawRSSI.length, latency: 'Unknown'})
        }
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
    updateGraphInfoUi: function (data) {
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
    },

    updateMetadataUi: function (data) {
        $('#description').empty()
        $.each(data.scenario, function (key, val) {
            var heading = '<h3>' + key + '</h3>'
            var text = '<p>' + val + '</p>'
            var template = '<li class="ui-widget-content" >' + heading + text + '</li>'
            $('#description').append(template)
        })
    }
}











