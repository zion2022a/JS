

const express = require('express')

const app=express();
const https=require('https');
const request=require("request");

const bodyParser=require("body-parser");

app.use(bodyParser.urlencoded({extended:true}));

app.use(express.static("public"));

const mailchimp = require("@mailchimp/mailchimp_marketing");



app.get('/',(req,res)=>{

    
    res.sendFile(__dirname+"/signup.html");

});
// My code
//     app.post('/',(req,res)=>{

//         console.log("Post req recieved");
//         console.log(req.body.fname);
//         console.log(req.body.lname);
//         console.log(req.body.email);
//     })
// 

//Setting up MailChimp
mailchimp.setConfig({
    //*****************************ENTER YOUR API KEY HERE******************************
     apiKey: "71a52f4b65a4cf23eacb4c5a2fef1bb1-us13",
    //*****************************ENTER YOUR API KEY PREFIX HERE i.e.THE SERVER******************************
     server: "us13"
    });
    //As soon as the sign in button is pressed execute this
    app.post("/", function (req,res) {
    //*****************************CHANGE THIS ACCORDING TO THE VALUES YOU HAVE ENTERED IN THE INPUT ATTRIBUTE IN HTML******************************
    const firstName = req.body.firstName;
    const secondName = req.body.secondName;
    const email = req.body.email;
    //*****************************ENTER YOU LIST ID HERE******************************
    const listId = "84240c9249";
    //Creating an object with the users data
    const subscribingUser = {
     firstName: firstName,
     lastName: secondName,
     email: email
    };
    //Uploading the data to the server
     async function run() {
    const response = await mailchimp.lists.addListMember(listId, {
     email_address: subscribingUser.email,
     status: "subscribed",
     merge_fields: {
     FNAME: subscribingUser.firstName,
     LNAME: subscribingUser.lastName
    }
    });
    //If all goes well logging the contact's id
     res.sendFile(__dirname + "/success.html")
     console.log(
    `Successfully added contact as an audience member. The contact's id is ${
     response.id
     }.`
    );
    }
    //Running the function and catching the errors (if any)
    // ************************THIS IS THE CODE THAT NEEDS TO BE ADDED FOR THE NEXT LECTURE*************************
    // So the catch statement is executed when there is an error so if anything goes wrong the code in the catch code is executed. In the catch block we're sending back the failure page. This means if anything goes wrong send the faliure page
     run().catch(e => res.sendFile(__dirname + "/failure.html"));
    });

    let port = process.env.PORT;
    if (port == null || port == "") {
      port = 3000;
    }
     
    app.listen(port, function() {
      console.log("Server started succesfully");
    });   

// 
// API Key
// 71a52f4b65a4cf23eacb4c5a2fef1bb1-us13

// Audience id
// 84240c9249.