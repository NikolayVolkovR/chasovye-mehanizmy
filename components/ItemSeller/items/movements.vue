<template>
    <div class="item">
        <div class="column photo-shaft">
            <div class="photo">
                <img :src="item.photos[0].src" />
                <div>{{ item.name }}</div>
            </div>
            <div class="shaft">
                <img v-if="item.shaft.photos[0]" :src="item.shaft.photos[0].src" />
                <div>{{ item.shaft.name }}</div>
                <div>(до {{ item.shaft.max_dial_width }} мм)</div>
            </div>
        </div>
        <div class="column params">
            <clock :type="clockType" :stroke="clockStroke" :size="60" mode="compact"></clock>
            <div class="param"><b>Тип:</b> {{ item.type.name }}</div>
            <div class="param"><b>Ход:</b> {{ item.strokeType.name }}</div>
            <div class="param"><b>Громкость:</b> {{ item.noisinesType.name }}</div>
            <div class="param" v-if="item.accurancy"><b>Точность хода:</b> {{ item.accurancy }}</div>
            <div class="param" v-if="item.life"><b>Срок службы:</b> {{ item.life }} лет</div>
            <div class="param" v-if="item.battery_life"><b>Работа от батарейки:</b> {{ item.battery_life }} мес.</div>
            <div class="param" v-if="item.consumption"><b>Ток потребления:</b> {{ item.consumption }}</div>
            <div class="param" v-if="item.warranty"><b>Гарантия:</b> {{ item.warranty }} мес.</div>
        </div>
        <div class="column prices-cart">
            <div class="prices">
                <div class="prices-wrap">
                    <div class="price" :class="getPriceClass(1)">{{ showPrice(item.price_1) }}</div>
                    <div class="price" :class="getPriceClass(2)">{{ showPrice(item.price_2) }}</div>
                    <div class="price" :class="getPriceClass(3)">{{ showPrice(item.price_3) }}</div>
                    <div class="price" :class="getPriceClass(4)">{{ showPrice(item.price_4) }}</div>
                    <div class="price" :class="getPriceClass(5)">{{ showPrice(item.price_5) }}</div>
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
    import clock from 'Components/clock.vue';
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
            clockType() {
                switch(this.item.type.name) {
                    case 'Стандартный':
                        return 'standard';
                        break;
                    case '24 часа':
                        return '24';
                        break;
                    case 'Усиленный':
                        return 'power';
                        break;
                    case 'Обратный ход':
                        return 'reverse';
                        break;
                    case 'Маятниковый':
                        return 'pendulum';
                        break;
                }
            },
            clockStroke() {
                switch (this.item.strokeType.name) {
                    case 'Плавный':
                        return 'sweep';
                        break;
                    case 'Дискретный':
                        return 'step';
                        break;
                }
            }
        },
        methods: {
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
                        case (cart < 50):
                            qNumber = 1;
                            break;
                        case (cart >= 50 && cart < 100):
                            qNumber = 2;
                            break;
                        case (cart >= 100 && cart < 500):
                            qNumber = 3;
                            break;
                        case (cart >= 500 && cart < 1000):
                            qNumber = 4;
                            break;
                        case (cart >= 1000):
                            qNumber = 5;
                            break;
                    }

                    return qNumber === number ? 'price_active' : '';
                } else {
                    return '';
                }
            }
        },
        components: {clock, cartAddColumn, cartEditColumn}
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

        &.stretched {
            opacity: 0;
            transform: translateY(-5px);
        }

        .column {
            &.photo-shaft {
                display: flex;
                justify-content: space-between;
                align-items: center;
                flex-basis: 27%
                padding-right: 5px;
                .photo {
                    min-width: 60px;
                    font-size: 16px;
                    img {
                        margin-bottom: 10px;
                        max-width: 115px;
                        width: 100%;

                    }

                    @media only screen and (max-width: 650px) {
                        font-size: 14px;
                    }
                    @media only screen and (max-width: 520px) {
                        font-size: 12px;
                    }
                    @media only screen and (max-width: 420px) {
                        font-size: 11px;
                    }
                    @media only screen and (max-width: 380px) {
                        font-size: 10px;
                    }
                }
                .shaft {
                    display: flex;
                    flex-direction: column;
                    align-items: flex-start;
                    justify-content: center;
                    min-width: 100px;
                    img {
                        margin-bottom: 10px;
                        border-radius: 5px;
                        width: 100%;
                    }

                    @media only screen and (max-width: 650px) {
                        font-size: 14px;
                    }
                    @media only screen and (max-width: 600px) {
                        margin-top: 10px;
                    }
                    @media only screen and (max-width: 520px) {
                        font-size: 12px;
                        min-width: 60px;
                    }
                    @media only screen and (max-width: 430px) {
                        font-size: 11px;
                    }
                    @media only screen and (max-width: 380px) {
                        font-size: 10px;
                    }
                }

                @media only screen and (max-width: 1150px) {
                    flex-basis: 32%;
                }
                @media only screen and (max-width: 600px) {
                    flex-direction: column;
                    justify-content: space-between;
                }
            }
            &.params {
                flex-basis: 25%
                font-size: 13px;padding-right: 5px;
                .param {
                    text-align: left;

                }

                @media only screen and (max-width: 1150px) {
                    flex-basis: 32%;
                }
                @media only screen and (max-width: 520px) {
                    font-size: 12px;
                }
                @media only screen and (max-width: 520px) {
                    font-size: 10px;
                }
            }
            &.prices-cart {
                flex-basis: 48%;
                min-width: 48%;
                display: flex
                justify-content: space-between;
                align-items: center;
                .prices {
                    flex-basis: 250px;
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
                        @media only screen and (max-width: 650px) {
                            flex-basis: auto;
                            justify-content: center;
                        }
                    }
                    @media only screen and (max-width: 1150px) {
                        flex-basis: auto;
                        min-width: 250px;
                    }
                    @media only screen and (max-width: 650px) {
                        flex-basis: auto;
                        min-width: auto;
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
                        min-width: 150px;
                    }
                    @media only screen and (max-width: 600px) {
                        margin-top: 20px;
                    }
                    @media only screen and (max-width: 600px) {
                        min-width: auto;
                    }
                }

                @media only screen and (max-width: 1150px) {
                    flex-basis: 32%;
                    min-width: auto;
                    flex-direction: column;
                    justify-content: space-around;
                }
                @media only screen and (max-width: 600px) {
                    justify-content: center;
                }
                @media only screen and (max-width: 360px) {
                    min-width: 130px;
                }
            }

        }
        @media only screen and (max-width: 650px) {
            padding: 10px 0;
        }
    }
</style>