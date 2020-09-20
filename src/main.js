import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'
import firebase from 'firebase'

Vue.config.productionTip = false

let app = null

//demora para que el firebase ath init antes de que se cree la pagina
firebase.auth().onAuthStateChanged(() => {


new Vue({
  router,
  store,
  render: function (h) { return h(App) }
}).$mount('#app')

})