const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const Task = sequelize.define("Task", {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },

  tenant_id: {
    type: DataTypes.UUID,
    allowNull: false,
  },

  project_id: {
    type: DataTypes.UUID,
    allowNull: false,
  },

  assigned_user_id: {
    type: DataTypes.UUID,
    allowNull: true,
  },

  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },

  description: {
    type: DataTypes.TEXT,
  },

  status: {
    type: DataTypes.ENUM("todo", "in_progress", "done"),
    defaultValue: "todo",
  },

  due_date: {
    type: DataTypes.DATE,
  },
});

module.exports = Task;
