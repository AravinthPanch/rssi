/*
 * Initiates all Jquery UI. Tabs and Accordions are used.
 * TODO: Convert unwanted Tabs into DIVs with CSS
 * */
function initiateUI() {
    console.log('UI Initiated')
    $("#serverList").selectable();
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

}

/*
 * updateFloorInfoUi
 * */
function updateFloorInfoUi(data){
    $('#floor_info-1').empty()
    $('#floor_info-1').append("<b>Number of Measurement Points : </b>" + locationData.length)
    $('#floor_info-1').append("<br>")
    $('#floor_info-1').append("<b>Number of RSSIs measured at the selected Point: </b>" + data.scan)
    $('#floor_info-1').append("<br>")
    $('#floor_info-1').append("<b>Latency measured at the selected Point: </b>" + data.latency)
}


/*
 * Update the node details in Tab
 * */
function updateNodeDataUI(data) {
    $('#infoTab-1').empty()
    $('#infoTab-1').append("<br>")
    $('#infoTab-1').append("<b>SSID : </b>" + selectedSsidData[0].sender_ssid)
    $('#infoTab-1').append("<br>")
    $('#infoTab-1').append("<b>BSSID : </b>" + selectedSsidData[0].sender_bssid)
    $('#infoTab-1').append("<br>")
    $('#infoTab-1').append("<b>Total Number of measurements: </b>" + selectedSsidData.length)
    $('#infoTab-1').append("<br>")
    $('#infoTab-1').append("<br>")
    $('#infoTab-1').append("<b>Node Label : </b>" + data.node_label)
    $('#infoTab-1').append("<br>")
    $('#infoTab-1').append("<b>Room Label : </b>" + data.room_label)
    $('#infoTab-1').append("<br>")
    $('#infoTab-1').append("<b>Coordinate X : </b>" + data.coordinate_x)
    $('#infoTab-1').append("<br>")
    $('#infoTab-1').append("<b>Coordinate Y : </b>" + data.coordinate_y)
}


/*
 * open up the graph Panel
 * */
function showGraphPanel() {
    $("#accordion").accordion({
        active: 2
    })
}

function showFloorPanel() {
    $("#accordion").accordion({
        active: 1
    })
}

/*
* Clear The SVG of Graph
*/
function clearGraph(){
    $("#graph").empty()
}
function clearFloor(){
    $("#pointsList").empty()
}

function clearDatabaseList(){
    $("#database-1").empty()
}
function clearCollectionList(){
    $("#collection-1").empty()
}
function clearAccesspointList(){
    $("#accesspoint-1").empty()
}

function createMeasurementPointsList(){
    $('#floor').append('<ol id="pointsList" class="selectablePoints ruler"></ol>')
    $("#pointsList").selectable();
}


function createDatabaseListUI(){
    $('#database-1').append('<ol id="databaseList" class="selectableList"></ol>')
    $("#databaseList").selectable();
}

function createCollectionListUI(){
    $('#collection-1').append('<ol id="collectionList" class="selectableList"></ol>')
    $("#collectionList").selectable();
}

function createAccesspointListUI(){
    $('#accesspoint-1').append('<ol id="accesspointList" class="selectableList"></ol>')
    $("#accesspointList").selectable();
}