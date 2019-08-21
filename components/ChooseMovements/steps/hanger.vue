<template>
    <div>
        <header>Нужна петля для подвешивания?</header>
        <div class="items">
            <div
                    class="item"
                    @click="onItemClick"
                    v-for="type in types"
                    :data-value="type.value"
            >
                <div class="name">{{ type.name }}</div>
                <div class="description">{{ type.description }}</div>
                <div v-if="type.value === 'plastic'" class="image">
                    <img src="/images/choose-movements/hanger-plastic.jpg" />
                </div>
                <div v-else-if="type.value === 'metal'" class="image">
                    <img src="/images/choose-movements/hanger-metal.jpg" />
                </div>
                <div v-else="type.value === 'no'" class="image">
                    <img src="/images/choose-movements/hanger-no.jpg" />
                </div>
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
                    set.add(movement.plastic_hanger)
                }

                if (set.has(1)) {
                    arr.push({
                        name: 'Пластиковая петля',
                        value: 'plastic',
                        description: 'Является частью корпуса. Рассчитана на вес часов до 5 кг.'
                    })
                }

                if (set.has(0)) {
                    arr.push({
                        name: 'Металлическая петля',
                        value: 'metal',
                        description: 'Рассчитана на часы весом до 10 кг.'
                    });

                    arr.push({
                        name: 'Не нужна',
                        value: 'no',
                        description: ''
                    })
                }

                return arr;
            }
        },
        methods: {
            onItemClick($event) {
                const target = $event.currentTarget;
                const value = target.dataset.value;

                target.classList.add('active');

                this.$emit('hanger-chosen', value)
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
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            flex-basis: 28%;
            margin: 2%;
            padding: 20px 20px 0;
            border: solid 5px #e19ae5;
            border-radius: 5px;
            cursor: pointer;
            transition: all .2s;
            background: #fff;
            box-sizing: border-box;
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

            .image {
                margin: 5px auto -5px;
                max-width: 173px;
                img {
                    width: 100%;
                }
            }
            @media only screen and (max-width: 920px) {
                padding: 10px 10px 0;
                border-width: 3px;
            }
            @media only screen and (max-width: 600px) {
                flex-basis: 44%;
                border-width: 2px;
            }
            @media only screen and (max-width: 440px) {
                flex-basis: 42%;
                margin: 1%;
            }
        }
    }

</style>