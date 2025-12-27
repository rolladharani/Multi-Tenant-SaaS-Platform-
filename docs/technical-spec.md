# Technical Specification – Multi-Tenant SaaS Platform

## 1. Project Overview
This project is a production-ready multi-tenant SaaS platform that enables multiple organizations (tenants) to manage users, projects, and tasks in complete isolation.  
The application is fully Dockerized and designed for automated evaluation.

---

## 2. Project Structure

```text
multi-tenant-saas/
├── backend/
│   ├── src/
│   │   ├── config/
│   │   ├── controllers/
│   │   ├── middleware/
│   │   ├── models/
│   │   ├── routes/
│   │   ├── services/
│   │   └── utils/
│   ├── seeds/
│   ├── Dockerfile
│   └── package.json
│
├── frontend/
│   ├── src/
│   │   ├── api/
│   │   ├── auth/
│   │   ├── pages/
│   │   └── assets/
│   ├── Dockerfile
│   └── package.json
│
├── docs/
│   ├── architecture.md
│   ├── database-schema.md
│   ├── research.md
│   ├── PRD.md
│   ├── tenancy-strategy.md
│   ├── technical-spec.md
│   └── API.md
│
├── docker-compose.yml
├── submission.json
└── README.md
```

---

## 3. Technology Stack

### Backend
- Node.js
- Express.js
- PostgreSQL
- Sequelize ORM
- JWT Authentication
- bcrypt for password hashing

### Frontend
- React (Vite)
- Axios

### DevOps
- Docker
- Docker Compose

---

## 4. Docker Setup (Mandatory)

The entire system runs using Docker Compose with **three services**:
- database
- backend
- frontend

All services start using a **single command**:

docker-compose up -d

### Port Mapping
- Database → 5432
- Backend → 5000
- Frontend → 3000

---

## 5. Environment Configuration

All environment variables are provided through:
- `docker-compose.yml`

Backend environment variables include:
- Database credentials
- JWT secret and expiry
- Frontend URL

Frontend environment variables include:
- API base URL (`VITE_API_URL`)

---

## 6. Database Initialization & Seed Data

- Database migrations run automatically when the backend container starts
- Seed data loads automatically after migrations
- No manual commands are required

Seed data includes:
- One super admin
- One tenant
- One tenant admin
- Regular users
- Projects and tasks

---

## 7. Authentication & Authorization

- JWT-based authentication
- Role-Based Access Control (RBAC)
- Roles:
  - super_admin
  - tenant_admin
  - user
- Tenant ID is derived from JWT token to enforce isolation

---

## 8. Health Check

Backend exposes a health check endpoint:

GET /api/health

This endpoint is used by Docker for container health monitoring.

---

## 9. Development & Evaluation Notes

- Fully automated startup
- No manual database setup required
- Evaluation-ready Docker configuration
- All services are accessible after startup

---

## 10. Conclusion

This technical specification outlines the complete structure, setup, and execution flow of the multi-tenant SaaS application, ensuring consistent deployment and automated evaluation.