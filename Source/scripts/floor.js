var floor = {
    /*
     * Convert the Locations into Co-Ordinate and Set the points in the floor
     * */
    mapCoordinates: function (data) {
        app.rawData = $.each(data, function (key, val) {

            val.location["coordinate_x_original"] = val.location.coordinate_x
            val.location["coordinate_y_original"] = val.location.coordinate_y

            // due to the bug in the python backend x and y must be interchanged
            var axis = floor.pixelConverter(val.location.coordinate_x, val.location.coordinate_y);

            val.location.coordinate_x = axis[0]
            val.location.coordinate_y = axis[1]

        })
        app.eventBus.publish("coordinates:mapped")
    },
    /*
     * Convert the Locations into Co-Ordinate to fit the floor plan
     * */
    pixelConverter: function (x, y) {
        var xPix = x * 25.4;
        var yPix = y * 25.2;

        //adjusted to calibrate
        //var xAxis = 0 + xPix;
        //var yAxis = 366 - yPix;

        var xAxis = -15 + xPix;
        var yAxis = 380 - yPix;

        xAxis = d3.round(xAxis,2)
        yAxis = d3.round(yAxis,2)

        var axis = [xAxis, yAxis];
        return axis
    }

}




