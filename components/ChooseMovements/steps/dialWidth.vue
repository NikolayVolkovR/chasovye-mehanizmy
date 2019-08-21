<template>
    <div>
        <header>Выберите толщину циферблата</header>
        <div class="items">
            <div
                    class="item"
                    @click="onItemClick"
                    v-for="type in widthTypes"
                    :data-value="type.value"
            >
                <div class="name">{{ type.name }}</div>
            </div>
        </div>

        <app-image
                :maxWidth="610"
                :marginTop="30"
                src="/images/choose-movements/dial-width.png"
        ></app-image>
    </div>
</template>

<script>
    import appImage from 'Root/components/image.vue'

    export default {
        props: {
            movements: Array
        },
        computed: {
            availableTypes() {
                let widthTypes = new Set();
                for (let movement of this.movements) {
                    widthTypes.add(movement.shaft.max_dial_width)
                }
                return widthTypes;
            },
            widthTypes() {
                let set = new Set();
                let types = [];

                for (let type of this.availableTypes) {
                    if (type === 3 || type === 4) {
                        set.add('Менее 4 мм')
                    } else if (type === 7) {
                        set.add('От 4 до 7 мм')
                    } else if (type === 10) {
                        set.add('От 7 до 10 мм')
                    } else if (type === 12) {
                        set.add('От 10 до 12 мм')
                    } else if (type === 16) {
                        set.add('От 12 до 16 мм')
                    } else if (type === 22) {
                        set.add('От 16 до 22 мм')
                    }
                }

                for (let type of set) {
                    if (type === 'Менее 4 мм') {
                        types.push({name: 'Менее 4 мм', value: 4})
                    } else if (type === 'От 4 до 7 мм') {
                        types.push({name: 'От 4 до 7 мм', value: 7})
                    } else if (type === 'От 7 до 10 мм') {
                        types.push({name: 'От 7 до 10 мм', value: 10})
                    } else if (type === 'От 10 до 12 мм') {
                        types.push({name: 'От 10 до 12 мм', value: 12})
                    } else if (type === 'От 12 до 16 мм') {
                        types.push({name: 'От 12 до 16 мм', value: 16})
                    } else if (type === 'От 16 до 22 мм') {
                        types.push({name: 'От 16 до 22 мм', value: 22})
                    }
                }

                if (types.length > 1) {
                    types.push({name: 'Не имеет значения', value: 'all'});
                }

                return types;
            }
        },
        methods: {
            onItemClick($event) {
                const target = $event.currentTarget;
                const width = target.dataset.value;

                target.classList.add('active');

                this.$emit('dial-width-chosen', width)
            }
        },
        components: {appImage}
    }
</script>

<style lang="stylus" scoped>
    * {
        font-family: "Alegreya Sans";
        color: #333;
        box-sizing: border-box;
    }
    header {
        margin: 60px 0 20px;
        font-size: 30px;
        font-weight: bold;
        text-align: center;
        @media only screen and (max-width: 800px) {
            margin-top: 20px;
        }
    }

    .items {
        display: flex;
        justify-content: center;
        flex-wrap: wrap;
        .item {
            display: flex;
            align-items: center;
            justify-content: center;
            flex-basis: 20%;
            margin: 1%;
            padding: 20px;
            border: solid 5px #e19ae5;
            border-radius: 5px;
            cursor: pointer;
            transition: all 0.2s;
            background: #fff;
            &.active {
                transform: scale(1.2);
                border-color: #916d99;
            }

            .name {
                font-size: 24px;
                font-weight: bold;
                text-align: center;
                @media only screen and (max-width: 800px) {
                    font-size: 18px;
                }
                @media only screen and (max-width: 640px) {
                    font-size: 16px;
                }
            }
            @media only screen and (max-width: 800px) {
                padding: 10px;
                flex-basis: 30%;
                border-width: 3px;
            }
            @media only screen and (max-width: 460px) {
                padding: 10px 5px;
                border-width: 2px;
            }
            @media only screen and (max-width: 360px) {

            }
        }

        @media only screen and (max-width: 800px) {
            justify-content: space-around;
        }
    }

    .image {
        margin: 30px auto 0;
        max-width: 610px;

        @media only screen and (max-width: 700px) {
            //margin: 30px 20px 0;
            width: 90%;
        }

        img {
            width: 100%;
        }
    }
</style>