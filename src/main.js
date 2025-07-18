import { createApp } from 'vue'
import { createVuetify } from "vuetify"
import { aliases, mdi } from "vuetify/iconsets/mdi"
import { fa } from "vuetify/iconsets/fa"
import VueDraggable from 'vuedraggable'
import "vuetify/styles"
import "@mdi/font/css/materialdesignicons.css"
import "@fortawesome/fontawesome-free/css/all.css"
import * as components from "vuetify/components"
import * as directives from "vuetify/directives"

import App from './App.vue'

const app = createApp(App)

const vuetify = createVuetify({
    icons: {
      defaultSet: "mdi",
      aliases,
      sets: { mdi, fa },
    },
    components,
    directives,
})

app.use(VueDraggable)
app.use(vuetify)

app.mount('#app')