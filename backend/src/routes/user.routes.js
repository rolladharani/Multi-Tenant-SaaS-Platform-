const express = require("express");
const router = express.Router();

const authMiddleware = require("../middleware/auth.middleware");
const roleMiddleware = require("../middleware/role.middleware");
const tenantMiddleware = require("../middleware/tenant.middleware");

const userController = require("../controllers/user.controller");

// Create user (Tenant Admin only)
router.post(
  "/",
  authMiddleware,
  roleMiddleware("tenant_admin"),
  tenantMiddleware,
  userController.createUser
);

// List users of tenant
router.get(
  "/",
  authMiddleware,
  roleMiddleware("tenant_admin"),
  tenantMiddleware,
  userController.getUsers
);

module.exports = router;
