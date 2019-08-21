<template>
    <div class="items-headers">
        <div class="photo-params">
            <div class="column photo">Фото</div>
            <div class="column params">Параметры</div>
        </div>
        <div class="prices-cart">
            <div class="prices">
                <div class="prices-root">
                    <div class="header">Цена <span class="hint">(в рублях РФ)</span></div>
                    <div class="prices">
                        <div class="price">до<br/>100<br/>шт</div>
                        <div class="price">от<br/>100<br/>шт</div>
                    </div>
                </div>
            </div>
            <div class="column cart">Корзина</div>
        </div>
    </div>
</template>
<script>
    export default {

    }
</script>
<style scoped lang="stylus">
    .items-headers {
        display: flex;
        justify-content: space-between;
        align-items: center;
        background: #edead3;
        border-radius: 5px;
        padding: 10px;

        .column {
            font-size: 19px;
            font-family: "Alegreya Sans Light";
            padding: 5px;
            color: #4c4c4c;
            transition: all .3s;
            text-align: center;
            @media only screen and (max-width: 610px) {
                font-size: 16px;
            }
        }

        .photo-params {
            display: flex;
            flex-basis: 58%;
            justify-content: space-between;
            .photo {
                flex-basis: 45%;
                @media only screen and (max-width: 450px) {
                    flex-basis: auto;
                }
            }
            .params {
                flex-basis: 55%;
                @media only screen and (max-width: 450px) {
                    flex-basis: auto;
                }
            }
            @media only screen and (max-width: 580px) {
                flex-basis: 68%;
            }
            @media only screen and (max-width: 450px) {
                flex-direction: column;
                justify-content: center;
                align-items: center;
            }
        }
        .prices-cart {
            flex-basis: 38%;
            display: flex;
            justify-content: space-between;
            align-items: center;
            .prices {
                flex-basis: 50%;
                display: flex;
                justify-content: center;
                .prices-root {
                    .header {
                        font-family: "Alegreya Sans Light";
                        font-size: 19px;
                        padding-bottom: 5px;
                        border-bottom: solid 1px #8e8d78;
                        text-align: center;
                        .hint {
                            font-family: "Alegreya Sans Light";
                            font-size: 16px;
                            color: #878787;
                        }
                        @media only screen and (max-width: 650px) {
                            font-size: 17px;
                        }
                        @media only screen and (max-width: 600px) {
                            font-size: 15px;
                        }
                        @media only screen and (max-width: 400px) {
                            font-size: 13px;
                        }
                    }
                    >.prices {
                        display: flex;
                        justify-content: center;
                        font-family: "Century Gothic";
                        font-size: 13px;
                        padding-top: 10px;
                        width: 100%;

                        .price {
                            width: 48px;
                            overflow: hidden;
                            flex-grow: 1;
                            text-align: center;
                            border-right: solid 1px #8e8d78;
                            &:last-child {
                                border-right: 0;
                            }
                            @media only screen and (max-width: 650px) {
                                width: 40px;
                            }
                            @media only screen and (max-width: 520px) {
                                width: 34px;
                                ont-size: 12px;
                            }
                            @media only screen and (max-width: 400px) {
                                font-size: 10px;
                                width: 30px;
                            }
                            @media only screen and (max-width: 360px) {
                                font-size: 9px;
                                width: 26px;
                            }
                        }
                        @media only screen and (max-width: 650px) {
                            flex-basis: auto;
                            font-size: 12px;
                            margin-left: 0;
                        }
                    }
                    @media only screen and (max-width: 650px) {
                        min-width: auto;
                    }
                }
                @media only screen and (max-width: 580px) {
                    flex-basis: auto;
                }
            }
            .cart {
                flex-basis: 50%;
                min-width: 140px;
                @media only screen and (max-width: 580px) {
                    display: none;
                }
            }
            @media only screen and (max-width: 580px) {
                flex-direction: column;
                justify-content: center;
                flex-basis: 28%;
                min-width: 110px;
            }
        }
    }
</style>