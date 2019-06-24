<template>
    <div class="home">
        <div v-if="uid">
            <div v-if="!editMode">
                <div class="card" v-if="!entries">
                    <h2>Keine Einträge vorhanden 😟</h2>
                </div>

                <div
                    class="big button success"
                    @click="editMode = true"
                    v-if="uid && !editMode"
                >Neue Distanz eintragen +</div>
                <div v-if="entries">
                    <div v-for="(entry, index) in entries" :key="entry.id">
                        <KilometerCard
                            :entry="entry"
                            :beforeEntry="entries[index+1]"
                            @delete-entry="deleteEntry"
                        ></KilometerCard>
                    </div>
                </div>
            </div>
        </div>
        <div v-if="editMode">
            <div v-if="Object.keys(error).length > 0" class="card error">
                <div class="title">{{ error.title }}</div>
                <div class="message">{{ error.message }}</div>
            </div>

            <EditValueCard
                title="Neue Distanz eintragen:"
                unit="km"
                @value-confirmed="newNumberConfirmed"
            ></EditValueCard>
            <div class="button" @click="editMode = false">Abbrechen</div>
        </div>

        <!-- <div id="logout-button" class="button" v-on:click="logout">Ausloggen</div> -->
        <!-- <div class="footer" v-if="uid">
            <strong @click="logout">Ausloggen?</strong>
        </div> -->
    </div>
</template>

<script>
// @ is an alias to /src
import KilometerCard from "@/components/KilometerCard.vue";
import EditValueCard from "@/components/EditValueCard.vue";
import NumberPad from "@/components/NumberPad.vue";

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
        KilometerCard,
        EditValueCard,
        NumberPad
    },
    data() {
        return {
            entries: [],
            editMode: false,
            uid: null,
            error: {}
        };
    },
    methods: {
        newNumberConfirmed(kilometerCount) {
            const createdAt = new Date();

            if (kilometerCount <= this.currentDistance) {
                this.error = {
                    title: `Die Distanz muss größer als die vorherige Distanz (${
                        this.currentDistance
                    } km) sein`
                };
            } else if (isNaN(kilometerCount)) {
                this.error = {
                    title: "Ungültige Zahl",
                    message: `Bitte überprüfe ob die angegebene Zahl gültig ist.`
                };
            } else {
                db.collection("kilometer-entries")
                    .add({
                        kilometerCount,
                        createdAt,
                        uid: this.uid
                    })
                    .then(entry => {
                        this.getEntries();
                    });
                this.error = {};
                this.editMode = false;
            }
        },
        getEntries() {
            firebase.auth().onAuthStateChanged(user => {
                if (user) this.uid = user.uid;
                let _this = this;

                // db query
                this.$bind(
                    "kilometer-entries",
                    db
                        .collection("kilometer-entries")
                        .where("uid", "==", user.uid)
                        .orderBy("createdAt", "desc")
                ).then(entries => {
                    console.log(entries);
                    this.entries = entries;
                    this.$unbind("kilometer-entries");
                });
            });
        },
        deleteEntry(entryId) {
            console.log("deleto " + entryId);
            db.collection("kilometer-entries")
                .doc(entryId)
                .delete()
                .then(entry => {
                    this.getEntries();
                });
        },
        logout() {
            firebase
                .auth()
                .signOut()
                .then(() => {
                    this.$router.replace("login");
                });
        }
    },
    created() {
        this.getEntries();
    }
};
</script>

<style lang="scss">
.button {
    display: inline-grid;
    --moz-display: inline-grid;
    --ms-display: inline-grid;
    padding: 10px 15px;
    cursor: pointer;
    margin: 10px;
    border-radius: 5px;
    font-weight: bold;
    background: #c7c7c7;
    color: #fff;
    &.success {
        background: #42b983;
        color: #fff;
    }
    &.danger {
        background: tomato;
        color: #fff;
    }
    &.big {
        font-size: 1.5em;
    }
}

.home {
    h2 {
        &.vertical-margins {
            margin: 50px auto;
        }
    }
}

.footer {
    height: 50px;
    line-height: 50px;
    position: absolute;
    width: 100%;
    bottom: 0;
    background: #ccc;
    color: #444;
}
.card {
    &.error {
        background: tomato;
        color: #fff;
    }
}
</style>
