<template>
    <div class="customer-manager">
        <header v-if="hasCustomers && !creatingCustomer && !editingCustomer">
            Выберите {{ headerEntity }}<br/>или создайте нового:
        </header>
        <transition name="fade" mode="out-in">
            <div
                    v-if="hasCustomers && !creatingCustomer && !editingCustomer"
                    class="customers"
            >
                <div
                        v-for="item, index in legalEntities"
                        class="customer"
                        @click="onCustomerClick('legal_entities', index)"
                >
                    <div class="customer__type">Юр. лицо</div>
                    <div class="customer__name">{{ item.name }}</div>
                    <div class="customer__buttons">
                        <div
                                class="customer__button"
                                @click.stop="onEdit('legalEntity', 'legal_entities', index)"
                        >
                            <icon-base width="32"
                                       height="32"
                                       iconName="Редактировать контрагента"
                            >
                                <icon-edit :showBackground="true" backgroundColor="#fefefe"/>
                            </icon-base>
                        </div>
                        <div
                                v-if="item.actions.delete.allow"
                                class="customer__button"
                                @click.stop="onRemove('legalEntity', 'legal_entities', index)"
                        >
                            <icon-base
                                    width="32"
                                    height="32"
                                    iconName="Удалить контрагента"
                            >
                                <icon-delete :showBackground="true" backgroundColor="#fefefe"/>
                            </icon-base>
                        </div>
                    </div>
                </div>

                <div
                        v-for="item, index in entrepreneurs"
                        class="customer"
                        @click="onCustomerClick('entrepreneurs', index)"
                >
                    <div class="customer__type">ИП</div>
                    <div class="customer__name">{{ item.name }}</div>
                    <div class="customer__buttons">
                        <div
                                class="customer__button"
                                @click.stop="onEdit('entrepreneur', 'entrepreneurs', index)"
                        >
                            <icon-base width="32"
                                       height="32"
                                       iconName="Редактировать контрагента"
                            >
                                <icon-edit :showBackground="true" backgroundColor="#fefefe"/>
                            </icon-base>
                        </div>
                        <div
                                v-if="item.actions.delete.allow"
                                class="customer__button"
                                @click.stop="onRemove('entrepreneur', 'entrepreneurs', index)"
                        >
                            <icon-base
                                    width="32"
                                    height="32"
                                    iconName="Удалить контрагента"
                            >
                                <icon-delete :showBackground="true" backgroundColor="#fefefe"/>
                            </icon-base>
                        </div>
                    </div>
                </div>

                <div
                        v-for="item, index in individuals"
                        class="customer"
                        @click="onCustomerClick('individuals', index)"
                >
                    <div class="customer__type">Физ. лицо</div>
                    <div class="customer__name">{{ item.name }}</div>
                    <div class="customer__buttons">
                        <div
                                class="customer__button"
                                @click.stop="onEdit('individual', 'individuals', index)"
                        >
                            <icon-base width="32"
                                       height="32"
                                       iconName="Редактировать контрагента"
                            >
                                <icon-edit :showBackground="true" backgroundColor="#fefefe"/>
                            </icon-base>
                        </div>
                        <div
                                v-if="item.actions.delete.allow"
                                class="customer__button"
                                @click.stop="onRemove('individual', 'individuals', index)"
                        >
                            <icon-base
                                    width="32"
                                    height="32"
                                    iconName="Удалить контрагента"
                            >
                                <icon-delete :showBackground="true" backgroundColor="#fefefe"/>
                            </icon-base>
                        </div>
                    </div>
                </div>

                <div class="add-customer-btn" title="Добавить контрагента" @click="onAddCustomerClick">
                    <img src="/images/common/add-item.svg" />
                </div>
            </div>
            <create-customer
                    v-else-if="!hasCustomers || creatingCustomer"
                    :hasCustomers="hasCustomers"
                    @cancel="onCreateCancel"
                    @create-legal-entity="onCreateLegalEntity"
                    @create-entrepreneur="onCreateEntrepreneur"
                    @create-individual="onCreateIndividual"
            />
            <edit-customer
                v-else-if="editingCustomer"
                :entity="editedCustomer.entity"
                :customer="editedCustomer.item"
                @cancel="onCancelEdit"
                @edit-customer="onCustomerEdit"
            />
        </transition>
    </div>
</template>
<script>
    import createCustomer from './create/create.vue';
    import editCustomer from './edit/edit.vue';
    import IconBase from 'Components/icons/IconBase.vue'
    import IconEdit from 'Components/icons/edit.vue'
    import IconDelete from 'Components/icons/delete.vue'

    export default {
        props: {
            items: Object,
            headerEntity: {
                type: String,
                default: 'заказчика'
            }
        },
        data() {
            return {
                creatingCustomer: false,
                editedCustomer: {
                    entity: null,
                    group: null,
                    index: null,
                    item: null
                }
            }
        },
        computed: {
            legalEntities() {
                return this.items.legal_entities
            },
            entrepreneurs() {
                return this.items.entrepreneurs
            },
            individuals() {
                return this.items.individuals
            },
            hasCustomers() {
                return this.legalEntities.length > 0
                    || this.entrepreneurs.length > 0
                    || this.individuals.length > 0
            },
            editingCustomer() {
                return this.editedCustomer.entity && this.editedCustomer.group && this.editedCustomer.index !== null;
            }
        },
        watch: {
            editingCustomer(value, oldValue) {
                this.$emit('editing-customer-watch', !!value)
            }
        },
        methods: {
            onCreateLegalEntity(data) {
                this.$emit('create-legal-entity', data)
            },
            onCreateEntrepreneur(data) {
                this.$emit('create-entrepreneur', data)
            },
            onCreateIndividual(data) {
                this.$emit('create-individual', data)
            },
            onCustomerEdit(data) {
                this.$emit('edit-customer', data)
            },
            onCustomerClick(group, index) {
                this.$emit('customer-click', {group: group, index: index})
            },
            onAddCustomerClick() {
                this.creatingCustomer = true;
            },
            onCreateCancel() {
                this.creatingCustomer = false;
            },
            onRemove(entityName, groupName, index) {
                const itemId = this.items[groupName][index].id;
                this.$emit('customer-remove', {entityName: entityName, itemId: itemId})
            },
            onEdit(entityName, groupName, index) {
                this.editedCustomer.entity = entityName;
                this.editedCustomer.group = groupName;
                this.editedCustomer.index = index;
                this.editedCustomer.item = this.items[groupName][index];
            },
            onCancelEdit() {
                this.editedCustomer.entity = null;
                this.editedCustomer.group = null;
                this.editedCustomer.index = null;
            }
        },
        components: {
            createCustomer,
            editCustomer,
            IconBase,
            IconEdit,
            IconDelete
        }
    }
</script>
<style lang="stylus">

</style>