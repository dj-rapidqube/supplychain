// var express = require('express');
// var app = express();
// var request = require('request');

// app.get('/', function (req, res) {
//     res.send('Hello World!');
// });

// var server = app.listen(3002, function () {
// var host = server.address().address;
// var port = server.address().port;
//     console.log('Your app listening at http://%s:%s', host, port);
// });

// ({
//     username: "d75bf22e-524b-4262-91c5-dfb70db8c0bc",
//     password: "OowCtBg5mL",
//     host: "twcservice.au-syd.mybluemix.net",
//     port: 443,
//     url: "https://d75bf22e-524b-4262-91c5-dfb70db8c0bc:OowCtBg5mL@twcservice.au-syd.mybluemix.net"
//   })
// var requestUrl = 'https://d75bf22e-524b-4262-91c5-dfb70db8c0bc:OowCtBg5mL@twcservice.mybluemix.net:443/api/weather/v1/geocode/45.42/75.69/forecast/daily/10day.json?units=m&language=en-US';

// app.get('/api', function (req, res) {
//     request(requestUrl, function (error, response, body) {
//         if (!error && response.statusCode == 200) {

//            // parse the json result
//             var result = JSON.parse(body);
//         } else {
//            console.log(error, response.statusCode, body);
//         }
//         res.send("");
//     });
// });

var express = require('express');
var app = express();
var request = require('request');
var apiKey = '6ebeec1ed5f648e88de55743172109'; // our API key.

app.get('/', function (req, res) {
    res.send('Hello World!');
});

var server = app.listen(3002, function () {
var host = server.address().address;
var port = server.address().port;
    console.log('Your app listening at http://%s:%s', host, port);
});

var requestUrl = 'http://api.worldweatheronline.com/premium/v1/weather.ashx?key=6ebeec1ed5f648e88de55743172109&q=Kalyan&format=json&num_of_days=5';

function dayOfWeekAsString(dayIndex) {
    return ["Mon","Tue","Wed","Thu","Fri","Sat","Sun"][dayIndex];
}

app.get('/api', function (req, res) {
    request(requestUrl, function (error, response, body) {
        if (!error && response.statusCode == 200) {

            // parse the json result
            var result = JSON.parse(body);

           // generate a HTML table
           var html = '<table style="font-size: 10px; font-family: Arial, Helvetica, sans-serif">';

           // loop through each row
           for (var i = 0; i < 3; i++) {
               html += "<tr>";

               result.data.weather.forEach(function(weather) {
                   html += "<td>";
                   switch (i) {
                       case 0:
                           html += dayOfWeekAsString(new Date(weather.date).getDay());
                           break;
                       case 1:
                           html += weather.hourly[0].weatherDesc[0].value;
                           break;
                       case 2:
                           var imgSrc = weather.hourly[0].weatherIconUrl[0].value;
                           html += '<img src="'+ imgSrc + '" alt="" />';
                           break;
                  }
                  html += "</td>";
              });
              html += "</tr>";
          }

          res.send(html);
        } else {
           console.log(error, response.statusCode, body);
        }
        res.end("");
    });
});