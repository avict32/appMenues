<template>
  <div id="app">
    <div id="nav">
      <router-link to="/">Inicio</router-link> |
      <router-link to="/Registrarse">Registrase</router-link> |
      <router-link to="/iSesion">Iniciar Sesion</router-link> |
      <a @click="logout">Cerrar Sesion</a>|
      <router-link to="/buscador">Buscador de Restos</router-link>
    </div>
    <router-view/>
  </div>
</template>

<script>
import firebase from 'firebase'
export default {
  name: 'App_',
  data(){
    return{
        user: null
    }
  },
  methods: {
    logout(){
      firebase.auth().signOut().then(() => {
        this.$router.push({ name: 'iSesion' })
      })
    }
  },
 created(){
    // let user = firebase.auth().currentUser
    firebase.auth().onAuthStateChanged((user) => {
      if(user){
        this.user = user
      } else {
        this.user = null
      }
    })    
  },
  methods: {
    logout(){
      firebase.auth().signOut().then(() => {
        this.$router.push({ name: 'iSesion' })
      })
    }
  }
  
}
</script>





<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>
