$(document).ready(function(){
    var weatherApiUrl = "https://api.openweathermap.org/data/2.5/weather/";
    var apiKey = "67c958317d3dd8a3dc6c676c740da801";
    getLatLong();

    function getLatLong(){
        $.ajax({
            url: "https://geoip-db.com/json/",
            type: 'GET',
            dataType: 'json',
            success: function(data){
                var lat = data.latitude;
                var long = data.longitude;
                $('.location').html(data.city + "," + data.country_name);
                weatherApiUrl += ("?lat="+lat+"&lon="+long+"&APPID="+apiKey+"&units=metric");
                console.log(weatherApiUrl);
                getWeather();
            },
            error: function(err){
                alert("OOPs borked");
                console.log(err);
            }
        });
    }

    function getWeather(){
        console.log("log log log log");
        $.ajax({
            url: weatherApiUrl,
            type: 'GET',
            dataType: 'json',
            success: function(data){
                var temp = data.main.temp;
                var weather = data.weather[0].main;
                var descrip = data.weather[0].description;
                var icon = data.weather[0].icon;
                $('.weather').html(temp + "° Celcius");
                $('.description').html(descrip);
                $('.iconPic>img').attr('src','http://openweathermap.org/img/w/'+icon+'.png');
                
            },
            error:function(err){
                alert('ooops borked');
                console.log(err);
            }
    });

}
});
