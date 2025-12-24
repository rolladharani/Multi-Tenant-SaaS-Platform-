const { User } = require("../models");
const bcrypt = require("bcrypt");

exports.createUser = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;

    const tenantId = req.user.tenant_id; // ✅ from JWT

    const password_hash = await bcrypt.hash(password, 10);

    const user = await User.create({
      name,
      email,
      password_hash,
      role,
      tenant_id: tenantId,
    });

    res.status(201).json({
      message: "User created successfully",
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
