<template>
    <div class="cart-wrap no-select">
        <div class="cart" :class="cartClass">
            <div class="left-part">
                <div class="minus" @click="onMinus" :class="minusClass">
                    <icon-base width="18" height="18" iconName="Меньше">
                        <icon-minus/>
                    </icon-base>
                </div>
                <div class="plus" @click="onPlus" :class="plusClass">
                    <icon-base width="18" height="18" iconName="Больше">
                        <icon-plus/>
                    </icon-base>
                </div>
                <div class="input-wrap">
                    <input
                            ref="input"
                            type="text"
                            :disabled="inputDisabled"
                            :value="inputValue"
                            @keypress="onKeypress"
                            @change="onChange" />
                    <span>шт</span>
                </div>
            </div>
            <div
                    class="add-button"
                    :class="inputDisabled ? 'disabled' : ''"
                    @click="onAddClick"
            >
                <icon-base width="40" height="30.5" iconName="Добавить в корзину">
                    <icon-cart />
                </icon-base>
            </div>
            <font-awesome-icon v-if="loading" class="item-cart__loading" icon="spinner" spin  size="lg"/>
        </div>
        <transition name="fade-slide">
            <div v-if="inCart" class="in-cart">
                <a href="/cart" class="in-cart__name">В кор&shy;зине:</a>
                <div class="in-cart__value" ref="inCartValue"><span>{{ inCart }}</span> шт</div>
            </div>
        </transition>
    </div>
</template>
<script>
    import IconBase from 'Components/icons/IconBase.vue'
    import IconCart from 'Components/icons/cart.vue'
    import IconPlus from 'Components/icons/plus.vue'
    import IconMinus from 'Components/icons/minus.vue'

    export default {
        props: {
            quantity: {
                type: Number,
                default: 0
            },
            inputMin: {
                type: Number,
                default: 10
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
                inputValue: this.inputMin
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
            }
        },
        methods: {
            onPlus($event) {
                if (!this.plusAvailable || this.loading) {
                    return false
                }
                const target = $event.currentTarget;
                this.inputValue += this.step;
                this.animateButtonClick(target)
            },
            onMinus($event) {
                if (!this.minusAvailable || this.loading) {
                    return false
                }
                const target = $event.currentTarget;
                this.inputValue -= this.step;
                this.animateButtonClick(target)
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
            onAddClick($event) {
                if (!this.inputDisabled && !this.loading) {
                    const target = $event.currentTarget;
                    this.$emit('add-to-cart-click', this.inputValue);
                    this.inputValue = this.inputMin;
                    this.animateButtonClick(target);

                    const valueElem = this.$refs.inCartValue;
                    if (valueElem) {
                        valueElem.classList.add('in-cart__value_clicked');
                        setTimeout(()=>{this.$refs.inCartValue.classList.remove('in-cart__value_clicked')}, 300);
                    }
                }
            }
        },
        components: {
            IconBase, IconCart, IconPlus, IconMinus
        }
    }
</script>
<style scoped lang="stylus">
    .cart-wrap {
        .cart {
            display: flex;
            justify-content: center;
            position: relative;
            transition: all .3s;
            .left-part {
                flex-basis: 62px;
                display: flex;
                flex-wrap: wrap;
                justify-content: space-between;
                margin-right: 10px;

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
                        flex-basis: 74px;
                        max-width: 74px;
                        border-radius: 5px;
                        border: solid 1px #a8a691;
                        padding: 5px 20px 5px 5px;
                        height: 32px;
                        margin-top: 10px;
                        font-size: 16px;
                        text-align: center;

                        @media only screen and (max-width: 520px) {
                            font-size: 14px;
                            padding: 5px 15px 5px 5px;
                            max-width: 62px;
                            margin-top: 5px;
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
                }
            }

            .add-button {
                flex-basis: 60px;
                height: 75px;
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
                    background: #e8e8e8;
                    border-color: #e8e8e8;
                    box-shadow: none;
                    cursor: default;
                }
                @media only screen and (max-width: 520px) {
                    flex-basis: 40px;
                    height: 63px;
                }
            }


            &.cart_loading {
                opacity: .6;
            }
        }
        .in-cart {
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
                    span {
                        //color: #000;
                    }
                    //transform: scale(1.05), translateY(-5px);
                    transform: translateY(-5px);
                }
            }
        }
    }
    .item-cart__loading {
        position: absolute;
        top: 50%;
        left: 50%;
        margin-top: -10px;
        margin-left: -10px;
    }
</style>