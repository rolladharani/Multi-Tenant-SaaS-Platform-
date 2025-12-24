const express = require("express");
const router = express.Router();

const auth = require("../middleware/auth.middleware");
const role = require("../middleware/role.middleware");

const tenantController = require("../controllers/tenant.controller");

// Super admin only
router.get(
  "/:id",
  auth,
  role(["super_admin", "tenant_admin"]),
  tenantController.getTenantDetails
);

module.exports = router;
