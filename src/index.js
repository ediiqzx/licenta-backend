'use strict';

module.exports = {
  /**
   * An asynchronous register function that runs before
   * your application is initialized.
   *
   * This gives you an opportunity to extend code.
   */
  register(/*{ strapi }*/) {},

  /**
   * An asynchronous bootstrap function that runs before
   * your application gets started.
   *
   * This gives you an opportunity to set up your data model,
   * run jobs, or perform some special logic.
   */
   async bootstrap({ strapi }) {
    strapi.db.lifecycles.subscribe({
      models: ['plugin::users-permissions.user'],
      async afterCreate(event) {
        const { result, params } = event
        console.log("Result: ", result)
        console.log("Params: ", params)

        // Generare workspace personal
        const workspace = await strapi.entityService.create('api::workspace.workspace', { data: {
          "default_tables": {},
          "owner": result.id
        } })
        console.log("Workspace: ", workspace)

        // Creare relatie workspace - user
        const user_and_workspace = await strapi.entityService.create('api::user-and-workspace.user-and-workspace', { data: {
          "user": result.id,
          "workspace": workspace.id,
          "role": 'owner'
        } })
        console.log("User_and_workspace: ", user_and_workspace)
      },
    });
   }
};
