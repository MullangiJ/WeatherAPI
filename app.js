const redis=require('redis');
const request = require('request'); 
const express = require('express');
const app = express();
//const redis = require("redis");
const redisPort = 6379
const client = redis.createClient(redisPort);
client.on("error", (err) => {
    console.log(err);
});
//const DEFAULT_EXPIRATION=3600;
let API_KEY = '20c066dd406b1d59d91c596eb37a1e2e'; 
  let stringify;
app.get('/', (req, res)=> {
    let city = req.query.city;
    let url = "https://api.openweathermap.org/data/2.5/weather?q=" +city+ "&appid=" + API_KEY;
    //client.setex('/', 1440, JSON.stringify(data.results));
    client.setex(city, 600,stringify(url));
    request({ url:url, json: true },(error, response)=> { 
        if (error) 
        {  
            const message="Unable to connect to Forecast API"
            res.status(403).send(message);
            console.log('Unable to connect to Forecast API'); 
        } 
          else { 
            console.log('It is currently ' + response.body.main.temp+ ' degrees out.'
            
        ); 
        console.log('The high today in '+city+' is ' + response.body.main.temp_max + ' with a low of '+ response.body.main.temp_min
            ); 
            console.log('Humidity today is ' + response.body.main.humidity
            ); 
            //client.setex('/',DEFAULT_EXPIRATION,JSON.stringify(city));
            res.send({temp:response.body.main.temp});

        } 
    }) 
} )
  
app.listen(3000,()=> {
    console.log('Weather app listening on port 3000!');
});
