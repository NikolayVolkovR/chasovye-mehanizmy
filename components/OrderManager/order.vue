<template>
    <div class="order-manager__order">
        <div class="order__id-date order__column">
            <div class="id-date__id"># {{ order.id }}</div>
            <div class="id-date__date">{{ createdAt }}</div>
            <div class="id-date__day">{{ createdAtDay }}</div>
            <div class="id-date__buttons">
                <div
                        v-show="!isFinished"
                        class="buttons__set-finished"
                        @click="onSetFinishedClick"
                >
                    <icon-base width="26" height="26" iconName='Установить статус "Заказ выполнен"'><icon-set-accomplished /></icon-base>
                </div>
                <div
                        v-show="!isInWork"
                        class="buttons__set-active"
                        @click="onSetActiveClick"
                >
                    <icon-base width="26" height="26" iconName='Установить статус "Заказ в работе"'><icon-set-active /></icon-base>
                </div>
                <div
                        v-show="!isUnfinished"
                        class="buttons__set-unfinished"
                        @click="onSetUnfinishedClick"
                >
                    <icon-base width="26" height="26" iconName='Установить статус "Заказ не выполнен"'><icon-set-outstanding /></icon-base>
                </div>
                <div class="buttons__delete" @click="onDeleteClick">
                    <icon-base width="26" height="26" iconName="Удалить заказ"><icon-delete /></icon-base>
                </div>
            </div>
        </div>
        <div class="order__client order__column">
            <div class="client__line">ID: {{ order.user.id }}</div>
            <div class="client__line">{{ order.user.email }}</div>
            <div class="client__type">{{ order.customer.type_rus }}</div>
            <div class="client__line client__name">{{ order.customer.name }}</div>
            <div class="client__line" v-if="order.customer.phone">{{ order.customer.phone }}</div>
            <div class="client__buttons client__line">
                <div class="buttons__edit button" @click="onEditCustomerClick" >
                    <icon-base width="26" height="26" iconName="Редактировать данные заказчика">
                        <icon-edit />
                    </icon-base>
                </div>
                <a
                        class="buttons__download button"
                        v-show="order.customer.details_file"
                        :href="order.customer.details_file"
                        target="_blank"
                >
                    <icon-base width="26" height="26" iconName="Скачать реквизиты"><icon-download/></icon-base>
                </a>
            </div>
            <modal v-if="flags.editCustomer" @close="onCustomerEditCancel">
                <edit-customer
                        :entity="customerEntityName"
                        :customer="order.customer"
                        @cancel="onCustomerEditCancel"
                        @edit-customer="onCustomerEditSubmit"
                />
            </modal>
        </div>
        <div class="order__products order__column">
            <product
                    v-for="product, index in products"
                    :key="product.entity + product.name + product.quantity"
                    :product="product"
                    :index="index"
                    @remove="onProductRemove"
                    @edit="onProductEdit"
            />
            <div class="products-add-btn button" @click="onAddProductClick">
                <icon-base width="26" height="26" iconName="Добавить товар">
                    <icon-plus />
                </icon-base>
            </div>

            <modal
                    v-if="flags.addProduct"
                    @close="onAddProductClose"
                    title="Добавить продукт"
                    mode="full_screen"
            >
                <product-add
                    @add-product="onProductAdd"
                />
            </modal>
        </div>
        <div class="order__pay order__column">
            <div class="pay__amount">Сумма: <b>{{ order.amount }}</b>&nbsp;р</div>
            <select
                    class="pay__status"
                    :class="payStatusSelectClass"
                    @change="onPayStatusChange($event)"
                    :value="payStatus"
            >
                <option value="0">Счёт не отправлен</option>
                <option value="1">Счёт отправлен</option>
                <option value="2">Оплачен</option>
            </select>
            <div class="pay__invoice" v-if="payStatus !== 0">
                <div class="invoice__value">Счёт: {{ order.invoice }}</div>
                <div class="invoice__edit button" @click="setEditInvoice" >
                    <icon-base width="26" height="26" iconName="Редактировать счёт">
                        <icon-edit />
                    </icon-base>
                </div>
            </div>
            <div class="pay__payment" v-if="payStatus === 2">
                <div class="payment__value">ПП: {{ order.payment }}</div>
                <div class="payment__edit button" @click="setEditPayment" >
                    <icon-base width="26" height="26" iconName="Редактировать платёжное поручение">
                        <icon-edit />
                    </icon-base>
                </div>
            </div>
            <div class="pay__reserve" v-show="payStatus !== 2">
                <div class="reserve__header" v-show="order.is_reserved && reserve > 0"><b>Резерв:</b> {{ reserve }} {{ dayWord }}</div>
                <div class="reserve__header reserve__header_zero" v-show="order.is_reserved && reserve === 0"><b>Резерв:</b> истекает сегодня</div>
                <div class="reserve__header reserve__header_expired" v-show="order.is_reserved && reserve < 0">
                    <b>Резерв:</b> истёк {{ Math.abs(reserve) }} {{ dayWord }} назад
                </div>
                <div class="reserve__header" v-show="!order.is_reserved"><b>Резерв:</b> не установлен</div>
                <div class="reserve__plus button" v-show="order.is_reserved" @click="onPlusReserveClick">
                    <icon-base width="26" height="26" iconName="Резерв +1 день"><icon-reserve-plus/></icon-base>
                </div>
                <div class="reserve__remove button" v-show="order.is_reserved" @click="onResetReserveClick">
                    <icon-base width="26" height="26" iconName="Снять резерв"><icon-reserve-remove/></icon-base>
                </div>
                <div class="reserve__set button" v-show="!order.is_reserved" @click="onSetReserveClick">
                    <icon-base width="26" height="26" iconName="Установить резерв"><icon-reserve-set/></icon-base>
                </div>
            </div>

            <modal
                    title="Введите номер и дату счёта"
                    v-if="editInvoice.fields !== null"
                    @close="onEditInvoiceClose"
            >
                <s-form
                        :fields="editInvoice.fields"
                        buttonText="Сохранить"
                        :cancelButton="true"
                        cancelButtonText="Отмена"
                        @cancel="onEditInvoiceClose"
                        @field-input="onEditInvoiceInput"
                        @submit="onEditInvoiceSubmit"
                />
            </modal>
            <modal
                    title="Введите номер и дату ПП"
                    v-if="editPayment.fields !== null"
                    @close="onEditPaymentClose"
            >
                <s-form
                        :fields="editPayment.fields"
                        buttonText="Сохранить"
                        :cancelButton="true"
                        cancelButtonText="Отмена"
                        @cancel="onEditPaymentClose"
                        @field-input="onEditPaymentInput"
                        @submit="onEditPaymentSubmit"
                />
            </modal>
        </div>
        <div class="order__delivery-recipient order__column">
            <div class="order__delivery">
                <div class="delivery__wrap">
                    <div class="delivery__type">{{order.delivery.deliveryType.name}}</div>
                    <div class="delivery__address" v-show="order.delivery.deliveryType.pickup !== 1">
                        <b>Адрес:</b> {{order.delivery.address}}
                    </div>
                </div>
                <div class="delivery__buttons">
                    <div class="buttons__edit button" @click="onEditDeliveryClick" >
                        <icon-base width="26" height="26" iconName="Редактировать данные заказчика">
                            <icon-edit />
                        </icon-base>
                    </div>
                </div>
            </div>
            <div class="order__recipient">
                <div class="recipient__wrap">
                    <div class="recipient__name">
                        <b>Получатель:</b> {{ order.recipient.type_rus }}.<br/>{{ order.recipient.name }}
                    </div>
                    <div class="recipient__passport" v-show="order.recipient.passport">
                        <b>Паспорт:</b> {{ order.recipient.passport }}
                    </div>
                </div>
                <div class="recipient__buttons">
                    <div class="buttons__edit button" @click="onEditRecipientClick" >
                        <icon-base width="26" height="26" iconName="Редактировать данные поучателя">
                            <icon-edit />
                        </icon-base>
                    </div>
                </div>
            </div>
            <modal v-if="flags.editDelivery && deliveryTypes" @close="onDeliveryEditCancel">
                <edit-delivery
                        :item="order.delivery"
                        :types="deliveryTypes"
                        @cancel="onDeliveryEditCancel"
                        @submit="onDeliveryEditSubmit"
                />
            </modal>
            <modal v-if="flags.editRecipient" @close="onRecipientEditCancel">
                <edit-customer
                        :entity="recipientEntityName"
                        :customer="order.recipient"
                        headerName="получателя"
                        @cancel="onRecipientEditCancel"
                        @edit-customer="onRecipientEditSubmit"
                />
            </modal>
            <select
                    class="delivery__status"
                    :class="deliveryStatusSelectClass"
                    @change="onDeliveryStatusChange($event)"
                    :value="deliveryStatus"
            >
                <option value="0">Нет действий</option>
                <option value="1">На упаковке</option>
                <option value="2">Упакован</option>
                <option value="3">Отправлен</option>
            </select>
            <div class="delivery__scheduled" v-show="deliveryStatus === 2">
                <div>
                    Отгрузка запланирована на:
                </div>
                <date-picker
                        v-model="deliveryScheduled"
                        lang="ru"
                        @input="onDeliveryScheduledInput"
                />
            </div>
            <modal
                    title="Введите номер и дату отправления"
                    v-if="editDeliveryNumber.fields !== null"
                    @close="onEditDeliveryNumberClose"
            >
                <s-form
                        :fields="editDeliveryNumber.fields"
                        buttonText="Сохранить"
                        :cancelButton="true"
                        cancelButtonText="Отмена"
                        @cancel="onEditDeliveryNumberClose"
                        @field-input="onEditDeliveryNumberInput"
                        @submit="onEditDeliveryNumberSubmit"
                />
            </modal>
            <div class="delivery__number" v-if="deliveryStatus === 3">
                <div class="delivery-number__value">№ отправления: {{ order.delivery_number }}</div>
                <div class="delivery-number__edit button" @click="setEditDeliveryNumber" >
                    <icon-base width="26" height="26" iconName="Редактировать номер отправления">
                        <icon-edit />
                    </icon-base>
                </div>
            </div>
            <transition name="fade">
                <div class="notifications" v-if="deliveryStatus !== 0">
                    <header>Уведомления</header>
                    <div class="notification">
                        <div class="notification-name">На упаковке</div>
                        <div class="notification-icon" :class="packingNoticeClass" @click="onNoticeClick('is_packing_notice')">
                            <icon-base width="26" height="26" :iconName="packingNoticeTitle">
                                <component :is="packingNoticeIcon"/>
                            </icon-base>
                        </div>
                    </div>
                    <div class="notification">
                        <div class="notification-name">Упакован</div>
                        <div class="notification-icon" :class="packedNoticeClass" @click="onNoticeClick('is_packed_notice')">
                            <icon-base width="26" height="26" :iconName="packedNoticeTitle">
                                <component :is="packedNoticeIcon"/>
                            </icon-base>
                        </div>
                    </div>
                    <div class="notification">
                        <div class="notification-name">Отправлен</div>
                        <div class="notification-icon" :class="sentNoticeClass" @click="onNoticeClick('is_sent_notice')">
                            <icon-base width="26" height="26" :iconName="sentNoticeTitle">
                                <component :is="sentNoticeIcon"/>
                            </icon-base>
                        </div>
                    </div>
                    <div class="notification">
                        <div class="notification-name">Резерв истекает</div>
                        <div class="notification-icon" :class="reserveNoticeClass" @click="onNoticeClick('is_reserve_notice')">
                            <icon-base width="26" height="26" :iconName="reserveNoticeTitle">
                                <component :is="reserveNoticeIcon"/>
                            </icon-base>
                        </div>
                    </div>
                </div>
            </transition>
        </div>
        <transition name="fade">
            <div class="order__shadow" v-if="order.loading">
                <div class="shadow__fill"></div>
                <font-awesome-icon icon="spinner" spin  size="lg"/>
            </div>
        </transition>
    </div>
