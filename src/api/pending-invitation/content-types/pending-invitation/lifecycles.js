module.exports = {
    async afterCreate(event){
        console.log("After Create - Event Result: ", event.result)

        // Preluare date
        const pending_invitation = await strapi.entityService.findOne('api::pending-invitation.pending-invitation', event.result.id, {
            fields: ['email', 'role'],
            populate: ['workspace', 'invited_by']
        })
        console.log("Pending_invitation: ", pending_invitation)

        // Generare email
        var register_link = process.env.FRONTEND_URL + "/register-from-invitation/?invitation=" + pending_invitation.id
        var bodyHtml = '<h3>' + pending_invitation.invited_by.display_name + ' invited you in their workspace: "' + pending_invitation.workspace.name + '".</h3><p>The role assigned for you is <strong>' + pending_invitation.role + '</strong></p><br><p>To accept this invitation please access <a href="' + register_link + '">this link</a>.</p>'

        await strapi.plugins['email'].services.email.send({
            to: event.result.email,
            subject: "You've been invited into a new workspace!",
            html: bodyHtml,
        });
    }
}