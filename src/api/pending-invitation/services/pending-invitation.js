'use strict';

/**
 * pending-invitation service.
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::pending-invitation.pending-invitation');
