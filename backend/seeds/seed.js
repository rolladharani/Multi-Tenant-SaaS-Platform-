const bcrypt = require("bcryptjs");
const { Tenant, User, Project, Task } = require("../src/models");

async function seed() {
  console.log("🌱 Seeding database...");

  // ================= HARD RESET =================
  await Task.destroy({ where: {} });
  await Project.destroy({ where: {} });
  await User.destroy({ where: {} });
  await Tenant.destroy({ where: {} });

  // ================= SUPER ADMIN =================
  const superAdminPassword = await bcrypt.hash("Admin@123", 10);
  await User.create({
    name: "Super Admin",
    email: "superadmin@system.com",
    password_hash: superAdminPassword,
    role: "super_admin",
    tenant_id: null,
  });

  // ================= TENANT =================
  const tenant = await Tenant.create({
    name: "Demo Company",
    subdomain: "demo",
    status: "active",
    subscription_plan: "pro",
    max_users: 25,
    max_projects: 15,
  });

  // ================= TENANT ADMIN =================
  const adminPassword = await bcrypt.hash("Demo@123", 10);
  const tenantAdmin = await User.create({
    name: "Demo Admin",
    email: "admin@demo.com",
    password_hash: adminPassword,
    role: "tenant_admin",
    tenant_id: tenant.id,
  });

  // ================= REGULAR USERS (REQUIRED) =================
  const userPassword = await bcrypt.hash("User@123", 10);

  await User.bulkCreate([
    {
      name: "User One",
      email: "user1@demo.com",
      password_hash: userPassword,
      role: "user",
      tenant_id: tenant.id,
    },
    {
      name: "User Two",
      email: "user2@demo.com",
      password_hash: userPassword,
      role: "user",
      tenant_id: tenant.id,
    },
  ]);

  // ================= PROJECTS =================
  const project1 = await Project.create({
    name: "Project Alpha",
    description: "First demo project",
    tenant_id: tenant.id,
    created_by: tenantAdmin.id,
    status: "active",
  });

  const project2 = await Project.create({
    name: "Project Beta",
    description: "Second demo project",
    tenant_id: tenant.id,
    created_by: tenantAdmin.id,
    status: "active",
  });

  // ================= TASK =================
  await Task.create({
    title: "First Task",
    description: "Seeded task",
    status: "todo",
    priority: "medium",
    tenant_id: tenant.id,
    project_id: project1.id,
  });

  console.log("Seed data inserted successfully");
}

module.exports = seed;