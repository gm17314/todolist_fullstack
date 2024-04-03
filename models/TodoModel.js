const mongoose = require("mongoose")

//Schema
const TodoSchema = new mongoose.Schema({
    title:{
        type:String,
        required:true,
        trim:true
    },
    description:{
        type:String,
        required:true,
        trim:true
    }
})

//Model
const TodoModel = mongoose.model("Todo",TodoSchema)

module.exports = TodoModel;

