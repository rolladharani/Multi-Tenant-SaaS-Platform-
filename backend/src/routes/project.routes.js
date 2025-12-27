const express = require("express");
const router = express.Router();

const projectController = require("../controllers/project.controller");
const authMiddleware = require("../middleware/auth.middleware");
const tenantMiddleware = require("../middleware/tenant.middleware");

// CREATE PROJECT
router.post(
  "/",
  authMiddleware,
  tenantMiddleware,
  projectController.createProject
);

// GET PROJECTS
router.get(
  "/",
  authMiddleware,
  tenantMiddleware,
  projectController.getProjects
);

// UPDATE PROJECT
router.put(
  "/:projectId",
  authMiddleware,
  tenantMiddleware,
  projectController.updateProject
);

// DELETE PROJECT
router.delete(
  "/:projectId",
  authMiddleware,
  tenantMiddleware,
  projectController.deleteProject
);

module.exports = router;


