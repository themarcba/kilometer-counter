<template>
    <div class="card edit">
        <div class="title">{{ title }}</div>
        <div class="value">
            <!-- <input type="text" @change="updateValue" v-model="value" number> -->
            <div class="input">{{ value || "&nbsp;" }}</div>
        </div>
        <span class="unit">{{ unit }}</span>

        <NumberPad :value.sync="value" @confirm="confirmValue"></NumberPad>
    </div>
</template>

<script>
import NumberPad from "@/components/NumberPad.vue";
export default {
    name: "EditValueCard",
    components: {
        NumberPad
    },
    data() {
        return {
            value: null
        };
    },
    props: {
        title: String,
        unit: String
    },
    methods: {
        confirmValue() {
            this.$emit(
                "value-confirmed",
                this.value
            );
        }
    }
};
</script>

<style lang="scss">
.card.edit {
    .unit {
        font-size: 1em;
        font-weight: bold;
    }
    div.input {
        border: solid #eee 1px;
        border-radius: 5px;
        font-size: 1em;
        margin-top: 15px;
        outline: 0;
        text-align: center;
        width: 100%;
        box-sizing: border-box;
        padding: 10px auto;
        color: #2c3e50;
    }
}
</style>
