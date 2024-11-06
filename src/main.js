import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import router from './router/index'

// Vuetify
import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'

import { VueFire, VueFireAuth } from 'vuefire'

import { firebaseApp } from './firebase'

const vuetify = createVuetify({
  components,
  directives,
})
createApp(App).use(vuetify).use(router).use(VueFire, {
  // imported above but could also just be created here
  firebaseApp,
  modules: [
    // we will see other modules later on
    VueFireAuth(),
  ],
}).mount('#app')
