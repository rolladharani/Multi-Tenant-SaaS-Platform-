const { Project } = require("../models");

/**
 * CREATE PROJECT
 * POST /api/projects
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

    res.status(201).json({
      success: true,
      data: project,
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
 * LIST PROJECTS
 * GET /api/projects
 */
exports.getProjects = async (req, res) => {
  try {
    const projects = await Project.findAll({
      where: { tenant_id: req.tenant.id },
      order: [["createdAt", "DESC"]],
    });

    res.status(200).json({
      success: true,
      data: projects,
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
 * UPDATE PROJECT
 * PUT /api/projects/:projectId
 */
exports.updateProject = async (req, res) => {
  try {
    const { projectId } = req.params;
    const { name, description, status } = req.body;

    // 1️⃣ Find project by ID + tenant isolation
    const project = await Project.findOne({
      where: {
        id: projectId,
        tenant_id: req.tenant.id,
      },
    });

    if (!project) {
      return res.status(404).json({
        success: false,
        message: "Project not found",
      });
    }

    // 2️⃣ Authorization:
    // tenant_admin OR project creator
    if (
      req.user.role !== "tenant_admin" &&
      project.created_by !== req.user.userId
    ) {
      return res.status(403).json({
        success: false,
        message: "Not authorized to update this project",
      });
    }

    // 3️⃣ Update only provided fields
    if (name !== undefined) project.name = name;
    if (description !== undefined) project.description = description;
    if (status !== undefined) project.status = status;

    await project.save();

    res.status(200).json({
      success: true,
      message: "Project updated successfully",
      data: project,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
exports.deleteProject = async (req, res) => {
  try {
    const { projectId } = req.params;

    const project = await Project.findOne({
      where: {
        id: projectId,
        tenant_id: req.tenant.id,
      },
    });

    if (!project) {
      return res.status(404).json({ message: "Project not found" });
    }

    await project.destroy();

    res.status(200).json({
      success: true,
      message: "Project deleted successfully",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
};

