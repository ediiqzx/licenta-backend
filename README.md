### 🎓 **Bachelor Thesis Project**

**Designing a database system for managing a company and maximizing its efficiency**

---
### ⚙️ **Project Details**
- 👨🏻‍🎓 **Author**: BULAI Stefan-Eduard
- 🏫 **University**: Academia de Studii Economice București | FABIZ English | 2019 - 2022
- 💻 **Current Version:** 1.0.0

---

### 🗃 **Changelog**

- **[1.0.0]**
    - Initialised the Strapi Project
    - Initialised the Postgres Database
    - Configured the Strapi Project
    - Tested the Sourcetree & GIT
    - Created first README

- **[1.1.0]**
    - Config for VueJS & ViteJS
    - Implement Login + Register
    - Implement a part of dashboard

- **[1.2.0]**
    - Update JWT expiry time to 1 hour
    - Add "secondary" type for asButton
    - Add "hideLabel" prop for asField
    - Implement Account Settings popup
    - Implement Workspace Settings page
    - Implement Workspace Settings - Box 1
    - Implement Workspace Settings - Box 2 (not done)
    - Check for JWT exprity in requests with authorization

- **[1.3.0]**
    - Create "custom_roles" attribute for "Workspaces"
    - Implement creation of a new role
    - Switch to "logout()", "fetchUser()", "fetchPersonalWorkspace()", "fetchActiveWorkspace()" and "changeWorkspace(:id)"

- **[1.4.0]**
    - Implement deletion of a role
    - Implement kicking of a user
    - Implement (not fully) inviting a user
    - Configure SendGrid
    - Create "Pending Invitation" collection
    - Implement possiblity to fetch users of a workspace through a new API endpoint
    - Update users with a deleted role to "Analysts"

- **[1.5.0]**
    - Add "minlength" property for "asField" component
    - Create "register-from-invitation" view
    - Implement revocation of an invitation
    - Send invitation email
    - Add "invited_by" field for "Pending Invitation" collection
    - Implement "handleInvitation" controller for "Pending Invitation" collection

- **[1.6.0]**
    - Implement "changeWorkspace" method
    - Implement "leaveWorkspace" method
    - Implement changing of a user role
    - Simplify some data updates using "forEach" and array of attributes
    - Update some comments and logs to maintain consistency