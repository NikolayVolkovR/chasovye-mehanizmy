<template>
    <div v-if="activeItem.type.slug !== 'second'">
        <div class="item">
            <div class="column params-photo">
                <div class="params" :class="paramsClass">
                    <div class="params__main">
                        <div class="param"><b>Размер:</b> {{ size }} <span class="small">мм</span></div>
                        <div class="param"><b>Арт:</b> {{ article }}</div>
                        <div class="param" :class="shaftClass"><b>Шток:</b> {{ shaft }}</div>
                    </div>
                    <div class="params__additional">
                        <div class="param">Профиль: {{ profile }}</div>
                        <div class="param">Плёнка: {{ film }}</div>
                        <div class="param">Толщина: {{ thickness }}</div>
                    </div>
                </div>
                <div class="photo">
                    <div class="img-wrap">
                        <img :src="mainPhotoSrc" />
                    </div>
                    <div class="colors" v-if="!tryOn">
                        <hand-color
                                v-for="color, index in colors"
                                :key="color.name"
                                :color="color.name"
                                :active="index === activeItemIndex"
                                @click="onColorClick(index)"
                        ></hand-color>
                    </div>
                </div>
            </div>
            <div class="column prices-cart">
                <div class="prices">
                    <div class="prices-wrap">
                        <div class="price">{{ showPrice(activeItem.price_10) }}</div>
                        <div class="price">{{ showPrice(activeItem.price_100) }}</div>
                    </div>
                    <div
                            v-if="showTryOnButton"
                            class="try-hand-btn"
                            @click="onTryOnClick"
                    >примерить</div>
                    <div
                            v-if="showPickSecondsButton"
                            class="pick-seconds-btn"
                            :class="pickSecondsBtnClass"
                            @click="pickSecondsClick"
                    >{{ pickSecondsBtnText }}</div>
                </div>
                <div class="cart">
                    <cart-add-column
                            v-if="cartMode === 'add'"
                            :quantity="quantity"
                            :inputMin="cartMin"
                            :step="cartStep"
                            :inCart="activeItem.cart"
                            :loading="activeItem.loading"
                            @add-to-cart-click="onAddToCartClick"
                    />
                    <cart-edit-column
                            v-else-if="cartMode === 'edit'"
                            :item="activeItem"
                            :entity="entity"
                            :quantity="quantity"
                            :inputMin="0"
                            :step="cartStep"
                            :inCart="activeItem.cart"
                            :loading="activeItem.loading"
                            @save-cart-quantity-click="saveCartQuantityClick"
                    />
                </div>
            </div>
        </div>
        <transition name="fade-slide">
            <section class="matchingSeconds" v-if="matchingSecondsShow">
                <header>Секундные стрелки подхядящие по размеру для {{ shortArticle }}
                    (длиной ±5 мм)</header>
                <hand
                        v-if="matchingSeconds.length > 0"
                        v-for="second, index in matchingSeconds"
                        :item="second"
                        :key="index"
                        @add-to-cart-click="onMatchingSecond_addToCartClick"
                />
                <div v-else class="no-matching-seconds">Секундных стрелок подходящих по размеру не найдено.</div>
            </section>
        </transition>
        <modal
                v-if="showTryOnModal"
                title="Примерка стрелок на циферблат"
                mode="try_hand"
                @close="onCloseTryOnModal"
        >
            <try-hand :demo="false" :itemsProp="items" :activeHandProp="item"/>
        </modal>
    </div>
    <div class="item" v-else-if="activeItem.type.slug === 'second'">
        <div class="column params-photo">
            <div class="params" :class="paramsClass">
                <div class="params__main">
                    <div class="param"><b>Размер:</b> {{ sizeSecond }} <span class="small">мм</span></div>
                    <div class="param"><b>Арт:</b> {{ article }}</div>
                    <div class="param" :class="shaftClass"><b>Шток:</b> {{ shaft }}</div>
                </div>
                <div class="params__additional">
                    <div class="param">Толщина: {{ thickness }}</div>
                </div>
            </div>
            <div class="photo">
                <div class="img-wrap">
                    <img :src="mainPhotoSrc" />
                </div>
                <div class="colors">
                    <hand-color
                            v-for="color, index in colors"
                            :key="color.name"
                            :color="color.name"
                            :active="index === activeItemIndex"
                            @click="onColorClick(index)"
                    ></hand-color>
                </div>
            </div>
        </div>
        <div class="column prices-cart">
            <div class="prices">
                <div class="prices-wrap">
                    <div class="price">{{ showPrice(activeItem.price_10) }}</div>
                    <div class="price">{{ showPrice(activeItem.price_100) }}</div>
                </div>
            </div>
            <div class="cart">
                <cart-add-column
                        v-if="cartMode === 'add'"
                        :quantity="quantity"
                        :inputMin="cartMin"
                        :step="cartStep"
                        :inCart="activeItem.cart"
                        :loading="activeItem.loading"
                        @add-to-cart-click="onAddToCartClick"
                />
                <cart-edit-column
                        v-else-if="cartMode === 'edit'"
                        :item="activeItem"
                        :entity="entity"
                        :quantity="quantity"
                        :inputMin="0"
                        :step="cartStep"
                        :inCart="activeItem.cart"
                        :loading="activeItem.loading"
                        @save-cart-quantity-click="saveCartQuantityClick"
                />
            </div>
        </div>
    </div>
