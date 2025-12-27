# Tenancy Strategy – Multi-Tenant SaaS Platform

## Overview
This document explains the multi-tenancy strategy used in the Multi-Tenant SaaS Platform and how tenant data isolation is enforced across the system.

---

## Chosen Multi-Tenancy Model
The application uses the following approach:

**Shared Database + Shared Schema with tenant_id**

All tenants share the same database and schema, but every tenant-scoped record contains a `tenant_id` column.

---

## Reasons for Choosing This Approach
- Easier to scale and maintain
- Lower infrastructure cost
- Simple onboarding of new tenants
- Works well with ORM-based applications
- Commonly used in production SaaS platforms

---

## Tenant Identification
- Each tenant has a unique `subdomain`
- During login, the tenant is identified using the subdomain
- The authenticated JWT token contains the `tenant_id`

---

## Data Isolation Enforcement
- All database queries are automatically filtered using `tenant_id`
- The `tenant_id` is extracted from the JWT token
- Client-provided tenant IDs are never trusted
- Super admin users have `tenant_id = NULL`

This ensures that users cannot access data belonging to other tenants.

---

## Authorization Rules
- **Super Admin**
  - Can access all tenants
  - Not associated with any tenant

- **Tenant Admin**
  - Full access within their tenant
  - Cannot access other tenants

- **User**
  - Limited access within their tenant

---

## Security Considerations
- JWT-based authentication
- Role-Based Access Control (RBAC)
- Passwords hashed using bcrypt
- API authorization enforced at middleware level
- Cross-tenant access attempts return `403 Forbidden`

---

## Conclusion
This tenancy strategy ensures strong data isolation, security, and scalability while keeping the system simple and evaluation-friendly.