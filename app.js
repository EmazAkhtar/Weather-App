const express=require("express");
const https=require("https");
const bodyParser=require("body-parser");

const app=express();
app.use(bodyParser.urlencoded({extended:true}));

app.get("/",function(req,res){
   res.sendFile(__dirname + "/index.html");
});

   app.post("/",function(req,res){
    // console.log("post request handled");
     const query= req.body.cityName;
     const units="metric";
     const apiKey="f4dcec388a804cd10fca78a9882e006b";
     const url="https://api.openweathermap.org/data/2.5/weather?q="+query+"&appid="+apiKey+ "&units="+units;
    // fetching data from an external server 
    https.get(url,function(response){
   
      console.log(response.statusCode);

       // this is how you get hold of the data from the response 
        response.on("data",function(data){
            // starting me data hexadecimal form me rehta h data 
            // console.log(data);

            // parsing the data and converting it into a js object now weatherData is the root js object 
            const weatherData= JSON.parse(data);
            console.log(weatherData);

            // going the other way round-stringifying the data-just for ex aisa bhi hota h kab use hoga ye socho?
            const object={
                name:"emaz",
                favouriateFood:"idly"
            }
            JSON.stringify(object);
            console.log(object);

               /*now accesing the data through root js object by digging deep into it and choosing whatever we want, 
                 use json viewer pro to copy the path of the data when objects are very complex*/
            const temp = weatherData.main.temp;
            const humidity= weatherData.main.humidity;
            const description= weatherData.weather[0].description;
            const icon=weatherData.weather[0].icon;
            const imageUrl="http://openweathermap.org/img/wn/"+icon+"@2x.png";


            console.log(temp); 
            console.log(humidity); 
            console.log(description); 

            res.write("<h1> the temperature in "+query+" is "+ temp+" degrees celcius </h1>");
            res.write("<p> the humidity is "+humidity+" </p>");
            res.write("<p> the weather is "+description+" </p>");
            res.write("<img src=" +imageUrl+ ">");
            res.send();
        });
    });
});
    // in one app.get method only one response can be sent 
    // res.send("server is runnung up");
   
app.listen(3000,function(){
    console.log("server has started at port 3000");
});