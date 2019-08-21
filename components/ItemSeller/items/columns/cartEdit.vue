<template>
    <div class="cart-wrap no-select">
        <div class="cart" :class="cartClass">
            <div class="top-part">
                <div class="minus" @click="onMinus" :class="minusClass">
                    <icon-base width="18" height="18" iconName="Меньше">
                        <icon-minus/>
                    </icon-base>
                </div>
                <div class="input-wrap">
                    <input
                            ref="input"
                            type="text"
                            :disabled="inputDisabled"
                            :value="inputValue"
                            @keypress="onKeypress"
                            @change="onChange"
                    />
                </div>
                <div class="plus" @click="onPlus" :class="plusClass">
                    <icon-base width="18" height="18" iconName="Больше">
                        <icon-plus/>
                    </icon-base>
                </div>
            </div>
            <div
                    title="Сохранить"
                    class="save-button"
                    :class="saveBtnClass"
                    @click="onSaveClick"
            >
                Сохранить
            </div>
            <font-awesome-icon v-if="loading" class="item-cart__loading" icon="spinner" spin  size="lg"/>
        </div>
        <div v-if="isHandItem" class="in-cart_hand-price">
            <div v-if="handsByHundred" class="hand-price__line">
                {{ handsByHundred }} шт. по <span class="price">{{ handPrice_100 }}</span> <span class="rub">₽</span>
            </div>
            <div v-if="handsByTen" class="hand-price__line">
                {{ handsByTen }} шт. по <span class="price">{{ handPrice_10 }}</span> <span class="rub">₽</span>
            </div>
            <div class="hand-price__line hand-price__line_total">
                {{ handsTotalPrice }} <span>₽</span>
            </div>
        </div>
        <div v-else class="in-cart_price">
            {{ cost }} <span>₽</span>
        </div>
    </div>
