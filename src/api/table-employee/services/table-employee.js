'use strict';

/**
 * table-employee service.
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::table-employee.table-employee');
