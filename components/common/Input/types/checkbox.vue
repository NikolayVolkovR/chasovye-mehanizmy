<template>
    <div>
        <label for="item" @click="onClick" :checked="!checked">
            {{ item.label }}
            <input
                    name="item"
                    type="checkbox"
                    :checked="checked"
                    :disabled="disabled"
            >
        </label>
    </div>
</template>
<script>
    export default {
        props: {
            item: Object,
            disabled: Boolean
        },
        computed: {
            checked() {
                return this.item.value !== 0 ? 'checked' : ''
            }
        },
        methods: {
            onClick() {
                if (this.item.value === 0) {
                    this.item.value = 1;
                } else {
                    this.item.value = 0;
                }

                this.$emit('valid-change')
            }
        }
    }
</script>
<style scoped>
    input
    {
        position: absolute;
        left: -9999px;
    }

    label {
        display: inline-block;
        position: relative;
        padding-left: 38px;
        line-height: 30px;
        cursor: pointer;

        margin-bottom: 21px;
        font-weight: bold;
        color: #635D56;
    }

    label:before {
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

    label:after {
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
        transform: rotate(-45deg);
    }

    label[checked="checked"]:after {
        opacity: 0;
        transform: translateY(-10px) rotate(-45deg);
    }

    label:after {
        opacity: 1;
    }
</style>