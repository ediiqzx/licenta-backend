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
    },
    async addComment(ctx){
        // Preluare date necesare
        var requestBody = ctx.request.body
        console.log("Request body: ", requestBody)
        var tableSingular = requestBody.entry_table.slice(0, -1)

        const entryBefore = await strapi.entityService.findOne('api::table-' + tableSingular + '.table-' + tableSingular, requestBody.entry_id, { populate: '*' })
        console.log("entryBefore: ", entryBefore)

        var newDiscussions = [ ...entryBefore.discussions, requestBody.comment_object ]

        const entryAfter = await strapi.entityService.update('api::table-' + tableSingular + '.table-' + tableSingular, requestBody.entry_id, {
            data: {
                "discussions": newDiscussions
            }
        })
        console.log("entryAfter: ", entryAfter)

        return entryAfter
    },
    async dashboard(ctx){
        // Declarare date
        var returnData = {
            stats: [0, 0, 0, 0],
            newestMember: '',
            tables: [0, 0, 0, 0, 0, 0]
        }
        const list = ['client', 'contract', 'project', 'employee', 'invoice', 'product']

        // Preluare date necesare
        var workspaceID = ctx.params.workspace

        // Preluare statistici entry-uri
        for (let index in list){
            let name = list[index]

            // Today
            let count = await strapi.db.query('api::table-' + name + '.table-' + name).count({
                where: {
                    workspace: workspaceID,
                    createdAt: { $gte: new Date().toISOString().split('T')[0] }
                }
            })

            // Last 7 days
            let date2 = new Date()
            date2.setDate(date2.getDate() - 7)
            let count2 = await strapi.db.query('api::table-' + name + '.table-' + name).count({
                where: {
                    workspace: workspaceID,
                    createdAt: { $gte: date2.toISOString().split('T')[0] }
                }
            })

            // Last 31 days
            let date3 = new Date()
            date3.setDate(date3.getDate() - 31)
            let count3 = await strapi.db.query('api::table-' + name + '.table-' + name).count({
                where: {
                    workspace: workspaceID,
                    createdAt: { $gte: date3.toISOString().split('T')[0] }
                }
            })


            returnData.stats[0] += count
            returnData.stats[1] += count2
            returnData.stats[2] += count3
        }

        // Preluare statistici new members
        let date4 = new Date()
        date4.setDate(date4.getDate() - 31)
        returnData.stats[3] += await strapi.db.query('api::user-and-workspace.user-and-workspace').count({
            where: {
                workspace: workspaceID,
                createdAt: { $gte: date4.toISOString().split('T')[0] }
            }
        })

        // Preluare newest member
        let member = await strapi.entityService.findMany('api::user-and-workspace.user-and-workspace', {
            filters: { workspace: workspaceID },
            sort: { createdAt: 'desc' },
            populate: 'user',
            limit: 1,
        })
        returnData.newestMember = member[0].user.display_name

        // Preluare total entries
        for (let index in list){
            let name = list[index]
            let count = await strapi.db.query('api::table-' + name + '.table-' + name).count({ where: { workspace: workspaceID } })
            returnData.tables[index] = count
        }

        console.log(returnData)
        return returnData
    }
}))