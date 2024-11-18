const express=require("express");
const app=express();
const path=require("path");
const port=7013;

app.set("views",path.join(__dirname,"view"));
app.set("view engine","ejs");

app.get("/",(req,res)=>{
    res.render("index.ejs");
    // res.send("working");
})

app.listen(port,(req,res)=>{
    console.log(`server working on ${port}`);
})
module.exports=app;