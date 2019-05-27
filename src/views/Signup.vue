<template>
    <div class="sign-up">
        <h1>Umellen</h1>
        <div class="email">E-Mail</div>
        <input
            class="text-input"
            type="text"
            v-model="email"
            placeholder="Deng E-Mail Address"
            required
        >
        <br>
        <div class="password">Passwort</div>
        <input
            class="text-input"
            type="password"
            v-model="password"
            placeholder="Däi Passwuert"
            required
        >
        <br>
        <div v-on:click="signUp" class="button success">Anmelden</div><br>
        <p>
            <router-link class="" to="/login">Du hast bereits einen Account?</router-link>
        </p>
    </div>
</template>


<script>
import firebase from "firebase/app";
export default {
    name: "signup",
    data() {
        return {
            email: "",
            password: ""
        };
    },
    methods: {
        signUp() {
            firebase
                .auth()
                .createUserWithEmailAndPassword(this.email, this.password)
                .then(user => {
                    this.$router.replace("/login");
                })
                .catch(err => {
                    alert(err.message);
                });
        }
    }
};
</script>


<style>
</style>
