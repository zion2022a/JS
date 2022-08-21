//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const date = require(__dirname + "/date.js");
const mongoose=require("mongoose");

const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

mongoose.connect('mongodb://localhost:27017/Itemsdb',{useNewUrlParser:true});


// const items = ["Buy Food", "Cook Food", "Eat Food"];
// const workItems = [];

const itemSchema=new mongoose.Schema({

  name:String,
 
});

const Item=mongoose.model("Item",itemSchema);

const item1=new Item({

    name:"SLeep",
    
    
});
const item2=new Item({

  name:"Play",
  
  
});

// Item.insertMany([item1,item2],(err)=>{

//     if(err){
//         console.log(err);
//     }
//     else{
//         console.log("insertion successful");
//     }
// });

// Item.find((err,items)=>{

//   if(err){
//       console.log("error");
//   }
//   else{

//     if(items.length==0){

      
//     }
      
//      // mongoose.connection.close();

//       items.forEach((i) => {
//           console.log(i.name);
//       });
//   }
// })

app.get("/", function(req, res) {

  const day = date.getDate();
  Item.find((err,items)=>{

    if(err){
        console.log("error");
    }
    else{

      if(items.length==0){

        Item.insertMany([item1,item2],(err)=>{

          if(err){
              console.log(err);
          }
          else{
              console.log("insertion successful");
          }
        });
        res.redirect('/');
      }
      
      else{
          res.render("list", {listTitle: day, newListItems: items});
      }
        
      // mongoose.connection.close();

        
    }
  })

  

});

app.post("/", function(req, res){

  const item = req.body.newItem;

  const item4=new Item({

    name:item,
    
    
  });

  Item.insertMany([item4],(err)=>{

    if(err){
        console.log(err);
    }
    else{
        console.log("Inserted one item successfully");
        res.redirect('/');
    }
  });
  
});

app.get("/work", function(req,res){
  res.render("list", {listTitle: "Work List", newListItems: workItems});
});

app.get("/about", function(req, res){
  res.render("about");
});

app.listen(3000, function() {
  console.log("Server started on port 3000");
})
