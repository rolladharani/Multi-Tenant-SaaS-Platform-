const { Sequelize, DataTypes } = require("sequelize");
const sequelize = require("../config/database");

// Import models (factory pattern)
const Tenant = require("./tenant.model")(sequelize, DataTypes);
const User = require("./user.model")(sequelize, DataTypes);

// Relationships
Tenant.hasMany(User, { foreignKey: "tenant_id" });
User.belongsTo(Tenant, { foreignKey: "tenant_id" });

module.exports = {
  sequelize,
  Tenant,
  User,
};
