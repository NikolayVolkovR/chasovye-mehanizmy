<template>
    <need-login v-if="userStatus === 'guest'"/>
    <div
            key="order"
            class="make-order"
            v-else
    >
        <order-menu
                v-if="step < 4"
                :step="step"
                :steps="steps"
                @menu-item-click="onMenuItemClick"
        />
        <transition name="fade" mode="out-in">
            <customer-step
                    v-if="loaded && step === 0"
                    :items="userCustomers"
                    key="customer"
                    @create-legal-entity="onCreateLegalEntity"
                    @create-entrepreneur="onCreateEntrepreneur"
                    @create-individual="onCreateIndividual"
                    @edit-customer="onEditCustomer"
                    @customer-click="onCustomerClick"
                    @customer-remove="onCustomerRemove"
            />
            <delivery-step
                    v-else-if="loaded && step === 1"
                    :items="userDeliveries"
                    :types="deliveryTypes"
                    key="delivery"
                    @cancel="onDeliveryCancel"
                    @create="onDeliveryCreate"
                    @update="onDeliveryUpdate"
                    @remove="onDeliveryRemove"
                    @delivery-click="OnDeliveryClick"
            />
            <recipient-step
                    v-else-if="loaded && step === 2"
                    :items="userCustomers"
                    @cancel="onRecipientCancel"
                    @create-legal-entity="onCreateLegalEntityRecipient"
                    @create-entrepreneur="onCreateEntrepreneurRecipient"
                    @create-individual="onCreateIndividualRecipient"
                    @edit-customer="onEditCustomer"
                    @recipient-click="onRecipientClick"
                    @customer-remove="onCustomerRemove"
                    @save-passport="onSavePassport"
            />
            <confirm-step
                    v-else-if="loaded && step === 3"
                    :customer="selectedCustomerItem"
                    :customerType="selectedCustomer.group"
                    :delivery="selectedDeliveryItem"
                    :recipient="selectedRecipientItem"
                    :recipientType="selectedRecipient.group"
                    @cancel="onConfirmCancel"
                    @confirm="onConfirm"
            />
            <div v-else key="loading" class="loading-wrap">
                <font-awesome-icon icon="spinner" spin  size="lg"/>
            </div>
        </transition>
    </div>
