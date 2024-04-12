const express = require("express");
const UserModel = require("../models/UserModel");
const TodoModel = require("../models/TodoModel");
const isLoggedIn = require("../middleware/MiddleWare");

const router = express.Router();
router.use(isLoggedIn)

router.post("/title/new", async(req, res) => {
    const {title} = req.body; 
    const currentUser = await UserModel.findById(req.user._id)
    if (currentUser){
        currentUser.todos.push({title})
        await currentUser.save()
    } 
    res.redirect("/")
}) 
 
router.get("/todos/:id", async(req, res) => {
    const {id} = req.params;
    const data = await UserModel.findById(req.user._id).populate("todos.todoList")
    const todos = data.todos.find((todo)=>todo._id.equals(id))
    res.render("todos",{todos})  

})

router.post("/todos/:id/new", async(req, res) => {
    const {id} = req.params
    const data = req.body;
    const todo = await TodoModel.create(data)
    const currentUser = await UserModel.findById(req.user._id)
    if (currentUser){
        const foundTodo = currentUser.todos.find((todo)=>todo._id.equals(id))
        foundTodo.todoList.push(todo)
        currentUser.save()
    }
    res.redirect(`/todos/${id}`)

})


router.get("/todos/:id/:todoId", async(req, res) => {
    const {id,todoId} = req.params
    const todo = await TodoModel.findById(todoId)
    res.render("show",{id,todo})
})
router.get("/todos/:id/:todoId/edit", async(req, res) => {
    const {id,todoId} = req.params
    const todo = await TodoModel.findById(todoId)
    res.render("edit",{id,todo})
})

router.patch("/todos/:id/:todoId", async(req, res) => {
    const {id,todoId} = req.params
    const data = req.body
    await TodoModel.findByIdAndUpdate(todoId,data)
    res.redirect(`/todos/${id}/${todoId}`)
})

router.delete("/todos/:id/:todoId", async(req, res) => {
    const {id,todoId} = req.params
    await TodoModel.findByIdAndDelete(todoId)
    res.redirect(`/todos/${id}`)
})
 

 
  
module.exports = router;