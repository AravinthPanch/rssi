/*
 * Load data from Evarilos Cloud Server.
 * 3 Sets of Ajax Requests are sent to retrieve JSON Data of
 * List of Databases, List of Collections and Location Specific Messages
 * TODO: Input Local and Remote Database URI
 * */
function loadData() {
    $('#radio1').click(function () {
        server = 'local'
        $("#database-1").empty()
        $("#collection-1").empty()
        loadDatabaseList(dataBaseUriLocal);
    })
    $('#radio2').click(function () {
        server = 'remote'
        $("#database-1").empty()
        $("#collection-1").empty()
        loadDatabaseList(dataBaseUriRemote);
    })
}


/*
 * Sends AJAX Request to the given URI and returns the result in JSON
 * Load the list of Databases into UI
 * Binds Click events to load collection
 * TODO: Define UI Constants
 * */
function loadDatabaseList(uri) {
    $('#loader').show()
    $.getJSON(uri, function (results) {
        $('#loader').hide()
        $.each(results, function (i, field) {
            var template = '<div class=dataBaseUri href=' + field + '>' + i + '</div>'
            $("#database-1").append(template)
        })
        $('.dataBaseUri').click(function (event) {
            //TODO: toggle click
            loadCollectionList(event.target)
        })
    })
}

/*
 * Load the list of Collections into UI
 *
 * */
function loadCollectionList(el) {
    $('#collection-1').empty()
    $(el).addClass('clicked')

    var uri = $(el).attr('href')
    $.getJSON(uri, function (results) {
        $.each(results, function (i, field) {
            var template = '<div class=collectionUri href=' + field + '>' + i + '</div>'
            $('#collection-1').append(template)
        })
        $('.collectionUri').click(function (event) {
            loadRssiList(event.target)
        })
    })
}


/*
 * Get the RSSI data , cache it in the variable RssiData and Load Locations on the floor plan
 * */
function loadRssiList(el) {
    $(el).addClass('clicked')
    var uri = $(el).attr('href')

    clearCache()

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
        $.each(results, function(i, field){
            $.getJSON(field.URI, function (results) {
                rssiData.push(results)
            })
        })
    })

    setTimeout(function(){
        loadLocations(rssiData)
    },4000)
}