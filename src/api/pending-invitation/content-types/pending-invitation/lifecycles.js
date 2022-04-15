module.exports = {
    async afterCreate(event){
        console.log("After Create - Event Result: ", event.result)

        await strapi.plugins['email'].services.email.send({
            to: event.result.email,
            subject: 'Use strapi email provider successfully',
            text: 'Hello world!',
            html: 'Hello world!',
        });
    }
}