var collection = {

    /*
     * Sends AJAX Request to the given URI and returns the result in JSON
     * Load the list of Databases into UI
     * Binds Click events to load collection
     * TODO: Define UI Constants
     * */
    getDatabaseList: function (data) {
        view.showLoader()
        view.clearDatabaseList()
        view.createDatabaseListUi()
        $.getJSON(data, function (results) {
            view.hideLoader()
            app.databaseList = results
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
        app.rawData = controller.convertRawData(app.rawData)
        app.eventBus.publish("rawData:retrieved")
    },

    getSelectedCollection: function (data) {
        $.getJSON(data, function (results) {
            app.selectedCollection = results
            app.eventBus.publish("selectedCollection:retrieved")
        })
    }
};

