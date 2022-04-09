module.exports = {
    /**
    * Cron job with timezone example.
    * Every Monday at 1am for Asia/Dhaka timezone.
    * List of valid timezones: https://en.wikipedia.org/wiki/List_of_tz_database_time_zones#List
    */
    
    myJob: {
        task: ({ strapi }) => {
            console.log('Test Cron Job')
        },
        options: {
            rule: '0 0 0 0 0 0',
            tz: 'Europe/Bucharest',
        },
    },
};
  