<template>
  <div class="container">
    <h1>Busca Tu Resto</h1>
    <select v-model="selected" v-on:change="getUsers(selected)">
      <option disabled value>Seleccione una Ciudad</option>
      <option>Quilmes</option>
      <option>Buenos Aires</option>
    </select>

    <ul>
      <li>
        <input type="text" placeholder="Buscar" v-model="nombre" />
      </li>

      <li
        v-for="(item, index) in searchUser"
        v-bind:key="index"
        v-on:click="getMenu(item.url, item.nombre)"
      >{{ item.nombre }}</li>
    </ul>
  </div>
</template>

<script>
import axios from "axios";
import firebase from 'firebase'
import db from '@/firebase/init'
import json from 'json-schema'

export default {
  name: "searchRestos",
  data: function () {
    return {
      lists: [],
      nombre: "",
      selected: "",
      url_ubicacion: "",
      menu: [],
      menuJ: []
    };
  },
  methods: {
    getUsers: function (ubicacion) {
      ubicacion = ubicacion.toLowerCase();
      this.url_ubicacion = "http://127.0.0.1:5000/listado/" + ubicacion;
      console.log(this.url_ubicacion);
      axios.get(this.url_ubicacion).then((response) => {
        console.log("pedido", response.data);
        this.lists = response.data;
      });
    },
    getMenu: function (urlResto, nombreResto) {
      console.log(urlResto);
      axios
        .post(
          "http://127.0.0.1:5000/buscarMenu",
          { url_pedidosya: urlResto,
            nombreResto },
          { headers: { "Content-Type": "application/json" } }
        )
        .then((response) => {
            // console.log(response.data)
            this.menu = response
            // console.log(JSON.stringify((this.menu[0])))
            console.log(this.menu)
            // this.menuJ=JSON.stringify((this.menu))
            // console.log(this.menuJ[1])
            // db.collection('menues').doc(nombreResto).set(this.menu)
        
        })
        .catch((err) => console.log(err));
    },

    //  {
    //       console.log(urlResto)
    //       axios.get('http://127.0.0.1:5000/ping').then(response => console.log(response))
    //     }
  },
  computed: {
    searchUser: function () {
      return this.lists.filter((item) => item.nombre.includes(this.nombre));
    },
  },
};
</script>

<style>
</style>

