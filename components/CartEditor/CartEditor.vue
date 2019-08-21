<template>
    <transition name="fade-slide" mode="out-in">
        <div v-if="loading" key="loading" class="loading-wrap">
            <font-awesome-icon icon="spinner" spin  size="lg"/>
        </div>
        <div v-else key="cart" class="cart-editor-wrap">
            <transition name="fade-slide" mode="out-in">
                <div
                        v-if="cartIsEmpty && !orderCreated"
                        class="empty-cart"
                        key="empty"
                >
                    <div class="empty-cart__text">
                        Корзина пуста.<br/>
                        Просто добавьте в неё товары!
                    </div>
                    <div class="empty-cart__image">
                        <img src="/images/common/add-to-cart.png"/>
                    </div>
                </div>
                <div
                        v-else-if="orderCreated"
                        key="created"
                        class="order-created"
                >
                    <p>Благодарим Вас за заказ!</p>
                    <p>На Ваш e-mail будут приходить уведомления о ходе выполнения заказа.</p>
                    <p>Вы так же можете отслеживать заказ в <a href="/cabinet">Личном кабенете</a></p>
                </div>
                <section
                        v-else class="cart-editor"
                        key="editor"
                >
                    <header class="cart-editor__header">
                        <section
                                v-if="handsSurcharge"
                                class="hands-without-movement"
                                :class="showHangersNotify ? '' : 'hands-without-movement_single'"
                        >
                            <img class="hands-without-movement__exclamation" src="/images/common/exclamation.svg" />
                            <header>Стрелки без механизма</header>
                            <div>
                                <div class="hands-without-movement__line">
                                    <div v-if="handsWithoutMovement > 0">
                                        <b>Часовых и минутных</b><br />комплектов больше на
                                        <b class="count">{{ handsWithoutMovement }}</b> шт.<br/>
                                    </div>
                                    <div v-if="secondsWithoutMovement > 0">
                                        <b>Секундных</b> больше на <b class="count">{{ secondsWithoutMovement }}</b> шт.
                                    </div>
                                </div>
                                <div class="hands-without-movement__line">
                                    + <span class="price">{{ handsSurchargeValue }}</span> <span class="rub">₽</span> к цене для
                                    <b>часовой и минутной</b> или <b>пластикового</b> комплекта
                                </div>
                                <div class="hands-without-movement__line">
                                    + <span class="price">{{ secondsSurcharge }}</span> <span class="rub">₽</span> к цене для
                                    <b>секундной</b> стрелки
                                </div>
                                <div class="hands-without-movement__line">
                                    Общая сумма доплаты: <span class="price">{{ handsSurcharge }}</span> <span class="rub">₽</span>
                                </div>
                            </div>
                        </section>
                        <section
                                v-if="showHangersNotify || showPendulumHangersNotify"
                                class="movements-without-hanger"
                                :class="handsSurcharge ? '' : 'movements-without-hanger_single'"
                        >
                            <img class="movements-without-hanger__question" src="/images/common/question.svg" />
                            <header>Металлические петли?</header>
                            <div>
                                <div class="movements-without-hanger__line">
                                    Петли для подвешивания не заказаны.
                                </div>
                                <div class="movements-without-hanger__line">
                                    Возможно, Вы забыли их добавить...
                                </div>
                                <div
                                        v-if="showPendulumHangersNotify"
                                        class="movements-without-hanger__line">
                                    Обратите внимание &mdash; вы заказали <b>маятниковые механизмы.</b>
                                    Для них нужны специальные петли "для маятникового механизма".
                                </div>
                            </div>
                            <!--<div class="movements-without-hanger__buttons">
                                <div class="btn add-auto-btn">Добавить автоматически</div>
                                <div class="btn not-need-btn">Не требуются</div>
                            </div>-->
                        </section>
                    </header>
                    <confirm-order
                            :orderEnable="orderEnable"
                            :totalCost="totalCost"
                            :activeOrdersQuantity="activeOrdersQuantity"
                            @make-order="onMakeOrder"
                    />
                    <section v-if="cart.movement && cart.movement.length > 0" class="cart-editor__group">
                        <header>Часовые механизмы</header>
                        <item-seller
                                entityProp="movement"
                                :itemsProp="cart.movement"
                                :showFilter="false"
                                :cartMinProp="10"
                                :cartStepProp="10"
                                :paginator="false"
                                cartMode="edit"
                        />
                    </section>
                    <section v-if="cart.hand && cart.hand.length > 0" class="cart-editor__group">
                        <header>Часовые стрелки</header>
                        <item-seller
                                entityProp="hand"
                                :itemsProp="cart.hand"
                                :showFilter="false"
                                :cartMinProp="10"
                                :cartStepProp="10"
                                :paginator="false"
                                cartMode="edit"
                        />
                    </section>
                    <section v-if="cart.sign && cart.sign.length > 0" class="cart-editor__group">
                        <header>Накладные знаки</header>
                        <item-seller
                                entityProp="sign"
                                :itemsProp="cart.sign"
                                :showFilter="false"
                                :cartMinProp="1"
                                :cartStepProp="1"
                                :paginator="false"
                                cartMode="edit"
                        />
                    </section>
                    <section v-if="cart.capsule && cart.capsule.length > 0" class="cart-editor__group">
                        <header>Встраиваемые капсулы</header>
                        <item-seller
                                entityProp="capsule"
                                :itemsProp="cart.capsule"
                                :showFilter="false"
                                :cartMinProp="1"
                                :cartStepProp="1"
                                :paginator="false"
                                cartMode="edit"
                        />
                    </section>
                    <section v-if="cart.fastener && cart.fastener.length > 0" class="cart-editor__group">
                        <header>Комплектующие</header>
                        <item-seller
                                entityProp="fastener"
                                :itemsProp="cart.fastener"
                                :showFilter="false"
                                :cartMinProp="10"
                                :cartStepProp="10"
                                :paginator="false"
                                cartMode="edit"
                        />
                    </section>
                    <confirm-order
                            :orderEnable="orderEnable"
                            :totalCost="totalCost"
                            :activeOrdersQuantity="activeOrdersQuantity"
                            @make-order="onMakeOrder"
                    />
                    <modal
                            v-if="makeOrder"
                            title="Оформить заказ"
                            @close="onCloseMakeOrder"
                    >
                        <make-order
                                @order-created="onOrderCreated"
                        />
                    </modal>
                </section>
            </transition>
        </div>
    </transition>
