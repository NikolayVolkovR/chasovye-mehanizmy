<template>
    <div class="make-order__menu">
        <div
                v-for="item, index in steps"
                v-if="index <= 2"
                class="menu-item"
                :class="itemClass(index)"
                @click="onClick(index)"
        >
            <div class="menu-item__step">Шаг {{ index + 1 }}</div>
            <div class="menu-item__name">{{ item.label }}</div>
        </div>
    </div>
</template>
<script>
    export default {
        props: {
            step: Number,
            steps: Array
        },
        data() {
            return {

            }
        },
        computed: {
            itemClass() {
                return index => {
                    let classList = [];

                    if (index === this.step) {
                        classList.push('menu-item_active')
                    }

                    if (index <= this.step - 1) {
                        classList.push('menu-item_clickable')
                    }

                    return classList;
                }
            }
        },
        methods: {
            onClick(index) {
                if (index <= this.step - 1) {
                    this.$emit('menu-item-click', index)
                }
            }
        }
    }
</script>
<style lang="stylus">
    .make-order__menu {
        display: flex;
        justify-content: center;

        .menu-item {
            margin: 0 10px;
            color: #7f786e;
            transition: all 1s;
            .menu-item__step {
                text-align: center;
                font-family: "Alegreya Sans";
                font-size: 18px;
                border-bottom: solid 5px #dfd5e0;
                padding: 0 20px 5px;
                transition: all 1s;
            }
            .menu-item__name {
                text-align: center;
                font-family: "Alegreya Sans";
                font-size: 18px;
                padding: 5px 20px 0;
                transition: all 1s;
            }
            &.menu-item_active {
                .menu-item__step {
                    border-color: #916d99;
                    font-weight: bold;
                }
                .menu-item__name {
                    font-weight: bold;
                }
            }
            &.menu-item_clickable {
                cursor: pointer;
                .menu-item__step {
                    border-color: #d99be0;
                }
                &:hover {
                    transform: scale(1.1);
                }
            }
        }
    }
</style>