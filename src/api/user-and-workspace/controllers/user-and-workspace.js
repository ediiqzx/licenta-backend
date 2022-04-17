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

        // Preluare entry-uri relevante
        const entries = await strapi.entityService.findMany('api::user-and-workspace.user-and-workspace', {
            fields: ['role', 'custom_role'],
            filters: { workspace: workspaceID },
            populate: { user: true },
        })
        const entries2 = await strapi.entityService.findMany('api::pending-invitation.pending-invitation', {
            filters: { workspace: workspaceID },
        })

        // Construire array cu datele care ne intereseaza
        var finalEntries = {}
        for (const [key, value] of Object.entries(entries)){
            finalEntries[value.user.id] = {
                display_name: value.user.display_name,
                email: value.user.email,
                role: value.role,
                custom_role: value.custom_role,
                user_and_workspace: value.id
            }
        }
        for (const [key, value] of Object.entries(entries2)){
            finalEntries['pending-' + value.id] = {
                display_name: value.email,
                email: value.email,
                role: value.role,
                custom_role: 'pending',
                user_and_workspace: null,
            }
        }

        console.log("FinalEntries: ", finalEntries)
        return finalEntries
    }
}))
