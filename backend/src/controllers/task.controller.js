const { Task, Project, User } = require("../models");

exports.createTask = async (req, res) => {
  try {
    const { projectId } = req.params;
    const { title, description, assignedTo, priority, dueDate } = req.body;

    // 1️⃣ Verify project exists + belongs to tenant
    const project = await Project.findOne({
      where: {
        id: projectId,
        tenant_id: req.tenant.id
      }
    });

    if (!project) {
      return res.status(403).json({ message: "Project does not belong to tenant" });
    }

    // 2️⃣ Validate assigned user (optional)
    if (assignedTo) {
      const user = await User.findOne({
        where: {
          id: assignedTo,
          tenant_id: req.tenant.id
        }
      });

      if (!user) {
        return res.status(400).json({ message: "Assigned user not in tenant" });
      }
    }

    // 3️⃣ Create task
    const task = await Task.create({
      title,
      description,
      priority: priority || "medium",
      due_date: dueDate,
      project_id: projectId,
      tenant_id: project.tenant_id,
      assigned_to: assignedTo || null,
      status: "todo"
    });

    res.status(201).json({
      success: true,
      data: task
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
};
exports.getProjectTasks = async (req, res) => {
  try {
    const { projectId } = req.params;

    // 1️⃣ Check project belongs to tenant
    const project = await Project.findOne({
      where: {
        id: projectId,
        tenant_id: req.tenant.id
      }
    });

    if (!project) {
      return res.status(404).json({ message: "Project not found" });
    }

    // 2️⃣ Fetch tasks
    const tasks = await Task.findAll({
      where: {
        project_id: projectId,
        tenant_id: req.tenant.id
      },
      order: [["createdAt", "DESC"]]
    });

    res.status(200).json({
      success: true,
      data: tasks
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
};
exports.updateTaskStatus = async (req, res) => {
  try {
    const { taskId } = req.params;
    const { status } = req.body;

    // allowed statuses
    const allowedStatus = ["todo", "in_progress", "completed"];
    if (!allowedStatus.includes(status)) {
      return res.status(400).json({ message: "Invalid status value" });
    }

    // find task under same tenant
    const task = await Task.findOne({
      where: {
        id: taskId,
        tenant_id: req.tenant.id
      }
    });

    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }

    // update status
    task.status = status;
    await task.save();

    res.status(200).json({
      success: true,
      data: {
        id: task.id,
        status: task.status,
        updatedAt: task.updatedAt
      }
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
};
exports.updateTask = async (req, res) => {
  try {
    const { taskId } = req.params;
    const {
      title,
      description,
      status,
      priority,
      assignedTo,
      dueDate
    } = req.body;

    // find task under same tenant
    const task = await Task.findOne({
      where: {
        id: taskId,
        tenant_id: req.tenant.id
      }
    });

    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }

    // update only provided fields
    if (title !== undefined) task.title = title;
    if (description !== undefined) task.description = description;
    if (status !== undefined) task.status = status;
    if (priority !== undefined) task.priority = priority;
    if (assignedTo !== undefined) task.assigned_user_id = assignedTo;
    if (dueDate !== undefined) task.due_date = dueDate;

    await task.save();

    res.status(200).json({
      success: true,
      message: "Task updated successfully",
      data: {
        id: task.id,
        title: task.title,
        description: task.description,
        status: task.status,
        priority: task.priority,
        assigned_user_id: task.assigned_user_id,
        due_date: task.due_date,
        updatedAt: task.updatedAt
      }
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
};