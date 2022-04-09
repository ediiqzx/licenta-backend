'use strict';

/**
 * user-and-workspace service.
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::user-and-workspace.user-and-workspace');
