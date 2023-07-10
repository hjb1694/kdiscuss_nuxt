import Toggle from '@vueform/toggle';

export default defineNuxtPlugin((nuxtApp) => {
    nuxtApp.vueApp.component('toggle', Toggle);
});