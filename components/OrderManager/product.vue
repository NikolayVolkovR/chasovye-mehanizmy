<template>
    <div class="product">
        <div class="product__wrap" @click="onClick">
            <div class="product__name"><b>{{ getProductType(product.entity) }}</b> {{name}}</div>
            <div class="product__quantity">{{product.quantity}}</div>
            <div class="product__price">{{product.price}}</div>
        </div>
        <modal title="Редактировать продукт" v-if="edit" @close="onEditClose">
            <product-edit
                :product="product"
                @remove="onRemove"
                @edit="onEdit"
            />
        </modal>
    </div>
</template>
<script>
    import Modal from 'Components/common/Modal/modal.vue'
    import ProductEdit from './product-edit.vue'

    export default {
        props: {
            product: Object,
            index: Number
        },
        data() {
            return {
                edit: false
            }
        },
        computed: {
            name() {
                return this.product.entity === 'handsOverpay' ? '' : this.product.name
            }
        },
        methods: {
            getProductType(entityName) {
                switch(entityName) {
                    case 'movement':
                        return 'Механизм';
                        break;
                    case 'hand':
                        return 'Стрелки';
                        break;
                    case 'sign':
                        return 'Знак';
                        break;
                    case 'capsule':
                        return 'Капсула';
                        break;
                    case 'fastener':
                        return 'Крепёж';
                        break;
                    case 'handsOverpay':
                        return 'Доплата за стрелки без механизма';
                        break;

                }
            },
            onClick() {
                this.edit = true;
            },
            onEditClose() {
                this.edit = false;
                this.enableBodyScroll();
            },
            onRemove() {
                this.edit = false;
                this.$emit('remove', this.index);
                this.enableBodyScroll();
            },
            onEdit({quantity, price}) {
                this.edit = false;
                this.$emit('edit', {quantity, price, ...{productIndex: this.index}});
                this.enableBodyScroll();
            },
            enableBodyScroll() {
                document.body.style.overflowY = 'auto';
            },
        },
        components: {
            Modal,
            ProductEdit,
        }
    }
</script>
<style lang="stylus">
    .product {
        .product__wrap {
            display: flex;
            padding: 3px 6px;
            transition: all .3s ease;
            border-radius: 3px;
            position: relative;
            &:hover {
                background: #eee;
                cursor: pointer;
            }
            .product__name {
                width: 65%;
            }
            .product__quantity {
                width: 25%;
                /*display: flex;
                align-items: center;
                justify-content: center;*/
                text-align: center;
            }
            .product__price {
                width: 10%;
                text-align: center;
            }
        }
    }
</style>
