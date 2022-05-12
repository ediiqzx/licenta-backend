module.exports = {
    async afterCreate(event){
        console.log('event: ', event)
        console.log("afterCreate lifecycle")

        let invoiceID = event.params.data.item_invoice

        // Preluare itemi invoice in cauza
        let invoice_items = await strapi.entityService.findMany('api::table-invoice-item.table-invoice-item', { filters: { item_invoice: invoiceID }, populate: 'item_product' })
        console.log("invoice_items: ", invoice_items)

        // Calculare total
        var total = 0
        for(let index in invoice_items){
            let item = invoice_items[index]
            total += item.item_quantity * item.item_product.product_unit_value
        }
        console.log("total: ", total)

        // Actualizare invoice total
        await strapi.entityService.update('api::table-invoice.table-invoice', invoiceID, {
            data: {
                "invoice_total": total
            }
        })
    },
    async afterUpdate(event){
        console.log('event: ', event)
        console.log("afterUpdate lifecycle")

        let invoiceID = event.result.item_invoice.id

        // Preluare itemi invoice in cauza
        let invoice_items = await strapi.entityService.findMany('api::table-invoice-item.table-invoice-item', { filters: { item_invoice: invoiceID }, populate: 'item_product' })
        console.log("invoice_items: ", invoice_items)

        // Calculare total
        var total = 0
        for(let index in invoice_items){
            let item = invoice_items[index]
            total += item.item_quantity * item.item_product.product_unit_value
        }
        console.log("total: ", total)

        // Actualizare invoice total
        await strapi.entityService.update('api::table-invoice.table-invoice', invoiceID, {
            data: {
                "invoice_total": total
            }
        })
    },
    async beforeDelete(event){
        console.log('event: ', event)
        console.log("beforeDelete lifecycle")

        let currentItem = await strapi.entityService.findOne('api::table-invoice-item.table-invoice-item', event.params.where.id, { populate: 'item_invoice' })
        let invoiceID = currentItem.item_invoice.id

        // Preluare itemi invoice in cauza
        let invoice_items = await strapi.entityService.findMany('api::table-invoice-item.table-invoice-item', { filters: { item_invoice: invoiceID }, populate: 'item_product' })
        console.log("invoice_items: ", invoice_items)

        // Calculare total
        var total = 0
        for(let index in invoice_items){
            let item = invoice_items[index]
            if (item.id != event.params.where.id) total += item.item_quantity * item.item_product.product_unit_value
        }
        console.log("total: ", total)

        // Actualizare invoice total
        await strapi.entityService.update('api::table-invoice.table-invoice', invoiceID, {
            data: {
                "invoice_total": total
            }
        })
    }
}