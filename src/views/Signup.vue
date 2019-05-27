<template>
    <div class="sign-up">
        <h1>Account erstellen</h1>
        <div class="field">
            <div class="title">E-Mail</div>
            <input class="text-input" type="text" v-model="email" required>
        </div>
        <div class="field">
            <div class="title">Passwort</div>
            <input class="text-input" type="password" v-model="password" required>
        </div>

        <div class="actions">
            <div v-on:click="signUp" class="button success">Anmelden</div>
        </div>
        <p>
            <router-link class to="/login">Du hast bereits einen Account?</router-link>
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
