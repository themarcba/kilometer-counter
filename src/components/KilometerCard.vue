<template>
    <div class="kilometer-card">
        <div class="card">
            <img src="delete-icon.png" alt class="delete" @click="deleteMode = true">
            <span class="tendency">{{ this.entry.kilometerCount }} km</span>
            <div class="value">
                {{ difference }}
                <span class="unit">km</span><br>
            </div>
            <div class="title">{{ createdAtString }}</div>
            <div v-show="deleteMode" class="delete-mode">
                <div>Willst du diesen Eintrag wirklich Löschen?</div>
                <div class="button" @click="deleteMode = false">Nein</div>
                <div class="danger button" @click="deleteEntry">Ja, löschen!</div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: "KilometerCard",
    data() {
        return {
            deleteMode: false
        };
    },
    props: {
        entry: Object,
        beforeEntry: Object
    },
    computed: {
        createdAtString() {
            let options = {
                weekday: "long",
                year: "numeric",
                month: "long",
                day: "numeric"
            };
            return this.entry.createdAt
                .toDate()
                .toLocaleDateString("de-DE", options);
        },
        difference() {
            return this.beforeEntry
                ? this.entry.kilometerCount - this.beforeEntry.kilometerCount
                : 0;
        }
    },
    methods: {
        deleteEntry() {
            this.$emit("delete-entry", this.entry.id);
        }
    }
};
</script>

<style lang="scss">
.card {
    background: #fff;
    border-radius: 8px;
    box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
    margin: 10px 10px;
    padding: 10px;
    .title {
        font-size: 1.5em;
    }
    .value {
        font-size: 2.5em;
        font-weight: bold;
    }
    .tendency {
        font-size: 1.5em;
        font-weight: bold;
        color: #c3c3c3;
    }
    img.delete {
        right: 40px;
        position: absolute;
    }
}
</style>
