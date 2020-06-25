const express = require("express");
const request = require("request");
const https = require("https");
const { post } = require("request");

const app = express();
const Port = process.env.PORT || 3000;
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

    const url = 'https://us10.api.mailchimp.com/3.0/lists/e6ce5bef97';

    const options = {
        method :"POST",
        auth: "manu:cb5098b027e02a45deee910a84bd3874-us10"

    }
    
    const request = https.request(url , options , function(response){
        if(response.statusCode===200){
            res.sendFile(__dirname + "/success.html")
        }
        else {
            res.sendFile(__dirname + "/failure.html")
        }
        // response.on("data", function (data){
        //     console.log(JSON.parse(data));
            
        // })

    })
    request.write(jsonData);
    request.end();
    
})

app.post("/failure",  function(req,res){
    res.redirect("/");
})

app.listen(Port , host , () => {
   console.log(`server is running at http://${host}:${PORT}/`);
});

//api key cb5098b027e02a45deee910a84bd3874-us10

// listid e6ce5bef97
