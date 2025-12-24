const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const AuditLog = sequelize.define("AuditLog", {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },

  tenant_id: {
    type: DataTypes.UUID,
    allowNull: false,
  },

  user_id: {
    type: DataTypes.UUID,
    allowNull: true,
  },

  action: {
    type: DataTypes.STRING,
    allowNull: false,
  },

  entity_type: {
    type: DataTypes.STRING,
    allowNull: false,
  },

  entity_id: {
    type: DataTypes.UUID,
    allowNull: true,
  },
});

module.exports = AuditLog;
