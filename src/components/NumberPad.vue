<template>
    <div class="number-pad">
        <div class="number-key number-1">
            <div class="number-dial" @click="dialPressed(1)">1</div>
        </div>
        <div class="number-key number-2">
            <div class="number-dial" @click="dialPressed(2)">2</div>
        </div>
        <div class="number-key number-3">
            <div class="number-dial" @click="dialPressed(3)">3</div>
        </div>
        <div class="number-key number-4">
            <div class="number-dial" @click="dialPressed(4)">4</div>
        </div>
        <div class="number-key number-5">
            <div class="number-dial" @click="dialPressed(5)">5</div>
        </div>
        <div class="number-key number-6">
            <div class="number-dial" @click="dialPressed(6)">6</div>
        </div>
        <div class="number-key number-7">
            <div class="number-dial" @click="dialPressed(7)">7</div>
        </div>
        <div class="number-key number-8">
            <div class="number-dial" @click="dialPressed(8)">8</div>
        </div>
        <div class="number-key number-9">
            <div class="number-dial" @click="dialPressed(9)">9</div>
        </div>
        <div class="number-key number-delete">
            <div class="number-dial" @click="dialPressed('delete')">&lt;</div>
        </div>
        <div class="number-key number-0">
            <div class="number-dial" @click="dialPressed(0)">0</div>
        </div>
        <div class="number-key number-return">
            <div class="number-dial primary" @click="dialPressed('return')">OK</div>
        </div>
    </div>
</template>

<script>
export default {
    name: "NumberPad",
    data() {
        return {
            enteredValue: 0
        };
    },
    methods: {
        dialPressed(dial) {
            if (!isNaN(dial)) {
                this.enteredValue = this.enteredValue * 10 + dial;
                this.updateValue();
            } else if (dial == "delete") {
                this.enteredValue = parseInt(this.enteredValue / 10);
                this.updateValue();
            } else if (dial == "return") {
                this.confirmValue();
            }
        },

        updateValue() {
            this.$emit("update:value", this.enteredValue);
        },
        confirmValue() {
            this.$emit("confirm");
        }
    }
};
</script>

<style lang="scss">
.number-pad {
    display: grid;
    grid-template-rows: repeat(4, 100px);
    grid-template-columns: repeat(3, 1fr);
    align-content: space-between;
    max-width: 400px;
    margin-left: auto;
    margin-right: auto;
}

.number-dial {
    display: -ms-flexbox;
    display: flex;
    -ms-flex-align: center;
    align-items: center;
    -ms-flex-pack: center;
    justify-content: center;

    font-size: 0.8em;
    min-height: 3rem;
    border: solid 2px #42b983;
    color: #42b983;
    font-size: 1.5em;
    border: solid 2px #42b983;
    font-weight: bold;
    border-radius: 1000px;

    height: 80px;
    width: 80px;
    &.primary {
        background: #42b983;
        color: #fff;
    }
}

.number-key {
    display: -ms-flexbox;
    display: flex;
    -ms-flex-align: center;
    align-items: center;
    -ms-flex-pack: center;
    justify-content: center;

    /* 
    display: flex;
    -ms-flex-align: center;
    align-items: center;
    -ms-flex-pack: center;
    justify-content: center;
    display: table-cell;
    vertical-align: middle;
    border: solid 2px #42b983;
    width: 80px;
    height: 80px;
    border-radius: 40px;
    color: #42b983;
    font-size: 1.7em; 
    */
}
</style>
