const express = require("express");
const router = express.Router();

const { createUser } = require("../controllers/user.controller");
const auth = require("../middleware/auth.middleware");
const role = require("../middleware/role.middleware");
const tenant = require("../middleware/tenant.middleware");

router.post(
  "/",
  auth,
  tenant,
  role("tenant_admin"),
  createUser
);

module.exports = router;
