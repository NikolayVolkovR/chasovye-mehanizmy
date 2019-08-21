<template>
    <div>
        <header>Нужна ли фигурная гайка?</header>
        <div class="items">
            <div
                    class="item"
                    @click="onItemClick"
                    v-for="type in types"
                    :data-value="type.value"
            >
                <div class="name">{{ type.value }}</div>
            </div>
        </div>
        <div class="text">
            <header>Фигурная гайка применяется по двум причинам:</header>
            <ol>
                <li>
                    Некоторые люди находят её внешний вид более аккуратным. Действительно,
                    она выглядит компактнее, чем стандартная шайба с гайкой.
                </li>
                <li>
                    Фигурная гайка позволяет "нарастить" высоту резьбовой части на 1-2 мм.
                    Это становится актуальным, когда по каким-то причинам этих миллиметров не хватает.
                    Например, нет механизма с подходящей высотой резьбы.
                </li>
            </ol>
            <div class="image">
                <img src="/images/choose-movements/nut.png" />
            </div>
            <p>
                Как видно на рисунке, толщина циферблата при использовании фигурной гайки
                (справа) может быть больше, чем при использовании обычной гайки при установке на
                механизм с одинаковой высотой резьбы. Единственным ограничением на величину
                "наращивания" является посадка часовой стрелки - необходимо, чтобы фигурная
                гайка не мешала вращению стрелки.
            </p>
            <div class="attention-hint">
                <div class="exclamation">!</div>
                Диаметр отверстия в циферблате под фигурную гайку = 9 мм (на 1 мм больше, чем под обычную гайку),
                т.к. она углубляется в циферблат.
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
                let arr = [];

                arr.push({
                    value: 'Да'
                });
                arr.push({
                    value: 'Нет'
                });

                return arr;
            }
        },
        methods: {
            onItemClick($event) {
                const target = $event.currentTarget;
                const value = target.dataset.value;

                target.classList.add('active');

                this.$emit('nut-chosen', value)
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
            text-align: center;
            flex-basis: 28%;
            padding: 20px;
            border: solid 5px #e19ae5;
            border-radius: 5px;
            margin: 2%;
            cursor: pointer;
            transition: all .2s;
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
                    font-size: 20px;
                }
                @media only screen and (max-width: 640px) {
                    font-size: 18px;
                }
            }

            @media only screen and (max-width: 920px) {
                padding: 10px;
                border-width: 3px;
            }
            @media only screen and (max-width: 600px) {
                border-width: 2px;
            }
            @media only screen and (max-width: 440px) {
                flex-basis: 42%;
            }
        }
    }

    .text {
        font-size: 17px;
        max-width: 620px;
        margin: 0 auto;

        @media only screen and (max-width: 700px) {
            margin: 3%;
            width: 97%;
        }

        header {
            font-size: 24px;
            font-family: "Alegreya Sans Light";
        }

        ol {
            padding: 0;
            padding-left: 20px;
            margin-top: 20px;

            li {
                margin-top: 20px;
            }
        }
        .attention-hint {
            border: solid 2px #b3b3b3;
            border-radius: 10px;
            padding: 20px;
            max-width: 440px;
            position: relative;
            margin:50px auto 0;

            @media only screen and (max-width: 500px) {
                width: 80%
            }

            .exclamation {
                display: flex;
                align-items: center;
                justify-content: center;
                position: absolute;
                top: -20px;
                left: -20px;
                border: solid 2px #b3b3b3;
                border-radius: 50%;
                color: #9e0000;
                width: 40px;
                height: 40px;
                font-family: "Century Gothic";
                font-size: 26px;
                font-weight: bold;
                background: #fff;
            }
        }
        .image {
            width: 90%;
            max-width: 689px;
            margin: 40px auto;

            img {
                width: 100%;
            }
        }
    }
</style>