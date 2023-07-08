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
    '@vueform/multiselect/themes/default.css'
  ], 
  modules: [
    '@nuxtjs/google-fonts'
  ], 
  googleFonts: {
    families: {
      Poppins: true
    }
  }, 
  // vue: {
  //   compilerOptions: {
  //     isCustomElement: tag => ['select-field'].includes(tag)
  //   }
  // }
})
