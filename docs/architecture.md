# System Architecture Document

## 1. System Architecture Overview

(Write here)

---

## 2. System Architecture Diagram

Diagram Location:
docs/images/system-architecture.png

(Explain the diagram here)

---

## 3. Database Design & ERD

ERD Location:
docs/images/database-erd.png

(Explain tables and relationships here)

---

## 4. API Architecture

### Authentication APIs
- POST /api/auth/register-tenant
- POST /api/auth/login
- GET /api/auth/me
- POST /api/auth/logout

### Tenant Management APIs
- GET /api/tenants/:tenantId
- PUT /api/tenants/:tenantId
- GET /api/tenants

### User Management APIs
- POST /api/tenants/:tenantId/users
- GET /api/tenants/:tenantId/users
- PUT /api/users/:userId
- DELETE /api/users/:userId

### Project Management APIs
- POST /api/projects
- GET /api/projects
- PUT /api/projects/:projectId
- DELETE /api/projects/:projectId

### Task Management APIs
- POST /api/projects/:projectId/tasks
- GET /api/projects/:projectId/tasks
- PATCH /api/tasks/:taskId/status
- PUT /api/tasks/:taskId
