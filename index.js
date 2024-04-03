const express = require("express")
const app = express();
const path = require("path")
const router = require("./routes/Todo")
const mongoose = require("mongoose")
const methodOverride = require('method-override')

mongoose.connect('mongodb://127.0.0.1:27017/todo');

app.set("view engine","ejs")
app.set("views",path.join(__dirname,"views"))
app.set(express.static(path.join(__dirname,"public")))

app.use(methodOverride('_method'))
app.use(express.urlencoded({extended:false}));
app.use(router);


app.listen(8080,()=>{
console.log("Server connected at 8080")
})