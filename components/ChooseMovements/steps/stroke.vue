<template>
    <div>
        <header>Выберите ход секундной стрелки</header>
        <div class="items">
            <div
                    class="item"
                    @click="onItemClick"
                    v-for="type in types"
                    :data-value="type.value"
                    :class="type.value === 'all' ? 'all' : '' "
            >
                <clock :stroke="type.clockValue" v-if="type.value !== 'all'"></clock>
                <div class="name">{{ type.name }}</div>
                <div class="description">{{ type.description }}</div>
            </div>
        </div>
    </div>
</template>

<script>
    import clock from '../../clock.vue'

    export default {
        props: {
            movements: Array
        },
        computed: {
            types() {
                let set = new Set();
                let arr = [];

                for (let movement of this.movements) {
                    set.add(movement.strokeType.name)
                }

                for (let type of set) {
                    if (type === 'Дискретный') {
                        arr.push({
                            name: 'Дискретный',
                            value: 'Дискретный',
                            description: 'Секундная стрелка делает 60 тактов в минуту. ' +
                            'Плюсом является более низкий расход батарейки и более низкая цена.',
                            clockValue: 'step'
                        })
                    } else if (type === 'Плавный') {
                        arr.push({
                            name: 'Плавный',
                            value: 'Плавный',
                            description: 'Секундная стрелка делает 360 тактов в минуту, что ' +
                            'создаёт эффект «плывущей стрелки»',
                            clockValue: 'sweep'
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

                this.$emit('stroke-chosen', value)
            }
        },
        components: {clock}
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
            margin: 2%;
            padding: 20px;
            border: solid 5px #e19ae5;
            border-radius: 5px;
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
                flex-basis: 46%;
                border-width: 3px;
            }
            @media only screen and (max-width: 540px) {
                padding: 10px 5px;
                border-width: 2px;
            }
            @media only screen and (max-width: 340px) {
                padding: 5px;
            }
        }
    }

</style>