</template>
<script>
    import needLogin from 'Components/MakeOrder/needLogin.vue'
    import orderMenu from 'Components/MakeOrder/menu.vue'
    import customerStep from 'Components/Customers/Customers.vue'
    import deliveryStep from 'Components/Deliveries/Deliveries.vue'
    import recipientStep from './steps/recipient.vue'
    import confirmStep from './steps/confirm.vue'

    export default {
        created() {
            this.getUserStatus();
        },
        data() {
            return {
                step: 0,
                steps: [
                    {
                        label: 'Заказчик',
                        name: 'customerStep'
                    },
                    {
                        label: 'Доставка',
                        name: 'deliveryStep'
                    },
                    {
                        label: 'Получатель',
                        name: 'recipientStep'
                    },
                    {
                        label: 'Подтверждение',
                        name: 'confirmStep'
                    },
                    {
                        label: 'Финиш',
                        name: 'finishStep'
                    }
                ],
                selectedCustomer: {
                    group: null,
                    index: null
                },
                selectedDelivery: {
                    index: null
                },
                selectedRecipient: {
                    group: null,
                    index: null
                },
                customerJustCreatedGroup: null,
                recipientJustCreatedGroup: null,
                deliveryJustCreated: false,
                orderCreating: false
            }
        },
        computed: {
            userStatus() {
                return this.$store.getters.userStatus;
            },
            userStatusLoaded() {
                return this.userStatus !== null;
            },
            userCustomers() {
                return this.$store.getters.userCustomers;
            },
            userOrdersQuantity() {
                return this.$store.getters.userOrdersQuantity;
            },
            deliveryTypes() {
                return this.$store.getters.deliveryTypes;
            },
            userDeliveries() {
                return this.$store.getters.userDeliveries;
            },
            userCustomersLoaded() {
                return this.userCustomers !== null;
            },
            loaded() {
                return this.userStatusLoaded && this.userCustomersLoaded && !this.orderCreating
            },
            stepComponentName() {
                return this.steps[this.step].name
            },
            selectedCustomerItem() {
                let group = this.selectedCustomer.group,
                    index = this.selectedCustomer.index;

                if (group && index !== null) {
                    return this.userCustomers[group][index];
                }
                return null;
            },
            selectedDeliveryItem() {
                const index = this.selectedDelivery.index;

                if (index !== null) {
                    return this.userDeliveries[index];
                }
                return null;
            },
            selectedRecipientItem() {
                let group = this.selectedRecipient.group,
                    index = this.selectedRecipient.index;

                if (group && index !== null) {
                    return this.userCustomers[group][index];
                }
                return null;
            },
        },
        watch: {
            userStatus(value, oldValue) {
                if (value === 'user') {
                    this.getUserCustomers();
                    this.getDeliveryTypes();
                    this.getUserDeliveries();
                    this.getUserOrdersQuantity();
                }
            },
            userCustomers(value, oldValue) {
                if (
                    value !== null
                    && this.customerJustCreatedGroup
                ) {
                    const groupName = this.customerJustCreatedGroup;
                    const index = this.userCustomers[groupName].length - 1;
                    this.step += 1;
                    this.selectedCustomer.group = groupName;
                    this.selectedCustomer.index = index;
                    this.customerJustCreatedGroup = null;
                } else if (
                    value !== null
                    && this.recipientJustCreatedGroup
                ) {
                    const groupName = this.recipientJustCreatedGroup;
                    const index = this.userCustomers[groupName].length - 1;
                    this.step += 1;
                    this.selectedRecipient.group = groupName;
                    this.selectedRecipient.index = index;
                    this.recipientJustCreatedGroup = null;
                }
            },
            userDeliveries(value, oldValue) {
                if (
                    value !== null
                    && this.deliveryJustCreated
                ) {
                    this.step += 1;
                    this.selectedDelivery.index = this.userDeliveries.length - 1;
                    this.deliveryJustCreated = false;
                }
            },
            userOrdersQuantity(value, oldValue) {
                if (this.orderCreating) {
                    this.orderCreating = false;
                    this.$emit('order-created')
                }
            }
        },
        methods: {
            getUserStatus() {
                this.$store.dispatch('getUserStatus');
            },
            getUserCustomers() {
                this.$store.dispatch('getUserCustomers')
            },
            getDeliveryTypes() {
                this.$store.dispatch('getDeliveryTypes');
            },
            getUserDeliveries() {
                this.$store.dispatch('getUserDeliveries');
            },
            getUserOrdersQuantity() {
                this.$store.dispatch('getUserOrdersQuantity');
            },

            onCreateLegalEntity(data) {
                this.$store.dispatch('customerCreate', data);
                this.customerJustCreatedGroup = 'legal_entities';
            },
            onCreateEntrepreneur(data) {
                this.$store.dispatch('customerCreate', data);
                this.customerJustCreatedGroup = 'entrepreneurs';
            },
            onCreateIndividual(data) {
                this.$store.dispatch('customerCreate', data);
                this.customerJustCreatedGroup = 'individuals';
            },

            onCreateLegalEntityRecipient(data) {
                this.$store.dispatch('customerCreate', data);
                this.recipientJustCreatedGroup = 'legal_entities';
            },
            onCreateEntrepreneurRecipient(data) {
                this.$store.dispatch('customerCreate', data);
                this.recipientJustCreatedGroup = 'entrepreneurs';
            },
            onCreateIndividualRecipient(data) {
                this.$store.dispatch('customerCreate', data);
                this.recipientJustCreatedGroup = 'individuals';
            },

            onEditCustomer(data) {
                this.$store.dispatch('customerEdit', data);
            },
            onCustomerRemove({entityName, itemId}) {
                if (this.steps[this.step].name ===  'recipientStep') {
                    let group = this.getGroupByEntity(entityName),
                        index = this.userCustomers[group].findIndex(customer=>customer.id === itemId);

                    if (this.selectedCustomer.group === group && this.selectedCustomer.index === index) {
                        alert('Нельзя удалить этого получателя, т.к. он выбран в качестве заказчика');
                        return false;
                    }
                }
                this.$store.dispatch('customerDelete',{entityName, itemId})
            },

            onDeliveryCreate({fields}) {
                this.$store.dispatch('deliveryCreate', fields);
                this.deliveryJustCreated = true;
            },
            onDeliveryUpdate({itemId, fields}) {
                this.$store.dispatch('deliveryUpdate', {itemId, fields});
            },
            onDeliveryRemove({itemId}) {
                this.$store.dispatch('deliveryDelete', {itemId: itemId})
            },

            onMenuItemClick(index) {
                this.step = index;
                if (index === 0) {
                    this.selectedCustomer.group = null;
                    this.selectedCustomer.index = null;

                    this.selectedDelivery.index = null;

                    this.selectedRecipient.group = null;
                    this.selectedRecipient.index = null;
                } else if (index === 1) {
                    this.selectedDelivery.index = null;

                    this.selectedRecipient.group = null;
                    this.selectedRecipient.index = null;
                } else if (index === 2) {
                    this.selectedRecipient.group = null;
                    this.selectedRecipient.index = null;
                }
            },
            onCustomerClick({group, index}) {
                this.selectedCustomer.group = group;
                this.selectedCustomer.index = index;
                this.step += 1;
            },
            OnDeliveryClick(index) {
                this.selectedDelivery.index = index;
                this.step += 1;
            },
            onRecipientClick({group, index}) {
                this.selectedRecipient.group = group;
                this.selectedRecipient.index = index;
                this.step += 1;
            },

            onSavePassport({value, group, index}) {
                let itemId = this.userCustomers[group][index].id;
                this.$store.dispatch('saveIndividualPassport', {
                    itemId: itemId, value: value
                });
                this.recipientJustCreatedGroup = 'individuals';
            },

            onDeliveryCancel() {
                this.step -= 1;
                this.selectedCustomer.group = null;
                this.selectedCustomer.index = null;
            },
            onRecipientCancel() {
                this.step -= 1;
                this.selectedDelivery.group = null;
                this.selectedDelivery.index = null;
            },
            onConfirmCancel() {
                this.step -= 1;
                this.selectedRecipient.group = null;
                this.selectedRecipient.index = null;
            },

            onConfirm() {
                this.$store.dispatch('makeOrder', {
                    customer_entity: this.getEntityByGroup(this.selectedCustomer.group),
                    customer_id: this.selectedCustomerItem.id,
                    delivery_id: this.selectedDeliveryItem.id,
                    recipient_entity: this.getEntityByGroup(this.selectedRecipient.group),
                    recipient_id: this.selectedRecipientItem.id,
                });
                this.orderCreating = true;
            },

            getGroupByEntity(entityName) {
                switch(entityName) {
                    case 'legalEntity':
                        return 'legal_entities';
                        break;
                    case 'entrepreneur':
                        return 'entrepreneurs';
                        break;
                    case 'individual':
                        return 'individuals';
                        break;
                }
            },
            getEntityByGroup(groupName) {
                switch(groupName) {
                    case 'legal_entities':
                        return 'LegalEntity';
                        break;
                    case 'entrepreneurs':
                        return 'Entrepreneur';
                        break;
                    case 'individuals':
                        return 'Individual';
                        break;
                }
            }
        },
        components: {
            needLogin,
            orderMenu,
            customerStep,
            deliveryStep,
            recipientStep,
            confirmStep,
        }
    }
