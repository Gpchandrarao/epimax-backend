const mongoose = require("mongoose");

const taskSchemma = mongoose.Schema({
  title: {
    String,
  },
  description: {
    String,
  },
  status: {
    String,
  },
  assignee_id: mongoose.Schema.Types.ObjectId,
  created_at: { type: Date, default: Date.now },
  updated_at: { type: Date, default: Date.now },
});

const Task = mongoose.model("Task", taskSchemma);
module.exports = Task;
