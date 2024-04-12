const express = require("express");
const UserModel = require("../models/UserModel");
const passport = require("passport");
const isLoggedIn = require("../middleware/MiddleWare");

const router = express.Router();

router.get("/login", (req, res) => {
  res.render("login");
});
router.get("/signup", (req, res) => {
  res.render("signup");
});
router.get("/", isLoggedIn, (req, res) => {
  try {
    const todos = req.user.todos;
    res.render("index", { todos });
  } catch (error) {
    console.log(error.message);
  }
});
router.post("/signup", async (req, res) => {
  const { username, password } = req.body;
  const user = new UserModel({ username });
  await UserModel.register(user, password);
  res.redirect("/login");
});

router.delete("/:id", async(req, res) => {
  await UserModel.findByIdAndUpdate(req.user._id,{$pull:{todos:{_id:req.params.id}}})
  res.redirect("/")
})

router.post("/login",passport.authenticate("local", { failureRedirect: "/login" }),(req, res) => {
    res.redirect("/");
  }
);

module.exports = router;
