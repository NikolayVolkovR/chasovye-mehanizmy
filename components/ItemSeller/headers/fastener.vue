<template>
    <div class="items-headers">
        <div class="photo-description">
            <div class="column photo">Фото и название</div>
            <div class="column description">Описание</div>
        </div>
        <div class="price-cart">
            <div class="column price">Цена<br/><span class="hint">(в рублях РФ)</span></div>
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

        .column {
            font-size: 19px;
            font-family: "Alegreya Sans Light";
            padding: 5px;
            color: #4c4c4c;
            transition: all .3s;
            @media only screen and (max-width: 610px) {
                font-size: 16px;
            }
        }
        .small {
            font-family: "Alegreya Sans Light";
            font-size: 14px;
            color: red;
        }
        .photo-description {
            flex-basis: 66%;
            display: flex;
            justify-content: space-between;
            .photo {
                flex-basis: 50%;
                text-align: center;
            }
            .description {
                flex-basis: 50%;
                text-align: center;
            }
            @media only screen and (max-width: 400px) {
                flex-direction: column;
            }
        }
        .price-cart {
            flex-basis: 34%;
            display: flex;
            justify-content: space-between;
            align-items: center;
            .price {
                flex-basis: 50%;
                text-align: center;
                .hint {
                    font-family: "Alegreya Sans Light";
                    font-size: 16px;
                    color: #878787;
                }
                @media only screen and (max-width: 610px) {
                    flex-basis: auto;
                }
            }
            .cart {
                flex-basis: 150px;
                text-align: center;
                @media only screen and (max-width: 610px) {
                    flex-basis: auto;
                }
            }
            @media only screen and (max-width: 610px) {
                flex-direction: column;
            }

        }


    }
</style>