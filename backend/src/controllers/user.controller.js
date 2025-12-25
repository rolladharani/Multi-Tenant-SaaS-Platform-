const bcrypt = require("bcrypt");
const { User } = require("../models");

/**
 * CREATE USER
 * POST /api/tenants/:tenantId/users
 */
exports.createUser = async (req, res) => {
  try {
    const { email, password, fullName, role } = req.body;

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      email,
      password_hash: hashedPassword,
      name: fullName,
      role,
      tenant_id: req.tenant.id,
    });

    res.status(201).json({
      success: true,
      data: user,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


/**
 * LIST USERS
 * GET /api/tenants/:tenantId/users
 */
exports.getTenantUsers = async (req, res) => {
  try {
    const users = await User.findAll({
      where: { tenant_id: req.tenant.id },
      attributes: { exclude: ["password_hash"] }, // 🔐 IMPORTANT
      order: [["createdAt", "DESC"]],
    });

    res.status(200).json({
      success: true,
      data: users,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};


/**
 * UPDATE USER
 * PUT /api/users/:userId
 */
exports.updateUser = async (req, res) => {
  try {
    const { userId } = req.params;
    const { fullName, role, isActive } = req.body;

    const user = await User.findOne({
      where: {
        id: userId,
        tenant_id: req.tenant.id,
      },
    });

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    // 🔒 Authorization logic
    const isSelf = req.user.userId === user.id;
    const isAdmin = req.user.role === "tenant_admin";

    if (!isAdmin && !isSelf) {
      return res.status(403).json({
        success: false,
        message: "Not authorized",
      });
    }

    // 👤 Normal user can update only name
    if (isSelf && !isAdmin) {
      if (fullName) user.name = fullName;
    }

    // 👑 Tenant admin can update everything
    if (isAdmin) {
      if (fullName) user.name = fullName;
      if (role) user.role = role;
      if (typeof isActive === "boolean") user.is_active = isActive;
    }

    await user.save();

    res.status(200).json({
      success: true,
      message: "User updated successfully",
      data: {
        id: user.id,
        email: user.email,
        name: user.name,
        role: user.role,
        isActive: user.is_active,
      },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};


/**
 * DELETE USER
 * DELETE /api/users/:userId
 */
exports.deleteUser = async (req, res) => {
  try {
    const { userId } = req.params;

    // Only tenant_admin allowed
    if (req.user.role !== "tenant_admin") {
      return res.status(403).json({
        success: false,
        message: "Only tenant admin can delete users",
      });
    }

    // tenant admin cannot delete self
    if (req.user.userId === userId) {
      return res.status(403).json({
        success: false,
        message: "Tenant admin cannot delete self",
      });
    }

    // find user inside same tenant
    const user = await User.findOne({
      where: {
        id: userId,
        tenant_id: req.user.tenantId,
      },
    });

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    await user.destroy();

    res.status(200).json({
      success: true,
      message: "User deleted successfully",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

