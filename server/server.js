const express = require("express");
const cors = require("cors");
const dbCon = require("./db/db");
const Todo = require("./models/todo");
const app = express();
app.use(express.json());
app.use(cors());
dbCon();
app.get("/", (req, res) => {
  res.json({ message: "Message" });
});
app.post("/api/v1/create-todo", async (req, res) => {
  try {
    const { title, description } = req.body;
    const newTodo = new Todo({ title, description });
    await newTodo.save();
    res.status(201).json({ message: "Created", todo: newTodo });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});
app.get("/api/v1/get-todo", async (req, res) => {
  try {
    const todos = await Todo.find();
    res.status(200).json(todos);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});
app.get("/api/v1/get-todo/:id", async (req, res) => {
  try {
    const todo = await Todo.findById(req.params.id);
    res.status(200).json(todo);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});
app.put("/api/v1/update-todo/:id", async (req, res) => {
  try {
    const { title, description } = req.body;
    const updatedData = { title, description };
    const updatedTodo = await Todo.findByIdAndUpdate(
      req.params.id,
      updatedData,
      { new: true }
    );
    res.status(200).json({ message: "Updated", todo: updatedTodo });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});
app.delete("/api/v1/delete-todo/:id", async (req, res) => {
  try {
    await Todo.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "Blog deleted" });
  } catch (error) {}
});
const PORT = 8000;
app.listen(PORT, () => {
  console.log(`Server running at ${PORT}`);
});