</template>
<script>
    import ItemSeller from 'Components/ItemSeller/ItemSeller.vue'
    import confirmOrder from 'Components/CartEditor/confirmOrder.vue'
    import Modal from 'Components/common/Modal/modal.vue'
    import MakeOrder from 'Components/MakeOrder/MakeOrder.vue'

    export default {
        created() {
            this.loadCart();
            this.getActiveOrdersQuantity();
        },
        data() {
            return {
                loading: true,
                handsSurchargeValue: 10,
                secondsSurcharge: 5,
                makeOrder: false,
                orderCreated: false
            }
        },
        computed: {
            cart() {
                return this.$store.getters.cart;
            },
            activeOrdersQuantity() {
                return this.$store.getters.userActiveOrdersQuantity;
            },
            cartIsEmpty() {
                return !this.cart.movement
                    && !this.cart.hand
                    && !this.cart.sign
                    && !this.cart.capsule
                    && !this.cart.fastener;
            },
            movementsCount() {
                let movements = this.cart.movement;
                let count = 0;

                if (movements && movements.length > 0) {
                    for (let movement of movements) {
                        count += movement.cart
                    }
                }
                return count;
            },
            movementsWithoutHangerCount() {
                let count = 0;
                const movements = this.cart.movement;

                if (movements && movements.length > 0) {
                    for (let movement of movements) {
                        if (!movement.plastic_hanger && movement.type.name !== 'Маятниковый') {
                            count += 1;
                        }
                    }
                }
                return count;
            },
            pendulumMovementsWithoutHangerCount() {
                let count = 0;
                const movements = this.cart.movement;

                if (movements && movements.length > 0) {
                    for (let movement of movements) {
                        if (movement.type.name === 'Маятниковый' && !movement.plastic_hanger) {
                            count += 1;
                        }
                    }
                }
                return count;
            },
            hangersCount() {
                let count = 0;
                const fasteners = this.cart.fastener;

                if (fasteners && fasteners.length > 0) {
                    for (let fastener of fasteners) {
                        if (fastener.type.slug === 'hanger') {
                            count += fastener.cart;
                        }
                    }
                }

                return count;
            },
            pendulumHangersCount() {
                let count = 0;
                const fasteners = this.cart.fastener;

                if (fasteners && fasteners.length > 0) {
                    for (let fastener of fasteners) {
                        if (fastener.type.slug === 'pendulum_hanger') {
                            count += fastener.cart;
                        }
                    }
                }

                return count;
            },
            handsCount() {
                let hands = this.cart.hand;
                let count = 0;

                if (hands && hands.length > 0) {
                    for (let hand of hands) {
                        if (hand.type.slug !== 'second') {
                            count += hand.cart
                        }
                    }
                }
                return count;
            },
            secondsCount() {
                let hands = this.cart.hand;
                let count = 0;

                if (hands && hands.length > 0) {
                    for (let hand of hands) {
                        if (hand.type.slug === 'second') {
                            count += hand.cart
                        }
                    }
                }
                return count;
            },
            handsWithoutMovement() {
                return this.handsCount - this.movementsCount;
            },
            secondsWithoutMovement() {
                return this.secondsCount - this.movementsCount;
            },
            handsSurcharge() {
                let surcharge = 0;

                if (this.handsWithoutMovement > 0) {
                    surcharge += this.handsSurchargeValue * this.handsWithoutMovement;
                }

                if (this.secondsWithoutMovement > 0) {
                    surcharge += this.secondsSurcharge * this.secondsWithoutMovement
                }

                return surcharge;
            },
            showHangersNotify () {
                return this.movementsWithoutHangerCount && !this.hangersCount
            },
            showPendulumHangersNotify() {
                return this.pendulumMovementsWithoutHangerCount && !this.pendulumHangersCount
            },
            movementsCost() {
                let cost = 0;
                let items = this.cart.movement;
                if (items && items.length > 0) {
                    for (let item of items) {
                        let price;
                        const cart = item.cart;

                        if (cart < 50) {
                            price = item.price_1;
                        } else if (cart >= 50 && cart < 100) {
                            price = item.price_2;
                        } else if (cart >= 100 && cart < 500) {
                            price = item.price_3
                        } else if (cart >= 500 && cart < 1000) {
                            price = item.price_4
                        } else if (cart >= 1000) {
                            price = item.price_5;;
                        }

                        cost += item.cart * price
                    }
                }
                return cost;
            },
            signsCost() {
                let cost = 0;
                let items = this.cart.sign  ;
                if (items && items.length > 0) {
                    for (let item of items) {
                        let price;
                        const cart = item.cart;

                        if (cart < 10) {
                            price = item.price_1;
                        } else if (cart >= 10 && cart < 100) {
                            price = item.price_2;
                        } else if (cart >= 100 && cart < 500) {
                            price = item.price_3
                        } else if (cart >= 500) {
                            price = item.price_4
                        }

                        cost += item.cart * price
                    }
                }
                return cost;
            },
            capsulesCost() {
                let cost = 0;
                let items = this.cart.capsule  ;
                if (items && items.length > 0) {
                    for (let item of items) {
                        let price;
                        const cart = item.cart;

                        if (cart < 100) {
                            price = item.price_1;
                        } else if (cart >= 100) {
                            price = item.price_2;
                        }

                        cost += item.cart * price
                    }
                }
                return cost;
            },
            fastenersCost() {
                let cost = 0;
                let items = this.cart.fastener  ;
                if (items && items.length > 0) {
                    for (let item of items) {
                        cost += item.cart * item.price
                    }
                }
                return cost;
            },
            handsCost() {
                let cost = 0;
                let items = this.cart.hand  ;
                if (items && items.length > 0) {
                    for (let item of items) {
                        let floatCart = item.cart / 100;
                        let intPart = Math.trunc(floatCart) * 100;
                        let fractionPart = (floatCart - intPart / 100).toFixed(10) * 100;

                        if (intPart) {
                            cost += intPart * item.price_100;
                        }

                        if (fractionPart) {
                            cost += fractionPart * item.price_10;
                        }
                    }
                }
                return cost;
            },
            totalCost() {
                return this.movementsCost
                        + this.handsCost
                        + this.signsCost
                        + this.capsulesCost
                        + this.fastenersCost
                        + this.handsSurcharge;
            },
            orderEnable() {
                return this.totalCost >= 3000;
            }
        },
        watch: {
            cart(value, oldValue) {
                if (value !== null) {
                    this.loading = false;
                }
            }
        },
        methods: {
            loadCart() {
                this.$store.dispatch('getCart');
            },
            getActiveOrdersQuantity() {
                this.$store.dispatch('getUserActiveOrdersQuantity');
            },
            onMakeOrder() {
                this.makeOrder = true;
            },
            onCloseMakeOrder() {
                this.makeOrder = false;
                this.enableBodyScroll();
            },
            onOrderCreated() {
                this.onCloseMakeOrder();
                this.orderCreated = true;
                this.$store.dispatch('clearCart');
            },
            enableBodyScroll() {
                document.body.style.overflowY = 'auto';
            },
        },
        components: {
            ItemSeller,
            confirmOrder,
            Modal,
            MakeOrder
        }
    }
