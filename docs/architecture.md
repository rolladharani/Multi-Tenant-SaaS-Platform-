# System Architecture Document

## 1. System Architecture Overview

The Multi-Tenant SaaS Platform follows a layered, service-oriented architecture designed to support scalability, security, and maintainability. The system is composed of three primary layers: the frontend client, the backend API server, and the database layer. All components are containerized using Docker to ensure consistent deployment and easy orchestration.

The frontend layer is a React-based web application accessed through a browser. It is responsible for user interactions such as authentication, project management, task tracking, and role-based user interface rendering. The frontend communicates with the backend exclusively through RESTful APIs.

The backend layer is implemented using Node.js and Express.js. It exposes a set of secure API endpoints that handle authentication, authorization, tenant isolation, business logic, and database interactions. Middleware components are used to enforce JWT authentication, role-based access control, tenant filtering, input validation, and audit logging.

The database layer uses PostgreSQL as a relational data store. It maintains all persistent data including tenants, users, projects, tasks, and audit logs. Multi-tenancy is implemented using a shared database and shared schema approach, where each tenant’s data is logically isolated using a tenant_id column.

Docker Compose orchestrates all services, enabling one-command startup of the entire system. Inter-service communication within the Docker network uses service names instead of localhost to ensure correct connectivity in containerized environments. This architecture provides a clean separation of concerns while meeting all project requirements.


---

## 2. System Architecture Diagram

Diagram Location:
docs/images/system-architecture.png

The system architecture diagram represents the high-level interaction between the client, frontend application, backend services, and the database.

Users access the system through a web browser, which loads the React-based frontend application. The frontend handles user interactions such as login, registration, project management, and task updates. Based on user actions, the frontend sends HTTP requests to the backend API server.

The backend API server is built using Node.js and Express.js. It exposes RESTful endpoints for authentication, tenant management, user management, project handling, and task operations. JWT-based authentication ensures secure communication, while middleware components enforce role-based access control and tenant isolation.

The backend communicates with the PostgreSQL database to store and retrieve persistent data. All tenant-specific records are associated with a tenant_id to ensure data isolation. Audit logs are stored to track critical system actions.

Docker Compose orchestrates the frontend, backend, and database services. All services communicate within a Docker network using service names, ensuring reliable inter-service communication. This architecture ensures scalability, security, and maintainability of the SaaS platform.


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
