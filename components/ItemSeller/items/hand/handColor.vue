<template>
    <div
            class="color"
            :class="active ?
            'active' : ''"
            @click="onClick"
    >
        <img :src="src" :title="color"/>
    </div>
</template>
<script>
    export default {
        props: {
            color: String,
            active: Boolean
        },
        computed: {
            src() {
                const basePath = '/images/colors/';
                let fileName = '';

                switch(this.color) {
                    case 'Чёрный':
                        fileName = 'black.svg';
                        break;
                    case 'Золото':
                        fileName = 'gold.svg';
                        break;
                    case 'Серебро':
                        fileName = 'silver.svg';
                        break;
                    case 'Бронза':
                        fileName = 'bronze.svg';
                        break;
                    case 'Белый':
                        fileName = 'white.svg';
                        break;
                    case 'Красный':
                        fileName = 'red.svg';
                        break;
                }

                return basePath + fileName;
            }
        },
        methods: {
            onClick() {
                this.$emit('click')
            }
        }
    }
</script>
<style scoped lang="stylus">
    .color {
        box-sizing: border-box;
        margin: 2px;
        width: 34px;
        height: 34px;
        cursor: pointer;
        padding: 4px;
        border-radius: 5px;
        border: solid 1px transparent;
        transition: all .3s;

        &:hover {
            border: solid 1px #ccc;
        }

        &.active {
            border: solid 1px #666666;
            cursor: default;
        }
        img {
            width: 100%;
        }
    }
</style>