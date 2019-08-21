<template>
    <div class="item">
        <div class="photo-params">
            <div class="column photo">
                <img :src="item.photos[0].src" />
                <div class="name">{{ item.name }}</div>
            </div>
            <div class="column params">
                <div class="param"><b>Внешний Ø:</b> {{ item.diam_out }} мм</div>
                <div class="param"><b>Внутренний Ø:</b> {{ item.diam_in }} мм</div>
                <div class="param"><b>Материал:</b> {{ item.material.name }}</div>
                <div class="param"><b>Цвет:</b> {{ item.color.name }}</div>
                <div class="param"><b>Циферблат:</b> {{ item.dial.name }}</div>
                <div class="param"><b>Общая толщина:</b> {{ toIntegerIfPossible(item.thickness) }} мм</div>
                <div class="param"><b>Глубина посадки:</b> {{ item.depth }} мм</div>
            </div>
        </div>
        <div class="prices-cart">
            <div class="column prices">
                <div class="prices-wrap">
                    <div class="price" :class="getPriceClass(1)">{{ showPrice(item.price_1) }}</div>
                    <div class="price" :class="getPriceClass(2)">{{ showPrice(item.price_2) }}</div>
                </div>
            </div>
            <div class="column cart">
                <cart-add-column
                        v-if="cartMode === 'add'"
                        :quantity="item.quantity"
                        :inputMin="cartMin"
                        :step="cartStep"
                        :inCart="item.cart"
                        :loading="item.loading"
                        @add-to-cart-click="onAddToCartClick"
                />
                <cart-edit-column
                        v-else-if="cartMode === 'edit'"
                        :item="item"
                        :entity="entity"
                        :quantity="item.quantity"
                        :inputMin="0"
                        :step="cartStep"
                        :inCart="item.cart"
                        :loading="item.loading"
                        @save-cart-quantity-click="saveCartQuantityClick"
                />
            </div>
        </div>
    </div>
</template>
<script>
    import cartAddColumn from 'Components/ItemSeller/items/columns/cartAdd.vue'
    import cartEditColumn from 'Components/ItemSeller/items/columns/cartEdit.vue'

    export default {
        props: {
            item: Object,
            cartMin: Number,
            cartStep: Number,
            cartMode: String,
            entity: String
        },
        components: {
            cartAddColumn, cartEditColumn
        },
        methods: {
            toIntegerIfPossible(value) {
                if (parseInt(value.split('.')[1]) > 0) {
                    return parseFloat(value)
                } else {
                    return parseInt(value)
                }
            },
            showPrice(price) {
                return parseFloat(price)
            },
            onAddToCartClick(quantity) {
                this.$emit('add-to-cart-click', {itemId: this.item.id, quantity: quantity});
            },
            saveCartQuantityClick(quantity) {
                this.$emit('save-cart-quantity-click', {itemId: this.item.id, quantity: quantity});
            },
            getPriceClass(number) {
                if (this.cartMode === 'edit') {
                    let qNumber;
                    const cart = this.item.cart;

                    switch (true) {
                        case (cart < 100):
                            qNumber = 1;
                            break;
                        case (cart >= 100):
                            qNumber = 2;
                            break;
                    }

                    return qNumber === number ? 'price_active' : '';
                } else {
                    return '';
                }
            }
        }
    }
</script>
<style scoped lang="stylus">
    .item {
        box-sizing: border-box;
        display: flex;
        justify-content: space-between;
        align-items: stretch;
        color: #4d4d4d;
        font-size: 14px;
        transition: all .3s;
        border-bottom: solid 1px #bfbcb0;
        padding: 20px 0;

        .column {
            text-align: center;
            padding: 0 10px
        }
        .photo-params {
            flex-basis: 58%;
            display: flex;
            justify-content: space-between;
            .photo {
                flex-basis: 45%;
                img {
                    width: 100%;
                    max-width: 150px;
                }
                .name {
                    margin-top: 10px;
                    @media only screen and (max-width: 610px) {
                        font-size: 13px;
                    }
                    @media only screen and (max-width: 450px) {
                        font-size: 12px;
                    }
                }
                @media only screen and (max-width: 450px) {
                    flex-basis: auto;
                }
            }
            .params {
                flex-basis: 55%;
                display: flex;
                flex-direction: column;
                justify-content: center;
                .param {
                    margin: 2px 0
                    text-align: left;
                    font-size: 13px;
                    @media only screen and (max-width: 610px) {
                        font-size: 12px;
                    }
                    @media only screen and (max-width: 450px) {
                        font-size: 11px;
                    }
                }
                @media only screen and (max-width: 450px) {
                    flex-basis: auto;
                    margin-top: 10px;
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
                .prices-wrap {
                    display: flex;
                    text-align: center;
                    .price {
                        width: 48px;
                        overflow: hidden;
                        font-family: "Century Gothic";
                        font-size: 17px;
                        color: #567f96;
                        border-right: solid 1px #bfbda3;
                        padding: 12px 0;
                        transition: all .3s;
                        &:first-child {
                            border-left: solid 1px #bfbda3;
                        }
                        &.price_active {
                            background: #567f96;
                            color: #fff;
                        }
                        @media only screen and (max-width: 650px) {
                            width: 40px;
                            font-size: 14px;
                        }
                        @media only screen and (max-width: 520px) {
                            width: 34px;
                            font-size: 13px;
                        }
                        @media only screen and (max-width: 400px) {
                            width: 30px;
                            font-size: 11px;
                        }
                        @media only screen and (max-width: 360px) {
                            font-size: 10px;
                            width: 26px;
                        }
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
                    flex-basis: auto;
                    margin-top: 20px;
                }
            }
            @media only screen and (max-width: 580px) {
                flex-direction: column;
                justify-content: center;
                flex-basis: 28%;
                min-width: 110px;
                margin-right: 5px;
            }
        }
    }
</style>