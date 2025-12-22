# Multi-Tenancy Strategy

## Tenancy Model
This application uses a shared database and shared schema multi-tenancy model.

## Tenant Isolation
- Each tenant is identified by a unique tenant_id.
- All tenant-specific tables include tenant_id as a foreign key.
- No data is shared across tenants.

## Authentication & Context
- JWT tokens include user_id, tenant_id, and role.
- Tenant context is extracted from JWT on every request.

## Authorization Rules
- Super Admin can manage all tenants.
- Tenant Admin can manage users, projects, and tasks within their tenant only.
- Regular users can access resources assigned to them within their tenant.

## Security Enforcement
- Middleware validates tenant ownership for every request.
- Cross-tenant data access is strictly blocked.
