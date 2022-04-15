module.exports = ({ env }) => ({
    'users-permissions': {
      config: {
        jwt: {
          expiresIn: '1h',
        },
      },
    },
    email: {
      config: {
        provider: 'sendgrid',
        providerOptions: {
          apiKey: env('SENDGRID_API_KEY'),
        },
        settings: {
          defaultFrom: 'me@eduardstefan.com',
          defaultReplyTo: 'me@eduardstefan.com',
        },
      },
    },
  })
   