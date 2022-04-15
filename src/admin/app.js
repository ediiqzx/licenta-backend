import AuthLogo from './extensions/strapi_logo_login.png'
import MenuLogo from './extensions/strapi_logo_app.png'
import favicon from './extensions/strapi_favicon.png'

export default {
  config: {
    auth: { // Replace the Strapi logo in auth (login) views
      logo: AuthLogo,
    },
    head: { // Replace the favicon
      favicon: favicon,
    },
    menu: { // Replace the Strapi logo in the main navigation
      logo: MenuLogo,
    },
    theme: {
      colors: {
        alternative100: '#f6ecfc',
        alternative200: '#e0c1f4',
        alternative500: '#ac73e6',
        alternative600: '#9736e8',
        alternative700: '#8312d1',
        danger700: '#b72b1a'
      },
    },
    tutorials: false
  },
  bootstrap(app) {
    console.log(app)
  },
}
