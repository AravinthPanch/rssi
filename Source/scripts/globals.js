/*
 * Globals
 * */


var app = {
    eventBus : amplify,
    dataBaseUriRemote : 'http://ec2-54-217-136-137.eu-west-1.compute.amazonaws.com:5000/evarilos/raw_data/v1.0/database',
    dataBaseUriLocal : 'http://localhost:5000/evarilos/raw_data/v1.0/database',
    metadataUri: '',

    databaseList : [],
    selectedDatabase: {},
    collectionList : [],
    selectedCollection: {},
    selectedCollectionData : [],
    rawData: [],
    selectedFloorPlan: {},
    nodeList: [],
    selectedNodeData: [],
    processedRssiData: [],
    selectedSsidData: [],
    graphData: [],
    metadata: {},

    floorPlanScale : {
        twist2Floor : {
            width_px : 782,
            height_px : 360,
            x_unit : 26.07,
            y_unit : 24,
            left_offset_px : (67-15), //adjusted to calibrate
            top_offset_px : 38
        },
        twist3Floor : {
            width_px : 778,
            height_px : 339,
            x_unit : 25.9,
            y_unit : 22.6,
            left_offset_px : 40,
            top_offset_px : 34
        },
        twist4Floor : {
            width_px : 807,
            height_px : 370,
            x_unit : 26.9,
            y_unit : 24.6,
            left_offset_px : 40,
            top_offset_px : 28
        },
        iLab : {
            width_px : 944,
            height_px : 412,
            x_unit : 17.92,
            y_unit : 23.13,
            left_offset_px : 15,
            top_offset_px : 49
        }
    }
}
