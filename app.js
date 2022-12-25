const express = require("express");
const https = require("https");
const bodyParser = require("body-parser");

const app = express();

app.use(bodyParser.urlencoded({extended: true}));

app.get("/", function (req, res){
res.sendFile(__dirname + "/index.html" );
});

app.post("/", function(req, res){


  const query = req.body.cityName;
  const appid = "70ae69876ddbd44022d733f44913501e#";
  const units = "metric"


    var url = "https://api.openweathermap.org/data/2.5/weather?q=" + query + "&units="+units+" &appid=" + appid + "";

    https.get(url, function(response){

      console.log(response.statusCode);

  response.on("data", function(data){
  const weatherData = JSON.parse(data);
  const temp = weatherData.main.temp;
  const weatherDescription = weatherData.weather[0].description;
  const icon = weatherData.weather[0].icon;

  const imageURL = "http://openweathermap.org/img/wn/10d@2x.png";

  res.write("<p> the weather is currently " + weatherDescription + " </p>"  );

  res.write("<h1> the temperature in " + query + " is " + temp + " degrees celcius </h1>");

  res.write("<img src =" + imageURL + ">");

  res.send();

});
});
});







app.listen(3000, function(){
  console.log("server is running on port 3000.");
})