</template>
<script>
    import handColor from 'Components/ItemSeller/items/hand/handColor.vue'
    import cartAddColumn from 'Components/ItemSeller/items/columns/cartAdd.vue'
    import cartEditColumn from 'Components/ItemSeller/items/columns/cartEdit.vue'
    import hand from 'Components/ItemSeller/items/hand/hand.vue'
    import modal from 'Components/common/Modal/modal.vue'

    export default {
        name: "hand",
        beforeCreate: function () {
            this.$options.components.tryHand = require('Components/TryHand/TryHand.vue').default
        },
        props: {
            item: [Array, Object],
            items: {
                type: Array,
                default: null
            },
            tryOn: {
                type: Boolean,
                default: false
            },
            cartMin: Number,
            cartStep: Number,
            cartMode: {
                type: String,
                default: 'add'
            },
            entity: String
        },
        data() {
            return {
                activeItemIndex: 0,
                matchingSeconds: null,
                matchingSecondsShow: false,
                showTryOnModal: false
            }
        },
        computed: {
            activeItem() {
                return this.cartMode === 'add' ? this.item[this.activeItemIndex] : this.item;
            },
            size() {
                return this.activeItem.length_h + '-' + this.activeItem.length_m
            },
            sizeSecond() {
                return this.activeItem.length_m
            },
            article() {
                return this.activeItem.name
            },
            shortArticle() {
                return this.activeItem.article
            },
            shaft() {
                return this.activeItem.shaftType.name
            },
            shaftClass() {
                return this.activeItem.shaftType.name === 'S2' ? 's2' : ''
            },
            profile() {
                return this.activeItem.profile.name
            },
            film() {
                return this.activeItem.protect_film ? 'Есть' : 'Нет'
            },
            thickness() {
                return this.activeItem.thickness + ' мм'
            },
            mainPhotoSrc() {
                if (this.activeItem.photo_main_id.length > 0) {
                    return this.activeItem.photo_main_id[0].src;
                }
                return '/images/common/no-hand-photo.png'
            },
            quantity() {
                return this.activeItem.quantity
            },
            colors() {
                if (this.cartMode === 'add') {
                    let arr = [];
                    for (let item of this.item) {
                        arr.push(item.color)
                    }
                    return arr;
                } else {
                    return [this.item.color]
                }
            },
            pickSecondsBtnText() {
                return this.matchingSecondsShow ? 'скрыть секундные' : 'выбрать секундные';
            },
            pickSecondsBtnClass() {
                return this.matchingSecondsShow ? 'active' : '';
            },
            paramsClass() {
                if (this.tryOn) {
                    return 'try-on'
                } else {
                    return ''
                }

            },
            showTryOnButton () {
                return this.activeItem.type.slug !== 'plastic'
                    && this.activeItem.photo_main_id.length > 0
                    && !this.tryOn
                    && this.cartMode === 'add'
            },
            showPickSecondsButton () {
                return this.activeItem.type.slug !== 'plastic' && this.cartMode === 'add'
            }
        },
        methods: {
            onColorClick(index) {
                if (index === this.activeItemIndex) {
                    return false;
                }
                this.activeItemIndex = index;
            },
            showPrice(price) {
                return parseFloat(price)
            },
            pickSecondsClick() {
                if (this.matchingSecondsShow) {
                    this.matchingSecondsShow = false;
                } else {
                    if (!this.matchingSeconds) {
                        this.matchingSeconds = this.$store.getters.matchingSeconds(this.activeItem.length_m);
                        this.matchingSecondsShow = false;
                    }
                    this.matchingSecondsShow = true;
                }
            },
            onTryOnClick() {
                this.showTryOnModal = true;
            },
            onCloseTryOnModal() {
                this.showTryOnModal = false;
            },
            onAddToCartClick(quantity) {
                this.$emit('add-to-cart-click', {
                    itemId: this.activeItem.id,
                    quantity: quantity
                });
            },
            saveCartQuantityClick(quantity) {
                this.$emit('save-cart-quantity-click', {itemId: this.activeItem.id, quantity: quantity});
            },
            onMatchingSecond_addToCartClick(params) {
                this.$emit('add-to-cart-click', params);
            }
        },
        components: {
            handColor,
            cartAddColumn,
            cartEditColumn,
            hand,
            modal,
            tryHand: "try-hand"
        }
    }
