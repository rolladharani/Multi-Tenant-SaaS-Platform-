const { Tenant, User, Project } = require("../models");

exports.getTenantDetails = async (req, res) => {
  try {
    const { tenantId, role } = req.user;

    // Super admin can pass tenantId via param
    const id = role === "super_admin" ? req.params.id : tenantId;

    const tenant = await Tenant.findByPk(id, {
      attributes: ["id", "name", "status", "createdAt"],
    });

    if (!tenant) {
      return res.status(404).json({ message: "Tenant not found" });
    }

    const usersCount = await User.count({ where: { tenant_id: id } });
    const projectsCount = await Project.count({ where: { tenant_id: id } });

    return res.json({
      tenant,
      stats: {
        users: usersCount,
        projects: projectsCount,
      },
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
exports.updateTenant = async (req, res) => {
  try {
    const { tenantId } = req.params;
    const { name, status, subscription_plan, max_users, max_projects } = req.body;

    const tenant = await Tenant.findByPk(tenantId);

    if (!tenant) {
      return res.status(404).json({
        success: false,
        message: "Tenant not found",
      });
    }

    // 🔒 Tenant admin restrictions
    if (req.user.role === "tenant_admin") {
      if (status || subscription_plan || max_users || max_projects) {
        return res.status(403).json({
          success: false,
          message: "Tenant admin can update name only",
        });
      }
    }

    // ✅ Update allowed fields
    if (name !== undefined) tenant.name = name;
    if (req.user.role === "super_admin") {
      if (status !== undefined) tenant.status = status;
      if (subscription_plan !== undefined) tenant.subscription_plan = subscription_plan;
      if (max_users !== undefined) tenant.max_users = max_users;
      if (max_projects !== undefined) tenant.max_projects = max_projects;
    }

    await tenant.save();

    res.status(200).json({
      success: true,
      message: "Tenant updated successfully",
      data: tenant,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
exports.getAllTenants = async (req, res) => {
  try {
    const tenants = await Tenant.findAll({
      order: [["createdAt", "DESC"]],
    });

    res.status(200).json({
      success: true,
      data: tenants,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
