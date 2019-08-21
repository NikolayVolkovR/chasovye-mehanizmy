<template>
    <div class="make-order__confirm">
        <header class="soft">Пожалуйста, проверьте данные:</header>
        <section v-if="customerType === 'legal_entities'">
            <div class="confirm-item confirm-item_header">
                <div class="confirm-item__name">Заказчик:</div>
                <div class="confirm-item__value">Юр. лицо<br/><b>{{ customer.name }}</b></div>
            </div>
            <div class="confirm-item" v-if="customer.details_file">
                <div class="confirm-item__name">Реквизиты файлом</div>
                <div class="confirm-item__value">
                    <a
                            :href="customer.details_file"
                            target="_blank"
                            class="details-file"
                    >
                        <font-awesome-icon icon="download" size="lg"/>
                        Посмотреть
                    </a>
                </div>
            </div>
            <div class="confirm-item" v-if="customer.inn">
                <div class="confirm-item__name">ИНН</div>
                <div class="confirm-item__value">{{ customer.inn }}</div>
            </div>
            <div class="confirm-item" v-if="customer.kpp">
                <div class="confirm-item__name">КПП</div>
                <div class="confirm-item__value">{{ customer.kpp }}</div>
            </div>
            <div class="confirm-item" v-if="customer.kpp">
                <div class="confirm-item__name">Банк</div>
                <div class="confirm-item__value">{{ customer.bank_name }}</div>
            </div>
            <div class="confirm-item" v-if="customer.bik">
                <div class="confirm-item__name">БИК</div>
                <div class="confirm-item__value">{{ customer.bik }}</div>
            </div>
            <div class="confirm-item" v-if="customer.rs">
                <div class="confirm-item__name">Рс</div>
                <div class="confirm-item__value">{{ customer.rs }}</div>
            </div>
            <div class="confirm-item" v-if="customer.phone">
                <div class="confirm-item__name">Телефон</div>
                <div class="confirm-item__value">{{ customer.phone }}</div>
            </div>
            <div class="confirm-item" v-if="customer.site">
                <div class="confirm-item__name">Сайт</div>
                <div class="confirm-item__value">{{ customer.site }}</div>
            </div>
        </section>
        <section v-else-if="customerType === 'entrepreneurs'">
            <div class="confirm-item confirm-item_header">
                <div class="confirm-item__name">Заказчик:</div>
                <div class="confirm-item__value">Индивидуальный предпрениматель<br/><b>{{ customer.name }}</b></div>
            </div>
            <div class="confirm-item" v-if="customer.details_file">
                <div class="confirm-item__name">Реквизиты файлом</div>
                <div class="confirm-item__value">
                    <a
                            :href="customer.details_file"
                            target="_blank"
                            class="details-file"
                    >
                        <font-awesome-icon icon="download" size="lg"/>
                        Посмотреть
                    </a>
                </div>
            </div>
            <div class="confirm-item" v-if="customer.inn">
                <div class="confirm-item__name">ИНН</div>
                <div class="confirm-item__value">{{ customer.inn }}</div>
            </div>
            <div class="confirm-item" v-if="customer.kpp">
                <div class="confirm-item__name">Банк</div>
                <div class="confirm-item__value">{{ customer.bank_name }}</div>
            </div>
            <div class="confirm-item" v-if="customer.bik">
                <div class="confirm-item__name">БИК</div>
                <div class="confirm-item__value">{{ customer.bik }}</div>
            </div>
            <div class="confirm-item" v-if="customer.rs">
                <div class="confirm-item__name">Рс</div>
                <div class="confirm-item__value">{{ customer.rs }}</div>
            </div>
            <div class="confirm-item" v-if="customer.phone">
                <div class="confirm-item__name">Телефон</div>
                <div class="confirm-item__value">{{ customer.phone }}</div>
            </div>
            <div class="confirm-item" v-if="customer.site">
                <div class="confirm-item__name">Сайт</div>
                <div class="confirm-item__value">{{ customer.site }}</div>
            </div>
        </section>
        <section v-else-if="customerType === 'individuals'">
            <div class="confirm-item confirm-item_header">
                <div class="confirm-item__name">Заказчик:</div>
                <div class="confirm-item__value">Физ. лицо<br/><b>{{ customer.name }}</b></div>
            </div>
            <div class="confirm-item" v-if="customer.passport">
                <div class="confirm-item__name">Паспорт</div>
                <div class="confirm-item__value">{{ customer.passport }}</div>
            </div>
            <div class="confirm-item" v-if="customer.phone">
                <div class="confirm-item__name">Телефон</div>
                <div class="confirm-item__value">{{ customer.phone }}</div>
            </div>
            <div class="confirm-item" v-if="customer.site">
                <div class="confirm-item__name">Сайт</div>
                <div class="confirm-item__value">{{ customer.site }}</div>
            </div>
        </section>

        <section>
            <div class="confirm-item confirm-item_header">
                <div class="confirm-item__name">Доставка:</div>
                <div class="confirm-item__value"><b>{{ delivery.deliveryType.name }}</b></div>
            </div>
            <div class="confirm-item" v-if="delivery.address">
                <div class="confirm-item__name">Адрес</div>
                <div class="confirm-item__value">{{ delivery.address }}</div>
            </div>
        </section>

        <section v-if="isCustomerRecipient">
            <div class="confirm-item confirm-item_header">
                <div class="confirm-item__name">Получатель:</div>
                <div class="confirm-item__value">{{ recipientTypeName }}<br/><b>{{ recipient.name }}</b></div>
            </div>
        </section>
        <section v-else-if="!isCustomerRecipient && recipientType === 'legal_entities'">
        <div class="confirm-item confirm-item_header">
            <div class="confirm-item__name">Получатель:</div>
            <div class="confirm-item__value">Юр. лицо<br/><b>{{ recipient.name }}</b></div>
        </div>
        <div class="confirm-item" v-if="customer.details_file">
            <div class="confirm-item__name">Реквизиты файлом</div>
            <div class="confirm-item__value">
                <a
                        :href="customer.details_file"
                        target="_blank"
                        class="details-file"
                >
                    <font-awesome-icon icon="download" size="lg"/>
                    Посмотреть
                </a>
            </div>
        </div>
        <div class="confirm-item" v-if="customer.inn">
            <div class="confirm-item__name">ИНН</div>
            <div class="confirm-item__value">{{ customer.inn }}</div>
        </div>
        <div class="confirm-item" v-if="customer.kpp">
            <div class="confirm-item__name">КПП</div>
            <div class="confirm-item__value">{{ customer.kpp }}</div>
        </div>
        <div class="confirm-item" v-if="customer.kpp">
            <div class="confirm-item__name">Банк</div>
            <div class="confirm-item__value">{{ customer.bank_name }}</div>
        </div>
        <div class="confirm-item" v-if="customer.bik">
            <div class="confirm-item__name">БИК</div>
            <div class="confirm-item__value">{{ customer.bik }}</div>
        </div>
        <div class="confirm-item" v-if="customer.rs">
            <div class="confirm-item__name">Рс</div>
            <div class="confirm-item__value">{{ customer.rs }}</div>
        </div>
        <div class="confirm-item" v-if="customer.phone">
            <div class="confirm-item__name">Телефон</div>
            <div class="confirm-item__value">{{ customer.phone }}</div>
        </div>
        <div class="confirm-item" v-if="customer.site">
            <div class="confirm-item__name">Сайт</div>
            <div class="confirm-item__value">{{ customer.site }}</div>
        </div>
    </section>
        <section v-else-if="!isCustomerRecipient && recipientType === 'entrepreneurs'">
            <div class="confirm-item confirm-item_header">
                <div class="confirm-item__name">Получатель:</div>
                <div class="confirm-item__value">Индивидуальный предпрениматель<br/><b>{{ recipient.name }}</b></div>
            </div>
            <div class="confirm-item" v-if="recipient.details_file">
                <div class="confirm-item__name">Реквизиты файлом</div>
                <div class="confirm-item__value">
                    <a
                            :href="recipient.details_file"
                            target="_blank"
                            class="details-file"
                    >
                        <font-awesome-icon icon="download" size="lg"/>
                        Посмотреть
                    </a>
                </div>
            </div>
            <div class="confirm-item" v-if="recipient.inn">
                <div class="confirm-item__name">ИНН</div>
                <div class="confirm-item__value">{{ recipient.inn }}</div>
            </div>
            <div class="confirm-item" v-if="recipient.kpp">
                <div class="confirm-item__name">Банк</div>
                <div class="confirm-item__value">{{ recipient.bank_name }}</div>
            </div>
            <div class="confirm-item" v-if="recipient.bik">
                <div class="confirm-item__name">БИК</div>
                <div class="confirm-item__value">{{ recipient.bik }}</div>
            </div>
            <div class="confirm-item" v-if="recipient.rs">
                <div class="confirm-item__name">Рс</div>
                <div class="confirm-item__value">{{ recipient.rs }}</div>
            </div>
            <div class="confirm-item" v-if="recipient.phone">
                <div class="confirm-item__name">Телефон</div>
                <div class="confirm-item__value">{{ recipient.phone }}</div>
            </div>
            <div class="confirm-item" v-if="recipient.site">
                <div class="confirm-item__name">Сайт</div>
                <div class="confirm-item__value">{{ recipient.site }}</div>
            </div>
        </section>
        <section v-else-if="!isCustomerRecipient && recipientType === 'individuals'">
            <div class="confirm-item confirm-item_header">
                <div class="confirm-item__name">Получатель:</div>
                <div class="confirm-item__value">Физ. лицо<br/><b>{{ recipient.name }}</b></div>
            </div>
            <div class="confirm-item" v-if="recipient.passport">
                <div class="confirm-item__name">Паспорт</div>
                <div class="confirm-item__value">{{ recipient.passport }}</div>
            </div>
            <div class="confirm-item" v-if="recipient.phone">
                <div class="confirm-item__name">Телефон</div>
                <div class="confirm-item__value">{{ recipient.phone }}</div>
            </div>
            <div class="confirm-item" v-if="recipient.site">
                <div class="confirm-item__name">Сайт</div>
                <div class="confirm-item__value">{{ recipient.site }}</div>
            </div>
        </section>

        <div class="s-form__buttons">
            <button
                    class="s-form__cancel-button"
                    @click="onCancel"
            >
                Назад
            </button>
            <button
                    class="s-form__button s-form__button_active"
                    @click="onSubmit"
            >
                Подтвердить
            </button>
        </div>
    </div>
