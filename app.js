require('dotenv').config()
const express = require("express");
//const request = require("request");
const https = require("https");
//const { post } = require("request");

const app = express();
const host = "127.0.0.1";

app.use(express.static("public"));
app.use(express.urlencoded({extended: true})); 
app.use(express.json());

app.get("/", function(req,res){
    res.sendFile(__dirname+"/signup.html");
})
app.post("/signup", function(req,res){
    let firstName=req.body.Firstname;
    let lastName= req.body.Lastname;
    let email = req.body.Email;
    
    var data ={
        members:[
            {
                email_address: email,
                status: "subscribed",
                merge_fields:{
                    FNAME: firstName,
                    LNAME: lastName
                }
            }
        ]
    }
    var jsonData = JSON.stringify(data);

    const url = process.env.URLL;

    const options = {
        method :"POST",
        auth: process.env.AUTHR

    }
    
     const request1 = https.request(url , options , function(response){
        if(response.statusCode===200){
            res.sendFile(__dirname + "/success.html")
        }
        else {
            res.sendFile(__dirname + "/failure.html")
        } 
        
        
         response.on("data", function (data){
        //     console.log(JSON.parse(data));
            
         })

    })
    
    request1.write(jsonData);
    request1.end();
    
})

app.post("/failure",  function(req,res){
    res.redirect("/");
})

app.listen(process.env.PORT || 3000 , () => {
   console.log(`server is running at http://${host}:3000/`);
});

