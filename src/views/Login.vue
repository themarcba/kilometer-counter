<template>
    <div class="login">
        <h1>Login</h1>

        <div class="field">
            <div class="title">E-Mail</div>
            <input class="text-input" type="text" v-model="email" required>
        </div>
        <div class="field">
            <div class="title">Passwort</div>
            <input class="text-input" type="password" v-model="password" required>
        </div>

        <div class="actions">
            <div v-on:click="login" class="button success">Einloggen</div>
        </div>

        <p>
            <router-link to="/signup">Du hast noch keinen Account?</router-link><br>
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

<style lang="scss">
.field {
    margin: 10px auto;
    .title {
        font-weight: bold;
    }
    input {
        border: 0;
        font-size: 1.5em;
        text-align: center;
        padding: 10px 25px;
        border-radius: 8px;
        outline: 0;
    }
}
</style>
