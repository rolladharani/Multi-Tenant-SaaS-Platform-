# Research Document

## 1. Multi-Tenancy Analysis

Multi-tenancy is a core architectural concept in Software as a Service (SaaS) applications. It refers to the ability of a single application instance to serve multiple independent organizations, called tenants, while ensuring strict data isolation, security, and performance. Choosing the correct multi-tenancy strategy is critical for scalability, maintainability, and cost efficiency.

This section analyzes three commonly used multi-tenancy approaches and justifies the approach chosen for this project.

### 1.1 Shared Database + Shared Schema

In the shared database and shared schema approach, all tenants use the same database and the same set of tables. Tenant-specific data is distinguished using a tenant identifier column (tenant_id) in every tenant-related table.

In this model, a single database instance contains all application data, and each table includes a tenant_id column to associate records with a specific tenant. All queries must filter data using this tenant_id to ensure isolation.

**Advantages:**
- Low infrastructure cost since only one database is required.
- Easy to manage and maintain compared to multiple databases.
- Efficient use of resources such as connections and storage.
- Simple deployment and scaling process.

**Disadvantages:**
- Strong reliance on correct query filtering to prevent data leaks.
- A bug in authorization logic can expose data across tenants.
- Database-level isolation is weaker compared to separate databases.
- Large tenants can impact performance if not optimized properly.

This approach is widely used in modern SaaS platforms due to its cost efficiency and scalability when implemented with strict security controls.

---

### 1.2 Shared Database + Separate Schema

In the shared database and separate schema approach, all tenants share the same database instance, but each tenant has its own schema within the database. Each schema contains its own set of tables.

This model provides logical separation at the schema level while still sharing the database server. Application logic selects the appropriate schema based on the tenant context.

**Advantages:**
- Better isolation than shared schema approach.
- Easier to enforce tenant-level boundaries at schema level.
- Reduced risk of accidental data access across tenants.
- Still cost-effective compared to separate databases.

**Disadvantages:**
- Increased complexity in schema management.
- Schema migrations must be applied to multiple schemas.
- Harder to manage a large number of tenants.
- Database connection management becomes more complex.

This approach is suitable for systems with moderate tenant counts and stronger isolation requirements.

---

### 1.3 Separate Database per Tenant

In the separate database per tenant approach, each tenant has its own dedicated database. The application dynamically connects to the tenant’s database based on the tenant context.

This model provides the strongest level of isolation and security.

**Advantages:**
- Complete data isolation between tenants.
- Best security and compliance support.
- Performance issues of one tenant do not affect others.
- Easy to backup and restore per tenant.

**Disadvantages:**
- High infrastructure and operational cost.
- Complex database provisioning and maintenance.
- Difficult to scale for a large number of tenants.
- Requires advanced automation for migrations and monitoring.

This approach is typically used by enterprise-grade systems with strict compliance and security requirements.

---

### 1.4 Comparison and Chosen Approach

After analyzing all three approaches, the **Shared Database + Shared Schema** model has been selected for this project.

**Reasons for selection:**
- Aligns with the project’s scalability requirements.
- Cost-effective and suitable for a learning-focused SaaS platform.
- Easier to manage using proper tenant_id enforcement.
- Supported well by relational databases like PostgreSQL.
- Commonly used in real-world SaaS products.

Strict tenant isolation is enforced at the application layer using JWT-based authentication, role-based access control, and mandatory tenant_id filtering in all database queries. With these controls in place, the shared schema approach provides a balanced solution between performance, cost, and security.


---

## 2. Technology Stack Justification

Choosing the right technology stack is essential for building a scalable, secure, and maintainable multi-tenant SaaS application. The technologies selected for this project were chosen based on industry adoption, learning value, community support, and suitability for implementing multi-tenancy, authentication, and containerization.

### 2.1 Backend Technology

The backend of this application is built using **Node.js with Express.js**. Node.js provides a non-blocking, event-driven runtime that is well suited for building scalable APIs. Express.js is a lightweight and flexible framework that simplifies REST API development while allowing full control over middleware and routing.

Express.js is widely used in production-grade SaaS applications and supports middleware-based architectures, which is ideal for implementing authentication, authorization, tenant isolation, and audit logging. Alternatives such as Django or Spring Boot were considered, but Node.js was chosen due to its simplicity, faster development cycle, and strong ecosystem.

---

### 2.2 Frontend Technology

The frontend is built using **React.js**, a popular JavaScript library for building user interfaces. React enables the creation of reusable UI components and supports efficient rendering through its virtual DOM.

React is suitable for this project because it allows easy implementation of role-based UI rendering, protected routes, and dynamic dashboards. It integrates well with REST APIs and supports modern frontend practices. Alternatives like Angular and Vue.js were considered, but React was selected due to its flexibility, widespread industry usage, and strong community support.

---

### 2.3 Database Technology

The application uses **PostgreSQL** as the relational database. PostgreSQL is a powerful, open-source database that provides strong support for relational data, constraints, indexing, and transactions.

PostgreSQL is well suited for multi-tenant architectures because it supports advanced indexing, foreign key constraints, and transactional consistency. Features such as composite unique constraints and indexing on tenant_id improve performance and data integrity. Compared to NoSQL databases, PostgreSQL provides better consistency and relational guarantees required for this system.

---

### 2.4 Authentication Method

Authentication is implemented using **JSON Web Tokens (JWT)**. JWT provides stateless authentication, making it ideal for scalable distributed systems. Tokens contain user identity, tenant context, and role information, which allows efficient authorization checks without repeated database queries.

JWT was chosen over session-based authentication because it simplifies horizontal scaling and works well with REST APIs. Token expiry ensures security, while bcrypt is used for password hashing to protect user credentials.

---

### 2.5 Deployment & Containerization

The application uses **Docker and Docker Compose** for containerization and deployment. Docker ensures consistent environments across development, testing, and evaluation. Docker Compose allows all services—database, backend, and frontend—to be started with a single command.

Containerization is mandatory for this project and ensures reproducibility, easy setup, and automated evaluation. Alternatives such as manual environment setup or VM-based deployment were avoided due to complexity and inconsistency.


---

## 3. Security Considerations in Multi-Tenant SaaS

### 3.1 Data Isolation Strategy
(Write here)

### 3.2 Authentication & Authorization
(Write here)

### 3.3 Password Security
(Write here)

### 3.4 API Security Measures
(Write here)

### 3.5 Additional Security Practices
(Write here)
