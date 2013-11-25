var barChartData = {
    labels : ["January","February","March","April","May","June","July"],
    datasets : [
        {
            fillColor : "rgba(220,220,220,0.5)",
            strokeColor : "rgba(220,220,220,1)",
            data : [65,59,90,81,56,55,40]
        }
    ]

}

new Chart(document.getElementById("canvas").getContext("2d")).Bar(barChartData);