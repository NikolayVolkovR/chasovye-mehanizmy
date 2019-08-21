<template>
    <div class="edit-product">
        <div class="edit-product__fields">
            <div class="edit-product__name">
                {{ product.name }}
            </div>
            <s-input
                    label="Количество"
                    :value="quantity.value"
                    @input="onQuantityInput"
            />
            <s-input
                    label="Цена"
                    :value="price.value"
                    @input="onPriceInput"
            />
            <div class="edit-product__remove" @click="onRemove">
                <icon-base width="26" height="26" iconName="удалить">
                    <icon-remove />
                </icon-base>
            </div>
        </div>
        <button
                class="edit-product__button"
                :class="buttonClass"
                @click="onSubmit"
        >
            Сохранить
        </button>
    </div>
</template>
<script>
    import sInput from 'Components/common/SInput/SInput.vue'
    import IconBase from 'Components/icons/IconBase.vue'
    import IconRemove from 'Components/icons/remove.vue'

    export default {
        created() {
            this.presetValues();
        },
        props: {
            product: Object
        },
        data() {
            return {
                quantity: {
                    value: null,
                    oldValue: null
                },
                price: {
                    value: null,
                    oldValue: null
                }
            }
        },
        computed: {
            isComplete() {
                return this.quantity.value != this.quantity.oldValue || this.price.value != this.price.oldValue;
            },
            buttonClass() {
                return this.isComplete ? 'edit-product__button_active' : '';
            }
        },
        methods: {
            presetValues() {
                this.quantity.value = this.product.quantity;
                this.quantity.oldValue = this.product.quantity;
                this.price.value = this.product.price;
                this.price.oldValue = this.product.price;
            },
            onRemove() {
                this.$emit('remove')
            },
            onQuantityInput({index, value}) {
                this.quantity.value = value;
            },
            onPriceInput({index, value}) {
                this.price.value = value;
            },
            onSubmit() {
                if (!this.isComplete) {
                    return false;
                }

                this.$emit('edit', {quantity: this.quantity.value, price: this.price.value})
            }
        },
        components: {
            sInput,
            IconBase,
            IconRemove,
        }
    }
</script>
<style lang="stylus">
    .edit-product {
        .edit-product__fields {
            display: flex;
            align-items: center;
            .edit-product__name {
                font-weight: bold;
                margin-right: 12px;
            }
            label {
                margin: 0 12px;
                input {
                    display: block;
                    margin-top: 6px;
                    padding: 6px;
                    border-radius: 5px;
                    border: solid 1px #777;
                }
            }
            .edit-product__remove {
                transition: all .3s;
                cursor: pointer;
                margin-left: 12px;
                &:hover {
                    transform: scale(1.1)
                }
            }
        }
        .edit-product__button {
            margin: 30px auto 0;
            background: #bbb;
            cursor: default;
            transition: all .3s;
            &.edit-product__button_active {
                cursor: pointer;
                background: #639355;
            }
        }
    }
</style>