<template>
  <div class="Registrarse container">
    <form class="card-panel" @submit.prevent="Registrarse">
      <h2 class="center green-text">Registrarse</h2>
      <div class="field">
        <label for="email">Email</label>
        <input id="email" type="email" v-model="email">
      </div>
      <div class="field">
        <label for="password">Password</label>
        <input id="password" type="password" v-model="password">
      </div>
      <div class="field">
        <label for="name">Alias</label>
        <input id="name" type="text" v-model="alias">
      </div>
      <p v-if="feedback" class="red-text center">{{ feedback }}</p>
      <div class="field center">
        <button class="btn green">Registrarse</button>
      </div>
    </form>
  </div>
</template>

<script>
import db from '@/firebase/init'
import slugify from 'slugify'
import firebase from 'firebase'

export default {
  name: 'Registrarse',
  data(){
    return{
      email: null,
      password: null,
      alias: null,
      feedback: null,
      slug: null
    }
  },
  methods: {
    Registrarse(){
      if(this.alias && this.email && this.password){       // Si los campos tienen contenido se ejectuta el slug, sino da un feedback para que el usaurio complete los datos
        this.slug = slugify(this.alias, {  //Esto es un resumen del usuario
          replacement: '-',
          remove: /[$*_+~.()'"!\-:@]/g,
          lower: true
        })
        console.log(this.slug)
        let ref = db.collection('users').doc(this.slug)
        ref.get().then(doc => {
          if(doc.exists){
            this.feedback = 'Alias existente pa'
          } else {
               firebase.auth().createUserWithEmailAndPassword(this.email, this.password)
            .then(cred => {
              ref.set({
                alias: this.alias,
                user_id: cred.user.uid
              })
              }).then( () => {
                  this.$router.push({name: 'Home'})
              })
              .catch( err => {
              console.log(err.message)
              this.feedback = err.message
            })
            // this alias does not yet exists in the db
            this.feedback = 'Alias libre, dale para adelante'
          }
        })
      } else {
        this.feedback = 'Completa todos los datos chabonazo'
      }
    }
  }
}
</script>

<style>
.Registrarse{
  max-width: 400px;
  margin-top: 60px;
}
.Registrarse h2{
  font-size: 2.4em;
}
.Registrarse .field{
  margin-bottom: 16px;
}
</style>
