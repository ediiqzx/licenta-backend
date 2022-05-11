module.exports = {
    async beforeDelete(event){
        // console.log('event: ', event)
        console.log("beforeDelete lifecycle")

        // Preluare ID entry sters
        let entryID = event.params.where.id
        console.log("entryID: ", entryID)

        // Preluare entry-uri asociate
        let entries = await strapi.entityService.findMany('api::table-invoice.table-invoice', { filters: { invoice_project: entryID } })
        console.log("entries: ", entries)
        let entries2 = await strapi.entityService.findMany('api::table-project-task.table-project-task', { filters: { task_project: entryID } })
        console.log("entries2: ", entries2)

        // Eliminare entry-uri asociate
        for (index in entries){
            let item = entries[index]
            await strapi.entityService.delete('api::table-invoice.table-invoice', item.id)
            console.log("Deleted 'table-invoice' with ID ", item.id)
        }
        for (index in entries2){
            let item = entries2[index]
            await strapi.entityService.delete('api::table-project-task.table-project-task', item.id)
            console.log("Deleted 'table-project-task' with ID ", item.id)
        }
    }
}