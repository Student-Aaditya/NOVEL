const express = require("express");
const app = express();
const path = require("path");
const ejsMate = require("ejs-mate");
const methodOverride = require("method-override");
const port = 7013;
const mongoose = require("mongoose");
const User = require("./Model/user.js");
const passport = require("passport");
const passportLocal = require("passport-local");
const session = require("express-session");
const flash = require("connect-flash");

app.set("views", path.join(__dirname, "view"));
app.set("view engine", "ejs");

app.engine("ejs", ejsMate);
app.use(express.static(path.join(__dirname, "PUBLIC")));
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));

const sessionOption = {
    secret: "musecretcode",
    resave: false,
    saveUninitialized: true,
};

app.use(session(sessionOption));
app.use(flash()); 
app.use(passport.initialize());
app.use(passport.session());

passport.use(new passportLocal(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());


app.use((req, res, next) => {
    res.locals.user = req.user;
    res.locals.success = req.flash("success"); 
    res.locals.error = req.flash("error");
    next();
});

async function main() {
    await mongoose.connect("mongodb://127.0.0.1:27017/novel");
}
main()
    .then(() => {
        console.log("Successful connection");
    })
    .catch((err) => {
        console.log(err);
    });

app.get("/", (req, res) => {
    res.render("./HOME/index.ejs");
});

// Sign-up route
app.get("/sign", (req, res) => {
    res.render("./SIHNLOG/sign.ejs");
});

app.post("/sign", async (req, res) => {
    try {
        let { username, email, password } = req.body;
        const newUser = new User({ email, username });
        const register = await User.register(newUser, password);
        req.flash("success", "Account created successfully!"); // ✅ Flash message
        res.redirect("/");
    } catch (err) {
        console.log(err);
        req.flash("error", "Sign-up failed! Try again.");
        res.redirect("/sign");
    }
});

// Login route
app.get("/login", (req, res) => {
    res.render("./SIHNLOG/log.ejs");
});

app.post("/login", passport.authenticate("local", { 
    failureRedirect: "/login", 
    failureFlash: true // ✅ Make sure failureFlash is true
}), (req, res) => {
    req.flash("success", "Welcome back!");
    console.log("Login successful");
    res.redirect("/");
});

app.get("/contact", (req, res) => {
    res.render("./HOME/contact.ejs");
});

// Store route
app.get("/store", (req, res) => {
    res.render("./HOME/store.ejs");
});
app.get("/blog",(req,res)=>{
    res.render("./HOME/demo.ejs");
})

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});

module.exports = app;
