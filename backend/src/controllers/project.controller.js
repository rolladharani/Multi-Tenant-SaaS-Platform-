const { Project, AuditLog } = require("../models");

/**
 * CREATE PROJECT
 */
exports.createProject = async (req, res) => {
  try {
    const { name, description } = req.body;

    const project = await Project.create({
      name,
      description,
      tenant_id: req.tenant.id,
      created_by: req.user.userId,
    });

    // ✅ AUDIT LOG
    await AuditLog.create({
      tenant_id: req.tenant.id,
      user_id: req.user.userId,
      action: "CREATE_PROJECT",
      entity_type: "Project",
      entity_id: project.id,
    });

    return res.status(201).json({
      success: true,
      data: project,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

/**
 * LIST PROJECTS
 */
exports.getProjects = async (req, res) => {
  try {
    const projects = await Project.findAll({
      where: { tenant_id: req.tenant.id },
      order: [["createdAt", "DESC"]],
    });

    return res.status(200).json({
      success: true,
      data: projects,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

/**
 * UPDATE PROJECT
 */
exports.updateProject = async (req, res) => {
  try {
    const { projectId } = req.params;
    const { name, description, status } = req.body;

    const project = await Project.findOne({
      where: { id: projectId, tenant_id: req.tenant.id },
    });

    if (!project) {
      return res.status(404).json({ success: false, message: "Project not found" });
    }

    if (
      req.user.role !== "tenant_admin" &&
      project.created_by !== req.user.userId
    ) {
      return res.status(403).json({ success: false, message: "Not authorized" });
    }

    if (name !== undefined) project.name = name;
    if (description !== undefined) project.description = description;
    if (status !== undefined) project.status = status;

    await project.save();

    // ✅ AUDIT LOG
    await AuditLog.create({
      tenant_id: req.tenant.id,
      user_id: req.user.userId,
      action: "UPDATE_PROJECT",
      entity_type: "Project",
      entity_id: project.id,
    });

    return res.status(200).json({
      success: true,
      message: "Project updated successfully",
      data: project,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ success: false, message: error.message });
  }
};

/**
 * DELETE PROJECT
 */
exports.deleteProject = async (req, res) => {
  try {
    const { projectId } = req.params;

    const project = await Project.findOne({
      where: { id: projectId, tenant_id: req.tenant.id },
    });

    if (!project) {
      return res.status(404).json({ message: "Project not found" });
    }

    await project.destroy();

    // ✅ AUDIT LOG
    await AuditLog.create({
      tenant_id: req.tenant.id,
      user_id: req.user.userId,
      action: "DELETE_PROJECT",
      entity_type: "Project",
      entity_id: projectId,
    });

    return res.status(200).json({
      success: true,
      message: "Project deleted successfully",
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: error.message });
  }
};
