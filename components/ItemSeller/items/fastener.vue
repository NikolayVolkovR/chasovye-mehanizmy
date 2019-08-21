<template>
    <div class="item">
        <div class="column photo-description">
            <div class="column photo">
                <img :src="item.photos[0].src" />
                <div>{{ item.name }}</div>
            </div>
            <div class="column description">
                {{ item.description }}
            </div>
        </div>
        <div class="column prices-cart">
            <div class="column prices">
                <div class="prices-wrap">
                    <div class="price">{{ price }}</div>
                </div>
            </div>
            <div class="column cart">
                <cart-add-column
                        v-if="cartMode === 'add' && !isStandardFastener"
                        :quantity="item.quantity"
                        :inputMin="cartMin"
                        :step="cartStep"
                        :inCart="item.cart"
                        :loading="item.loading"
                        @add-to-cart-click="onAddToCartClick"
                />
                <cart-edit-column
                        v-else-if="cartMode === 'edit' && !isStandardFastener"
                        :item="item"
                        :entity="entity"
                        :quantity="item.quantity"
                        :inputMin="0"
                        :step="cartStep"
                        :inCart="item.cart"
                        :loading="item.loading"
                        @save-cart-quantity-click="saveCartQuantityClick"
                />
                <div v-else class="item-editor__standard-fastener">
                    <div class="quantity">{{ item.cart }} шт.</div>
                    Входит в комплект механизма
                </div>
            </div>
        </div>
    </div>
</template>
<script>
    import CartAddColumn from 'Components/ItemSeller/items/columns/cartAdd.vue'
    import CartEditColumn from 'Components/ItemSeller/items/columns/cartEdit.vue'

    export default {
        props: {
            item: Object,
            cartMin: Number,
            cartStep: Number,
            cartMode: String,
            entity: String
        },
        computed: {
            price() {
                return parseFloat(this.item.price)
            },
            isStandardFastener() {
                return this.item.type.slug === 'standard';
            }
        },
        methods: {
            onAddToCartClick(quantity) {
                this.$emit('add-to-cart-click', {itemId: this.item.id, quantity: quantity});
            },
            saveCartQuantityClick(quantity) {
                this.$emit('save-cart-quantity-click', {itemId: this.item.id, quantity: quantity});
            },
        },
        components: {
            CartAddColumn, CartEditColumn
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
            &.photo-description {
                display: flex;
                flex-basis: 66%
                justify-content: space-between;
                align-items: center;
                .photo {
                    text-align: center;
                    flex-basis: 36%;
                    font-size: 16px;
                    img {
                        margin-bottom: 10px;
                        max-width: 100%;
                        @media only screen and (max-width: 610px) {
                            max-width: 100px;
                        }
                    }
                    @media only screen and (max-width: 610px) {
                        font-size: 13px;
                    }
                    @media only screen and (max-width: 400px) {
                        flex-basis: auto;
                        margin: 10px 10px 0;
                    }
                }
                .description {
                    flex-basis: 56%;
                    font-size: 14px;
                    padding-right: 20px;
                    margin: 0 20px;
                    .param {
                        text-align: left;
                    }
                    @media only screen and (max-width: 610px) {
                        font-size: 12px;
                    }
                    @media only screen and (max-width: 400px) {
                        flex-basis: auto;
                        text-align: center;
                        padding: 0;
                        margin: 10px 10px 0;
                    }
                }
                @media only screen and (max-width: 610px) {
                    flex-direction: column
                }
            }
            &.prices-cart {
                display: flex;
                flex-basis: 34%;
                justify-content: space-between;
                align-items: center;
                .prices {
                    flex-basis: 50%;
                    text-align: center;
                    margin: 0 15px;
                    .prices-wrap {
                        display: flex;
                        justify-content: center;
                        text-align: center;
                        .price {
                            flex-basis: 48px;
                            overflow: hidden;
                            font-family: "Century Gothic";
                            font-size: 17px;
                            color: #567f96;
                            border-right: solid 1px #bfbda3;
                            border-left: solid 1px #bfbda3;
                            padding: 12px;
                        }
                    }
                    @media only screen and (max-width: 610px) {
                        flex-basis: auto;
                    }
                }
                .cart {
                    flex-basis: 150px;
                    @media only screen and (max-width: 400px) {
                        margin-top: 20px;
                        flex-basis: auto;
                    }
                }
                @media only screen and (max-width: 610px) {
                    flex-direction: column;
                    justify-content: center;
                }
            }
            .item-editor__standard-fastener {
                text-align: center;
                .quantity {
                    font-size: 18px;
                    margin-bottom: 10px;
                    color: #777;
                }
            }
        }
    }
</style>