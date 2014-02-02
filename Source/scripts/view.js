/**
* This is the view
*
* @class view
*/
var view = {

    /*
     * Initiates all Jquery UI. Tabs and Accordions are used.
     * */

    initialize: function () {
        this.bindTitleTabsUi();
        $("#serverList").selectable();
        this.bindServerListUi();
        $("#floorPlanList").selectable();
        this.bindFlooPlanListUi();
        $("#titleTabs").tabs();
        $("#servers").tabs();
        $("#databases").tabs();
        $("#collections").tabs();
        $("#floorPlans").tabs();
        $("#channelMenu").menu();
        $("#accesspoints").tabs();
        $("#floorInfoTabs").tabs();
        $("#graphInfoTabs").tabs();
        $("#accordion").accordion({
            collapsible: true,
            active: 0
        });
    },

    bindTitleTabsUi: function (){
        $( "#titleTabs" ).on( "tabsactivate", function( event, ui ) {
            if(ui.newTab.context.hash == '#docTab'){
                $("#accordion").hide()
            }else {
                $("#accordion").show()
            }
        } );
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
            view.resetFloorPlanList()
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
            var template = '<li class="ui-widget-content" href=' + val.uri + '>' + val.collection + '</li>'
            $('#collectionList').append(template)
        })
        $("#collectionList").on("selectableselected", function (event, ui) {
            view.resetFloorPlanList()
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

    createFloorPlan: function () {
        $('#floor').removeClass()
        $('#floor').addClass(app.selectedFloorPlan)
    },

    resetFloorPlanList: function () {
        $('#floorPlanList').find('.ui-selected').removeClass("ui-selected")
    },

    /*
     * Convert the Locations into Co-Ordinate to fit the floor plan
     * */
    updateNodeUi: function (data) {
        view.createFloorPlan()
        view.clearFloor()
        view.clearChannelMenu()
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
            view.clearAccesspointList()
            var nodeId = ui.selected.id.substr(4)
            app.eventBus.publish("node:selected", nodeId)
        })
    },

    activateChannelMenu: function () {
        $("#channelMenu").menu("refresh")
        $("#channelMenu").show();
    },

    clearChannelMenu: function () {
        $("#channelMenu").hide();
        $("#channelList").empty()
    },

    updateChannelList: function (data) {
        view.clearChannelMenu()

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
        if (_.isEmpty(data)) {
            view.updateFloorInfoUi({scan: 0, latency: 0})
        } else {
            if ('latency' in data) {
                view.updateFloorInfoUi({scan: data.rawRSSI.length, latency: data.latency})
            } else {
                view.updateFloorInfoUi({scan: data.rawRSSI.length, latency: 'Unknown'})
            }
        }

    },

    /*
     * updateFloorInfoUi
     * */
    updateFloorInfoUi: function (data) {
        $('#floorInfoTab-1').empty()
        $('#floorInfoTab-1').append("<b>Number of Measurement Points : </b>" + app.nodeList.length)
        $('#floorInfoTab-1').append("<br>")
        $('#floorInfoTab-1').append("<b>Number of RSSIs measured at the selected Point: </b>" + data.scan)
        $('#floorInfoTab-1').append("<br>")
        $('#floorInfoTab-1').append("<b>Latency measured at the selected Point: </b>" + data.latency)
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
        var stat = utils.statisticsCalculator(app.graphData)
        $('#graphInfoTab-1').empty()
        $('#graphInfoTab-1').append("<br>")
        $('#graphInfoTab-1').append("<b>SSID : </b>" + app.selectedSsidData.data[0].sender_ssid)
        $('#graphInfoTab-1').append("<br>")
        $('#graphInfoTab-1').append("<b>BSSID : </b>" + app.selectedSsidData.data[0].sender_bssid)
        $('#graphInfoTab-1').append("<br>")
        $('#graphInfoTab-1').append("<b>Total Number of measurements: </b>" + app.selectedSsidData.data.length)
        $('#graphInfoTab-1').append("<br>")
        $('#graphInfoTab-1').append("<br>")
        $('#graphInfoTab-1').append("<b>Node Label : </b>" + data.node_label)
        $('#graphInfoTab-1').append("<br>")
        $('#graphInfoTab-1').append("<b>Room Label : </b>" + data.room_label)
        $('#graphInfoTab-1').append("<br>")
        $('#graphInfoTab-1').append("<b>Coordinate X : </b>" + data.coordinate_x)
        $('#graphInfoTab-1').append("<br>")
        $('#graphInfoTab-1').append("<b>Coordinate Y : </b>" + data.coordinate_y)
        $('#graphInfoTab-1').append("<br>")
        $('#graphInfoTab-1').append("<b>Coordinate Z : </b>" + data.coordinate_z)
        $('#graphInfoTab-1').append("<br>")
        $('#graphInfoTab-1').append("<br>")
        $('#graphInfoTab-1').append("<b> Minimum : </b>" + d3.min(app.graphData))
        $('#graphInfoTab-1').append("<br>")
        $('#graphInfoTab-1').append("<b> Maximum : </b>" + d3.max(app.graphData))
        $('#graphInfoTab-1').append("<br>")
        $('#graphInfoTab-1').append("<b> Mean : </b>" + d3.round(d3.mean(app.graphData), 2))
        $('#graphInfoTab-1').append("<br>")
        $('#graphInfoTab-1').append("<b> Median : </b>" + d3.median(app.graphData))
        $('#graphInfoTab-1').append("<br>")
        $('#graphInfoTab-1').append("<b> Variance : </b>" + d3.round(stat.variance, 2))
        $('#graphInfoTab-1').append("<br>")
        $('#graphInfoTab-1').append("<b> Deviation : </b>" + d3.round(stat.deviation, 2))
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











