<template>
    <div class="card edit">
        <div class="title">{{ title }}</div>
        <div class="value">
            <input type="text" @change="updateValue" v-model="value" number>
        </div>
        <span class="unit">{{ unit }}</span>
    </div>
</template>

<script>
export default {
    name: "EditValueCard",
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
        updateValue() {
            this.$emit(
                "update:value",
                Number.parseFloat(this.value.toString().replace(",", "."))
            );
        }
    }
};
</script>

<style lang="scss">
.card.edit {
    input {
        border: solid #eee 1px;
        border-radius: 5px;
        font-size: 1em;
        margin-top: 15px;
        outline: 0;
        text-align: center;
        width: 100%;
        box-sizing: border-box;
    }
    .unit {
        font-size: 1em;
        font-weight: bold;
    }
}
</style>
