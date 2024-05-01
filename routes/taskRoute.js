const express = require("express");
const TaskController = require("../controllers/TaskController");
const useMiddleware = require("../middleware/useMiddleware");

const router = express.Router();

router.post("/tasks", useMiddleware, TaskController.createTask);
router.get("/all-tasks", useMiddleware, TaskController.retriveTask);
router.get("/all-tasks/:id", useMiddleware, TaskController.retriveSpacificTask);
router.put("/update/:id", useMiddleware, TaskController.updateTask);
router.delete("/delete/:id", useMiddleware, TaskController.deteleTask);

module.exports = router;
