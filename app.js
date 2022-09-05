/*const express=require("express");
const app=express();
const port=3000;
const https=require("https");
const apikey="20c066dd406b1d59d91c596eb37a1e2e";
const location="Mumbai";
const api="https://api.openweathermap.org/data/2.5/weather?q=" +location+ "&appid=" + apikey;
app.get("/",function(req,res){
    https.get(api,function(response){
        console.log(response.statusCode);
        response.on("data",function(data){
            const weatherData=JSON.parse(data);
            const temperature=weatherData.main.temp;
            //res.write("temperature is ${temperature}");
            //console.log(weatherData);
        });
    });
    res.send("server is running");
});
app.listen(port,function(){
    console.log("server is running on port ${port}.");
})*/
const request = require('request'); 
const express = require('express');
const app = express();

var API_KEY = '20c066dd406b1d59d91c596eb37a1e2e'; 
  
app.get('/', (req, res)=> {

    // Get city name passed in the form
    var city = req.query.city;
    //const https=require("https");
    var request = require('request');
   
    let url = "https://api.openweathermap.org/data/2.5/weather?q=" +city+ "&appid=" + API_KEY;
    request({ url: url, json: true }, function (error, response) { 
        if (error) 
        { 
            console.log('Unable to connect to Forecast API'); 
        } 
          else { 
            console.log('It is currently ' + response.body.main.temp+ ' degrees out.'
        ); 
        console.log('The high today in '+city+' is ' + response.body.main.temp_max + ' with a low of '+ response.body.main.temp_min
            ); 
            console.log('Humidity today is ' + response.body.main.humidity
            ); 
            res.send(response.body);
        } 
    }) 
} )
  
app.listen(3000,()=> {
    console.log('Weather app listening on port 3000!');
});