</template>
<script>
    import IconBase from 'Components/icons/IconBase.vue'
    import IconPlus from 'Components/icons/plus.vue'
    import IconMinus from 'Components/icons/minus.vue'

    export default {
        props: {
            item: Object,
            entity: String,
            quantity: {
                type: Number,
                default: 0
            },
            inputMin: {
                type: Number,
                default: 0
            },
            step: {
                type: Number,
                default: 10
            },
            inCart: {
                type: Number,
                default: 0
            },
            loading: {
                type: Boolean,
                default: false
            }
        },
        data() {
            return {
                inputValue: this.inCart
            }
        },
        computed: {
            availQuantity() {
                return this.inCart ? this.quantity - this.inCart : this.quantity;
            },
            minusClass() {
                return this.minusAvailable ? '' : 'disabled'
            },
            plusClass() {
                return this.plusAvailable ? '' : 'disabled'
            },
            minusAvailable() {
                return this.inputValue > this.inputMin;
            },
            plusAvailable() {
                return this.inputValue + this.step <= this.availQuantity;
            },
            inputDisabled() {
                return !this.minusAvailable && !this.plusAvailable;
            },
            cartClass() {
                return this.loading ? 'cart_loading' : '';
            },
            saveBtnClass() {
                return this.inputValue === this.inCart ? 'disabled' : '';
            },
            cost() {
                return this.item.cart * this.price;
            },
            price() {
                const inCart = this.item.cart;
                let price;

                if (this.entity === 'movement') {
                    switch (true) {
                        case (inCart < 50):
                            price = this.item.price_1;
                            break;
                        case (inCart >= 50 && inCart < 100):
                            price = this.item.price_2;
                            break;
                        case (inCart >= 100 && inCart < 500):
                            price = this.item.price_3;
                            break;
                        case (inCart >= 500 && inCart < 1000):
                            price = this.item.price_4;
                            break;
                        case (inCart >= 1000):
                            price = this.item.price_5;
                            break;
                    }
                } else if (this.entity === 'sign') {
                    switch (true) {
                        case (inCart < 10):
                            price = this.item.price_1;
                            break;
                        case (inCart >= 10 && inCart < 100):
                            price = this.item.price_2;
                            break;
                        case (inCart >= 100 && inCart < 500):
                            price = this.item.price_3;
                            break;
                        case (inCart > 500):
                            price = this.item.price_4;
                            break;
                    }
                } else if (this.entity === 'capsule') {
                    switch (true) {
                        case (inCart < 100):
                            price = this.item.price_1;
                            break;
                        case (inCart >= 100):
                            price = this.item.price_2;
                            break;
                    }
                } else if (this.entity === 'fastener') {
                    return this.item.price
                }



                return parseFloat(price)
            },
            handPrice_100() {
                return parseFloat(this.item.price_100);
            },
            handPrice_10() {
                return parseFloat(this.item.price_10);
            },
            handsTotalPrice() {
                let price = 0;

                if (this.handsByHundred) {
                    price += this.handsByHundred * this.handPrice_100;
                }

                if (this.handsByTen) {
                    price += this.handsByTen * this.handPrice_10;
                }

                return price;
            },
            isHandItem() {
                return this.entity === 'hand'
            },
            handsByHundred () {
                let floatCart = this.inCart / 100;
                let intPart = Math.trunc(floatCart);
                //let fractionPart = (floatCart * 100 - intPart * 100) / 100;

                return intPart * 100;
            },
            handsByTen() {
                let floatCart = this.inCart / 100;
                let intPart = Math.trunc(floatCart);
                let fractionPart = floatCart - intPart;

                return fractionPart.toFixed(10) * 100;
            }
        },
        methods: {
            onPlus($event) {
                if (!this.plusAvailable || this.loading) {
                    return false
                }
                const target = $event.currentTarget;
                this.inputValue += this.step;
                this.animateButtonClick(target);
            },
            onMinus($event) {
                if (!this.minusAvailable || this.loading) {
                    return false
                }
                const target = $event.currentTarget;
                this.inputValue -= this.step;
                this.animateButtonClick(target);
            },
            onKeypress($event) {
                const keyCode = $event.keyCode;

                if ((keyCode > 31 && (keyCode < 48 || keyCode > 57)) && keyCode !== 46) {
                    $event.preventDefault();
                } else {
                    return true;
                }
            },
            onChange($event) {
                let value = parseInt($event.target.value);

                if  (value > this.availQuantity) {
                    value = this.availQuantity
                } else if (value < this.inputMin) {
                    value = this.inputMin
                }

                this.inputValue = Math.ceil(value / 10) * 10;
                $event.target.value = this.inputValue;
            },
            animateButtonClick(target) {
                target.classList.add('clicked');
                setTimeout(()=>{
                    target.classList.remove('clicked');
                }, 100)
            },
            onSaveClick($event) {
                if (!this.inputDisabled && !this.loading) {
                    const target = $event.currentTarget;
                    this.$emit('save-cart-quantity-click', this.inputValue);
                    this.animateButtonClick(target);

                    /*
                    это анимация количества товаров. можно сделать при изменении суммы
                    const valueElem = this.$refs.inCartValue;
                    if (valueElem) {
                        valueElem.classList.add('in-cart__value_clicked');
                        setTimeout(()=>{this.$refs.inCartValue.classList.remove('in-cart__value_clicked')}, 300);
                    }*/
                }
            }
        },
        components: {
            IconBase,
            IconPlus,
            IconMinus
            //movementInCart
        }
    }