</script>
<style lang="stylus">
    .make-order {
        position: relative;
        padding: 20px;
        outline: none;
        header {
            color: #333333;
            font-family: "Alegreya Sans";
            font-size: 20px;
            text-transform: uppercase;
            text-align: center;
            margin: 50px 0 0;
            font-weight: bold;
            &.soft {
                font-weight: normal;
                text-transform: none;
                font-size: 22px;
            }
            &.sub {
                font-weight: normal;
                text-transform: none;
                font-size: 22px;
                margin-top: 15px;
            }
        }
        .s-form__buttons {
            margin-top: 30px;
            display: flex;
            justify-content: center
            .s-form__button {
                display: block;
                color: #888;
                transition: all .3s;
                margin: 0 20px;
                &.s-form__button_active {
                    background: #639355;
                    color: #fff;
                    cursor: pointer;
                }
            }
            .s-form__cancel-button {
                background: #567f96;
                color: #fff;
                cursor: pointer;
            }
        }
        .customer-manager {
            position: relative;
            .customers {
                position: relative;
                display: flex;
                justify-content: center;
                flex-wrap: wrap;
                box-sizing: border-box;
                margin: 20px 0 0;
                >.customer {
                    position: relative;
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    justify-content: center;
                    width: 33%;
                    border: solid 4px #e19ae5
                    border-radius: 5px;
                    padding: 52px 20px 20px;
                    margin: 10px;
                    cursor: pointer;
                    transition: all .3s;
                    text-align: center;
                    font-family: "Alegreya Sans";
                    font-size: 20px;
                    color: #333333;
                    div {
                        text-align: center;
                        font-family: "Alegreya Sans";
                        font-size: 18px;
                        color: #333333;
                    }
                    .customer__type {
                        margin-bottom: 5px;
                    }
                    .customer__name {
                        font-weight: bold
                    }
                    &:hover {
                        //transform: scale(1.05);
                        border-color: #c489c9;
                        .customer__buttons{
                            //top: -24px;
                            //opacity: 1;
                        }
                    }
                    .customer__buttons {
                        display: flex;
                        justify-content: flex-end;
                        width: 69px;
                        transition: all .3s;
                        position: absolute;
                        right: -2px;
                        top: -2px;
                        //opacity: 0;
                        .customer__button {
                            transition: all .3s;
                            &:hover {
                                transform: scale(1.1);
                            }
                            &:last-child {
                                margin-left: 5px;
                            }
                        }
                    }
                }
                .add-customer-btn {
                    display: flex;
                    align-items: flex-end;
                    margin: 10px;
                    width: 50px;
                    cursor: pointer;
                    img {
                        width: 100%;
                    }
                }

            }
        }
        .delivery-manager {
            position: relative;
            .deliveries {
                position: relative;
                display: flex;
                justify-content: center;
                flex-wrap: wrap;
                box-sizing: border-box;
                margin: 20px 0 0;
                >.delivery {
                    position: relative;
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    justify-content: center;
                    width: 28%;
                    border: solid 4px #e19ae5
                    border-radius: 5px;
                    padding: 42px 10px 10px;
                    margin: 10px;
                    cursor: pointer;
                    transition: all .3s;
                    text-align: center;
                    font-family: "Alegreya Sans";
                    font-size: 20px;
                    color: #333333;
                    div {
                        text-align: center;
                        font-family: "Alegreya Sans";
                        font-size: 18px;
                        color: #333333;
                    }
                    .delivery__type {
                        margin-bottom: 5px;
                    }
                    .delivery__address {
                        font-weight: bold
                    }
                    &:hover {
                        //transform: scale(1.05);
                        border-color: #c489c9;
                        .delivery__buttons{
                            //top: -24px;
                            //opacity: 1;
                        }
                    }
                    .delivery__buttons {
                        display: flex;
                        justify-content: flex-end;
                        width: 69px;
                        transition: all .3s;
                        position: absolute;
                        right: 0px;
                        top: 0px;
                        //opacity: 0;
                        .delivery__button {
                            transition: all .3s;
                            &:hover {
                                transform: scale(1.1);
                            }
                            &:last-child {
                                margin-left: 5px;
                            }
                        }
                    }
                }

                .add-delivery-btn {
                    display: flex;
                    align-items: flex-end;
                    margin: 10px;
                    width: 50px;
                    cursor: pointer;
                    img {
                        width: 100%;
                    }
                }

            }
            .create-delivery, .edit-delivery {
                .create-delivery__fields, .edit-delivery__fields {
                    margin: 20px auto 0;
                    position: relative;
                    .s-input, .s-select {
                        display: flex;
                        justify-content: center;
                        margin: 10px 0;
                        position: relative;
                        .s-input__label, .s-select__label {
                            flex-basis: 30%;
                            text-align: right;
                            margin-top: 9px;
                        }
                        .s-input__input-message, .s-select__input-message {
                            flex-basis: 70%;
                            max-width: 200px;
                            padding: 0 10px;
                            input, select {
                                width: 100%;
                                padding: 7px 10px;
                                border: solid 1px #3f6b30;
                                border-radius: 5px;
                                font-size: 16px;
                                outline: none;
                            }
                            .s-input__hint {
                                font-size: 13px;
                                color: #888;
                            }
                            .s-input__message {
                                margin: 5px 0 20px;
                                font-size: 13px;
                                font-family: "Century Gothic";
                                color: #AF4925;
                            }
                            .s-select__message {
                                margin: 10px 0;
                                font-size: 13px;
                                font-family: "Century Gothic";
                                color: #333;
                            }
                        }
                        .s-select__input-message {
                            margin-right: 21px;
                        }
                        .s-input__icon-wrap {
                            width: 21px;
                            height: 21px;
                            margin-top: 5px;
                        }
                    }
                }
            }
            .delivery-manager__cancel-btn {
                position: relative;
                display: block;
                margin: 30px auto 0;
                background: #567f96;
                color: #fff;
                cursor: pointer;
            }
        }
        .recipient-manager {
            .s-form {
                margin: 20px auto 0;
                position: relative;
                .s-input, .s-select {
                    display: flex;
                    justify-content: center;
                    margin: 10px 0;
                    position: relative;
                    .s-input__label, .s-select__label {
                        flex-basis: 30%;
                        text-align: right;
                        margin-top: 9px;
                    }
                    .s-input__input-message, .s-select__input-message {
                        flex-basis: 70%;
                        max-width: 200px;
                        padding: 0 10px;
                        input, select {
                            width: 100%;
                            padding: 7px 10px;
                            border: solid 1px #3f6b30;
                            border-radius: 5px;
                            font-size: 16px;
                            outline: none;
                        }
                        .s-input__hint {
                            font-size: 13px;
                            color: #888;
                        }
                        .s-input__message {
                            margin: 5px 0 20px;
                            font-size: 13px;
                            font-family: "Century Gothic";
                            color: #AF4925;
                        }
                        .s-select__message {
                            margin: 10px 0;
                            font-size: 13px;
                            font-family: "Century Gothic";
                            color: #333;
                        }
                    }
                    .s-select__input-message {
                        margin-right: 21px;
                    }
                    .s-input__icon-wrap {
                        width: 21px;
                        height: 21px;
                        margin-top: 5px;
                    }
                }
            }
            .recipient-manager__cancel-btn {
                position: relative;
                display: block;
                margin: 30px auto 0;
                background: #567f96;
                color: #fff;
                cursor: pointer;
            }
        }
    }
</style>