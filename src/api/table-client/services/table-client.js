'use strict';

/**
 * table-client service.
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::table-client.table-client');
