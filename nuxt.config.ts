// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true }, 
  vite: {
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: '@use "@/assets/scss/main.scss" as *;'
        }
      }
    }
  }, 
  css: [
    '@fortawesome/fontawesome-svg-core/styles.css', 
    '@vueform/multiselect/themes/default.css', 
    'animate.css/animate.min.css', 
    '@vueform/toggle/themes/default.css'
  ], 
  modules: [
    '@nuxtjs/google-fonts', 
    '@pinia/nuxt'
  ], 
  googleFonts: {
    families: {
      Poppins: [400, 600, 700]
    }
  }, 
  pinia: {
    autoImports: [
      'defineStore', 
      ['defineStore', 'definePiniaStore'],
    ],
  },
  imports: {
    autoImport: true,
    dirs: [
      'stores',
      'stores/**'
    ]
  }, 
  runtimeConfig: {
    account_api_uri: process.env.ACCOUNT_API_URI
  }
})
