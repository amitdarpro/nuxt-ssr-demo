const pkg = require('./package')

module.exports = {
    mode: 'universal',

    /*
    ** Headers of the page
    */
    head: {
        title: 'WD Blog', //pkg.name,
        meta: [
            { charset: 'utf-8' },
            { name: 'viewport', content: 'width=device-width, initial-scale=1' },
            { hid: 'description', name: 'description', content: pkg.description }
        ],
        link: [
            { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
            { rel: 'stylesheet', href: "https://fonts.googleapis.com/css?family=Open+Sans" }
        ]
    },

    /*
    ** Customize the progress-bar color
    */
    loading: { color: '#3B8070' },

    /*
    ** Global CSS
    */
    css: [
    ],

    /*
    ** Plugins to load before mounting the App
    */
    plugins: [
        '~/plugins/core-components.js',
        '~/plugins/date-filter.js'
    ],

    /*
    ** Nuxt.js modules
    */
    modules: [
        '@nuxtjs/axios'
    ],

    axios: {
        baseUrl: process.env.BASE_URL || 'https://nuxt-demo-app-987e2-default-rtdb.firebaseio.com',
        credentials: false
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

    /*
    **  env vars
    */
    env: {
        baseUrl: process.env.BASE_URL || 'https://nuxt-demo-app-987e2-default-rtdb.firebaseio.com',
        fbAPIKey: 'AIzaSyB09LOZTbstxdcvlrqfSMVvkUXZy8ejfHw'
    },

    /*
    **  router
    */
    router: {
        //   extendRoutes(routes, resolve) {
        //       routes.push({
        //           path: '*',
        //           component: resolve(__dirname, 'pages/posts/index.vue')
        //       })
        //   }
    }
}
