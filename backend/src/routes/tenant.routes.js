const express = require("express");
const router = express.Router();

const auth = require("../middleware/auth.middleware");
const role = require("../middleware/role.middleware");

const tenantController = require("../controllers/tenant.controller");

// 🔴 GET ALL TENANTS (super_admin only)
router.get(
  "/",
  auth,
  role(["super_admin"]),
  tenantController.getAllTenants
);

// GET TENANT DETAILS
router.get(
  "/:id",
  auth,
  role(["super_admin", "tenant_admin"]),
  tenantController.getTenantDetails
);

// UPDATE TENANT
router.put(
  "/:tenantId",
  auth,
  role(["tenant_admin", "super_admin"]),
  tenantController.updateTenant
);

module.exports = router;
