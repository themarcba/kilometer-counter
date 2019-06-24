<template>
    <div class="card">
        <div class="title">{{ title }}</div>
        <div class="value">
            {{ value % 1 !== 0 ? value.toFixed(1) : value }}
            <span class="unit">{{ unit }}</span>
            <span class="tendency">+35%</span>
        </div>
    </div>
</template>

<script>
export default {
    name: "ValueCard",
    data() {
        return {};
    },
    props: {
        title: String,
        value: Number,
        unit: String,
        editMode: Boolean
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
        font-size: 3em;
        font-weight: bold;
    }
    .tendency {
        font-size: 0.5em;
        position: absolute;
        right: 40px;
    }
}
</style>
