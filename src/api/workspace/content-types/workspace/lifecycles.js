// module.exports = {
//     afterUpdate(event){
//         // Preluare variabile
//         var default_tables = event.result.default_tables
//         var custom_roles = event.result.custom_roles

//         // Stabilire tabele de eliminat
//         var tables_to_remove_from_custom_roles = []
//         if (!default_tables.default_tables_clients) tables_to_remove_from_custom_roles.push('clients')
//         if (!default_tables.default_tables_contracts) tables_to_remove_from_custom_roles.push('contracts')
//         if (!default_tables.default_tables_projects) tables_to_remove_from_custom_roles.push('projects')
//         if (!default_tables.default_tables_employees) tables_to_remove_from_custom_roles.push('employees')
//         if (!default_tables.default_tables_invoices) tables_to_remove_from_custom_roles.push('invoices')
//         if (!default_tables.default_tables_products) tables_to_remove_from_custom_roles.push('products')
//         console.log("Tables to remove from custom roles: ", tables_to_remove_from_custom_roles)
        
//         // Actualizare custom roles
//         for (const [key, value] of Object.entries(custom_roles)) {
//             if(value.tables_access != "all"){
//                 tables_to_remove_from_custom_roles.forEach(e => value.tables_access[e] = 4)
//             }
//         }
//         console.log("Custom roles: ", custom_roles)
//     }
// }