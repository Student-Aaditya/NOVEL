const express=require("express");
const app=express();
const path=require("path");
const ejsMate=require("ejs-mate");
const methodOverride=require("method-override");
const port=7013;
const mongoose = require("mongoose");
const User=require("./Model/user.js");
const passport=require("passport");
const passportLocal=require("passport-local");
// const passportlocalmongoose=require("passport-local-mongoose");
const session=require("express-session");

app.set("views",path.join(__dirname,"view"));
app.set("view engine","ejs");

app.engine("ejs", ejsMate);
app.use(express.static(path.join(__dirname, "PUBLIC")));
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));

const sessionOption = ({
    secret: "musecretcode",
    resave: false,
    saveUninitialized: true,
})

app.use(session(sessionOption));
app.use(passport.initialize());
app.use(passport.session());
passport.use(new passportLocal(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());



async function main() {
    await mongoose.connect("mongodb://127.0.0.1:27017/novel");

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



app.post("/sign",async (req,res)=>{
    try{
        let {username,email,password}=req.body;
        const newUser=new User({email,username});
        const register=await User.register(newUser,password);
        res.redirect("/");
        console.log(register);
    }catch(err){
        console.log(err);
        res.redirect("/sign");
    }
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

app.listen(port,(req,res)=>{
    console.log(`server working on ${port}`);
})
module.exports=app;