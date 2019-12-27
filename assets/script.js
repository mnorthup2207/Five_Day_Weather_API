
var cities = ["Strasbourg", "Walldorf", "Amsterdam"];
var date = moment().subtract(10, 'days').calendar();

function displayCityInfo() {
    var city = $(this).attr("data-name");
    var queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=718a19e59fe8c687c0ff168450145d0e";

    console.log(queryURL)

    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function(response) {
        console.log(response);
        var iconcode = (response.weather[0].icon)
        var iconurl = "http://openweathermap.org/img/w/" + iconcode + ".png";
        var weatherEl = $("<img>").attr("src", iconurl)
        console.log(iconurl)
        var cityDate = $("<h1>").text(response.name + " " + date);
        $("#weatherData").append(cityDate);
        

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
