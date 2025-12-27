const { Tenant, User } = require("../models");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// ===============================
// REGISTER TENANT + ADMIN
// ===============================
exports.registerTenant = async (req, res) => {
  try {
    const { tenantName, adminName, email, password } = req.body;

    // Create tenant
    const tenant = await Tenant.create({
      name: tenantName,
      status: "active",
    });

    // Hash password (bcryptjs)
    const passwordHash = await bcrypt.hash(password, 10);

    // Create tenant admin
    const user = await User.create({
      tenant_id: tenant.id,
      name: adminName,
      email,
      password_hash: passwordHash,
      role: "tenant_admin",
    });

    res.status(201).json({
      success: true,
      message: "Tenant registered successfully",
      tenantId: tenant.id,
      adminId: user.id,
    });
  } catch (error) {
    console.error("REGISTER ERROR:", error);
    res.status(500).json({ message: error.message });
  }
};

// ===============================
// LOGIN
exports.login = async (req, res) => {
  try {
    console.log("LOGIN BODY:", req.body);

    const { email, password, tenantSubdomain } = req.body;

    // 1️⃣ Find tenant
    const tenant = await Tenant.findOne({ where: { subdomain: tenantSubdomain } });
    console.log("TENANT FOUND:", tenant?.id, tenant?.subdomain);

    if (!tenant) {
      return res.status(404).json({ message: "Tenant not found" });
    }

    // 2️⃣ Find user inside tenant
    const user = await User.findOne({
      where: {
        email,
        tenant_id: tenant.id
      }
    });

    console.log("USER FOUND:", user?.email, user?.tenant_id);

    if (!user) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    // 3️⃣ Compare password
    const isMatch = await bcrypt.compare(password, user.password_hash);
    console.log("PASSWORD MATCH:", isMatch);

    if (!isMatch) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    // 4️⃣ Create token
    const token = jwt.sign(
      {
        userId: user.id,
        tenantId: user.tenant_id,
        role: user.role
      },
      process.env.JWT_SECRET,
      { expiresIn: "24h" }
    );

    return res.json({
      success: true,
      token
    });
  } catch (err) {
    console.error("LOGIN ERROR:", err);
    res.status(500).json({ message: "Server error" });
  }
};
// ===============================
// GET CURRENT USER
// ===============================
exports.getMe = async (req, res) => {
  res.status(200).json({
    success: true,
    user: req.user,
  });
};

// ===============================
// LOGOUT (JWT → client deletes token)
// ===============================
exports.logout = async (req, res) => {
  res.status(200).json({
    success: true,
    message: "Logged out successfully",
  });
};
