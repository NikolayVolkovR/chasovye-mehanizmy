<template>
    <div
            class="menu-item"
            :class="className"
            @click="onClick"
    >
        <div class="label">{{ step.label }}</div>
        <div class="sub-label">{{ step.subLabel }}</div>
    </div>
</template>

<script>
    export default {
        props: {
            step: Object,
            index: Number,
            activeStep: Number
        },
        computed: {
            className() {
                if (this.index < this.activeStep) {
                    return 'past'
                } else if (this.index === this.activeStep) {
                    return 'active'
                } else {
                    return '';
                }
            }
        },
        methods: {
            onClick($event) {
                if (this.index < this.activeStep) {
                    this.$emit('menu-item-click', this.index)
                }
            }
        }
    }
</script>

<style scoped lang="stylus">
    .menu-item {
        flex-basis: 14.2%;
        padding: 0 7px;

        @media only screen and (max-width: 840px) {
            flex-basis: 25%;
            margin-bottom: 25px;
        }

        @media only screen and (max-width: 600px) {
            flex-basis: 30%;
        }

        &.active {
            font-weight: bold;

            .label{
                border-color: #916d99;
            }
        }

        &.past {
            cursor: pointer;

            .label {
                border-color: #d99be0;
            }
        }

        .label {
            text-align: center;
            color: #7f786e;
            font-size: 18px;
            padding-bottom: 5px;
            border-bottom: solid 5px #dfd5e0;
            transition: all .3s;

            @media only screen and (max-width: 800px) {
                font-size: 16px;
            }
            @media only screen and (max-width: 640px) {
                font-size: 14px;
            }
        }

        .sub-label {
            text-align: center;
            color: #7f786e;
            font-size: 18px;
            padding-top: 5px;
            @media only screen and (max-width: 800px) {
                font-size: 16px;
            }
            @media only screen and (max-width: 640px) {
                font-size: 14px;
            }
        }
    }
</style>
