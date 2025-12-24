const express = require("express");
const router = express.Router();

const auth = require("../middleware/auth.middleware");
const tenant = require("../middleware/tenant.middleware");
const role = require("../middleware/role.middleware");

const projectController = require("../controllers/project.controller");

router.post(
  "/",
  auth,                      // 1️⃣ Decode JWT → req.user
  tenant,                    // 2️⃣ Load tenant → req.tenant
  role(["tenant_admin"]),    // 3️⃣ Role check
  projectController.createProject
);

module.exports = router;
