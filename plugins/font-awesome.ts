import { library, config } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { fas, faS, faUser, faRefresh, faChartLine, faList, faTimes, faGlobe, faWarning } from '@fortawesome/free-solid-svg-icons';


library.add(fas, faS, faUser, faRefresh, faChartLine, faList, faTimes, faGlobe, faWarning)

// This is important, we are going to let Nuxt worry about the CSS
config.autoAddCss = false

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.component('font-awesome-icon', FontAwesomeIcon)
})