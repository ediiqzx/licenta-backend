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
    }
}