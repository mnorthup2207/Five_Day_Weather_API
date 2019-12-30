
var cities = ["Strasbourg", "Frankfurt", "Amsterdam"];
var date = moment().format('MM/DD/YY');

function displayCityInfo() {
    var city = $(this).attr("data-name");
    var queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=718a19e59fe8c687c0ff168450145d0e&units=imperial";

    // console.log(queryURL)

    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function (response) {
        // console.log(response);
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
        var para1 = $("<p>").text(`Temperature: ${temp} °F`);
        var para2 = $("<p>").text(`Humidity: ${humidity}%`);
        var para3 = $("<p>").text(`Wind Speed: ${wind} MPH`);
        $(".weatherStrip").html(cityDate);
        $(".weatherStrip").append(weatherEl);
        $(".weatherInfo").html(para1);
        $(".weatherInfo").append(para2, para3);

        var lon = (response.coord.lon);
        var lat = (response.coord.lat);
        var queryURL = `http://api.openweathermap.org/data/2.5/uvi?appid=718a19e59fe8c687c0ff168450145d0e&lat=${lat}&lon=${lon}`

        $.ajax({
            url: queryURL,
            method: "GET"
        }).then(function (response) {
            // console.log(response);
            var uv = (response.value);
            var para4 = $("<p>").text(`UV.Index: ${uv}`);
            $(".weatherInfo").append(para4);


        });

        var queryURL = `http://api.openweathermap.org/data/2.5/forecast/?appid=718a19e59fe8c687c0ff168450145d0e&lat=${lat}&lon=${lon}&units=imperial`
        console.log(queryURL)
        $.ajax({
            url: queryURL,
            method: "GET"
        }).then(function (response) {
            var days = [1, 3, 6, 9, 12];
            $(".fiveDay").empty();
            for (var i = 0; i < days.length; i++) {
                console.log(i);
                
                var date = moment().add(i, 'days').format(`MM/DD/YY`)
                var timeEl1 = $("<p>").text(date);
                console.log(response.list[i].dt)
                var iconCode = (response.list[i].weather[0].icon);
                var iconUrl = "http://openweathermap.org/img/w/" + iconCode + ".png";
                var iconDescrip = (response.list[i].weather[0].description)
                var iconImg = $("<img>").attr({
                    "src": iconUrl,
                    "alt": iconDescrip
                });
                var temp = $("<p>").text(`Temp: ${response.list[i].main.temp}°F`);
                var humidity = $("<p>").text(`Humidity: ${response.list[i].main.humidity}%`);
                var card = $("<div>").attr({
                    "id": `id${i}`,
                    "class": "card"
                });
                $(".fiveDay").append(card);
                card.append(timeEl1, iconImg, temp, humidity);
            }

        });

    });
};


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

$("#addBtn").on("click", function (event) {
    event.preventDefault();
    var city = $("#city-input").val().trim();
    cities.push(city);
    renderBtn();
});

$(document).on("click", ".city", displayCityInfo);

renderBtn();
