var points =
    [
        {
            'id' : 'location1',
            'left' : '790',
            'top' : '0'
        },
        {
            'id' : 'location2',
            'left' : '790',
            'top' : '366'
        },
        {
            'id' : 'location3',
            'left' : '0',
            'top' : '366'
        },
        {
            'id' : 'location4',
            'left' : '450',
            'top' : '150'
        }
    ];


var locations = [
    {'node_label': '211', 'room_label': 'FT225', 'coordinate_z': 9.08, 'coordinate_y': 17.56, 'coordinate_x': 5.06},
    {'node_label': '204', 'room_label': 'FT225', 'coordinate_z': 9.08, 'coordinate_y': 20.71, 'coordinate_x': 1.65},
    {'node_label': '213', 'room_label': 'FT233', 'coordinate_z': 9.08, 'coordinate_y': 14.48, 'coordinate_x': 10.95},
    {'node_label': '284', 'room_label': 'hollway_2nd', 'coordinate_z': 9.08, 'coordinate_y': 16.12, 'coordinate_x': 9.02},
    {'node_label': '240', 'room_label': 'FT222', 'coordinate_z': 9.08, 'coordinate_y': 2.17, 'coordinate_x': 4.98},
    {'node_label': '279', 'room_label': 'FT227', 'coordinate_z': 9.08, 'coordinate_y': 30.28, 'coordinate_x': 1.67},
    {'node_label': '280', 'room_label': 'stairs_2nd', 'coordinate_z': 9.08, 'coordinate_y': 26.68, 'coordinate_x': 9.03},
    {'node_label': '283', 'room_label': 'hollway_2nd', 'coordinate_z': 9.08, 'coordinate_y': 22.08, 'coordinate_x': 9.02},
    {'node_label': '275', 'room_label': 'FT226', 'coordinate_z': 9.08, 'coordinate_y': 23.9, 'coordinate_x': 1.67},
    {'node_label': '276', 'room_label': 'FT226', 'coordinate_z': 9.08, 'coordinate_y': 26.53, 'coordinate_x': 5.39},
    {'node_label': '285', 'room_label': 'hollway_2nd', 'coordinate_z': 9.08, 'coordinate_y': 9.81, 'coordinate_x': 9.02},
    {'node_label': '229', 'room_label': 'FT236', 'coordinate_z': 9.08, 'coordinate_y': 2.02, 'coordinate_x': 10.98},
    {'node_label': '192', 'room_label': 'FT235', 'coordinate_z': 9.08, 'coordinate_y': 5.16, 'coordinate_x': 10.94},
    {'node_label': '286', 'room_label': 'hollway_2nd', 'coordinate_z': 9.08, 'coordinate_y': 3.51, 'coordinate_x': 9.02},
    {'node_label': '220', 'room_label': 'FT223', 'coordinate_z': 9.08, 'coordinate_y': 8.48, 'coordinate_x': 1.93},
    {'node_label': '222', 'room_label': 'FT223', 'coordinate_z': 9.08, 'coordinate_y': 5.39, 'coordinate_x': 5.06},
    {'node_label': '224', 'room_label': 'FT224', 'coordinate_z': 9.08, 'coordinate_y': 11.57, 'coordinate_x': 5.06},
    {'node_label': '207', 'room_label': 'FT224', 'coordinate_z': 9.08, 'coordinate_y': 11.57, 'coordinate_x': 1.89},
    {'node_label': '223', 'room_label': 'FT232', 'coordinate_z': 9.08, 'coordinate_y': 17.59, 'coordinate_x': 10.95},
    {'node_label': '195', 'room_label': 'FT231', 'coordinate_z': 9.08, 'coordinate_y': 20.54, 'coordinate_x': 10.94}
]

function pixelConverter(x,y){
    var xPix = x * 25.4;
    var yPix = y * 25.2;

    var xAxis = 0 + xPix;
    var yAxis = 366 - yPix;

    var axis = [xAxis, yAxis];

    return axis
};


function floorMapper(data){
     var nodes = $.each(data, function(i,node){
        // due to the bug in the python backend x and y must be interchanged
        var axis = pixelConverter(node.coordinate_y, node.coordinate_x);
        node.coordinate_x = axis[0]
        node.coordinate_y = axis[1]
    })
setPoints(nodes)
};

function setPoints(nodes){
    $.each(nodes, function(i, node){
        var str = '<div id="node' + node.node_label + '" class="pointer"/>'
        $('#ruler').append(str)

        var str1 = '#node' + node.node_label
        $(str1).css('left', node.coordinate_x + 'px' )
        $(str1).css('top', node.coordinate_y + 'px')
    })
};

function showGraphPanel(){
    $("#accordion").accordion({
        active: 1
    });
};


$(function () {
    $("#accordion").accordion({
        collapsible: true,
        active: 1
    });

    floorMapper(locations);

    $('.pointer').click(function(){
        showGraphPanel();
    })
});



