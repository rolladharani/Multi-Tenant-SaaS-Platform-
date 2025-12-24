require("dotenv").config();
const express = require("express");
const cors = require("cors");

const { sequelize } = require("./models");

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

const authRoutes = require("./routes/auth.routes");
app.use("/api/auth", authRoutes);

const tenantRoutes = require("./routes/tenant.routes");
app.use("/api/tenants", tenantRoutes);


// Health check (NO force here)
app.get("/api/health", async (req, res) => {
  try {
    await sequelize.authenticate();
    res.status(200).json({
      status: "ok",
      database: "connected",
    });
  } catch (error) {
    res.status(500).json({
      status: "error",
      database: "disconnected",
    });
  }
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, async () => {
  console.log(`Server running on port ${PORT}`);

  try {
    // 🔥 TEMPORARY force sync ONLY HERE
    await sequelize.sync();
    console.log("Models synced with database");
  } catch (error) {
    console.error("Startup error:", error.message);
  }
});
