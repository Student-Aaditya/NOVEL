const express=require("express");
const app=express();
const port=7013;
app.get("/",(req,res)=>{
    res.send("working");
})

app.listen(port,(req,res)=>{
    console.log(`server working on ${port}`);
})
module.exports=app;