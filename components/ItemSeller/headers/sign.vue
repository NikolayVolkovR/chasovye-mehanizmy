<template>
    <div class="items-headers">
        <div class="column photo">Фото и артикул</div>
        <div class="column price-cart">
            <div class="prices-root">
                <div class="header">Цена <span class="hint">(в рублях РФ)</span></div>
                <div class="prices">
                    <div class="price">до<br/>10<br/>шт</div>
                    <div class="price">от<br/>10<br/>шт</div>
                    <div class="price">от<br/>100<br/>шт</div>
                    <div class="price">от<br/>500<br/>шт</div>
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
        background: #edead3;
        border-radius: 5px;
        padding: 10px;
        .column {
            display: flex;
            text-align: center;
            align-items: center;
            justify-content: center;
            font-size: 19px;
            font-family: "Alegreya Sans Light";
            color: #4c4c4c;
            transition: all .3s;
            //margin: 0 10px;
        }
        .photo {
            flex-basis: 36%;
        }
        .price-cart {
            display: flex;
            flex-basis: 62%;
            justify-content: space-around;
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
                .prices {
                    display: flex;
                    justify-content: center;
                    font-family: "Century Gothic";
                    font-size: 13px;
                    padding-top: 10px;

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
                            overflow: hidden;
                        }
                        @media only screen and (max-width: 520px) {
                            width: 34px;
                            font-size: 12px;
                        }
                        @media only screen and (max-width: 400px) {
                            width: 30px;
                            font-size: 10px;
                        }
                        @media only screen and (max-width: 360px) {
                            width: 26px;
                            font-size: 9px;
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
                flex-basis: 150px;
                @media only screen and (max-width: 600px) {
                    flex-basis: auto;
                    margin-top: 20px;
                }
            }
            @media only screen and (max-width: 600px) {
                flex-direction: column;
            }
        }

    }

</style>