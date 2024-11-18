const express=require("express");
const app=express();
const path=require("path");
const ejsMate=require("ejs-mate");
const methodOverride=require("method-override");
const port=7013;

app.set("views",path.join(__dirname,"view"));
app.set("view engine","ejs");

app.engine("ejs", ejsMate);
app.use(express.static(path.join(__dirname, "PUBLIC")));
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));

app.get("/",(req,res)=>{
    res.render("./HOME/index.ejs");
    // res.send("working");
})

app.listen(port,(req,res)=>{
    console.log(`server working on ${port}`);
})
module.exports=app;