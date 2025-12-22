# Database Schema

## tenants
- id (PK)
- name
- status (active / inactive)
- created_at

## users
- id (PK)
- tenant_id (FK → tenants.id)
- name
- email (unique)
- password_hash
- role (super_admin / tenant_admin / user)
- created_at

## projects
- id (PK)
- tenant_id (FK → tenants.id)
- name
- description
- created_at

## tasks
- id (PK)
- tenant_id (FK → tenants.id)
- project_id (FK → projects.id)
- assigned_user_id (FK → users.id)
- title
- description
- status (todo / in_progress / done)
- due_date
- created_at

## Relationships
- One tenant → many users
- One tenant → many projects
- One project → many tasks
- One user → many tasks
- All tenant data is isolated using tenant_id
