'use strict';

/**
 * pending-invitation router.
 */

const { createCoreRouter } = require('@strapi/strapi').factories;

module.exports = createCoreRouter('api::pending-invitation.pending-invitation');
