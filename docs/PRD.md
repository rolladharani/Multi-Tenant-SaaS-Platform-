# Product Requirements Document (PRD)

## 1. User Personas

### 1.1 Super Admin

**Role Description:**  
The Super Admin is the system-level administrator responsible for managing the entire SaaS platform. This role does not belong to any specific tenant and has global visibility across all tenants.

**Key Responsibilities:**
- Manage and monitor all tenants in the system
- Control tenant status (active, suspended, trial)
- Manage subscription plans and limits
- View platform-wide statistics and audit logs

**Main Goals:**
- Ensure platform stability and security
- Maintain healthy tenant usage and growth
- Enforce system-level policies

**Pain Points:**
- Identifying misbehaving or inactive tenants
- Monitoring usage limits across many tenants
- Ensuring strict data isolation at scale

---

### 1.2 Tenant Admin

**Role Description:**  
The Tenant Admin is the administrator of a specific organization (tenant). This role has full control over users, projects, and tasks within their tenant.

**Key Responsibilities:**
- Manage users within the tenant
- Create and manage projects
- Assign tasks and monitor progress
- Ensure subscription limits are respected

**Main Goals:**
- Efficiently manage team productivity
- Track project and task progress
- Maintain secure access for team members

**Pain Points:**
- Managing users within subscription limits
- Ensuring data security within the organization
- Tracking multiple projects and tasks efficiently

---

### 1.3 End User

**Role Description:**  
The End User is a regular team member within a tenant. This role has limited permissions and focuses on task execution rather than management.

**Key Responsibilities:**
- View assigned projects and tasks
- Update task status and progress
- Collaborate with team members

**Main Goals:**
- Clearly understand assigned tasks
- Complete tasks efficiently and on time
- View progress and deadlines easily

**Pain Points:**
- Lack of clarity on task priorities
- Managing multiple task deadlines
- Limited visibility into overall project status


---

## 2. Functional Requirements

### Authentication Module

- FR-001: The system shall allow new tenants to register with a unique organization name and subdomain.
- FR-002: The system shall allow users to log in using email, password, and tenant subdomain.
- FR-003: The system shall generate JWT tokens upon successful authentication with a 24-hour expiry.
- FR-004: The system shall allow authenticated users to log out securely.

---

### Tenant Management Module

- FR-005: The system shall allow super admins to view a list of all registered tenants.
- FR-006: The system shall allow super admins to update tenant status and subscription plans.
- FR-007: The system shall restrict tenant admins from modifying subscription plans.

---

### User Management Module

- FR-008: The system shall allow tenant admins to create users within their tenant.
- FR-009: The system shall enforce subscription-based user limits during user creation.
- FR-010: The system shall allow tenant admins to update or deactivate users.
- FR-011: The system shall prevent users from accessing data outside their tenant.

---

### Project Management Module

- FR-012: The system shall allow authenticated users to create projects within their tenant.
- FR-013: The system shall enforce subscription-based project limits.
- FR-014: The system shall allow users to update or archive projects they own.

---

### Task Management Module

- FR-015: The system shall allow users to create tasks within projects.
- FR-016: The system shall allow users to assign tasks to team members within the same tenant.
- FR-017: The system shall allow users to update task status and priority.
- FR-018: The system shall allow users to view tasks assigned to them.


---

## 3. Non-Functional Requirements

- NFR-001: The system shall ensure that 90% of API requests respond within 200 milliseconds under normal load.
- NFR-002: The system shall securely hash all user passwords using bcrypt before storage.
- NFR-003: The system shall support a minimum of 100 concurrent users without performance degradation.
- NFR-004: The system shall enforce role-based access control on all protected API endpoints.
- NFR-005: The system shall maintain an uptime target of 99% excluding planned maintenance.
- NFR-006: The system shall provide a responsive user interface that works on both desktop and mobile devices.
