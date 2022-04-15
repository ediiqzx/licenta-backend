'use strict';

/**
 *  pending-invitation controller
 */

const { createCoreController } = require('@strapi/strapi').factories;

module.exports = createCoreController('api::pending-invitation.pending-invitation', ({ strapi }) => ({
    async create(ctx) {
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

        const response = await super.create(ctx);
        return response;
    }      
}));
