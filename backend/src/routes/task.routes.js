const express = require("express");
const router = express.Router();

const auth = require("../middleware/auth.middleware");
const tenant = require("../middleware/tenant.middleware");

const taskController = require("../controllers/task.controller");

router.post(
  "/projects/:projectId/tasks",
  auth,
  tenant,
  taskController.createTask
);
router.get(
  "/projects/:projectId/tasks",
  auth,
  tenant,
  taskController.getProjectTasks
);
router.patch(
  "/tasks/:taskId/status",
  auth,
  tenant,
  taskController.updateTaskStatus
);
router.put(
  "/tasks/:taskId",
  auth,
  tenant,
  taskController.updateTask
);
router.delete(
  "/tasks/:taskId",
  auth,
  tenant,
  taskController.deleteTask
);
module.exports = router;
