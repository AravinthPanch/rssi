/*
 * Load data from Evarilos Cloud Server.
 * 3 Sets of Ajax Requests are sent to retrieve JSON Data of
 * List of Databases, List of Collections and Location Specific Messages
 * TODO: Input Local and Remote Database URI
 * */
function loadData() {
    $("#serverList").on("selectableselected", function (event, ui) {
        switch (ui.selected.id) {
            case "server1" :
                server = 'local'
                clearDatabaseList();
                clearCollectionList();
                loadDatabaseList(dataBaseUriLocal);
                break;
            case "server2" :
                server = 'remote'
                clearDatabaseList();
                clearCollectionList();
                loadDatabaseList(dataBaseUriRemote);
                break;
            case "server3" :
                clearDatabaseList();
                clearCollectionList();
                rssiData = staticData
                loadLocations(staticData)
                break;
        }
    });
}

/*
 * Sends AJAX Request to the given URI and returns the result in JSON
 * Load the list of Databases into UI
 * Binds Click events to load collection
 * TODO: Define UI Constants
 * */
function loadDatabaseList(uri) {
    $('#loader').show()
    createDatabaseListUI();
    $.getJSON(uri, function (results) {
        $('#loader').hide()
        $.each(results, function (i, field) {
            var template = '<li class="ui-widget-content" href=' + field + '>' + i + '</li>'
            $("#databaseList").append(template)
        })

        $("#databaseList").on("selectableselected", function (event, ui) {
            loadCollectionList(ui.selected)
        })
    })
}

/*
 * Load the list of Collections into UI
 *
 * */
function loadCollectionList(el) {
    clearCollectionList();
    createCollectionListUI();

    var uri = el.getAttribute('href')
    $.getJSON(uri, function (results) {
        $.each(results, function (i, field) {
            var template = '<li class="ui-widget-content" href=' + field + '>' + i + '</li>'
            $('#collectionList').append(template)
        })
        $("#collectionList").on("selectableselected", function (event, ui) {
            loadRssiList(ui.selected)
        })
    })
}


/*
 * Get the RSSI data , cache it in the variable RssiData and Load Locations on the floor plan
 * */
function loadRssiList(el) {
    clearCache();

    var uri = el.getAttribute('href')
    switch (server) {
        case 'local' :
            $.getJSON(uri, function (results) {
                rssiData = results
                loadLocations(rssiData)
            })
            break;
        case  'remote' :
            loadRssiListRemoteServer(uri)
            break;
        default :
            alert('Server URL Error')
    }
}

/*
 * Protocol for Remote
 * TODO: Bind data to synchronize
 * */
function loadRssiListRemoteServer(uri) {
    $.getJSON(uri, function (results) {
        $.each(results, function (i, field) {
            $.getJSON(field.URI, function (results) {
                rssiData.push(results)
            })
        })
    })

    setTimeout(function () {
        console.log(JSON.stringify(rssiData))
        loadLocations(rssiData)
    }, 4000)
}