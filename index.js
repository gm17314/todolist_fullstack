const express = require("express")
const app = express();
const path = require("path");
const authRouter = require("./routes/auth");
const todosRouter = require("./routes/todos");
const mongoose = require('mongoose');
const passport = require("passport")
const LocalStrategy = require("passport-local")
const session = require("express-session");
const UserModel = require("./models/UserModel");
const methodOverride = require('method-override')


mongoose.connect('mongodb://127.0.0.1:27017/todos')
.then(()=>console.log("Db connected"))
.catch((err)=>console.log(err))

app.set("view engine","ejs")
app.set("views",path.join(__dirname,"views"))
app.set(express.static(path.join(__dirname,"public")))

app.use(session({
    secret: 'pkcd',
    resave: false,
    saveUninitialized: true,
    // cookie: { secure: true }
  }))
app.use(passport.initialize());
app.use(passport.session());

passport.serializeUser(UserModel.serializeUser());
passport.deserializeUser(UserModel.deserializeUser());
passport.use(new LocalStrategy(UserModel.authenticate()));

app.use(methodOverride('_method'))
app.use(express.urlencoded({extended:false}))
app.use(authRouter)
app.use(todosRouter)


app.listen(8080,()=>{
console.log("Server connected at 8080")
})