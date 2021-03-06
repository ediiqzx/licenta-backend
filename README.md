### ð **Bachelor Thesis Project**

**Designing a database system for managing a company and maximizing its efficiency**

*Access [here](https://github.com/ediiqzx/licenta-frontend) the front-end repository where you can find the setup guide.*

---
### âï¸ **Project Details**
- ð¨ð»âð **Author**: BULAI Stefan-Eduard
- ð« **University**: Academia de Studii Economice BucureÈti | FABIZ English | 2019 - 2022
- ð§© **Current Version:** 2.6.0

---
### ð» **Technologies Used**
- 1ï¸â£ **Front-End framework**: Vue.js [[Access official website](https://vuejs.org/)]
- 2ï¸â£ **Front-End bundler**: Vite [[Access official website](https://vitejs.dev/)]
- 3ï¸â£ **Back-End headless CMS**: Strapi [[Access official website](https://strapi.io/)]
- 4ï¸â£ **Back-End runtime language**: NodeJS [[Access official website](https://nodejs.org/en/)]

---

### ð **Changelog**

- **[2.7.0]**
  - Update max of asField number from 9999999999 to 9999999999999
  - Before creating invoice/contract check if number should be "1" (first contract or first invoice)

- **[2.6.0]**
    - Update READEMEs
    - Present the project initialization and setup process

- **[2.5.0]**
    - Auto increase "invoice_number" and "contract_number"
    - Implement dashboard
    - Add "disabled" property for asButton
    - Add "max" property for asField
    - Rename "products" to "services"
    - Allow negative "item_quantity" to enable storno invoices

- **[2.4.0]**
    - Implement edit fileds for entry

- **[2.3.0]**
    - Update invoice_total when table-invoice-items update
    - Implement delete entry when it's in 3rd type of box

- **[2.2.0]**
    - Enable adding of invoice-items and project-tasks
    - Delete related entries in a cascading way when one is deleted

- **[2.1.0]**
    - Update workspace settings visibilities depending on the user role
    - Update in entry screen what sections user see depending on his role
    - Implement entry discussions
    - Prefill field if creating entry from entry view

- **[2.0.0]**
    - Make "client_trade_register_number" required
    - Make "invoice_due_date" required
    - Make "project_deadline" required
    - Convert "employee_cnp" from UID to number
    - Move modal styling into App.vue
    - Add "min" and "step" props to asField
    - Implement delete entry
    - Implement add new entry

- **[1.9.0]**
    - Implement view entry
    - Create number & date type of asField

- **[1.8.0]**
    - Relayout the breadcrumbs to allow buttons on the right side of screenHead
    - Load table structurs and table entries
    - Delete "employee_profile_picture" attribute
    - Add "project_value" attribute

- **[1.7.0]**
    - Update date: 02.05.2022
    - Implement "table" view in dashboard
    - Implement "changeTableView" function
    - Take into account user permissions
    - Create platform tables

- **[1.6.0]**
    - Implement "changeWorkspace" method
    - Implement "leaveWorkspace" method
    - Implement changing of a user role
    - Simplify some data updates using "forEach" and array of attributes
    - Update some comments and logs to maintain consistency

- **[1.5.0]**
    - Add "minlength" property for "asField" component
    - Create "register-from-invitation" view
    - Implement revocation of an invitation
    - Send invitation email
    - Add "invited_by" field for "Pending Invitation" collection
    - Implement "handleInvitation" controller for "Pending Invitation" collection

- **[1.4.0]**
    - Implement deletion of a role
    - Implement kicking of a user
    - Implement (not fully) inviting a user
    - Configure SendGrid
    - Create "Pending Invitation" collection
    - Implement possiblity to fetch users of a workspace through a new API endpoint
    - Update users with a deleted role to "Analysts"

- **[1.3.0]**
    - Create "custom_roles" attribute for "Workspaces"
    - Implement creation of a new role
    - Switch to "logout()", "fetchUser()", "fetchPersonalWorkspace()", "fetchActiveWorkspace()" and "changeWorkspace(:id)"

- **[1.2.0]**
    - Update JWT expiry time to 1 hour
    - Add "secondary" type for asButton
    - Add "hideLabel" prop for asField
    - Implement Account Settings popup
    - Implement Workspace Settings page
    - Implement Workspace Settings - Box 1
    - Implement Workspace Settings - Box 2 (not done)
    - Check for JWT exprity in requests with authorization

- **[1.1.0]**
    - Config for VueJS & ViteJS
    - Implement Login + Register
    - Implement a part of dashboard

- **[1.0.0]**
    - Initialised the Strapi Project
    - Initialised the Postgres Database
    - Configured the Strapi Project
    - Tested the Sourcetree & GIT
    - Created first README
