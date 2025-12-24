const { Sequelize, DataTypes } = require("sequelize");
const sequelize = require("../config/database");

// Import models (factory pattern)
const Tenant = require("./tenant.model")(sequelize, DataTypes);
const User = require("./user.model")(sequelize, DataTypes);
const Project = require("./project.model")(sequelize, DataTypes);
const Task = require("./task.model");

// Relationships
Tenant.hasMany(User, { foreignKey: "tenant_id" });
User.belongsTo(Tenant, { foreignKey: "tenant_id" });

Tenant.hasMany(Project, { foreignKey: "tenant_id" });
Project.belongsTo(Tenant, { foreignKey: "tenant_id" });

Project.hasMany(Task, { foreignKey: "project_id" });
Task.belongsTo(Project, { foreignKey: "project_id" });

User.hasMany(Task, { foreignKey: "assigned_user_id" });
Task.belongsTo(User, { foreignKey: "assigned_user_id" });

module.exports = {
  sequelize,
  Tenant,
  User,
  Project,
  Task,
};
