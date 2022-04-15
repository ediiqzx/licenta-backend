'use strict'

/**
 * workspace service.
 */

const { createCoreService } = require('@strapi/strapi').factories

module.exports = createCoreService('api::workspace.workspace', ({ strapi }) => ({
    async update(entityId, params) {
        // Preluare date actuale
        var currentState = await strapi.entityService.findOne('api::workspace.workspace', entityId)
        var custom_roles = currentState.custom_roles

        // Log date relevante
        console.log("Current State: ", currentState)
        console.log("Update Params: ", params)

        // Stabilire tabele de eliminat
        var tables_to_remove_from_custom_roles = []
        if (!params.data.default_tables.default_tables_clients) tables_to_remove_from_custom_roles.push('clients')
        if (!params.data.default_tables.default_tables_contracts) tables_to_remove_from_custom_roles.push('contracts')
        if (!params.data.default_tables.default_tables_invoices) tables_to_remove_from_custom_roles.push('invoices')
        if (!params.data.default_tables.default_tables_products) tables_to_remove_from_custom_roles.push('products')
        if (!params.data.default_tables.default_tables_projects) tables_to_remove_from_custom_roles.push('projects')
        if (!params.data.default_tables.default_tables_employees) tables_to_remove_from_custom_roles.push('employees')
        console.log("Tables to remove from custom roles: ", tables_to_remove_from_custom_roles)

        // Actualizare custom roles
        if (tables_to_remove_from_custom_roles.length){
            for (const [key, value] of Object.entries(custom_roles))
                if(value.tables_access != "all")
                    tables_to_remove_from_custom_roles.forEach(e => value.tables_access[e] = 4)
            
            params.data.custom_roles = custom_roles
            console.log("New Update Params Data Custom_roles: ", params.data.custom_roles)
        }

        const result = await super.update(entityId, params)
        return result
    }
}))
