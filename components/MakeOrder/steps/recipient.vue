<template>
    <div class="recipient-manager">
        <transition name="fade" mode="out-in">
            <customers
                    v-if="!needPassport"
                    :items="items"
                    headerEntity="получателя"
                    @create-legal-entity="onCreateLegalEntity"
                    @create-entrepreneur="onCreateEntrepreneur"
                    @create-individual="onCreateIndividual"
                    @edit-customer="onEditCustomer"
                    @customer-click="onRecipientClick"
                    @customer-remove="onCustomerRemove"
                    @editing-customer-watch="onEditingCustomerWatch"
            />
            <need-passport
                    v-else
                    @cancel="onNeedPassportCancel"
                    @save-passport="onSavePassport"
            />
        </transition>
        <button
                v-if="!needPassport && !editingCustomer"
                class="recipient-manager__cancel-btn"
                @click="onCancel"
        >
            Назад
        </button>
    </div>
</template>
<script>
    import customers from 'Components/Customers/Customers.vue'
    import needPassport from './_needPassport.vue'

    export default {
        props: {
            items: Object
        },
        data() {
            return {
                needPassport: null,
                selectedItem: {
                    group: null,
                    index: null
                },
                editingCustomer: false
            }
        },
        methods: {
            onCancel() {
                this.$emit('cancel')
            },
            onCreateLegalEntity(data) {
                this.$emit('create-legal-entity', data)
            },
            onCreateEntrepreneur(data) {
                this.$emit('create-entrepreneur', data)
            },
            onCreateIndividual(data) {
                this.$emit('create-individual', data)
            },
            onEditCustomer(data) {
                this.$emit('edit-customer', data)
            },
            onEditingCustomerWatch(value) {
                this.editingCustomer = value;
            },
            onRecipientClick({group, index}) {
                if (this.isPassportNeeded({group, index})) {
                    this.selectedItem.group = group;
                    this.selectedItem.index = index;
                    this.needPassport = true;
                } else {
                    this.$emit('recipient-click', {group, index});
                }
            },
            onCustomerRemove({entityName, itemId}) {
                this.$emit('customer-remove', {entityName, itemId})
            },
            isPassportNeeded({group, index}) {
                if (group === 'individuals') {
                    return !this.items[group][index].passport;
                } else {
                    return false;
                }
            },
            onNeedPassportCancel() {
                this.needPassport = false;
            },
            onSavePassport(value) {
                this.$emit('save-passport', {
                    value: value,
                    group: this.selectedItem.group,
                    index: this.selectedItem.index
                })
            }
        },
        components: {
            customers, needPassport
        }
    }
</script>