<template>
    <div class="login">
        <h1>Login</h1>

        <div class="email">E-Mail</div>
        <input class="text-input" type="text" v-model="email" required>
        <br>
        <div class="password">Passwort</div>
        <input class="text-input" type="password" v-model="password" required >
        <br>

        <div v-on:click="login" class="button success">Einloggen</div>

        <p>
            <router-link to="/signup">Du hast noch keinen Account?</router-link>
        </p>
    </div>
</template>


<script>
import firebase from "firebase/app";
import "firebase/auth";
export default {
    name: "login",
    data: function() {
        return {
            email: "",
            password: ""
        };
    },
    methods: {
        login() {
            firebase
                .auth()
                .signInWithEmailAndPassword(this.email, this.password)
                .then(user => {
                    this.$router.replace("/");
                })
                .catch(err => {
                    alert(err.message);
                });
        }
    }
};
</script>

<style scoped>
</style>
