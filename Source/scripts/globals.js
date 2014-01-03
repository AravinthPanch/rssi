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
    rawData: [],
    nodeList: [],
    selectedNodeData: [],
    processedRssiData: [],
    selectedSsidData: [],
    graphData: []
}


function clearCache(){
    rssiData = []
    locationData = []
    nodeData = []
    ssidData = []
    selectedSsidData = []
    graphData = []
}