</template>

<script>
    import Modal from 'Components/common/Modal/modal.vue'
    import SForm from 'Components/common/SForm/SForm.vue'
    import IconBase from 'Components/icons/IconBase.vue'
    import IconEdit from 'Components/icons/edit.vue'
    import IconPlus from 'Components/icons/add.vue'
    import IconReservePlus from 'Components/icons/reserve-plus.vue'
    import IconReserveRemove from 'Components/icons/reserve-remove.vue'
    import IconReserveSet from 'Components/icons/reserve-set.vue'
    import IconDownload from 'Components/icons/download.vue'
    import IconMail from 'Components/icons/mail.vue'
    import IconSent from 'Components/icons/sent.vue'
    import IconSetAccomplished from 'Components/icons/check-square-green.vue'
    import IconSetOutstanding from 'Components/icons/cross-square-red.vue'
    import IconSetActive from 'Components/icons/orders-in-work.vue'
    import IconDelete from 'Components/icons/close.vue'
    import editCustomer from 'Components/Customers/edit/edit.vue'
    import editDelivery from 'Components/Deliveries/edit/edit.vue'
    import DatePicker from 'vue2-datepicker'
    import Product from './product.vue'
    import ProductAdd from './product-add.vue'

    export default {
        created() {
            this.presetDeliveryScheduled();
        },
        props: {
            order: Object,
            index: Number,
            deliveryTypes: Array
        },
        data() {
            return {
                editInvoice: {
                    fields: null
                },
                editPayment: {
                    fields: null
                },
                editDeliveryNumber: {
                    fields: null
                },
                flags: {
                    editCustomer: false,
                    editDelivery: false,
                    editRecipient: false,
                    editDeliveryScheduled: true,
                    addProduct: false
                },
                deliveryScheduled: ''
            }
        },
        computed: {
            createdAt() {
                const date = new Date(this.order.created_at);
                const months = ['янв', 'фев', 'март', 'апр', 'май', 'июнь', 'июль', 'авг', 'сент', 'окт', 'нояб', 'дек'];
                return date.getDate() + ' ' + months[date.getMonth()] + ' ' + date.getFullYear();
            },
            createdAtDay() {
                const date = new Date(this.order.created_at);
                const days = ['вс', 'пн', 'вт', 'ср', 'чт', 'пт', 'сб'];
                return days[date.getDay()];
            },
            products() {
                return JSON.parse(this.order.products);
            },
            payStatusSelectClass() {
                switch (this.order.pay_status) {
                    case 0:
                        return 'not-sent';
                        break;
                    case 1:
                        return 'sent';
                        break;
                    case 2:
                        return 'payed';
                        break;

                }
            },
            deliveryStatusSelectClass() {
                switch (this.order.delivery_status) {
                    case 0:
                        return 'not-action';
                        break;
                    case 1:
                        return 'packing';
                        break;
                    case 2:
                        return 'packed';
                        break;
                    case 3:
                        return 'sent';
                        break;

                }
            },
            payStatus() {
                return this.order.pay_status
            },
            deliveryStatus() {
                return this.order.delivery_status
            },
            reserve() {
                let reserved_to = new Date(this.order.reserved_to).getTime(),
                    now = Date.now(),
                    reserve = reserved_to - now;

                return Math.ceil(reserve / (1000 * 60 * 60 * 24));
            },
            dayWord() {
                const reserve = Math.abs(this.reserve);
                if (reserve === 1) {
                    return 'день';
                } else if (reserve > 1 && reserve < 5) {
                    return 'дня';
                } else {
                    return 'дней'
                }
            },
            customerEntityName() {
                const s = this.order.customer_entity;
                return s.charAt(0).toLowerCase() + s.slice(1)
            },
            recipientEntityName() {
                const s = this.order.recipient_entity;
                return s.charAt(0).toLowerCase() + s.slice(1)
            },

            packingNoticeIcon() {
                return this.order.is_packing_notice ? 'icon-sent' : 'icon-mail';
            },
            packingNoticeClass() {
                return this.order.is_packing_notice ? '' : 'notification-icon_active';
            },
            packingNoticeTitle() {
                return this.order.is_packing_notice ? 'Уведомление отправлено' : 'Отправить уведомление';
            },

            packedNoticeIcon() {
                return this.order.is_packed_notice ? 'icon-sent' : 'icon-mail';
            },
            packedNoticeClass() {
                return this.order.is_packed_notice ? '' : 'notification-icon_active';
            },
            packedNoticeTitle() {
                return this.order.is_packed_notice ? 'Уведомление отправлено' : 'Отправить уведомление';
            },

            sentNoticeIcon() {
                return this.order.is_sent_notice ? 'icon-sent' : 'icon-mail';
            },
            sentNoticeClass() {
                return this.order.is_sent_notice ? '' : 'notification-icon_active';
            },
            sentNoticeTitle() {
                return this.order.is_sent_notice ? 'Уведомление отправлено' : 'Отправить уведомление';
            },

            reserveNoticeIcon() {
                return this.order.is_reserve_notice ? 'icon-sent' : 'icon-mail';
            },
            reserveNoticeClass() {
                return this.order.is_reserve_notice ? '' : 'notification-icon_active';
            },
            reserveNoticeTitle() {
                return this.order.is_reserve_notice ? 'Уведомление отправлено' : 'Отправить уведомление';
            },

            isInWork() {
                return this.order.common_status === 0
            },
            isFinished() {
                return this.order.common_status === 1
            },
            isUnfinished() {
                return this.order.common_status === 2
            },


        },
        watch: {
            payStatus(value, oldValue) {
                if (value === 1) {
                    this.setEditInvoice();
                } else if (value === 2) {
                    this.setEditPayment();
                }
            },
            deliveryStatus(value, oldValue) {
                if (value === 3) {
                    this.setEditDeliveryNumber()
                }
            }
        },
        methods: {
            presetDeliveryScheduled() {
                this.deliveryScheduled = this.order.delivery_scheduled
            },

            onEditCustomerClick() {
                this.flags.editCustomer = true;
            },
            onCustomerEditCancel() {
                this.flags.editCustomer = false;
                this.enableBodyScroll();
            },
            onCustomerEditSubmit({form, entityName, itemId}) {
                const orderIndex = this.index;
                this.$store.dispatch('editCustomerFromOrder', {form, entityName, itemId, orderIndex});
                this.onCustomerEditCancel()
            },

            getDeliveryTypes() {
                if (!this.deliveryTypes) {
                    this.$emit('get-delivery-types')
                }
            },
            onEditDeliveryClick() {
                this.flags.editDelivery = true;
                this.getDeliveryTypes();
            },
            onDeliveryEditCancel() {
                this.flags.editDelivery = false;
                this.enableBodyScroll();
            },
            onDeliveryEditSubmit({fields,  itemId}) {
                const orderIndex = this.index;
                this.$store.dispatch('editDeliveryFromOrder', {fields, itemId, orderIndex});
                this.onDeliveryEditCancel()
            },

            onEditRecipientClick() {
                this.flags.editRecipient = true;
            },
            onRecipientEditCancel() {
                this.flags.editRecipient = false;
                this.enableBodyScroll();
            },
            onRecipientEditSubmit({form, entityName, itemId}) {
                const orderIndex = this.index;
                this.$store.dispatch('editRecipientFromOrder', {form, entityName, itemId, orderIndex});
                this.onRecipientEditCancel()
            },

            onPayStatusChange($event) {
                this.$store.dispatch('orderPayStatusChange', {
                    value: $event.target.value,
                    id: this.order.id,
                    orderIndex: this.index
                });
            },
            onDeliveryStatusChange($event) {
                this.$store.dispatch('orderDeliveryStatusChange', {
                    value: $event.target.value,
                    id: this.order.id,
                    orderIndex: this.index
                });
            },

            setEditInvoice() {
                this.editInvoice.fields = [
                    {
                        name: 'invoice',
                        type: 'text',
                        label: 'Счёт',
                        required: true,
                        maxLength: 255,
                        hint: 'Номер и дата',
                        value: this.order.invoice
                    }
                ];
            },
            onEditInvoiceClose() {
                this.editInvoice.fields = null;
                this.enableBodyScroll();
            },
            onEditInvoiceInput({index, value}) {
                this.editInvoice.fields[0].value = value;
            },
            onEditInvoiceSubmit(data) {
                let value = this.editInvoice.fields[0].value;

                this.$store.dispatch('orderInvoiceChange', {
                    value: value,
                    id: this.order.id,
                    orderIndex: this.index
                });

                this.onEditInvoiceClose();
            },

            setEditPayment() {
                this.editPayment.fields = [
                    {
                        name: 'payment',
                        type: 'text',
                        label: 'ПП',
                        required: true,
                        maxLength: 255,
                        hint: 'Номер и дата',
                        value: this.order.payment
                    }
                ];
            },
            onEditPaymentClose() {
                this.editPayment.fields = null;
                this.enableBodyScroll();
            },
            onEditPaymentInput({index, value}) {
                this.editPayment.fields[0].value = value;
            },
            onEditPaymentSubmit(data) {
                let value = this.editPayment.fields[0].value;

                this.$store.dispatch('orderPaymentChange', {
                    value: value,
                    id: this.order.id,
                    orderIndex: this.index
                });

                this.onEditPaymentClose();
            },

            setEditDeliveryNumber() {
                this.editDeliveryNumber.fields = [
                    {
                        name: 'payment',
                        type: 'text',
                        label: 'Счёт',
                        required: true,
                        maxLength: 255,
                        hint: 'Номер и дата',
                        value: this.order.payment
                    }
                ];
            },
            setEditDeliverySchedule() {

            },

            onPlusReserveClick() {
                this.$store.dispatch('reservePlus', {id: this.order.id, index: this.index})
            },
            onResetReserveClick() {
                this.$store.dispatch('reserveReset', {id: this.order.id, index: this.index})
            },
            onSetReserveClick() {
                this.$store.dispatch('reserveSet', {id: this.order.id, index: this.index})
            },

            onDeliveryScheduledInput(value) {
                this.$store.dispatch('orderSetDeliveryScheduled', {
                    orderIndex: this.index,
                    orderId: this.order.id,
                    value: value
                })
            },

            setEditDeliveryNumber() {
                this.editDeliveryNumber.fields = [
                    {
                        name: 'delivery_number',
                        type: 'text',
                        label: 'Номер отправления',
                        required: true,
                        maxLength: 255,
                        hint: 'Номер и дата',
                        value: this.order.delivery_number
                    }
                ];
            },
            onEditDeliveryNumberClose() {
                this.editDeliveryNumber.fields = null;
                this.enableBodyScroll();
            },
            onEditDeliveryNumberInput({index, value}) {
                this.editDeliveryNumber.fields[0].value = value;
            },
            onEditDeliveryNumberSubmit(data) {
                let value = this.editDeliveryNumber.fields[0].value;

                this.$store.dispatch('orderDeliveryNumberChange', {
                    value: value,
                    id: this.order.id,
                    orderIndex: this.index
                });

                this.onEditDeliveryNumberClose();
            },

            enableBodyScroll() {
                document.body.style.overflowY = 'auto';
            },

            onAddProductClick() {
                this.flags.addProduct = true;
            },
            onAddProductClose() {
                this.flags.addProduct = false;
            },
            onProductAdd({entityName, itemId, quantity}) {
                this.flags.addProduct = false;
                this.$store.dispatch('orderAddProduct', {
                    entityName, itemId, quantity, ...{orderId: this.order.id, orderIndex: this.index}
                });
                this.enableBodyScroll();
            },
            onProductRemove(index) {
                this.$store.dispatch('orderRemoveProduct', {
                    orderId: this.order.id,
                    productIndex: index,
                    orderIndex: this.index
                });
            },
            onProductEdit({quantity, price, productIndex}) {
                this.$store.dispatch('orderEditProduct', {
                    orderId: this.order.id,
                    orderIndex: this.index,
                    productIndex: productIndex,
                    productQuantity: quantity,
                    productPrice: price
                })
            },
            onNoticeClick(noticeType) {
                this.$store.dispatch('orderSendNotice', {
                    orderId: this.order.id,
                    orderIndex: this.index,
                    noticeType: noticeType
                })
            },

            onSetFinishedClick() {
                this.$store.dispatch('orderSetFinished', {
                    orderId: this.order.id,
                    orderIndex: this.index
                });
            },
            onSetActiveClick() {
                this.$store.dispatch('orderSetActive', {
                    orderId: this.order.id,
                    orderIndex: this.index
                });
            },
            onSetUnfinishedClick() {
                this.$store.dispatch('orderSetUnfinished', {
                    orderId: this.order.id,
                    orderIndex: this.index
                });
            },
            onDeleteClick() {
                if (confirm('Удалить заказ?')) {
                    this.$store.dispatch('orderDelete', {
                        orderId: this.order.id,
                        orderIndex: this.index
                    });
                }
            },
        },
        components: {
            Modal, SForm,
            IconBase, IconEdit, IconPlus, IconDownload,
            IconReservePlus, IconReserveRemove, IconReserveSet,
            IconMail,
            IconSent,
            editCustomer, editDelivery,
            DatePicker,
            Product, ProductAdd,
            IconSetAccomplished,
            IconSetOutstanding,
            IconDelete,
            IconSetActive,
        }
    }
