<template>
    <div class="item">
        <div class="photo-article">
            <div class="photo"><img :src="item.photos[0].src" /></div>
            <div class="article">{{ article }}</div>
        </div>
        <div class="prices-cart">
            <div class="prices">
                <div class="prices-wrap">
                    <div class="price" :class="getPriceClass(1)">{{ showPrice(item.price_1) }}</div>
                    <div class="price" :class="getPriceClass(2)">{{ showPrice(item.price_2) }}</div>
                    <div class="price" :class="getPriceClass(3)">{{ showPrice(item.price_3) }}</div>
                    <div class="price" :class="getPriceClass(4)">{{ showPrice(item.price_4) }}</div>
                </div>
            </div>
            <div class="cart">
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
        computed: {
            article() {
                let article = this.item.type.name
                    + ' ' + this.item.size + 'мм'
                    + ' ' + this.item.material.name;

                if (this.item.material.name !== 'Дерево') {
                    article += ' ' + this.item.color.name;
                }
                return article;
            }
        },methods: {
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
                        case (cart < 10):
                            qNumber = 1;
                            break;
                        case (cart >= 10 && cart < 100):
                            qNumber = 2;
                            break;
                        case (cart >= 100 && cart < 500):
                            qNumber = 3;
                            break;
                        case (cart >= 500):
                            qNumber = 4;
                            break;
                    }

                    return qNumber === number ? 'price_active' : '';
                } else {
                    return '';
                }
            }
        },
        components: {
            cartAddColumn,
            cartEditColumn
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

        .photo-article {
            flex-basis: 36%;
            .photo {
                text-align: center;
                img {
                    width: 100%;
                    max-width: 200px;
                }
            }
            .article {
                margin-top: 10px;
                text-align: center;
                @media only screen and (max-width: 650px) {
                    font-size: 13px;
                }
                @media only screen and (max-width: 400px) {
                    font-size: 12px;
                }
            }
        }
        .prices-cart {
            display: flex;
            flex-basis: 62%;
            justify-content: space-around;
            align-items: center;
            .prices {
                margin-left: 10px;
                .prices-wrap {
                    display: flex;
                    justify-content: center;
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
                @media only screen and (max-width: 650px) {
                    margin-right: 10px;
                }
                @media only screen and (max-width: 420px) {
                    margin-right: 5px;
                }
            }
            .cart {
                flex-basis: 150px;
                @media only screen and (max-width: 1150px) {
                    flex-basis: auto;
                    //min-width: 150px;
                }
                @media only screen and (max-width: 600px) {
                    flex-basis: auto;
                    margin-top: 20px;
                }
            }
            @media only screen and (max-width: 600px) {
                flex-direction: column;
                justify-content: center;
            }
        }

    }
</style>