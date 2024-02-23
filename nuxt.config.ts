export default defineNuxtConfig({
    modules: [
        'nuxt-primevue',
        'nuxt3-leaflet',
        '@pinia/nuxt',
    ],
    css: [
        'primeflex/primeflex.css'
    ],
    runtimeConfig: {
        public: {
            API_KEY_GEO: process.env.API_KEY_GEO
        }
    }
})
