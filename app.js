const redis=require('redis');
const request = require('request'); 
const express = require('express');
const app = express();
const redisPort = 6379
const client = redis.createClient();
client.on("error", (err) => {
    console.log(err);
});
let API_KEY = '20c066dd406b1d59d91c596eb37a1e2e'; 
  let stringify;
  app.get('/', async(req,res)=> {

    if(!req.query.city){

      const message = 'Invalid Request';

        res.status(403).send(message);

    }

    var resp = await getdatafromRedis(req.query.city);
    //console.log("value from redis", resp); process.exit(0);
    if(resp != null){
        res.status(200).send(resp)
    }else{
       getDatafromAPI(req.query.city, (err, resp) => {
            if(err){
                res.send(err);
            }else{
                res.status(200).send(resp);
            }
        });
    }
})
  
app.listen(3000,async ()=> {
    await client.connect();
    console.log('Weather app listening on port 3000!');
});

async function getdatafromRedis(city){
    console.log("I m in redis function");
    const result = await client.get(city);
    if(result !=null){
        return JSON.parse(result);
    }else{
        return null;
    }
     
    }

 function getDatafromAPI(city,callback){
    let url = "https://api.openweathermap.org/data/2.5/weather?q=" +city+ "&appid=" + API_KEY;
    request({ url:url, json: true },(error, response)=> { 
        if (error) 
        {  
            callback({"msg":"error"},null); 
        } 
          else { 
            client.set(city,JSON.stringify({"temp":response.body.main.temp}));
        callback (null, {"temp":response.body.main.temp});
            
        } 
    });
 }