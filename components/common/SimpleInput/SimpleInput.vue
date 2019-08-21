<template>
    <label
            :style="labelStyle">{{ label }}
        <input
                @keypress="onKeypress"
                @keyup="onKeyup"
                type="text"
                :value="innerValue"
                :style="inputStyle"
        />
    </label>
</template>
<script>
    export default {
        created () {
            this.innerValue = this.value;
        },
        props: {
            label: String,
            labelStyle: Object,
            value: [String, Number],
            inputStyle: Object,
            mode: {
                type: String,
                default: 'integer'
            },
            minValue: Number,
            maxValue: Number,
            index: {
                type: Number,
                default: 0
            }
        },
        data() {
            return {
                innerValue: null
            }
        },
        methods: {
            onKeypress($event) {
                const keyCode = $event.keyCode;

                if (this.mode === 'integer') {
                    if ((keyCode > 31 && (keyCode < 48 || keyCode > 57)) && keyCode !== 46) {
                        $event.preventDefault();
                    } else {
                        return true;
                    }
                }
            },
            onKeyup($event) {
                const value = $event.target.value;
            }
        }
    }
</script>
<style scoped lang="stylus">

</style>