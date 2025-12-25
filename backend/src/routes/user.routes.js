const express = require("express");
const router = express.Router();

const auth = require("../middleware/auth.middleware");
const tenant = require("../middleware/tenant.middleware");
const role = require("../middleware/role.middleware");

const userController = require("../controllers/user.controller");

// ✅ CREATE USER UNDER TENANT
router.post(
  "/tenants/:tenantId/users",
  auth,
  tenant,
  role(["tenant_admin"]),
  userController.createUser
);

router.get(
  "/tenants/:tenantId/users",
  auth,
  tenant,
  userController.getTenantUsers
);
// ✅ UPDATE USER
router.put(
  "/users/:userId",
  auth,
  tenant,
  userController.updateUser
);
router.delete(
  "/users/:userId",
  auth,
  tenant,
  role(["tenant_admin"]),
  userController.deleteUser
);
module.exports = router;
