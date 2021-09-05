import '@fortawesome/fontawesome-free/css/all.min.css'
import 'bootstrap-css-only/css/bootstrap.min.css'
import 'mdbvue/lib/css/mdb.min.css'
import Vue from 'vue'
import VueMaterial from 'vue-material'
import 'vue-material/dist/vue-material.min.css'
import App from './App.vue'
//mport SuiVue from 'semantic-ui-vue'
import router from './router/index'
//import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'
//import 'bootstrap/dist/css/bootstrap.css'
//import 'bootstrap-vue/dist/bootstrap-vue.css'
Vue.config.productionTip = false

Vue.use(VueMaterial)

/* eslint-disable no-new */

// Make BootstrapVue available throughout your project
//Vue.use(BootstrapVue)
// Optionally install the BootstrapVue icon components plugin
//Vue.use(IconsPlugin)

//Vue.use(SuiVue)

new Vue({
  //el: '#app',
  router,
  //mode: history,
  render: h => h(App)

  //template: '<App/>',
  //components: { App }
}).$mount('#app')
