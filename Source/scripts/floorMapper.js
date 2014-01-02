/*
 * Convert the Locations into Co-Ordinate and Set the points in the floor
 * */
function floorMapper(data) {
    var nodes = $.each(data, function (i, field) {
        // due to the bug in the python backend x and y must be interchanged
        var axis = pixelConverter(field.location.coordinate_y, field.location.coordinate_x);
        field.location.coordinate_x = axis[0]
        field.location.coordinate_y = axis[1]
    })
    setPoints(nodes)
}


/*
 * Convert the Locations into Co-Ordinate to fit the floor plan
 * */
function pixelConverter(x, y) {
    var xPix = x * 25.4;
    var yPix = y * 25.2;

    //adjusted to calibrate
    //var xAxis = 0 + xPix;
    //var yAxis = 366 - yPix;

    var xAxis = -15 + xPix;
    var yAxis = 380 - yPix;

    var axis = [xAxis, yAxis];
    return axis
}


/*
 * Convert the Locations into Co-Ordinate to fit the floor plan
 * */
function setPoints(data) {
    clearFloor();
    clearAccesspointList();
    createMeasurementPointsList();

    $.each(data, function (i, field) {
        locationData.push(field.location)

        var template = '<li class="ui-widget-content pointer" id=node' + field.location.node_label + '/>'
        $('#pointsList').append(template)

        var node = '#node' + field.location.node_label
        $(node).css('left', field.location.coordinate_x + 'px')
        $(node).css('top', field.location.coordinate_y + 'px')
    })

    $("#pointsList").on("selectableselected", function (event, ui) {
        var node_label = ui.selected.id.substr(4, 6)
        loadAccessPoints(node_label)
    })

    updateFloorInfoUi({scan: 0, latency: 0});
    showFloorPanel();
}

