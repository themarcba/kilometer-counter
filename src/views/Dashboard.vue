<template>
    <div class="home">
        <div v-if="uid && distances">
            <div id="logout-button" class="button" v-on:click="logout">Ausloggen</div>
            <div v-if="!editMode">
                <ValueCard title="Aktuelle Distanz" :value="currentDistance" unit="km"></ValueCard>
                <ValueCard
                    title="Zurückgelegte Distanz"
                    :value="differenceBetweenDistances"
                    unit="km"
                ></ValueCard>

                <div class="button success" @click="editMode = true">Neue Distanz eintragen +</div>
                <br>
            </div>
        </div>
        <div v-if="editMode">
            <div v-if="Object.keys(error).length > 0" class="card error">
                <div class="title">{{ error.title }}</div>
                <div class="message">{{ error.message }}</div>
            </div>

            <EditValueCard title="Neue Distanz eintragen:" unit="km" :value.sync="newDistance"></EditValueCard>
            <ValueCard title="Aktuelle Distanz" :value="currentDistance" unit="km"></ValueCard>
            <div class="button success" @click="saveNewDistance">Speichern</div>
            <br>
            <div class="button" @click="editMode = false">Abbrechen</div>
        </div>
    </div>
</template>

<script>
// @ is an alias to /src
import ValueCard from "@/components/ValueCard.vue";
import EditValueCard from "@/components/EditValueCard.vue";

// Firebase
import firebase from "firebase/app";
import "firebase/auth";
import { db } from "../main";

// firebase.auth().onAuthStateChanged(user => {
//     if (user) store.commit("setUid", user.uid);
// });

export default {
    name: "home",
    components: {
        ValueCard,
        EditValueCard
    },
    data() {
        return {
            distances: [],
            newDistance: null,
            editMode: false,
            uid: null,
            error: {}
        };
    },
    methods: {
        saveNewDistance() {
            const createdAt = new Date();
            
            if (this.newDistance <= this.currentDistance) {
                this.error = {
                    title: `Die Distanz muss größer als die vorherige Distanz (${this.currentDistance} km) sein`
                };
            }
            else if(isNaN(this.newDistance)) {
                this.error = {
                    title: "Ungültige Zahl",
                    message: `Bitte überprüfe ob die angegebene Zahl gültig ist.`
                };
            } else {
                this.distances.push(this.newDistance);
                db.collection("kilometers")
                    .doc(this.uid)
                    .set(
                        { distances: this.distances, createdAt },
                        { merge: true }
                    );
                this.error = {};
                this.editMode = false;

            }
        },
        logout() {
            firebase
                .auth()
                .signOut()
                .then(() => {
                    this.$router.replace("login");
                });
        },
        isValidNewDistance() {
            return (
                this.newDistance > this.currentDistance &&
                !isNaN(this.newDistance)
            );
        }
    },
    computed: {
        currentDistance() {
            return this.distances.length > 0
                ? this.distances[this.distances.length - 1]
                : 0;
        },
        lastDistance() {
            return this.distances.length > 1
                ? this.distances[this.distances.length - 2]
                : 0;
        },
        differenceBetweenDistances() {
            return this.currentDistance - this.lastDistance;
        }
    },
    created() {
        firebase.auth().onAuthStateChanged(user => {
            if (user) this.uid = user.uid;
            console.log(this.uid);
            let _this = this;
            var docRef = db.collection("kilometers").doc(this.uid);
            docRef
                .get()
                .then(function(doc) {
                    if (doc.exists) {
                        _this.distances = doc.data().distances || [];
                    } else {
                        _this.distances = [];
                        console.log("No such document!");
                    }
                })
                .catch(function(error) {
                    console.log("Error getting document:", error);
                });
        });
    }
};
</script>

<style lang="scss">
.button {
    padding: 10px 15px;
    cursor: pointer;
    margin: 10px;
    border-radius: 5px;
    display: inline-block;
    font-weight: bold;
    background: #c7c7c7;
    color: #fff;
    &.success {
        background: #42b983;
        color: #fff;
    }
}

.card {
    &.error {
        background: tomato;
        color: #fff;
    }
}
</style>
