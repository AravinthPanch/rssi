
//function setPoints(points){
//    $.each(points, function(i, location){
//        var str = '<div id="' + location.id + '" class="pointer"/>'
//        $('#ruler').append(str)
//
//        var str1 = '#' + location.id
//        $(str1).css('left', location.left + 'px' )
//        $(str1).css('top', location.top + 'px')
//    })
//};


var svg = d3.select(".grp").append("svg")
    .attr("width", 300)
    .attr("height", 150)
    .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");