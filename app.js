const { default: chalk } = require('chalk');
const { Template } = require('ejs');
const express = require('express');
const request = require('request');

const PORT = process.env.PORT || 3000;

const app = express();

app.set('view engine','ejs');

let city = "Bengaluru";
let url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=07b391e584d33cefd82aa226efd9f0c9`;
let weatherObj = {};

app.use(express.static(__dirname + '/public'));
app.use(express.urlencoded({ extended: true }));

app.post('/', (req, res) => {
  city = req.body.cityname;
  
  url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=07b391e584d33cefd82aa226efd9f0c9`;

  request(url, (error, response, body) => {
        weatherJson = JSON.parse(body);

          weatherObj = {
          city: weatherJson.name,
          country: weatherJson.sys.country,
          temperature: Math.round(weatherJson.main.temp),
          icon: weatherJson.weather[0].icon,
          latitude: weatherJson.coord.lat,
          longitude: weatherJson.coord.lon,
          description: weatherJson.weather[0].main
        };

        if(weatherObj.latitude > 0) {
          weatherObj.latitude = weatherObj.latitude.toFixed(2).toString() + "°N\t"; 
        } else {
          weatherObj.latitude = Math.abs(weatherObj.latitude).toFixed(2).toString() + "°S\t"; 
        }

        if(weatherObj.longitude > 0) {
          weatherObj.longitude = weatherObj.longitude.toFixed(2).toString() + "°E"; 
        } else {
          weatherObj.longitude = Math.abs(weatherObj.longitude).toFixed(2).toString() + "°W"; 
        }

        res.render('index', { weatherObj });
  });

});



app.get('/', (req, res) => {
      
    res.render('index', { weatherObj });
  });



app.listen(PORT, () => {
  console.log(chalk.bgBlueBright.black('Server listening to port 3000 '));
});



