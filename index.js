const express=require("express");
const app=express();
const path=require("path");
const ejsMate=require("ejs-mate");
const methodOverride=require("method-override");
const port=7013;
const mongoose = require("mongoose");
// const Check=require("./script.js");

app.set("views",path.join(__dirname,"view"));
app.set("view engine","ejs");

app.engine("ejs", ejsMate);
app.use(express.static(path.join(__dirname, "PUBLIC")));
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));


async function main() {
    await mongoose.connect("mongodb://127.0.0.1:27017/blog");

}
main().
    then(() => {
        console.log("sucessful connection");
    }).catch((err) => {
        console.log(err);
    })


app.get("/",(req,res)=>{
    res.render("./HOME/index.ejs");
    // res.send("working");
})
app.get("/demo",(req,res)=>{
    res.render("./HOME/demo.ejs");

});

app.get("/sign",(req,res)=>{
    res.render("./SIHNLOG/sign.ejs");
})
app.get("/log",(req,res)=>{
    res.render("./SIHNLOG/log.ejs");
})

app.get("/contact",(req,res)=>{
    res.render("./HOME/contact.ejs")
})

//store
app.get("/store",(req,res)=>{
    res.render("./HOME/store.ejs");
})



app.post("/login",(req,res)=>{
    res.render("./Home/index.ejs");
})
app.post("/sign-up",(req,res)=>{
    res.render("./HOME/index.ejs");
})
app.listen(port,(req,res)=>{
    console.log(`server working on ${port}`);
})
module.exports=app;