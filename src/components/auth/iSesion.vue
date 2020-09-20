<template>
  <div class="iSesion container">
    <form class="card-panel" @submit.prevent="iSesion">
      <h2 class="center green-text">Iniciar Sesion</h2>
      <div class="field">
        <label for="email">Email</label>
        <input id="email" type="email" v-model="email">
      </div>
      <div class="field">
        <label for="password">Password</label>
        <input id="password" type="password" v-model="password">
      </div>
      <p v-if="feedback" class="red-text center">{{ feedback }}</p>
      <div class="field center">
        <button class="btn deep-green">Iniciar Sesion</button>
      </div>
    </form>
  </div>
</template>

<script>
import firebase from 'firebase'

export default {
  name: 'iSesion',
  data(){
    return{
      email: null,
      password: null,
      feedback: null
    }
  },
  methods: {
    iSesion(){
        if(this.email && this.password){
            firebase.auth().signInWithEmailAndPassword(this.email, this.password)
            .then(cred =>{
                this.$router.push({ name: 'Home'})
            }).catch( err => {
                this.feedback=err.message
            })
            this.feedback=null
        } else {
            this.feedback = 'Completa los espacios en blanco'

        }
    }
  }
}
</script>

<style>
.iSesion{
  max-width: 400px;
  margin-top: 60px;
}
.iSesion h2{
  font-size: 2.4em;
}
.iSesion .field{
  margin-bottom: 16px;
}
</style>