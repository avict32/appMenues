import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Registrarse from '@/components/auth/Registrarse.vue'
import iSesion from '@/components/auth/iSesion.vue'
import firebase from 'firebase'

Vue.use(VueRouter)

  const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },

  {
    path: '/Registrarse',
    name: 'Registrarse',
    component: Registrarse
  },

  {
    path: '/iSesion',
    name: 'iSesion',
    component: iSesion
  },

  {
    path: '/buscador',
    name: 'buscador',
    meta: {
      requieresAuth:true
    },
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: function () {
      return import(/* webpackChunkName: "about" */ '../views/buscador.vue')
    },
    
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from, next) => {
  // check to see if route has auth guard
  if(to.matched.some(rec => rec.meta.requiresAuth)){
    // check auth state of user
    let user = firebase.auth().currentUser
    if (user) {
      // User is signed in. Proceed to route
      next()
    } else {
      // No user is signed in. Redirect to login
      next({
        name: 'Login'
      })
    }
  } else {
    // if route is not guarded by auth, proceed
    next()
  }
})


export default router
