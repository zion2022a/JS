
const express=require('express');
// const ejs=require('ejs');
const https=require('https');
// const request=require("request");

const app=express();

app.set("view engine","ejs");

const bodyParser=require("body-parser");

app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static('public'));

var items=["Eat","Code","Sleep"];
var item="";

app.get('/',(req,res)=>{

    // res.send('Hello');

    var today=new Date();
    var currentday=today.getDay();

    var options={
        weekday:"long",
        day:"numeric",
        month:"long"

    };


    var day=today.toLocaleDateString("en-US",options);

  
    res.render("list",{kday:day,newlistitems:items});
})

app.post('/',(req,res)=>{

    var item=(req.body.text1);
    items.push(item);
    res.redirect('/');
})


// rlet port = process.env.PORT;
    
     
    app.listen(3000, function() {
      console.log("Server started succesfully");
    });   
