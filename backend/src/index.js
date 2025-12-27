require("dotenv").config();
const express = require("express");
const cors = require("cors");

const { sequelize } = require("./models");
const seed = require("../seeds/seed");

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/auth", require("./routes/auth.routes"));
app.use("/api/tenants", require("./routes/tenant.routes"));
app.use("/api", require("./routes/user.routes"));
app.use("/api/projects", require("./routes/project.routes"));
app.use("/api", require("./routes/task.routes"));

// Health check (MANDATORY)
app.get("/api/health", async (req, res) => {
  try {
    await sequelize.authenticate();
    res.status(200).json({
      status: "ok",
      database: "connected",
    });
  } catch (err) {
    res.status(500).json({
      status: "error",
      database: "disconnected",
    });
  }
});

const PORT = process.env.PORT || 5000;

(async () => {
  try {
    console.log("⏳ Connecting DB...");
    await sequelize.authenticate();

    console.log("🧱 Creating tables...");
    await sequelize.sync();   // 🔥 THIS WAS MISSING

    console.log("🌱 Running seeds...");
    await seed();

    console.log("✅ DB ready & seeded");

    app.listen(PORT, () => {
      console.log(`🚀 Backend running on port ${PORT}`);
    });
  } catch (err) {
    console.error("❌ Startup error:", err);
    process.exit(1);
  }
})();
