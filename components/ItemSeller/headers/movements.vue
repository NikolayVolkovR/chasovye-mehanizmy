<template>
    <div class="items-headers">
        <div class="column photo-shaft">
            <div class="column photo">Фото и арти&shy;кул</div>
            <div class="column shaft">Шток и тол&shy;щина цифер&shy;блата</div>
        </div>
        <div class="column params">Пара&shy;метры</div>
        <div class="column prices-cart">
            <div class="prices-root">
                <div class="header">Цена <span class="hint">(в рублях РФ)</span></div>
                <div class="prices">
                    <div class="price">10-<br/>40<br/>шт</div>
                    <div class="price">от<br/>50<br/>шт</div>
                    <div class="price">от<br/>100<br/>шт</div>
                    <div class="price">от<br/>500<br/>шт</div>
                    <div class="price">от<br/>1000<br/>шт</div>
                </div>
            </div>
            <div class="column cart">Корзина</div>
        </div>
    </div>
</template>
<script>
    export default {
        props: {
            items: Array
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
            text-align: center;
            align-items: center;
            justify-content: center;
            font-size: 19px;
            font-family: "Alegreya Sans Light";
            color: #4c4c4c;
            transition: all .3s;
            margin: 10px;

            .small {
                font-family: "Alegreya Sans Light";
                font-size: 14px;
                color: red;
            }

            &.photo-shaft {
                flex-basis: 27%;
                justify-content: space-between;
                .photo {

                }
                .shaft {

                }
                @media only screen and (max-width: 600px) {
                    flex-direction: column;
                }
            }
            &.params {
                flex-basis: 27%;
                min-width: 80px;
                @media only screen and (max-width: 400px) {
                    min-width: 70px;
                }
            }
            &.prices-cart {
                flex-basis: 48%;
                min-width: 48%;
                justify-content: space-between;
                .prices-root {
                    min-width: 250px;
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
                    .prices {
                        display: flex;
                        justify-content: space-between;
                        font-family: "Century Gothic";
                        font-size: 13px;
                        padding-top: 10px;
                        flex-basis: 250px;
                        overflow: hidden;
                        margin-left: 5px;

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
                .cart {
                    min-width: 150px;

                    @media only screen and (max-width: 1150px) {
                        display: none;
                    }
                }

                @media only screen and (max-width: 1150px) {
                    justify-content: center;
                    flex-basis: 32%;
                    min-width: auto;
                }
            }

            @media only screen and (max-width: 650px) {
                font-size: 17px;
            }
            @media only screen and (max-width: 600px) {
                font-size: 15px;
            }
            @media only screen and (max-width: 430px) {
                margin: 5px;
            }
            @media only screen and (max-width: 400px) {
                font-size: 13px;
            }
        }
    }
</style>