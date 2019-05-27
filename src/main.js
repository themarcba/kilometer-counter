import Vue from 'vue'
import App from './App.vue'
import router from './router'

// Firebase
import { firestorePlugin } from 'vuefire'
import firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/auth'

Vue.config.productionTip = false

Vue.use(firestorePlugin)

firebase.initializeApp({
    apiKey: process.env.VUE_APP_FIREBASE_API_KEY,
    authDomain: process.env.VUE_APP_FIREBASE_API_KEY,
    databaseURL: process.env.VUE_APP_FIREBASE_DATABASE_URL,
    projectId: process.env.VUE_APP_FIREBASE_PROJECT_ID,
    appId: process.env.VUE_APP_FIREBASE_APP_ID,
    storageBucket: '',
    messagingSenderId: ''
})

// firebase.auth().setPersistence(firebase.auth.Auth.Persistence.LOCAL)
//     .then(function() {
//         return firebase.auth().signInWithEmailAndPassword(email, password);
//     })
//     .catch(function(error) {
//         // Todo: Error handling
//         var errorCode = error.code;
//         var errorMessage = error.message;
//         console.error(`firebase error occured: ${errorMessage} (code: ${errorCode})`);
        
//     });


export const db = firebase.firestore()

new Vue({
    router,
    render: h => h(App)
}).$mount('#app')