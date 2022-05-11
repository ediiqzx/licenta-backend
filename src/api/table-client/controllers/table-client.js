'use strict';

/**
 *  table-client controller
 */

const { createCoreController } = require('@strapi/strapi').factories;

module.exports = createCoreController('api::table-client.table-client');
// module.exports = createCoreController('api::table-client.table-client', ({ strapi }) =>  ({