module.exports = ({ env }) => ({
  auth: {
    secret: env('ADMIN_JWT_SECRET', '5c3e283853c08bc10bdc6c9e18cb7df2'),
  },
});
