<template>
    <div>
        <header>Выберите шумность механизма</header>
        <div class="items">
            <div
                    class="item"
                    @click="onItemClick"
                    v-for="type in types"
                    :data-value="type.value"
                    :class="type.value === 'all' ? 'all' : '' "
            >
                <div class="name">{{ type.name }}</div>
                <div class="description">{{ type.description }}</div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        props: {
            movements: Array
        },
        computed: {
            types() {
                let set = new Set();
                let arr = [];

                for (let movement of this.movements) {
                    set.add(movement.noisinesType.name)
                }

                for (let type of set) {
                    if (type === 'Тикающий') {
                        arr.push({
                            name: 'Тикающий',
                            value: 'Тикающий',
                            description: 'Механизм может издавать отчётливый тикающий звук.'
                        })
                    } else if (type === 'Тихий') {
                        arr.push({
                            name: 'Тихий',
                            value: 'Тихий',
                            description: 'Механизм может издавать негромкий звук при работе.'
                        })
                    } else if (type === 'Бесшумный') {
                        arr.push({
                            name: 'Бесшумный',
                            value: 'Бесшумный',
                            description: 'Практически бесшумная работа механизма.'
                        })
                    }
                }

                if (arr.length > 1) {
                    arr.push({
                        name: 'Не имеет значения',
                        value: 'all'
                    });
                }

                return arr;
            }
        },
        methods: {
            onItemClick($event) {
                const target = $event.currentTarget;
                const value = target.dataset.value;

                target.classList.add('active');

                this.$emit('noisiness-chosen', value)
            }
        }
    }
</script>

<style scoped lang="stylus">
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
            flex-basis: 28%;
            padding: 20px;
            border: solid 5px #e19ae5;
            border-radius: 5px;
            margin: 2%;
            cursor: pointer;
            transition: all .2s;
            background: #fff;
            &.all {
                display: flex;
                align-items: center;
                justify-content: center;
            }
            &.active {
                transform: scale(1.2);
                border-color: #916d99;
            }

            .name {
                font-size: 24px;
                font-weight: bold;
                text-align: center;
                @media only screen and (max-width: 800px) {
                    font-size: 20px;
                }
                @media only screen and (max-width: 640px) {
                    font-size: 18px;
                }
            }
            .description {
                text-align: center;
                margin-top: 10px;
                font-size: 18px;
                @media only screen and (max-width: 800px) {
                    font-size: 16px;
                }
                @media only screen and (max-width: 640px) {
                    font-size: 14px;
                }
            }
            @media only screen and (max-width: 800px) {
                padding: 10px;
                border-width: 3px;
                flex-basis: 46%;
            }
            @media only screen and (max-width: 520px) {
                padding: 10px 5px;
                border-width: 2px;
                flex-basis: 44%;
            }
            @media only screen and (max-width: 370px) {
                padding: 5px;
            }
        }
    }

</style>