</script>
<style lang="stylus">
    .cart-editor-wrap {
        position: relative;
        .order-created {
            p {
                font-size: 24px;
                font-family: "Alegreya Sans Light";
                color: #474645;
                margin: 12px 0;
            }
            a {
                font-size: 24px;
                font-family: "Alegreya Sans Light";
                color: #605f5d;
                text-decoration: underline;
                &:hover {
                    color: #474645;
                }
            }
        }
    }
    .cart-editor {
        position: relative;
        transition: all .3s;
        .cart-editor__header {
            display: flex;
            justify-content: space-around;
            @media only screen and (max-width: 600px) {
                flex-direction: column;
                align-items: center;
            }
            .hands-without-movement {
                position: relative;
                padding: 20px;
                flex-basis: 40%;
                border: solid 1px #3f6b30;
                border-radius: 5px;
                &.hands-without-movement_single {
                    //flex-basis: 85%;
                    @media only screen and (max-width: 600px) {
                        flex-basis: 100%;
                    }
                }
                header {
                    font-weight: bold;
                    font-size: 20px;
                    color: #666666;
                    text-align: center;
                    font-family: "Alegreya Sans";
                    margin-bottom: 20px;
                    @media only screen and (max-width: 600px) {
                        font-size: 16px;
                    }
                }
                .hands-without-movement__exclamation {
                    position: absolute;
                    width: 30px;
                    height: 30px;
                    left: -15px;
                    top: -15px;
                }
                .hands-without-movement__line {
                    margin-top: 10px;
                    font-family: "Alegreya Sans";
                    font-size: 16px;
                    color: #4d4d4d;
                    >div, b {
                        font-family: "Alegreya Sans";
                        font-size: 16px;
                        color: #4d4d4d;
                        &.count {
                            font-family: "Century Gothic";
                        }
                    }
                    .price {
                        color: #567f96;
                        font-size: 22px;
                        font-family: "Century Gothic";
                    }
                    .rub {
                        font-family: "Century Gothic";
                        font-size: 14px;
                        color: #999999;
                    }

                }
                @media only screen and (max-width: 600px) {
                    flex-basis: auto;
                    width: 85%;
                    font-size: 14px;
                }
            }
            .movements-without-hanger {
                position: relative;
                padding: 20px;
                flex-basis: 40%;
                border: solid 1px #3f6b30;
                border-radius: 5px;
                &.movements-without-hanger_single {
                    //flex-basis: 85%;
                    @media only screen and (max-width: 600px) {
                        flex-basis: 100%;
                    }
                }
                header {
                    font-weight: bold;
                    font-size: 20px;
                    color: #666666;
                    text-align: center;
                    font-family: "Alegreya Sans";
                    margin-bottom: 20px;
                    @media only screen and (max-width: 600px) {
                        font-size: 16px;
                    }
                }
                .movements-without-hanger__question {
                    position: absolute;
                    width: 30px;
                    height: 30px;
                    left: -15px;
                    top: -15px;
                }
                .movements-without-hanger__line {
                    margin-top: 10px;
                    font-family: "Alegreya Sans";
                    font-size: 16px;
                    color: #4d4d4d;
                    >div, b {
                        font-family: "Alegreya Sans";
                        font-size: 16px;
                        color: #4d4d4d;
                        &.count {
                            font-family: "Century Gothic";
                        }
                    }
                }
                .movements-without-hanger__buttons {
                    display: none;
                    justify-content: space-between;
                    margin-top: 20px;
                    .btn {
                        display: flex;
                        justify-content: center;
                        align-items: center;
                        text-align: center;
                        color: #fff;
                        padding: 10px;
                        border-radius: 5px;
                        font-family: "Alegreya Sans";
                        font-size: 16px;
                        cursor: pointer;
                        transition: all .3s;
                    }
                    .add-auto-btn {
                        flex-basis: 55%;
                        background: #598449;
                        &:hover {
                            background: #6b9b57;
                        }

                    }
                    .not-need-btn {
                        flex-basis: 40%;
                        background: #497b82;
                        &:hover {
                            background: #589499;
                        }
                    }
                }
                @media only screen and (max-width: 600px) {
                    flex-basis: auto;
                    width: 85%;
                    margin-top: 30px;
                    font-size: 14px;
                }
            }
        }
        .confirm-order {
            display: flex;
            justify-content: center;
            margin: 50px 0;
            .confirm-order__sum-part-wrap {
                flex-basis: 50%;
                display: flex;
                justify-content: flex-end;
                align-items: center;
                text-align: right;
                padding-right: 15px;
                .confirm-order__sum-part {
                    font-family: "Alegreya Sans";
                    font-size: 30px;
                    color: #4d4d4d;
                    @media only screen and (max-width: 650px) {
                        font-size: 24px;
                    }
                    @media only screen and (max-width: 450px) {
                        font-size: 20px;
                    }
                    @media only screen and (max-width: 380px) {
                        font-size: 16px;
                    }
                }
                .price {
                    font-family: "Century Gothic";
                    font-size: 30px;
                    color: #567f96;
                    font-weight: bold;
                    margin: 0 5px 0 10px;
                    @media only screen and (max-width: 650px) {
                        font-size: 26px;
                    }
                    @media only screen and (max-width: 450px) {
                        font-size: 22px;
                    }
                    @media only screen and (max-width: 380px) {
                        font-size: 18px;
                    }
                }
                .rub {
                    font-size: 24px;
                    font-family: "Century Gothic";
                    color: #b3b3b3;
                    @media only screen and (max-width: 650px) {
                        font-size: 20px;
                    }
                    @media only screen and (max-width: 450px) {
                        font-size: 16px;
                    }
                    @media only screen and (max-width: 380px) {
                        font-size: 14px;
                    }
                }
                @media only screen and (max-width: 550px) {
                    flex-basis: 40%;
                }
            }
            .confirm-order__btn-part {
                flex-basis: 50%;
                padding-left: 15px;
                .confirm-order__btn {
                    min-width: 150px;
                    max-width: 230px;
                    background: #639355;
                    color: #fff;
                    font-size: 17px;
                    font-weight: bold;
                    font-family: "Century Gothic";
                    text-align: center;
                    padding: 15px;
                    border-radius: 5px;
                    cursor: pointer;
                    transition: all .3s;
                    &:hover {
                        background: #76aa65;
                    }
                    &.confirm-order__btn_disabled {
                        background: #ccc;
                        color: #eee;
                        cursor: default;
                    }
                    @media only screen and (max-width: 550px) {
                        font-size: 15px;
                    }
                    @media only screen and (max-width: 380px) {
                        font-size: 13px;
                        padding: 10px;
                    }
                }
                @media only screen and (max-width: 550px) {
                    flex-basis: 60%;
                }
            }
            .confirm-order__min-order {
                margin-top: 20px;
                line-height: 1.7;
                font-family: "Alegreya Sans";
                font-size: 18px;
                border: solid 1px #aaa;
                border-radius: 5px;
                padding: 15px;
                .price {
                    font-family: "Century Gothic";
                    font-size: 20px;
                    color: #567f96;
                    font-weight: bold;
                    margin: 0 5px 0 10px;
                    @media only screen and (max-width: 450px) {
                        font-size: 18px;
                    }
                    @media only screen and (max-width: 380px) {
                        font-size: 14px;
                    }
                }
                .rub {
                    font-size: 16px;
                    font-family: "Century Gothic";
                    color: #b3b3b3;
                    @media only screen and (max-width: 550px) {
                        font-size: 14px;
                    }
                    @media only screen and (max-width: 380px) {
                        font-size: 12px;
                    }
                }
                @media only screen and (max-width: 550px) {
                    font-size: 16px;
                    margin-top: 10px;
                }
                @media only screen and (max-width: 380px) {
                    font-size: 14px;
                }
            }
            @media only screen and (max-width: 600px) {
                margin: 30px 0;
            }
        }
        .cart-editor__group {
            margin-top: 60px;
            header {
                font-family "Alegreya Sans";
                font-size: 30px;
                color: #333333;
                margin-bottom: -15px;
            }
        }
    }
    .empty-cart {
        display: flex;
        justify-content: space-around;
        .empty-cart__text {
            width: 40%;
            padding-right: 15px;
            font-size: 26px;
            color: #333;
            font-family: "Alegreya Sans";
            line-height: 1.6;
            font-style: italic;
            @media only screen and (max-width: 700px) {
                font-size: 22px;
            }
            @media only screen and (max-width: 550px) {
                font-size: 20px;
            }
            @media only screen and (max-width: 450px) {
                font-size: 18px;
                padding-right: 10px;
            }
            @media only screen and (max-width: 350px) {
                font-size: 16px;
            }
        }
        .empty-cart__image {
            width: 60%
            padding-left: 15px;
            text-align: right;
            img {
                width: 100%
                max-width: 517px;
            }
            @media only screen and (max-width: 450px) {
                padding-left: 10px;
            }
        }
    }
    .loading-wrap {
        display: flex;
        justify-content: center;
        align-items: center;
        padding: 20px;
        position: relative;
        transition: all .3s;
        svg {
            color: #7F786E;
        }
    }




</style>