</script>
<style scoped lang="stylus">
    .cart-wrap {
        .cart {
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            position: relative;
            transition: all .3s;
            .top-part {
                display: flex;
                justify-content: space-between;
                width: 150px;

                .minus, .plus {
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    width: 32px;
                    height: 32px;
                    background: #f4f2d7;
                    border: solid 1px #a8a691;
                    border-radius: 5px;
                    color: #666666;
                    box-shadow: 0 2px 2px #cccab6;
                    cursor: pointer;
                    transition: all .1s;

                    &.clicked {
                        background: #e5e2cc!important;
                        box-shadow: none;
                        transform: translateY(2px);
                    }

                    &.disabled {
                        background: #f2f2f2;
                        border-color: #d6d6d6;
                        color: #878787;
                        box-shadow: none;
                        cursor: default;

                        &:hover {
                            background: #f2f2f2;
                            color: #878787;
                            box-shadow: none;
                        }
                    }

                    &:hover {
                        background: #fcf9e0;
                        color: #727272;
                        box-shadow: 0 1px 2px #b7b5a7;
                    }

                    svg {
                        vertical-align : middle;
                    }

                    @media only screen and (max-width: 520px) {
                        width: 26px;
                        height: 26px;
                    }
                }

                .input-wrap {
                    position: relative;

                    input {
                        max-width: 74px;
                        border-radius: 5px;
                        border: solid 1px #a8a691;
                        padding: 5px;
                        height: 32px;
                        margin: 0 5px;
                        font-size: 16px;
                        text-align: center;

                        @media only screen and (max-width: 520px) {
                            font-size: 12px;
                            padding: 5px;
                            max-width: 58px;
                            height: 26px;
                        }
                    }
                    span {
                        position: absolute;
                        right: 6px;
                        bottom: 6px;
                        font-size: 14px;
                        color: #999999;
                        @media only screen and (max-width: 520px) {
                            font-size: 12px;
                        }
                    }
                }

                @media only screen and (max-width: 520px) {
                    margin-right: 5px;
                    width: auto;
                }
            }

            .save-button {
                width: 100%;
                padding: 5px;
                margin-top: 10px;
                border-radius: 5px;
                border: solid 1px #8e8d78;
                color: #333333;
                background: #d4eac5;
                display: flex;
                justify-content: center;
                align-items: center;
                box-shadow: 0 2px 2px #a6b59a;
                transition: all .3s;
                cursor: pointer;

                &:hover {
                    box-shadow: 0 1px 2px #a6b59a;
                    background: #e0f4d0;
                }
                &.clicked {
                    background: #e3f7d2!important;
                    box-shadow: none;
                    transform: translateY(2px);
                }
                &.disabled {
                    background: #efefef;
                    border-color: #efefef;
                    color: #999;
                    box-shadow: none;
                    cursor: default;
                }
                @media only screen and (max-width: 520px) {
                    font-size: 13px;
                }
            }
            &.cart_loading {
                opacity: .6;
            }
        }

        .in-cart_price {
            margin-top: 10px;
            color: #567f96;
            font-size: 20px;
            text-align: center;
            font-family: "Century Gothic";
            span {
                color: #999999;
                font-size: 14px;
                @media only screen and (max-width: 520px) {
                    font-size: 12px;
                }
            }
            @media only screen and (max-width: 520px) {
                font-size: 16px;
            }
        }
        .in-cart_hand-price {
            margin-top: 10px;
            .hand-price__line {
                margin-top: 8px;
                font-family: "Century Gothic";
                font-size: 13px;
                color: #666666;
                text-align: center;
                &.hand-price__line_total {
                    color: #567f96;
                    font-size: 20px;
                    span {
                        color: #999999;
                        font-size: 14px;
                    }
                }
                .price {
                    color: #567f96;
                    font-size: 16px;
                }
                .rub {
                    color: #999999;
                }
            }
        }
        /*.in-cart {
            display: flex;
            align-items: flex-end;
            justify-content: center;
            margin-top: 10px;
            .in-cart__name {
                flex-basis: 74px;
                font-family: "Century Gothic";
                font-size: 12px;
                color: #8e8d78;
                text-decoration: underline;
            }
            .in-cart__value {
                margin-left: 10px;
                flex-basis: 54px;
                text-align: center;
                font-family: "Century Gothic";
                font-size: 14px;
                color: #666666
                transition: all .3s;
                span {
                    color: #566b43;
                    font-size: 16px;

                }
                &.in-cart__value_clicked {
                    span {}
                    transform: translateY(-5px);
                }
            }
        }*/
    }
    .item-cart__loading {
        position: absolute;
        top: 50%;
        left: 50%;
        margin-top: -10px;
        margin-left: -10px;
    }
</style>