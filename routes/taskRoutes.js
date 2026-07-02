const express = require("express");
const router = express.Router();
const Task = require("../models/task");

// ---------------------- GET ALL TASKS ----------------------
router.get("/", async (req, res) => {
  try {
    const tasks = await Task.find().sort({ createdAt: -1 });
    res.json(tasks);
  } catch (error) {
    console.error("Error fetching tasks:", error);
    res.status(500).json({ message: "Error fetching tasks" });
  }
});

// ---------------------- CREATE NEW TASK ----------------------
router.post("/", async (req, res) => {
  try {
    const { title, description, dueDate } = req.body;

    if (!title) {
      return res.status(400).json({ message: "Task title is required" });
    }

    const newTask = new Task({
      title,
      description,
      dueDate
    });

    await newTask.save();
    res.status(201).json(newTask);

  } catch (error) {
    console.error("Error creating task:", error);
    res.status(500).json({ message: "Error creating task" });
  }
});

// ---------------------- DELETE TASK ----------------------
router.delete("/:id", async (req, res) => {
  try {
    await Task.findByIdAndDelete(req.params.id);
    res.json({ message: "Task deleted successfully" });
  } catch (error) {
    console.error("Error deleting task:", error);
    res.status(500).json({ message: "Error deleting task" });
  }
});

// ---------------------- UPDATE TASK (TOGGLE COMPLETE) ----------------------
router.patch("/:id", async (req, res) => {
  try {
    const { completed } = req.body;

    const updatedTask = await Task.findByIdAndUpdate(
      req.params.id,
      { completed },
      { new: true }
    );

    if (!updatedTask) {
      return res.status(404).json({ message: "Task not found" });
    }

    res.json(updatedTask);

  } catch (error) {
    console.error("Error updating task:", error);
    res.status(500).json({ message: "Error updating task" });
  }
});

module.exports = router;
