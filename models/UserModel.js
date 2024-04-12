const mongoose = require('mongoose');
const passportLocalMongoose = require("passport-local-mongoose");

//Schema
const UserSchema = new mongoose.Schema({
  todos: [
    {
      title: {
        type: String,
        trim: true,
        required: true,
      },
      todoList: [
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Todo",
        }
      ],
    },
  ],
});

// Model
UserSchema.plugin(passportLocalMongoose);

const UserModel = mongoose.model("User", UserSchema);

module.exports = UserModel;