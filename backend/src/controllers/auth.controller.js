const { Tenant, User } = require("../models");
const { hashPassword, comparePassword } = require("../utils/password");
const { generateToken } = require("../utils/jwt");

// Register Tenant + Admin
exports.registerTenant = async (req, res) => {
  try {
    const { tenantName, adminName, email, password } = req.body;

    // Create tenant
    const tenant = await Tenant.create({
      name: tenantName,
      status: "active",
    });

    // Hash password
    const passwordHash = await hashPassword(password);

    // Create tenant admin
    const user = await User.create({
      tenant_id: tenant.id,
      name: adminName,
      email,
      password_hash: passwordHash,
      role: "tenant_admin",
    });

    return res.status(201).json({
      message: "Tenant registered successfully",
      tenantId: tenant.id,
      adminId: user.id,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Login
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ where: { email } });
    if (!user) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const isValid = await comparePassword(password, user.password_hash);
    if (!isValid) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const token = generateToken({
      userId: user.id,
      tenantId: user.tenant_id,
      role: user.role,
    });

    return res.json({
      token,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
