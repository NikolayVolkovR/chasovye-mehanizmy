<template>
    <label for="item"
           :checked="checked"
           :disabled="disabled"
           :style="styles"
           @click="onClick">
        {{ label }}
        <input
                name="item"
                type="checkbox"
        >
    </label>
</template>
<script>
    export default {
        /*created() {
            this.selfChecked = this.checked;;
        },*/
        props: {
            checked: {
                type: Boolean,
                default: false
            },
            disabled: {
                type: Boolean,
                default: false
            },
            label: String,
            styles: Array
        },
        /*data() {
            return {
                selfChecked: false
            }
        },*/
        methods: {
            onClick() {
                if (this.disabled) {
                    return false;
                }
                //this.selfChecked = !this.selfChecked;

                this.$emit('change')
            }
        }
    }
</script>
<style scoped lang="stylus">
    input
    {
        position: absolute;
        left: -9999px;
    }

    label {
        display: flex;
        align-items: flex-end;
        height: 28px;
        position: relative;
        padding-left: 38px;
        line-height: 30px;
        cursor: pointer;
        color: #635D56;

        &:before {
            content: "";
            position: absolute;
            left: 0px;
            top: 0px;
            width: 28px;
            height: 28px;
            border: solid 1px #605B55;
            background-color: #ffffff;
            border-radius: 4px;
        }

        &:after {
            content: "";
            position: absolute;
            -webkit-transition: all 0.3s ease;
            -moz-transition: all 0.3s ease;
            -o-transition: all 0.3s ease;
            transition: all 0.3s ease;
            left: 4px;
            top: 6px;
            width: 18px;
            height: 8px;
            border-radius: 1px;
            border-left: 5px solid #7F786E;
            border-bottom: 5px solid #7F786E;
            -webkit-transform: rotate(-45deg);
            -moz-transform: rotate(-45deg);
            -o-transform: rotate(-45deg);
            -ms-transform: rotate(-45deg);
            transform: translateY(-10px) rotate(-45deg);
            opacity: 0;
        }

        &[checked="checked"]:after {
            opacity: 1;
            transform: rotate(-45deg);
        }

        &[disabled="disabled"] {
            cursor: default;

            &:after {
                border-color: #ADA399;
            }
            &:before {
                background: #efefef;
                border-color: #AAA197;
            }
        }
    }
</style>