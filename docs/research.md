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

### 2.1 Backend Technology
(Write here)

### 2.2 Frontend Technology
(Write here)

### 2.3 Database Technology
(Write here)

### 2.4 Authentication Method
(Write here)

### 2.5 Deployment & Containerization
(Write here)

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
