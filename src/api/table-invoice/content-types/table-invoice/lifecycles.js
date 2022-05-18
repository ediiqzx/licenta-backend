module.exports = {
    async beforeDelete(event){
        // console.log('event: ', event)
        console.log("beforeDelete lifecycle")

        // Preluare ID entry sters
        let entryID = event.params.where.id
        console.log("entryID: ", entryID)

        // Preluare entry-uri asociate
        let entries = await strapi.entityService.findMany('api::table-invoice-item.table-invoice-item', { filters: { item_invoice: entryID } })
        console.log("entries: ", entries)

        // Eliminare entry-uri asociate
        for (index in entries){
            let item = entries[index]
            await strapi.entityService.delete('api::table-invoice-item.table-invoice-item', item.id)
            console.log("Deleted 'table-invoice-item' with ID ", item.id)
        }
    },
    async beforeCreate(event) {
        const { data } = event.params;
        
        let lastEntry = await strapi.entityService.findMany('api::table-invoice.table-invoice', {
            filters: { workspace: data.workspace },
            sort: { invoice_number: 'desc' },
            limit: 1,
        });

        event.params.data.invoice_number = lastEntry[0].invoice_number + 1
    },
}