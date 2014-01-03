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
    view.initiateUI()
    controller.initialize()
});


var controller = {

    initialize: function () {
        app.eventBus.subscribe("server:selected", function (data) {
            controller.serverSelected(data)
        });

        app.eventBus.subscribe("databaseList:retrieved", function () {
            view.updateDatabaseListUi(app.databaseList)
        });

        app.eventBus.subscribe("database:selected", function (data) {
            collection.getCollectionList(data)
        });

        app.eventBus.subscribe("collectionList:retrieved", function () {
            view.updateCollectionListUi(app.collectionList)
        });

        app.eventBus.subscribe("collection:selected", function (data) {
            view.showLoader()
            collection.getSelectedCollection(data)
        });

        app.eventBus.subscribe("selectedCollection:retrieved", function () {
            collection.getRawData(app.selectedCollection)
        });

        app.eventBus.subscribe("rawData:retrieved", function () {
            view.hideLoader()
            floor.mapCoordinates(app.rawData)
        });

        app.eventBus.subscribe("coordinates:mapped", function () {
            view.updateNodeUi(app.rawData)
            view.updateFloorInfoUi({scan: 0, latency: 0});
            view.showFloorPanel()
        });

        app.eventBus.subscribe("node:selected", function (data) {
            controller.getSelectedNodeData(data)
            view.updateAccessPointUi(app.selectedNodeData)
        });

        app.eventBus.subscribe("accessPoint:selected", function (data) {
            controller.processGraphData(data)
            drawGraph(app.graphData)
        });
    },

    serverSelected: function (data) {
        switch (data) {
            case "server1" :
                collection.getDatabaseList(app.dataBaseUriLocal);
                break;
            case "server2" :
                collection.getDatabaseList(app.dataBaseUriRemote);
                break;
            case "server3" :
                app.rawData = staticData
                floor.mapCoordinates(app.rawData)
                break;
        }
    },
    convertRawData: function (data) {
        var res = []
        $.each(data, function (key, val) {
            res.push(val)
        })
        return res
    },
    /*
     * Retrieve the node data
     * */
    getSelectedNodeData: function (data) {
        $.each(app.rawData, function (key, val) {
            if (val.location.node_label == data) {
                app.selectedNodeData = val
            }
        })
    },
    /*
     * Process the data to input into the chart.JS
     * */
    processGraphData: function (data) {
        $.each(app.processedRssiData, function (key, val) {
            if (val.ssid == data) {
                app.selectedSsidData = val
                app.graphData = _.map(app.selectedSsidData.data, function (d) {
                    return d.rssi
                })
            }
        })
    },

    statisticsCalculator: function (a) {
        var r = {mean: 0, variance: 0, deviation: 0}, t = a.length;
        for (var m, s = 0, l = t; l--; s += a[l]);
        for (m = r.mean = s / t, l = t, s = 0; l--; s += Math.pow(a[l] - m, 2));
        return r.deviation = Math.sqrt(r.variance = s / t), r;
    }


}














