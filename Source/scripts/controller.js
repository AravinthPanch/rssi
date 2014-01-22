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
    view.initialize()
    controller.initialize()
});


var controller = {

    initialize: function () {
        app.eventBus.subscribe("server:selected", function (serverId) {
            controller.serverSelected(serverId)
        });

        app.eventBus.subscribe("databaseList:retrieved", function () {
            view.updateDatabaseListUi(app.databaseList)
        });

        app.eventBus.subscribe("database:selected", function (databaseUri) {
            collection.getCollectionList(databaseUri)
        });

        app.eventBus.subscribe("collectionList:retrieved", function () {
            view.updateCollectionListUi(app.collectionList)
        });

        app.eventBus.subscribe("collection:selected", function (collectionUri) {
            view.showLoader()
            collection.getSelectedCollectionData(collectionUri)
        });

        app.eventBus.subscribe("selectedCollectionData:retrieved", function () {
            app.rawData = []
            collection.getRawData(app.selectedCollectionData)
        });

        app.eventBus.subscribe("rawData:retrieved", function () {
            view.hideLoader()
        });

        app.eventBus.subscribe("floorPlan:selected", function () {            
            collection.filterRawDataByFloor(app.rawData)
            floor.mapCoordinates(app.filteredBigCollection)
        });

        app.eventBus.subscribe("coordinates:mapped", function () {
            view.updateNodeUi(app.filteredBigCollection)
            view.updateFloorInfoUi({scan: 0, latency: 0});
            view.showFloorPanel()
        });

        app.eventBus.subscribe("node:selected", function (data) {
            collection.getSelectedNodeData(data)
            collection.processedRssiData(app.selectedNodeData)
            view.updateAccessPointUi(app.selectedNodeData)
        });

        app.eventBus.subscribe("accessPoint:selected", function (data) {
            collection.processGraphData(data)
            view.showGraphPanel()
            view.updateGraphInfoUi(app.selectedNodeData.location)
            graph.draw(app.graphData)
            collection.getMetadataId(app.selectedNodeData.metadata_id)
        });

        app.eventBus.subscribe("metadata:retrieved", function () {
            view.updateMetadataUi(app.metadata)
        });
    },

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
    },

    statisticsCalculator: function (a) {
        var r = {mean: 0, variance: 0, deviation: 0}, t = a.length;
        for (var m, s = 0, l = t; l--; s += a[l]);
        for (m = r.mean = s / t, l = t, s = 0; l--; s += Math.pow(a[l] - m, 2));
        return r.deviation = Math.sqrt(r.variance = s / t), r;
    }


}














