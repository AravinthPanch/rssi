$(function () {
    $("#accordion").accordion({
        collapsible: true
    });

    $("#accordion").accordion({
        active: 0
    });
    setPosition();
});


function setPosition(){
    $('#ruler').append('<div id="location1" class="pointer"/>')
    $('#location1').css('left','790px')
    $('#location1').css('top','0px')

    $('#ruler').append('<div id="location2" class="pointer"/>')
    $('#location2').css('left','790px')
    $('#location2').css('top','366px')

    $('#ruler').append('<div id="location3" class="pointer"/>')
    $('#location3').css('left','0px')
    $('#location3').css('top','366px')
}
