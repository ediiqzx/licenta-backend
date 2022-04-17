'use strict';

/**
 *  pending-invitation controller
 */

const { createCoreController } = require('@strapi/strapi').factories;

module.exports = createCoreController('api::pending-invitation.pending-invitation', ({ strapi }) => ({
    async create(ctx){
        var requestBody = ctx.request.body.data
        console.log("Request body: ", requestBody)

        // Verificare daca a fost deja invitat email-ul in respectivul workspace
        const entries = await strapi.entityService.findMany('api::pending-invitation.pending-invitation', {
            filters: {
                email: requestBody.email,
                workspace: requestBody.workspace
            }
        })
        if (entries.length) return ctx.badRequest('This email address was already invited!')

        // Verificare daca exista deja contul in respectivul workspace
        const entries2 = await strapi.entityService.findMany('api::user-and-workspace.user-and-workspace', {
            filters: {
                workspace: requestBody.workspace,
                user: {
                    email: requestBody.email
                }
            }
        })
        console.log("Entries2: ", entries2)
        if (entries2.length) return ctx.badRequest('This email address is already a user of this workspace!')

        const response = await super.create(ctx);
        return response;
    },
    async handleInvitation(ctx){
        var requestBody = ctx.request.body
        console.log("Request body: ", requestBody)

        if (requestBody.refusal){
            // Eliminare pending invitation
            await strapi.entityService.delete('api::pending-invitation.pending-invitation', requestBody.invitationID)
            return 'invitation declined'
        }

        // Preluare invitatie
        const pending_invitation = await strapi.entityService.findOne('api::pending-invitation.pending-invitation', requestBody.invitationID, {
            fields: ['email', 'role'],
            populate: ['workspace', 'invited_by']
        })
        console.log("Pending_invitation: ", pending_invitation)

        // Configurare date despre rol
        var therole, thecustomrole
        if (pending_invitation.role == 'owner' || pending_invitation.role == 'manager' || pending_invitation.role == 'analyst'){
            therole = pending_invitation.role
            thecustomrole = null
        } else {
            therole = "custom"
            thecustomrole = pending_invitation.role
        }
        console.log("The role: ", therole)
        console.log("The custom role: ", thecustomrole)

        // Creare "user-and-workspace" entity
        const user_and_workspace = await strapi.entityService.create('api::user-and-workspace.user-and-workspace', { data: {
            "user": requestBody.userID,
            "workspace": pending_invitation.workspace.id,
            "role": therole,
            "custom_role": thecustomrole
        }})
        console.log("User and workspace: ", user_and_workspace)

        // Eliminare pending invitation
        await strapi.entityService.delete('api::pending-invitation.pending-invitation', requestBody.invitationID)

        return user_and_workspace
    }
}));
