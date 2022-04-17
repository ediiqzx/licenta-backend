'use strict'

/**
 *  workspace controller
 */

const { createCoreController } = require('@strapi/strapi').factories

module.exports = createCoreController('api::workspace.workspace', ({ strapi }) =>  ({
    async createCustomRole(ctx){
        // Preluare date necesare
        var requestBody = ctx.request.body
        console.log("Request body: ", requestBody)
        var workspace = await strapi.entityService.findOne('api::workspace.workspace', requestBody.workspaceID)
        console.log("Workspace: ", workspace)

        // Actualizarea titlului de rol in lowercase
        requestBody.name = requestBody.name.toLowerCase()

        if (workspace.custom_roles && workspace.custom_roles[requestBody.name] != null) return ctx.badRequest('A custom role with same name already exists!')
        if (!requestBody.name) return ctx.badRequest('Please specify a name!')

        // Actualizare "table_access" in functie de "manage_tables"
        if (requestBody.manage_tables) var theTableAccess = "all"
        else var theTableAccess = requestBody.tables_access

        // Actualizare "manage_users" in functie de "manage_roles"
        if (requestBody.manage_roles) var theManageUsers = true
        else var theManageUsers = requestBody.manage_users

        // Definire JSON nou pentru "custom_roles"
        if (workspace.custom_roles) var newCustomRoleValue = workspace.custom_roles
        else var newCustomRoleValue = {}
        newCustomRoleValue["" + requestBody.name + ""] = {
            view_dashboard: requestBody.view_dashboard,
            manage_roles: requestBody.manage_roles,
            manage_users: theManageUsers,
            manage_tables: requestBody.manage_tables,
            tables_access: theTableAccess
        }
        console.log("newCustomRoleValue: ", newCustomRoleValue)

        // Actualizare workspace
        workspace = await strapi.entityService.update('api::workspace.workspace', requestBody.workspaceID, {
            data: {
                "custom_roles": newCustomRoleValue
            }
        })
        console.log("Final Workspace: ")
        console.dir(workspace, { colors: true, depth: null })

        return workspace
    },
    async deleteCustomRole(ctx){
        // Preluare date necesare
        var requestBody = ctx.request.body
        console.log("Request body: ", requestBody)
        var workspace = await strapi.entityService.findOne('api::workspace.workspace', requestBody.workspaceID)
        console.log("Workspace: ", workspace)

        // Actualizare "custom_roles" JSON
        var newCustomRoleValue = workspace.custom_roles
        delete newCustomRoleValue[requestBody.roleName]
        console.log("newCustomRoleValue: ", newCustomRoleValue)

        // Actualizare workspace
        workspace = await strapi.entityService.update('api::workspace.workspace', requestBody.workspaceID, {
            data: {
                "custom_roles": newCustomRoleValue
            }
        })
        console.log("Final Workspace: ")
        console.dir(workspace, { colors: true, depth: null })

        // Actualizare useri din workspace cu rolul eliminat la rolul Analyst
        const entries = await strapi.entityService.findMany('api::user-and-workspace.user-and-workspace', {
            filters: {
                workspace: requestBody.workspaceID,
                custom_role: requestBody.roleName
            }
        })
        for (const [key, value] of Object.entries(entries)){
            await strapi.entityService.update('api::user-and-workspace.user-and-workspace', value.id, {
                data: {
                    role: 'analyst',
                    custom_role: null
                }
            })
        }

        return workspace
    }
}))