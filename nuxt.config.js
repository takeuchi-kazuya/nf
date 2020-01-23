const pkg = require("./package");

module.exports = {
  // mode: "universal",
  mode: "spa",

  /*
   ** Headers of the page
   */
  head: {
    title: pkg.name,
    meta: [{
        charset: "utf-8"
      },
      {
        name: "viewport",
        content: "width=device-width, initial-scale=1"
      },
      {
        hid: "description",
        name: "description",
        content: pkg.description
      }
    ],
    link: [{
      rel: "icon",
      type: "image/x-icon",
      href: "/favicon.ico"
    }]
  },

  /*
   ** Customize the progress-bar color
   */
  loading: {
    color: "#fff"
  },

  /*
   ** Global CSS
   */
  css: [
    "firebaseui/dist/firebaseui.css",
    "vuetify/dist/vuetify.min.css"
  ],

  router: {
    middleware: ['authenticated']
  },

  /*
   ** Plugins to load before mounting the App
   */
  plugins: [
    "~/plugins/firebase.js",
    "~/plugins/vuetify.js",
    {
      src: "~plugins/persistedstate.js",
      ssr: false
    }
  ],

  /*
   ** Nuxt.js modules
   */
  modules: [
    "@nuxtjs/dotenv",
    '@nuxtjs/vuetify'
  ],

  buildModules: [
    // Simple usage
    '@nuxtjs/vuetify',

    // With options
    ['@nuxtjs/vuetify', {
      /* module options */
    }]
  ],

  /*
   ** Build configuration
   */
  build: {
    /*
     ** You can extend webpack config here
     */
    extend(config, ctx) {
      config.node = {
        fs: "empty"
      };
    }
  }
};
