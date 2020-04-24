import { Configuration } from '@nuxt/types';


const config: Configuration = {
  mode: 'universal',
  /*
  ** Headers of the page
  */
  head: {
    titleTemplate: '%s - Kontrakt',
    title: "",
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: "Gerez vos contrats de travail en toute simplicité" }
    ],
    link: [
    ]
  },
  /*
  ** Customize the progress-bar color
  */
  loading: { color: '#9C27B0' },
  /*
  ** Global CSS
  */
  css: [],
  /*
  ** Plugins to load before mounting the App
  */
  plugins: [
    '@plugins/apollo-accessor',
    '@plugins/filters'
  ],
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
  buildModules: [
    '@nuxt/typescript-build',
    '@nuxtjs/vuetify',
  ],
  /*
  ** Nuxt.js modules
  */
  modules: [
    '@nuxtjs/pwa',
    "@nuxtjs/apollo"
  ],
  apollo: {
    clientConfigs: {
      default: {
        httpEndpoint: 'https://contrat.api.maelkerichard.com/'
      }
    }
  },
  /*
  ** vuetify module configuration
  ** https://github.com/nuxt-community/vuetify-module
  */
  vuetify: {
    customVariables: ['~/assets/variables.scss'],
    theme: {
      dark: false,
      themes: {
        light: {
          primary: "#174891",
          secondary: "#E06CF2"
        }
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
    },
  },
  server: {
    host: "0.0.0.0",
    port: process.env.PORT || 8080
  }
};

export default config;
