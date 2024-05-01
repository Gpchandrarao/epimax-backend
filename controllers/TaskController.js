const Task = require("../models/taskModel");

const createTask = async (req, res) => {
  try {
    const { title, description, assignee_id } = req.body;
    const status = "Pending";
    const task = new Task({ title, description, status, assignee_id });
    await task.save();
    res
      .status(201)
      .json({ message: "Task created successfully", task_id: task._id });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const retriveTask = async (req, res) => {
  try {
    const tasks = await Task.find();
    res.json(tasks);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const retriveSpacificTask = async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);
    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }
    res.json(task);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const updateTask = async (req, res) => {
  try {
    const { title, description, status, assignee_id } = req.body;
    const task = await Task.findByIdAndUpdate(
      req.params.id,
      { title, description, status, assignee_id, updated_at: Date.now() },
      { new: true }
    );
    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }
    res.json({ message: "Task updated successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const deteleTask = async (req, res) => {
  try {
    const task = await Task.findByIdAndDelete(req.params.id);
    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }
    res.json({ message: "Task deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  createTask,
  retriveTask,
  retriveSpacificTask,
  deteleTask,
  updateTask,
};
