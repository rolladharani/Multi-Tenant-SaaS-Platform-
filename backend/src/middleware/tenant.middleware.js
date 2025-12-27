const { Tenant } = require("../models");

module.exports = async (req, res, next) => {
  try {
    if (!req.user || !req.user.tenantId) {
      return res.status(401).json({ message: "Tenant ID missing in token" });
    }

    const tenant = await Tenant.findByPk(req.user.tenantId);

    if (!tenant) {
      return res.status(404).json({ message: "Tenant not found" });
    }

    req.tenant = tenant;
    next();
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Tenant middleware error" });
  }
};
