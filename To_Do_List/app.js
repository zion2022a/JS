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
const listSchema=new mongoose.Schema({

  name:String,
  items:[itemSchema]
 
});

const Item=mongoose.model("Item",itemSchema);
const List=mongoose.model("List",listSchema);


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
          res.render("list", {listTitle: "Today", newListItems: items});
      }
        
      // mongoose.connection.close();

        
    }
  })

  

});

// Custom routes

app.get("/:paramname", function(req, res) {

  const day = date.getDate();
  const clistname=req.params.paramname;

 // console.log(clistname);

  List.findOne({name:clistname},(err,flist)=>{

    if(!err){

      if(!flist){
        //create new list
        console.log("Not Exist")
        const list2=new List({

          name:clistname,
          items:[item1,item2]
          
          
        });
        list2.save();
        res.redirect("/"+clistname);


      }
      else{
        // console.log("Exist");
        // console.log(flist);
         res.render("list", {listTitle: flist.name, newListItems: flist.items});
        
      }
    }
  });

  // List.find((err,lists)=>{

  //   if(err){
  //       console.log("error");
  //   }
  //   else{

  //     if(lists.length==0){

  //       List.insertMany([item1,item2],(err)=>{

  //         if(err){
  //             console.log(err);
  //         }
  //         else{
  //             console.log("insertion successful");
  //         }
  //       });
  //       res.redirect('/:paramname');
  //     }
      
  //     else{
  //         res.render("list", {listTitle: clistname, newListItems: lists});
        
  //     // mongoose.connection.close();

        
  //   }
  // }
  // })

  

});

app.post("/", function(req, res){

  const item = req.body.newItem;
  const list1=req.body.list;

  const item4=new Item({

    name:item,
    
    
  });

  if(list1=="Today"){

    item4.save();
    res.redirect('/');
  }
  else{
   // console.log(list1);

    List.findOne({name:list1},(err,flist)=>{

      flist.items.push(item4);
      flist.save();
      res.redirect("/"+ list1);
    });
  }




  // Item.insertMany([item4],(err)=>{

  //   if(err){
  //       console.log(err);
  //   }
  //   else{
  //       console.log("Inserted one item successfully");
  //       res.redirect('/');
  //   }
  // });
  
});

app.post("/delete",(req,res)=>{

  const itemid=req.body.checkbox;
  const title=req.body.listt;

  if(title=="Today"){

    Item.findByIdAndRemove(itemid,(err)=>{
      if(err){
        console.log("Error");
      }
      else{
        console.log("item removed successfully");
        res.redirect('/');
      }
    })
  }
  else{
    console.log(title);
    console.log(itemid);

      List.findOneAndUpdate({name:title},{ $pull: {items: {_id:itemid}}},(err,flist)=>{
        if(!err){
          console.log("Item removed ");
          flist.save();
          res.redirect('/'+title);
        }
      })
  }

 
  // res.redirect('/');
  
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
