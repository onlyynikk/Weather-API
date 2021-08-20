const express = require("express");
const https = require("https");
const bodyParser = require("body-parser");


const app = express();

app.use(bodyParser.urlencoded({extended: true}));
  //GET METHOD


app.get("/", function(req, res) {

    res.sendFile(__dirname + "/index.html");

})


    //POST METHOD


app.post("/", function(req, res) {

    const query = req.body.cityName;
    const apiKey = "1182cc8afcd87786ed809f4534a43e03";
    const units = "metric"
    const url = "https://api.openweathermap.org/data/2.5/weather?q="+ query +",&units="+units+"&appid="+apiKey+"";
    
    

    https.get(url, function(response){
        console.log(response.statusCode);

        response.on("data", function(data){
            const weatherData = JSON.parse(data);
            const temp = weatherData.main.temp;
            const description = weatherData.weather[0].description;
            const city = weatherData.name;

            const icon = weatherData.weather[0].icon;
            const iconurl = "http://openweathermap.org/img/wn/"+icon+"@2x.png"

            res.write("<h1>The weather description is "+ description+ ".</h1>")
            res.write("<h1>The temperature in " + query + " is "+ temp + " degree celcius.</h1>")
            res.write("<img src= "+ iconurl +">");
            res.send();
        })


    })
})


app.listen(3000, function(){
    console.log("Server is running at port 3000");
})