</script>
<style scoped lang="stylus">
    .item {
        box-sizing: border-box;
        display: flex;
        justify-content: space-between;
        border-bottom: solid 1px #8e8d78;
        .column {
            display: flex;
            flex-direction: column;
            justify-content: center;
            padding: 20px 0 10px;
            &.params-photo {
                flex-basis: 60%;
                display: flex;
                justify-content: space-between;
                align-items: center;
                flex-direction: row;
                margin-right: 10px;

                .params {
                    flex-basis: 48%;

                    .params__main {
                        font-family: "Century Gothic";
                        background: #f2f2f2;
                        border-radius: 5px;
                        padding: 5px 0;
                        color: #333333;
                        font-size: 14px;
                        .param {
                            padding: 5px 10px 0 10px;
                            margin: 5px 0;

                            &:last-child {
                                padding-bottom: 5px;
                            }
                            &.s2 {
                                background: #ffdf85;
                            }
                            .small {
                                color: #666666;
                            }

                            @media only screen and (max-width: 410px) {
                                margin: 2px 0;
                                padding: 2px 10px 0 10px;

                                &:last-child {
                                    padding-bottom: 2px;
                                }
                            }
                        }

                        @media only screen and (max-width: 520px) {
                            font-size: 13px;
                        }
                        @media only screen and (max-width: 410px) {
                            font-size: 12px;
                        }
                    }
                    .params__additional {
                        padding: 10px;
                        color: #666666;
                        font-size: 14px;
                        .param {
                            margin: 2px 0;
                            font-family: "Alegreya Sans";
                        }

                        @media only screen and (max-width: 410px) {
                            font-size: 12px;
                        }
                    }

                    /*&.try-on {
                        width: 320px;
                        flex-direction: row;
                        justify-content: space-between;
                        padding: 5px 0;
                        align-items: center;

                        .params__main {
                            min-width: 190px;
                        }
                    }*/

                    @media only screen and (max-width: 410px) {
                        min-width: 100%;
                    }
                }
                .photo {
                    flex-basis: 50%;
                    margin-left: 10px;
                    display: flex;
                    flex-direction: column;
                    align-items: center;

                    .img-wrap {
                        max-width: 150px;

                        img {
                            width: 100%
                        }
                    }
                    .colors {
                        width: 140px;
                        display: flex;
                        margin: 10px 0;

                        @media only screen and (max-width: 520px) {
                            width: auto
                            flex-wrap: wrap;
                        }
                        @media only screen and (max-width: 410px) {
                            margin: 5px 0 0;
                        }
                    }
                    @media only screen and (max-width: 410px) {
                        min-width: 100%;
                    }
                }


                @media only screen and (max-width: 520px) {
                    flex-basis: 68%;
                }
                @media only screen and (max-width: 410px) {
                    flex-direction: column;
                    flex-basis: 64%;
                }
            }
            &.prices-cart {
                flex-basis: 40%;
                display: flex;
                justify-content: space-between;
                align-items: center;
                flex-direction: row;
                @media only screen and (max-width: 650px) {
                    flex-direction: column;
                    justify-content: space-around;
                }
                @media only screen and (max-width: 520px) {
                    flex-basis: 30%;
                }
                .prices {
                    width: 180px;

                    .prices-wrap {
                        display: flex;
                        justify-content: center;
                        text-align: center;
                        margin-bottom: 15px;
                        .price {
                            flex-basis: 64px;
                            overflow: hidden;
                            font-family: "Century Gothic";
                            font-size: 17px;
                            color: #567f96;
                            border-right: solid 1px #bfbda3;
                            padding: 12px 0;

                            &:first-child {
                                border-left: solid 1px #bfbda3;
                            }
                            .rub {
                                color: #939393;
                                font-size: 14px;
                            }

                            @media only screen and (max-width: 520px) {
                                flex-basis: 52px;
                                font-size: 16px;
                            }
                        }
                        @media only screen and (max-width: 650px) {
                            margin-bottom: 10px;
                        }
                    }

                    @media only screen and (max-width: 520px) {
                        width: 110px;
                    }

                }
                .cart {
                    vertical-align: middle;
                    width: 140px;

                    @media only screen and (max-width: 520px) {
                        width: 110px;
                    }
                }
            }

            .try-hand-btn, .pick-seconds-btn {
                background: #e5e2c6;
                border: solid 1px #bcbaa0;
                border-radius: 5px;
                padding: 8px;
                text-align: center;
                margin: 5px auto;
                max-width: 150px;
                color: #333333;
                font-family: "Alegreya Sans";
                font-size: 16px;
                box-shadow: 0 1px 2px #93917f;
                cursor: pointer;
                transition: all .3s;

                @media only screen and (max-width: 650px) {
                    max-width: 100px;
                    margin: 10px auto;
                }
                @media only screen and (max-width: 520px) {
                    font-size: 14px;
                    padding: 6px;
                }

                &:hover {
                    background: #efebd0;
                    border-color: #c6c4ab;
                    box-shadow: 0 2px 3px #c1bdaa;
                }
                &.active {
                    box-shadow: none;
                    background: #c9c6af;
                }
            }
            .pick-seconds-btn {
                margin-top: 5px;
            }
        }
    }
    .matchingSeconds {
        width: 100%;
        border-left: solid 4px #999999;

        header {
            color: #fff;
            font-size: 14px;
            font-family: "Century Gothic";
            padding: 5px 10px;
            background: #999;
        }
    }

    .fade-slide-enter-active {
        transition: all .3s ease;
        position: relative;
    }
    .fade-slide-leave-active {
        transition: all .3s ease;
        position: relative;
    }
    .fade-slide-enter, .fade-slide-leave-to{
        opacity: 0;
        transform: translateY(-30px);
        position: relative;
    }
</style>