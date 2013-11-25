function pixelConverter(x, y) {
    var xPix = x * 25.4;
    var yPix = y * 25.2;

    var xAxis = 0 + xPix;
    var yAxis = 366 - yPix;

    var axis = [xAxis, yAxis];

    return axis
};

function floorMapper(data) {
    var nodes = $.each(data, function (i, node) {
        // due to the bug in the python backend x and y must be interchanged
        var axis = pixelConverter(node.coordinate_y, node.coordinate_x);
        node.coordinate_x = axis[0]
        node.coordinate_y = axis[1]
    })
    setPoints(nodes)
};

function setPoints(nodes) {
    $.each(nodes, function (i, node) {
        var str = '<div id="node' + node.node_label + '" class="pointer"/>'
        $('#ruler').append(str)

        var str1 = '#node' + node.node_label
        $(str1).css('left', node.coordinate_x + 'px')
        $(str1).css('top', node.coordinate_y + 'px')
    })
};


function extractRssi(){

    var extractedRssi = []
    _.each(data, function(i){
        extractedRssi.push(i.rssi)
    })

    var groupedRssi = _.sortBy(_.groupBy(extractedRssi))
    var resultRssi = []
    var resultLabel = []
    var resultData = []

    _.each(groupedRssi, function(i){
//        console.log(i[0] + ' ' + i.length)

        resultLabel.push(i[0])
        resultData.push(i.length)

        resultRssi.push({
            'rssi' : i[0],
            'run' : i.length
        })
    })

//    console.log(resultLabel)
//    console.log(resultData)
//    console.log(groupedRssi)
//    console.log(resultRssi)
//    console.log(JSON.stringify(resultRssi))

    return { 'label' : resultLabel, 'rssi' : resultData }
}

function drawChart(data) {
    var barChartData = {
        labels: data.label,
        datasets: [
            {
                fillColor: "orange",
                strokeColor: "orangered",
                data: data.rssi
            }
        ]
    }
    new Chart(document.getElementById("canvas").getContext("2d")).Bar(barChartData);

};

function showGraphPanel() {
    var data = extractRssi()
    drawChart(data);
    $("#accordion").accordion({
        active: 1
    });
};


//DOM Ready
$(function () {
    $("#tabs").tabs();
    $("#accordion").accordion({
        collapsible: true,
        active: 0
    });

    floorMapper(locations);
    $('.pointer').click(function () {
        showGraphPanel();
    })
});



