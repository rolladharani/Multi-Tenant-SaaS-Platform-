const { User } = require("../models");

exports.createUser = async (req, res) => {
  res.status(201).json({
    message: "Create user API hit",
    tenant_id: req.tenantId,
  });
};

exports.getUsers = async (req, res) => {
  const users = await User.findAll({
    where: { tenant_id: req.tenantId },
    attributes: ["id", "name", "email", "role"],
  });

  res.status(200).json(users);
};
