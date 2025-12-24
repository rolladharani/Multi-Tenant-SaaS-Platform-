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
