# API Documentation – Multi-Tenant SaaS Platform

## Base URL

http://localhost:5000/api

All protected endpoints require a valid JWT token.

---

## 1. Authentication APIs

### POST /auth/login
Authenticate user and return JWT token.

### POST /auth/register
Register a new user (admin only).

---

## 2. Tenant Management APIs

### POST /tenants
Create a new tenant (super admin only).

### GET /tenants
Get list of tenants (super admin only).

---

## 3. User Management APIs

### POST /users
Create a new user under tenant.

### GET /users
Get all users under tenant.

### GET /users/:id
Get user details.

### PUT /users/:id
Update user details.

### DELETE /users/:id
Delete user.

---

## 4. Project Management APIs

### POST /projects
Create a project.

### GET /projects
Get all projects for tenant.

### GET /projects/:id
Get project details.

### PUT /projects/:id
Update project.

### DELETE /projects/:id
Delete project.

---

## 5. Task Management APIs

### POST /tasks
Create task under project.

### GET /tasks
Get all tasks.

### GET /tasks/:id
Get task details.

### PUT /tasks/:id
Update task.

### DELETE /tasks/:id
Delete task.

---

## 6. Audit Log APIs

### GET /audit-logs
Get audit logs for tenant.

---

## 7. Health Check

### GET /health
Used by Docker for service health verification.

---

## Security Notes
- All APIs enforce tenant isolation using tenant_id from JWT
- Unauthorized access is blocked
- Proper HTTP status codes are returned

---

## API Count Summary
Total APIs implemented: **19**