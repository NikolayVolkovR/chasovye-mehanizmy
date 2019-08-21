<template>
    <div>
        <header>Выберите тип механизма</header>
        <div class="items">
            <div
                    class="item"
                    @click="onClick"
                    v-for="type in types"
                    :data-type="type.name"
                    :class="type.name === '24 часа' || type.name === 'Обратный ход' ? 'wider' : ''"
            >
                <clock :type="getType(type.name)"></clock>
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
                for(let movement of this.movements) {
                    set.add(movement.type.name);
                }
                let arr = [];
                if (set.has('Стандартный')) {
                    arr.push({
                        name: 'Стандартный',
                        description: 'Самые обычные механизмы, установленные в большинстве настенных часов.'
                    })
                }
                if (set.has('Усиленный')) {
                    arr.push({
                        name: 'Усиленный',
                        description: 'Для больших часов со стрелками больше 240 мм.'
                    })
                }
                if (set.has('Маятниковый')) {
                    arr.push({
                        name: 'Маятниковый',
                        description: 'Для часов с маятником. Маятник можно установить снизу, сверку и побокам.'
                    })
                }
                if (set.has('24 часа')) {
                    arr.push({
                        name: '24 часа',
                        description: 'Часовая стрелка делает полный оборот за 24 часа. На циферблате при этом можно указать и 9 часов и 21 час.'
                    })
                }
                if (set.has('Обратный ход')) {
                    arr.push({
                        name: 'Обратный ход',
                        description: 'Часы идут в обратном направлениее «против часовой стрелки». И при этом ещё показывают правильное время.'
                    })
                }

                return arr;
            }
        },
        methods: {
            getType(typeName) {
                switch (typeName) {
                    case 'Стандартный':
                        return 'standard';
                        break;
                    case 'Маятниковый':
                        return 'pendulum';
                        break;
                    case 'Усиленный':
                        return 'power';
                        break;
                    case '24 часа':
                        return '24';
                        break;
                    case 'Обратный ход':
                        return 'reverse';
                        break;
                }
            },
            onClick($event) {
                const type = $event.currentTarget.dataset.type;
                $event.currentTarget.classList.add('active')
                this.$emit('type-chosen', type)
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
            padding: 20px;
            border: solid 5px #e19ae5;
            border-radius: 5px;
            cursor: pointer;
            transition: all .2s;
            background: #fff;
            margin: 2%;
            &.wider {
                @media only screen and (max-width: 710px) {
                    flex-basis: 46%;
                }
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
                flex-basis: 28%;
                border-width: 3px;
            }
            @media only screen and (max-width: 640px) {
                padding: 10px 5px;
                border-width: 2px;
            }
            @media only screen and (max-width: 450px) {
                padding: 5px;
                //margin: 5px 0;
                flex-basis: 46%;
                border-width: 2px;
            }
        }
        @media only screen and (max-width: 800px) {
            //justify-content: space-around;
        }
    }


</style>