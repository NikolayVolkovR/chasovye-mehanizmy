<template>
    <transition name="fade" mode="out-in">
        <div class="delivery-manager" v-if="items" key="items">
            <header v-if="hasItems && !creating && !editing">
                Выберите доставку<br/>или создайте новую:
            </header>
            <transition name="fade" mode="out-in">
                <div
                        class="deliveries"
                        v-if="hasItems && !creating && !editing"
                >
                    <div
                            v-for="item, index in items"
                            class="delivery"
                            @click="onDeliveryClick(index)"
                    >
                        <div class="delivery__type">{{ item.deliveryType.name }}</div>
                        <div class="delivery__address" v-if="item.address && !item.deliveryType.pickup">{{ item.address }}</div>
                        <div class="delivery__buttons">
                            <div
                                    class="delivery__button"
                                    @click.stop="onEdit(index)"
                            >
                                <icon-base width="32"
                                           height="32"
                                           iconName="Редактировать доставку"
                                >
                                    <icon-edit :showBackground="true" backgroundColor="#fefefe"/>
                                </icon-base>
                            </div>
                            <div
                                    v-if="item.actions.delete.allow"
                                    class="delivery__button"
                                    @click.stop="onRemove(index)"
                            >
                                <icon-base
                                        width="32"
                                        height="32"
                                        iconName="Удалить доставку"
                                >
                                    <icon-delete :showBackground="true" backgroundColor="#fefefe"/>
                                </icon-base>
                            </div>
                        </div>
                    </div>
                    <div class="add-delivery-btn" title="Новая доставка" @click="onAddClick">
                        <img src="/images/common/add-item.svg" />
                    </div>
                </div>
                <create-delivery
                        v-else-if="!hasItems || creating"
                        :types="deliveryTypes"
                        :hasCancelButton="!!items"
                        @cancel="onCancelCreate"
                        @submit="onCreate"
                />
                <edit-delivery
                        v-else-if="editing"
                        :item="editedItem"
                        :types="deliveryTypes"
                        @cancel="onCancelEdit"
                        @submit="onEditSubmit"
                />
            </transition>
            <button
                    v-if="!creating && !editing && hasItems"
                    class="delivery-manager__cancel-btn"
                    @click="onCancel"
            >
                Назад
            </button>
        </div>
        <div v-else key="loading" class="loading-wrap">
            <font-awesome-icon icon="spinner" spin  size="lg"/>
        </div>
    </transition>
</template>
<script>
    import createDelivery from './create/create.vue';
    import editDelivery from './edit/edit.vue';
    import IconBase from 'Components/icons/IconBase.vue'
    import IconEdit from 'Components/icons/edit.vue'
    import IconDelete from 'Components/icons/delete.vue'

    export default {
        props: {
            items: Array,
            types: Array
        },
        data() {
            return {
                creating: false,
                editedItem: null
            }
        },
        computed: {
            hasItems() {
                return this.items.length > 0;
            },
            editing() {
                return !!this.editedItem;
            },
            deliveryTypes() {
                return this.types.map(type => {
                    let message = type.pickup ? 'Москва, м. Дмитровская' : '';
                    return {
                        value: type.id,
                        label: type.name,
                        message: message,
                        pickup: type.pickup
                    }
                })
            },
        },
        methods: {
            onCancel() {
                this.$emit('cancel')
            },
            onCancelCreate() {
                if (this.hasItems) {
                    this.creating = false;
                } else {
                    this.onCancel();
                }
            },
            onCancelEdit() {
                this.editedItem = null;
            },
            onCreate(fields) {
                this.$emit('create', {fields: fields});
                this.creating = false;
            },
            onEditSubmit({itemId, fields}) {
                this.$emit('update', {itemId, fields});
                this.editedItem = null;
            },
            onAddClick() {
                this.creating = true;
            },
            onRemove(index) {
                let itemId = this.items[index].id;
                this.$emit('remove', {itemId: itemId});
            },
            onEdit(index) {
                this.editedItem = this.items[index];
            },
            onDeliveryClick(index) {
                this.$emit('delivery-click', index)
            }
        },
        components: {
            createDelivery,
            editDelivery,
            IconBase,
            IconEdit,
            IconDelete
        }
    }
</script>
<style lang="stylus">

</style>