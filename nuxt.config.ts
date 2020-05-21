import { Configuration } from "@nuxt/types";

const config: Configuration = {
  mode: "universal",
  /*
   ** Headers of the page
   */
  head: {
    titleTemplate: "%s - Kontrakt",
    title: "",
    meta: [
      { charset: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      {
        hid: "description",
        name: "description",
        content: "Gerez vos contrats de travail en toute simplicité"
      }
    ],
    link: []
  },
  /*
   ** Customize the progress-bar color
   */
  loading: { color: "#9C27B0" },
  /*
   ** Global CSS
   */
  css: [],
  /*
   ** Plugins to load before mounting the App
   */
  plugins: ["@plugins/apollo-accessor", "@plugins/filters"],
  pwa: {
    manifest: {
      name: "Kontrakt - Contrats de travail ",
      land: "fr-FR",
      description: "Gerez vos contrats de travail en toute simplicité",
      short_name: "Kontrakt",
      start_url: "/"
    }
  },
  /*
   ** Nuxt.js dev-modules
   */
  buildModules: ["@nuxt/typescript-build", "@nuxtjs/vuetify", "@nuxtjs/dotenv"],
  /*
   ** Nuxt.js modules
   */
  modules: ["@nuxtjs/pwa", "@nuxtjs/apollo", "cookie-universal-nuxt"],
  apollo: {
    clientConfigs: {
      default: {
        httpEndpoint: process.env.NODE_ENV !== 'production' ? 'http://localhost:4000/' : "https://contrat.api.maelkerichard.com/"
      }
    },
    tokenName: "token"
  },
  /*
   ** vuetify module configuration
   ** https://github.com/nuxt-community/vuetify-module
   */
  vuetify: {
    customVariables: ["~/assets/variables.scss"],
    theme: {
      themes: {
        light: {
          primary: "#174891",
          secondary: "#E06CF2"
        }
      },
      themeCache: {
        get: (key: string) => localStorage.getItem(key),
        set: (key: string, value: string) => localStorage.setItem(key, value)
      }
    }
  },
  /*
   ** Build configuration
   */
  build: {
    /*
     ** You can extend webpack config here
     */
    extend(config, ctx) {
    }
  },
  server: {
    host: "0.0.0.0",
    port: process.env.PORT || 8080
  }
};

export default config;
