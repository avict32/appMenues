import firebase from 'firebase'
import firestore from 'firebase/firestore'
// Your web app's Firebase configuration
var firebaseConfig = {
    apiKey: "AIzaSyCVgsOY7BanLWX63G2E0QjiM8WwGiahlDU",
    authDomain: "restospedidosya.firebaseapp.com",
    databaseURL: "https://restospedidosya.firebaseio.com",
    projectId: "restospedidosya",
    storageBucket: "restospedidosya.appspot.com",
    messagingSenderId: "200466905382",
    appId: "1:200466905382:web:da1e01c2d6dce51f8f29e7"
  };
  // Initialize Firebase
  const firebaseApp = firebase.initializeApp(firebaseConfig);

  export default firebaseApp.firestore()