/*
 * Globals
 * */


var app = {
    eventBus : amplify,
    dataBaseUriRemote : 'http://ec2-54-217-136-137.eu-west-1.compute.amazonaws.com:5000/evarilos/raw_data/v1.0/database',
    dataBaseUriLocal : 'http://localhost:5000/evarilos/raw_data/v1.0/database',
    databaseList : [],
    collectionList : [],
    selectedCollection : [],
    rawData: []

}





var server = '';










var rssiData = []; // Complete JSON of selected Collection
var locationData = []; // All Locations of selected Collection
var nodeData = []; // Details of selected Node
var ssidData = []; // Complete JSON of grouped SSID of selected Node
var selectedSsidData = []; // Currently selected data of SSID
var graphData = []; // Graph Data of selected SSID

function clearCache(){
    rssiData = []
    locationData = []
    nodeData = []
    ssidData = []
    selectedSsidData = []
    graphData = []
}