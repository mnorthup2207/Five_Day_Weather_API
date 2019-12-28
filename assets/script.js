
var cities = ["Strasbourg", "Walldorf", "Amsterdam"];
var date = moment().subtract(10, 'days').calendar();

function displayCityInfo() {
    var city = $(this).attr("data-name");
    var queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=718a19e59fe8c687c0ff168450145d0e&units=imperial";

    console.log(queryURL)

    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function(response) {
        console.log(response);
        var iconcode = (response.weather[0].icon)
        var iconurl = "http://openweathermap.org/img/w/" + iconcode + ".png";
        var cityDate = $("<h1>").text(response.name + " " + date);
        cityDate.attr("class", "col-md-6");
        var weatherEl = $("<img>").attr({
            "src": iconurl,
            "class": "col-md-1"
        });
        var temp = (response.main.temp);
        var humidity = (response.main.humidity);
        var wind = (response.wind.speed);
        var UV = (response.main.humidity);
        var para1 = $("<p>").text(`Temperature: ${temp}`);
        var para2 = $("<p>").text(`Humidity: ${humidity}`);
        var para3 = $("<p>").text(`Wind Speed: ${wind}`);
        var para4 = $("<p>").text(`UV.Index: `);
        $(".weatherStrip").html(cityDate);
        $(".weatherStrip").append(weatherEl);
        $(".weatherInfo").html(para1);
        $(".weatherInfo").append(para2, para3, para4);


        

    })
  }


function renderBtn() {
    $("#cityBtn").empty()
    for (var i = 0; i < cities.length; i++) {
        var a = $("<button>");
        a.addClass("city");
        a.attr("data-name", cities[i]);
        a.text(cities[i]);
        $("#cityBtn").append(a);

    };
};

$("#addBtn").on("click", function(event){
    event.preventDefault();
    var city = $("#city-input").val().trim();
    cities.push(city);
    renderBtn();
});

$(document).on("click", ".city", displayCityInfo);

renderBtn();
