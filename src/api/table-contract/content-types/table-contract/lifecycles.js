module.exports = {
    async beforeDelete(event){
        // console.log('event: ', event)
        console.log("beforeDelete lifecycle")

        // Preluare ID entry sters
        let entryID = event.params.where.id
        console.log("entryID: ", entryID)

        // Preluare entry-uri asociate
        let entries = await strapi.entityService.findMany('api::table-project.table-project', { filters: { project_contract: entryID } })
        console.log("entries: ", entries)

        // Eliminare entry-uri asociate
        for (index in entries){
            let item = entries[index]
            await strapi.entityService.delete('api::table-project.table-project', item.id)
            console.log("Deleted 'table-project' with ID ", item.id)
        }
    },
    async beforeCreate(event) {
        const { data } = event.params;
        
        let lastEntry = await strapi.entityService.findMany('api::table-contract.table-contract', {
            filters: { workspace: data.workspace },
            sort: { contract_number: 'desc' },
            limit: 1,
        });

        event.params.data.contract_number = lastEntry[0].contract_number + 1
    },
}