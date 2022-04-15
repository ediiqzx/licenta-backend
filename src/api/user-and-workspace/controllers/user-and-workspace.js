'use strict'

/**
 *  user-and-workspace controller
 */

const { createCoreController } = require('@strapi/strapi').factories

module.exports = createCoreController('api::user-and-workspace.user-and-workspace', ({ strapi }) => ({
    async workspaceUsers(ctx){
        // Preluare date necesare
        var workspaceID = ctx.params.id
        console.log("WorkspaceID: ", workspaceID)

        // Preluare entry-uri releevante
        const entries = await strapi.entityService.findMany('api::user-and-workspace.user-and-workspace', {
            fields: ['role', 'custom_role'],
            filters: { workspace: workspaceID },
            populate: { user: true },
        })
        var entries2 = {}

        // Construire array cu datele care ne intereseaza
        for (const [key, value] of Object.entries(entries)){
            entries2[value.user.id] = {
                display_name: value.user.display_name,
                email: value.user.email,
                role: value.role,
                custom_role: value.custom_role,
                user_and_workspace: value.id
            }
        }
        console.log("Entries2: ", entries2)
        
        return entries2
    }
}))
