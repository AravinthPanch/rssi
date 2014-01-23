var collection = {

    /*
     * Sends AJAX Request to the given URI and returns the result in JSON
     * Load the list of Databases into UI
     * Binds Click events to load collection
     * TODO: Define UI Constants
     * */
    getDatabaseList: function (data) {
        view.showLoader()
        view.createDatabaseListUi()
        $.getJSON(data, function (results) {
            view.hideLoader()
            app.databaseList = results
            app.metadataUri = results.metadata
            app.eventBus.publish("databaseList:retrieved")
        })
    },

    /*
     * Load the list of Collections into UI
     *
     * */
    getCollectionList: function (data) {
        view.showLoader()
        view.clearCollectionList()
        view.createCollectionListUi()
        $.getJSON(data, function (results) {
            view.hideLoader()
            app.collectionList = results
            app.eventBus.publish("collectionList:retrieved")
        })
    },

    getSelectedCollectionData: function (data) {
        $.getJSON(data, function (results) {
            app.selectedCollectionData = results
            app.eventBus.publish("selectedCollectionData:retrieved")
        })
    },

    /*
     * Get the RSSI data , cache it in the variable RssiData and Load Locations on the floor plan
     * */
    getRawData: function (data) {
        $.each(data, function (key, val) {
            $.ajax({
                url: val.URI,
                async: false
            }).done(function (results) {
                    app.rawData.push(JSON.parse(results))
                });
        })
        //app.rawData = this.convertRawData(app.rawData)
        app.eventBus.publish("rawData:retrieved")
    },

    filterRawDataByFloor: function (data) {
        var zAxis;
        app.filteredRawDataByFloor = []
        switch (app.selectedFloorPlan) {
            case 'twist2Floor':
                zAxis = 9.08
                break;
            case 'twist3Floor':
                zAxis = 12.37
                break;
            case 'twist4Floor':
                zAxis = 16.05
                break;
            case 'iLab1':
                zAxis = 3
                break;
            case 'iLab2':
                zAxis = 0
                break;
        }
        $.each(data, function (key, val) {
            if (val.location.coordinate_z == zAxis) {
                app.filteredRawDataByFloor.push(val)
            }
        })
    },

    /*
     * Retrieve the node data
     * */
    getSelectedNodeData: function (data) {
        $.each(app.rawData, function (key, val) {
            if (val.data_id == data) {
                app.selectedNodeData = val
            }
        })
    },

    groupNodeDataByChannel: function (data) {
        if ('channel' in data.rawRSSI[0]) {
            var nodeDataGroupedByChannel = _.groupBy(data.rawRSSI, function (val) {
                return val.channel
            })

            app.groupedNodeDataByChannel = [];
            app.channelList = [];

            $.each(nodeDataGroupedByChannel, function (key, val) {
                app.channelList.push(key)
                app.groupedNodeDataByChannel.push({channel: key, data: val})
            })
            app.channelList = _.sortBy(app.channelList)

        }else {
            app.groupedNodeDataByChannel = [];
            app.channelList = ['unknown'];
            app.groupedNodeDataByChannel.push({channel: 'unknown', data: data.rawRSSI})
        }
    },

    getSelectedChannelData: function(data){
        $.each(app.groupedNodeDataByChannel, function (key, val) {
            if (val.channel == data) {
                app.selectedChannelData = val
            }
        })
    },

    groupSelectedChannelDataBySsid: function(data){
        var rssiDataGrouped = _.groupBy(data.data, function (val) {
             return val.sender_ssid + '_' + val.sender_bssid
        })

        var rssiDataArrayed = [];

        $.each(rssiDataGrouped, function (key, val) {
             rssiDataArrayed.push({ssid: key, data: val})
        })

        app.groupedSsidData = _.sortBy(rssiDataArrayed, function (val) {
             return val.ssid.toLowerCase()
        })
    },

    /*
     * Process the data to input into the chart.JS
     * */
    processGraphData: function (data) {
        $.each(app.groupedSsidData, function (key, val) {
            if (val.ssid == data) {
                app.selectedSsidData = val
                app.graphData = _.map(app.selectedSsidData.data, function (d) {
                    return d.rssi
                })
            }
        })
    },


    getMetadataId: function (data) {
        $.getJSON(app.metadataUri, function (results) {
            var uri = results[app.selectedDatabase.name]
            $.getJSON(uri, function (results) {
                $.each(results, function (key, val) {
                    val.metadata_id = data
                    $.getJSON(val.URI, function (results) {
                        app.metadata = results
                        app.eventBus.publish("metadata:retrieved")
                    })
                })
            })
        })
    },


    groupRssiData: function (data, groupBy) {
        var res = [];
        switch (groupBy) {
            case 'ssid' :
                res = _.groupBy(data.rawRSSI, function (run) {
                    return run.sender_ssid + '_' + run.sender_bssid
                })

                $.each(res, function (i, field) {
                    rssiDataArrayed.push({ssid: i, data: field})
                })

                break;
            case 'channel' :
                res = _.groupBy(data.rawRSSI, function (run) {
                    return run._channel
                })
                break;
        }
    },


};

