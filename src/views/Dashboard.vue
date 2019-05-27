<template>
    <div class="home">
        <div v-if="!editMode">
            <ValueCard title="Aktuelle Distanz" :value="currentDistance" unit="km"></ValueCard>
            <ValueCard title="Zurückgelegte Distanz" :value="differenceBetweenDistances" unit="km"></ValueCard>

            <div class="button" @click="editMode = true">Neue Distanz eintragen +</div>
        </div>
        <div v-if="editMode">
            <EditValueCard title="Bitte neue Distanz eintragen"  unit="km" :value.sync="newDistance"></EditValueCard>
            <ValueCard title="Aktuelle Distanz" :value="currentDistance" unit="km"></ValueCard>
            <div class="button" @click="saveNewDistance">Speichern</div>
        </div>
    </div>
</template>

<script>
// @ is an alias to /src
import ValueCard from "@/components/ValueCard.vue";
import EditValueCard from "@/components/EditValueCard.vue";

export default {
    name: "home",
    components: {
        ValueCard,
        EditValueCard
    },
    data() {
        return {
            distances: [120, 140, 148],
            newDistance: null,
            editMode: false
        };
    },
    methods: {
        saveNewDistance() {
            this.distances.push(this.newDistance)
            this.editMode = false
            console.log(this.distances);
            
        },
        onUpdateNewDistance() {}
    },
    computed: {
        currentDistance() {
            return (this.distances.length > 0) ? this.distances[this.distances.length - 1] : 0
        },
        lastDistance() {
            return (this.distances.length > 1) ? this.distances[this.distances.length - 2] : 0
        },
        differenceBetweenDistances() {
            return this.currentDistance - this.lastDistance;
        }
    }
};
</script>

<style lang="scss">
.button {
    background: #42b983;
    color: #fff;
    padding: 10px 15px;
    cursor: pointer;
    margin: 10px;
    border-radius: 5px;
    display: inline-block;
    font-weight: bold;
}
</style>
