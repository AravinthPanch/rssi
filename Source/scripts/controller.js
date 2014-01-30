/**
 * Controller is the hub of APP. APP is implemented with the Event-Driven-Architecture.
 * Controller is responsible for capturing events and sets the respective callbacks for every events which are triggered
 * throughout APP.
 *
 * @class controller
 */
var controller = {

    /**
     It initialises the controller to process the captured events. These events are triggered in various parts of APP
     and captured by the controller
     @method initialize
     **/
    initialize: function () {

        /**
         Triggered when a server is selected by user
         @event server:selected
         @param {String} serverId The name of the selected Server
         **/
        app.eventBus.subscribe("server:selected", function (serverId) {
            controller.serverSelected(serverId)
        });


        /**
         Triggered when database is retrieved from the Remote API
         @event databaseList:retrieved
         **/
        app.eventBus.subscribe("databaseList:retrieved", function () {
            view.updateDatabaseListUi(app.databaseList)
        });


        /**
         Triggered when a Database is selected by user
         @event database:selected
         @param {String} databaseUri The URI of the selected Database
         **/
        app.eventBus.subscribe("database:selected", function (databaseUri) {
            collection.getCollectionList(databaseUri)
        });


        /**
         Triggered when list of Collections is retrieved from backend
         @event collectionList:retrieved
         **/
        app.eventBus.subscribe("collectionList:retrieved", function () {
            view.updateCollectionListUi(app.collectionList)
        });


        /**
         Triggered when a Collection is selected by user
         @event collection:selected
         @param {String} collectionUri The URI of the selected Collection
         **/
        app.eventBus.subscribe("collection:selected", function (collectionUri) {
            view.showLoader()
            collection.getSelectedCollectionData(collectionUri)
        });


        /**
         Triggered when internal list of the selected Collection is retrieved from backend
         @event selectedCollectionData:retrieved
         **/
        app.eventBus.subscribe("selectedCollectionData:retrieved", function () {
            collection.getRawData(app.selectedCollectionData)
        });

        /**
         Triggered when complete RawData of the selected Collection is retrieved from backend
         @event rawData:retrieved
         **/
        app.eventBus.subscribe("rawData:retrieved", function () {
            view.hideLoader()
            collection.getMetadata(app.metadataId)
        });


        /**
         Triggered when Metadata of the selected collection is retrieved from backend
         @event metadata:retrieved
         **/
        app.eventBus.subscribe("metadata:retrieved", function () {
            view.updateMetadataUi(app.metadata)
        });


        /**
         Triggered when a Floor Plan is selected by user
         @event floorPlan:selected
         **/
        app.eventBus.subscribe("floorPlan:selected", function () {
            collection.filterRawDataByFloor(app.rawData)
            floor.mapCoordinates(app.filteredRawDataByFloor)
        });


        /**
         Triggered when coordinates are mapped to the selected Floor Plan
         @event coordinates:mapped
         **/
        app.eventBus.subscribe("coordinates:mapped", function () {
            view.updateNodeUi(app.filteredRawDataByFloor)
            view.updateFloorInfo(app.selectedNodeData)
            view.showFloorPanel()
        });


        /**
         Triggered when a Node in the FloorPlan is selected by user
         @event node:selected
         @param {String} selectedNodeId The Id of the selected Node in the FloorPlan
         **/
        app.eventBus.subscribe("node:selected", function (selectedNodeId) {
            collection.getSelectedNodeData(selectedNodeId)
            collection.groupNodeDataByChannel(app.selectedNodeData)
            view.updateFloorInfo(app.selectedNodeData)
            view.updateChannelList(app.channelList)
        });


        /**
         Triggered when a Channel is selected by user
         @event channel:selected
         @param {Integer} selectedChannel The number of the selected channel
         **/
        app.eventBus.subscribe("channel:selected", function (selectedChannel) {
            collection.getSelectedChannelData(selectedChannel)
            collection.groupSelectedChannelDataBySsid(app.selectedChannelData)
            view.updateAccessPointUi(app.groupedSsidData)
        });


        /**
         Triggered when an AccessPoint is selected by user
         @event accessPoint:selected
         @param {String} selectedSsidData The SSID_BSSID of the selected AccessPoint
         **/
        app.eventBus.subscribe("accessPoint:selected", function (selectedSsidData) {
            collection.processGraphData(selectedSsidData)
            view.showGraphPanel()
            view.updateGraphInfoUi(app.selectedNodeData.location)
            graph.draw(app.graphData)

        });

    },

    /**
     It is a callback for an event when a server is selected by user
     @method serverSelected
     @param {String} serverId The name of the selected Server
     **/
    serverSelected: function (data) {
        view.clearDatabaseList()
        view.clearCollectionList()
        view.resetFloorPlanList()
        switch (data) {
            case "server1" :
                collection.getDatabaseList(app.dataBaseUriLocal);
                break;
            case "server2" :
                collection.getDatabaseList(app.dataBaseUriRemote);
                break;
            case "server3" :
                app.rawData = staticData
                app.selectedFloorPlan = 'twist2Floor'
                floor.mapCoordinates(app.rawData)
                break;
        }
    }

};