</template>
<script>
    export default {
        created() {
            //console.log(this.delivery)
        },
        data() {
            return {
                confirmed: false
            }
        },
        props: {
            customer: Object,
            customerType: String,
            delivery: Object,
            recipient: Object,
            recipientType: String
        },
        computed: {
            isCustomerRecipient() {
                return this.customerType === this.recipientType
                    && this.customer.id === this.recipient.id;
            },
            recipientTypeName() {
                switch (this.recipientType) {
                    case 'legal_entities':
                        return 'Юр. лицо';
                        break;
                    case 'entrepreneurs':
                        return 'Индивидуальный предпрениматель';
                        break;
                    case 'individuals':
                        return 'Физ. лицо';
                        break;
                }
            }
        },
        methods: {
            onCancel() {
                this.$emit('cancel')
            },
            onSubmit() {
                this.$emit('confirm');
            }
        }
    }
</script>
<style lang="stylus">
    .make-order__confirm {
        margin: 0 auto;
        max-width: 400px;
        color: #444;
        section {
            margin-top: 30px;
            .confirm-item {
                margin: 14px 0;
                display: flex;
                align-items: flex-start;
                .confirm-item__name {
                    width: 25%;
                    font-size: 14px;
                }
                .confirm-item__value {
                    padding-left: 20px;
                    width: 75%;
                    min-width: 120px;
                    font-size: 14px;
                    a.details-file {
                        text-decoration: underline;
                        color: #567f96;
                        font-size: 14px;
                        font-family: "Century Gothic";
                        svg {
                            margin-right: 10px;
                        }
                    }
                }
                &.confirm-item_header {
                    .confirm-item__name {
                        font-size: 20px;
                        font-family: "Alegreya Sans Light"
                        color: #333;
                        font-weight: bold;
                    }
                    .confirm-item__value {
                        font-size: 18px;
                        font-family: "Alegreya Sans Light"
                        color: #333;
                        b {
                            font-family: "Alegreya Sans Light"
                        }
                    }
                }
            }
        }
    }
</style>