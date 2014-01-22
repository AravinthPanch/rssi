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
            width_px : 736.67,  //x_25_units
            height_px : 411,    //y_15_units
            x_unit : 29.47,
            y_unit : 27.45,
            left_offset_px : (20 - 20),     //adjusted due to unknown or incorrect (0,0) origin
            top_offset_px : 23              
        },
        twist3Floor : {
            width_px : 733.67,  //x_25_units
            height_px : 416.67, //y_15_units
            x_unit : 29.35, 
            y_unit : 27.78,
            left_offset_px : 22,
            top_offset_px : 21
        },
        twist4Floor : {
            width_px : 733.4,   //x_25_units
            height_px : 418.4,  //y_15_units
            x_unit : 29.34,
            y_unit : 27.9,
            left_offset_px : 22,
            top_offset_px : 21
        },
        iLab : {
            width_px : 944,
            height_px : 412,
            x_unit : 17.92,
            y_unit : 23.13,
            left_offset_px : 15,
            top_offset_px : 49
        }
    },

    floorPlanScale_with_old_images : {
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
