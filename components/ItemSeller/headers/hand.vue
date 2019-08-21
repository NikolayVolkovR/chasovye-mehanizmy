<template>
    <div class="items-headers" :class="headersClass">
        <div class="column params-photo">
            <div class="column params">Пара&shy;метры</div>
            <div class="column photo">Фото и цвета</div>
        </div>
        <div class="column price-cart">
            <div class="column price">
                Цена <span class="hint">(в рублях РФ)</span>
                <div class="values">
                    <div>по 10 шт</div>
                    <div>по 100 шт</div>
                </div>
            </div>
            <div class="column cart">Корзина</div>
        </div>
    </div>
</template>
<script>
    export default {
        props: {
            tryOn: {
                type: Boolean,
                default: false
            }
        },
        computed: {
            headersClass() {
                if (this.tryOn) {
                    return 'try-on'
                } else {
                    return ''
                }
            }
        }
    }
</script>
<style scoped lang="stylus">
    .items-headers {
        display: flex;
        justify-content: space-between;
        background: #edead3;
        border-radius: 5px;

        .column {
            display: flex;
            justify-content: center;
            align-items: center;
            font-size: 19px;
            font-family: "Alegreya Sans Light";
            padding: 5px;
            color: #4c4c4c;
            transition: all .3s;
            text-align: center;

            &.params-photo {
                display: flex;
                flex-basis: 60%;
                justify-content: space-between;
                .params {
                    flex-basis: 50%;
                }
                .photo {
                    flex-basis: 50%;
                    //margin-left: 10px;
                }


                @media only screen and (max-width: 410px) {
                    flex-direction: column;
                }
            }
            &.price-cart {
                display: flex;
                flex-basis: 40%;
                justify-content: space-between;

                @media only screen and (max-width: 650px) {
                    flex-direction: column;
                }
                @media only screen and (max-width: 520px) {
                    flex-basis: 32%;
                }

                .price {
                    display: block;
                    text-align: center;
                    width: 180px;
                    overflow: hidden;

                    .hint {
                        font-family: "Alegreya Sans Light";
                        font-size: 16px;
                        color: #878787;
                    }

                    .values {
                        display: flex;
                        border-top: solid 1px #8e8d78;
                        padding-top: 5px;
                        margin-top: 5px;
                        div {
                            flex-basis: 50%;
                            font-size: 19px;

                            color: #4c4c4c;
                            font-family: "Alegreya Sans Light";

                            @media only screen and (max-width: 520px) {
                                font-size: 16px;
                            }
                        }
                    }

                    @media only screen and (max-width: 520px) {
                        width: 110px
                    }
                }
                .cart {
                    width: 140px;
                    @media only screen and (max-width: 520px) {
                        width: 110px
                    }
                }
            }

            @media only screen and (max-width: 610px) {
                font-size: 16px;
            }
        }

        &.try-on {
            .params {
                //width: 320px;
            }
        }
    }
</style>