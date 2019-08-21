<template>
    <div class="input-number">
        <div class="minus" @click="onMinusClick">
            <font-awesome-icon icon="minus" />
        </div>
        <input type="text" :value="item.value" @input="onInput" @keypress="onKeypress" @change="onChange">
        <div class="plus" @click="onPlusClick">
            <font-awesome-icon icon="plus" />
        </div>
    </div>
</template>

<script>
    export default {
        props: {
            item: Object
        },
        methods: {
            onMinusClick() {
                let value = this.getValue(this.item.value),
                    min = this.item.min;

                if (value === min || value - this.item.step < min) {
                    return false;
                }

                this.setValue((value * 10 - this.item.step * 10) / 10)
            },
            onPlusClick() {
                let value = this.getValue(this.item.value),
                    max = this.item.max;

                if (value === max) {
                    return
                }

                this.setValue((value * 10 + this.item.step * 10) / 10)
            },
            onKeypress($event) {
                let charCode = $event.charCode;

                if (charCode === 46 && this.item.value.toString().indexOf('.') > 0) {
                    $event.preventDefault()
                }

                if(!(charCode >= 48 && charCode <= 57) && charCode !== 46) {
                    $event.preventDefault()
                }
            },
            onInput($event) {
                let value = this.getValue($event.target.value)
                this.setValue(value)
            },
            onChange($event) {
                let value = this.getValue($event.target.value)
                this.setValue(value, 'change')
            },
            getValue(value) {
                let max = this.item.max,
                    min = this.item.min;

                if (value >= max) {
                    return max
                } else if (value <= min) {
                    return min
                } else {
                    return this.item.float
                        ? parseFloat(value)
                        : parseInt(value);
                }
            },
            setValue(value, mode) {

                //this.item.value = this.item.float ? value.toFixed(this.item.precision) : value
                if (mode === 'change') {
                    this.item.value = this.item.float ? value.toFixed(this.item.precision) : value;
                } else {
                    this.item.value = value;
                }

                this.$emit('valid-change')
            }
        }
    }
</script>
<style scoped>
    * {
        outline: none;
    }

    .input-number {
        display: flex;
        margin-top: 7px;
    }

    .minus, .plus{
        background: #7F786E;
        color: #fff;
        padding: 7px;
        border: solid 1px #7F786E;
        cursor: pointer;
        transition: all 0.3s;
    }

    .minus:hover, .plus:hover {
        background: #AFA598;
        border-color: #AFA598;
    }

    .minus {
        border-radius: 4px 0 0 4px;
    }
    .plus {
        border-radius: 0 4px 4px 0;
    }

    input {
        width: 100%;
        padding: 7px 14px;
        border: solid 1px #7F786E;
        border-left: none;
        border-right: none;
        font-size: 14px;
        transition: all 0.3s;
    }
</style>