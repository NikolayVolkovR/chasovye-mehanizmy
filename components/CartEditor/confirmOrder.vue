<template>
    <div class="confirm-order">
        <div class="confirm-order__sum-part-wrap">
            <div class="confirm-order__sum-part">
                Сумма заказа: <span class="price">{{ totalCost }}</span>&nbsp;<span class="rub">₽</span>
            </div>
        </div>
        <div class="confirm-order__btn-part">
            <div
                    class="confirm-order__btn"
                    :class="enable ? '' : 'confirm-order__btn_disabled'"
                    @click="onOrderBntClick"
            >
                Оформить заказ
            </div>
            <transition name="fade-slide">
                <div v-if="!orderEnable" class="confirm-order__min-order">
                    Минимальный заказ составляет
                    <span class="price">3000</span> <span class="rub">₽</span>
                    <br/>Увеличьте сумму заказа, чтобы оформить его.
                </div>
            </transition>
            <div v-if="activeOrdersQuantity >= 10" class="confirm-order__min-order">
                Создано слишком много не обработанных заказов.
            </div>
        </div>
    </div>
</template>
<script>
    export default {
        props: {
            orderEnable: Boolean,
            totalCost: Number,
            activeOrdersQuantity: Number
        },
        computed: {
            enable() {
                return this.orderEnable && this.activeOrdersQuantity < 10
            }
        },
        methods: {
            onOrderBntClick() {
                if (!this.orderEnable) {
                    return false;
                }
                this.$emit('make-order')
            }
        }
    }
</script>