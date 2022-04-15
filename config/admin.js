module.exports = ({ env }) => ({
  apiToken: {
    salt: env('API_TOKEN_SALT', ''),
  },
  auth: {
    events: {
      onConnectionSuccess(e) {
        console.log(e.user, e.provider)
      },
      onConnectionError(e) {
        console.error(e.error, e.provider)
      },
    },
    secret: env('ADMIN_JWT_SECRET', ''),
  },
})
