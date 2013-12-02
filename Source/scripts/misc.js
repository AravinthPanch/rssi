
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



//    var xmlhttp = new XMLHttpRequest();
//    xmlhttp.onreadystatechange=function()
//    {
//        if (xmlhttp.readyState==4 && xmlhttp.status==200)
//        {
//            console.log(xmlhttp.responseText);
//        }
//    }
//    xmlhttp.open("GET", uri, true);
//    xmlhttp.send();


console.log('ajax')
$.ajax({
    url: uri,
    success: function (result) {
        console.log('ajax')
        console.log(result);
    }
});

console.log('get')
$.get(uri, function (results) {
    console.log('get')
    console.log(results)
})


var extRSSI = [];
function getDatabaseList() {
    var dbUri = 'http://localhost:5000/evarilos/raw_data/v1.0/database'
    $.getJSON(dbUri, function (result) {
        $.each(result, function (i, field) {
            $("#database-1").append('<div class=dbLink href=' + field + '>' + i + '</div>')
        })
        $('.dbLink').click(function (event) {
            $(event.target).addClass('clicked')
            $.getJSON($(event.target).attr('href'), function (result) {
                $('#collection-1').html('')
                $.each(result, function (i, field) {
                    $('#collection-1').append('<div class=collectionLink href=' + field + '>' + i + '</div>')
                })
                $('.collectionLink').click(function (event) {
                    $.getJSON($(event.target).attr('href'), function (result) {
                        $.each(result, function (i, field) {
                            $.getJSON(field.URI, function (result) {
                                extRSSI.push(result)
//                                listAccessPoints()
                                loadFrame()
                            })
                        })
                    })
                })
            })
        });
    })


};