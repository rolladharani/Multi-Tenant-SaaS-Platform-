module.exports = (sequelize, DataTypes) => {
  const Tenant = sequelize.define("Tenant", {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },

    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    subdomain: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },

    status: {
      type: DataTypes.STRING,
      defaultValue: "active",
    },

    subscription_plan: {
      type: DataTypes.STRING,
      defaultValue: "free",
    },

    max_users: {
      type: DataTypes.INTEGER,
      defaultValue: 5,
    },

    max_projects: {
      type: DataTypes.INTEGER,
      defaultValue: 3,
    },
  });

  return Tenant;
};