</script>

<style lang="stylus">
    group-bottom-border = #b3b3b3;

    button()
        cursor pointer
        transition all .2s
        &:hover
            transform scale(1.1)
        svg
            vertical-align top


    .order-manager__order {
        display: flex;
        color: #4d4d4d;
        position: relative;
        .order__column {
            padding: 18px 12px;
            border-left: solid 1px #b3b3b3;
            border-bottom: solid 1px #808080;
            box-sizing: border-box;
            &:last-child {
                border-right: solid 1px #b3b3b3;
            }
        }
        .order__id-date {
            width: 10%;
            text-align: center;
            .id-date__id {

            }
            .id-date__date {
                font-weight: bold;
                margin-top: 12px;
            }
            .id-date__day {
                display: inline-block;
                padding: 6px;
                margin: 12px auto;
                border: solid 1px #999;
                text-transform: capitalize;
            }
            .id-date__buttons {
                .buttons__set-finished, .buttons__set-active, .buttons__set-unfinished, .buttons__delete {
                    margin-bottom: 6px;
                    button();
                }
                .buttons__delete {
                    color: #b21f1f;
                }
            }
        }
        .order__client {
            width: 18.5%;
            .client__line {
                margin-bottom: 12px;
            }
            .client__type {
                font-size: 13px;
            }
            .client__name {
                font-weight: bold;
            }
            .client__buttons {
                border-top: solid 1px #b3b3b3;
                padding-top: 6px;
                display: flex;

                .button {
                    margin-right: 6px;
                }
            }
        }
        .order__products {
            width: 30%;
            font-size: 12px;
            padding: 15px 6px;
            .products-add-btn {
                display: inline-block;
                margin: 6px;
            }
        }
        .order__pay {
            width: 18.5%;
            .pay__status {
                width: 100%;
                margin-top: 18px;
                transition: all .3s;
                &.not-sent {
                    background: #ba3838;
                    color: #f2f2f2;
                }
                &.sent {
                    background: #f4d347;
                    color: #494846;
                }
                &.payed {
                    background: #58933d;
                    color: #f2f2f2;
                }
            }
            .pay__invoice {
                margin-top: 12px;
                font-size: 13px;
                display: flex;
                justify-content: space-between;
                align-items: flex-end;
                border-bottom: solid 1px group-bottom-border;
                padding-bottom: 6px;
                .invoice__edit {
                    width: 26px;
                    margin-left: 12px;
                }
            }
            .pay__payment {
                margin-top: 12px;
                font-size: 13px;
                display: flex;
                justify-content: space-between;
                align-items: flex-end;
                border-bottom: solid 1px group-bottom-border;
                padding-bottom: 6px;
                .payment__edit {
                    width: 26px;
                    margin-left: 12px;
                }
            }
            .pay__reserve {
                margin-top: 18px;
                display: flex;
                flex-wrap: wrap;
                .reserve__header {
                    width: 100%;
                    &.reserve__header_zero {
                        b {
                            color: #4d4d4d;
                        }
                        color: #f4d347;
                        font-weight: bold;
                    }
                    &.reserve__header_expired {
                        b {
                            color: #4d4d4d;
                        }
                        color: #ba3838;
                    }
                }
                .reserve__plus, .reserve__remove, .reserve__set {
                    width: 26px;
                    margin-top: 5px;
                    transition: all .2s;
                    margin-right: 5px;
                }
            }
        }

        .order__delivery-recipient {
            width: 23%;
            .order__delivery {
                display: flex;
                justify-content: space-between;
                border-bottom: solid 1px group-bottom-border;
                padding-bottom: 6px;
                .delivery__wrap {
                    .delivery__type {
                        font-weight: bold;
                        color: #4d4d4d;
                    }
                    .delivery__address {
                        margin-top: 6px;
                        font-size: 13px;
                        b {
                            color: #666666;
                        }
                    }
                }
                .delivery__buttons {
                    margin-left: 12px;
                    display: flex;
                    justify-content: flex-end;
                    .button {
                        margin-left: 6px;
                    }
                }
            }
            .order__recipient {
                margin-top: 18px;
                display: flex;
                justify-content: space-between;
                border-bottom: solid 1px group-bottom-border;
                padding-bottom: 6px;
                .recipient__wrap {
                    .recipient__name {
                        font-size: 13px;
                        b {
                            color: #4d4d4d;
                        }
                    }
                    .recipient__passport {
                        margin-top: 6px;
                        font-size: 13px;
                        b {
                            color: #4d4d4d;
                        }
                    }
                }
                .recipient__buttons {
                    margin-left: 12px;
                    display: flex;
                    justify-content: flex-end;
                    .button {
                        margin-left: 6px;
                    }
                }
            }


            .delivery__status {
                width: 100%;
                margin-top: 18px;
                transition: all .3s;
                &.not-action {
                    background: #cccccc;
                    color: #333333;
                }
                &.packing {
                    background: #bf37bf;
                    color: #f2f2f2;
                }
                &.packed {
                    background: #f4d347;
                    color: #494846;
                }
                &.sent {
                    background: #58933d;
                    color: #f2f2f2;
                }
            }
            .delivery__scheduled {
                margin-top: 12px;
                font-size: 12px;
                .mx-datepicker {
                    margin-top: 6px;
                    width: 100%;
                }
            }
            .delivery__number {
                margin-top: 12px;
                font-size: 13px;
                display: flex;
                justify-content: space-between;
                align-items: flex-end;
                border-bottom: solid 1px group-bottom-border;
                padding-bottom: 6px;
                .delivery-number__edit {
                    width: 26px;
                    margin-left: 12px;
                }
            }

            .notifications {
                margin-top: 18px;
                font-size: 13px;
                header {
                    color: #4d4d4d;
                    font-weight: bold;
                }
                .notification {
                    display: flex;
                    justify-content: space-between;
                    align-items: flex-end;
                    .notification-name {

                    }
                    .notification-icon {
                        margin-left: 12px;
                        &.notification-icon_active {
                            button()
                        }
                    }
                }
            }
        }
        .order__shadow {
            position: absolute;
            width: 100%;
            min-height: 100%;
            .shadow__fill {
                position: absolute;
                width: 100%;
                min-height: 100%;
                opacity: .4;
                background: #fff;
            }
            svg {
                position: absolute;
                top: 50%;
                left: 50%;
                margin-top: -12px;
                margin-left: -12px;
                color: #494846;
            }
        }
        .button {
            svg {
                cursor: pointer;
                transition: all .2s;
                &:hover {
                    color: #2d2c2c;
                    transform: scale(1.1);
                }
            }
        }
    }
</style>