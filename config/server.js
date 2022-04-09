const cronTasks = require("./cron-tasks");

module.exports = ({ env }) => ({
  host: env('HOST', ''),
  port: env.int('PORT', ''),
  url: env('PUBLIC_URL', ''),
  app: {
    keys: env.array('APP_KEYS'),
  },
  cron: {
    enabled: true,
    tasks: cronTasks
  },
});
