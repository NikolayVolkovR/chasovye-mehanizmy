<template>
    <div class="edit-customer">
        <header>Редактирование {{ headerName }}</header>
        <header class="sub">{{ subHeaderText }}</header>
        <s-form
                :fields="fields"
                buttonText="Сохранить"
                :cancelButton="true"
                cancelButtonText="Назад"
                @cancel="onCancel"
                @field-input="onInput"
                @submit="onSubmit"
        />
    </div>
</template>
<script>
    import SForm from 'Components/common/SForm/SForm.vue';

    export default {
        created() {
            this.setFromValues();
        },
        props: {
            entity: String,
            customer: Object,
            headerName: {
                type: String,
                default: 'заказчика'
            }
        },
        data() {
            return {
                allFields: {
                    legalEntity: [
                        {
                            name: 'id',
                            type: 'text',
                            label: 'id',
                            hidden: true
                        },
                        {
                            name: 'user_id',
                            type: 'text',
                            label: 'user_id',
                            hidden: true
                        },
                        {
                            name: 'name',
                            type: 'text',
                            label: 'Название',
                            required: true,
                            maxLength: 255
                        },
                        {
                            name: 'inn',
                            type: 'number',
                            label: 'ИНН',
                            maxLength: 255
                        },
                        {
                            name: 'kpp',
                            type: 'number',
                            label: 'КПП',
                            maxLength: 255
                        },
                        {
                            name: 'bank_name',
                            type: 'text',
                            label: 'Банк',
                            maxLength: 255
                        },
                        {
                            name: 'bik',
                            type: 'number',
                            label: 'БИК',
                            maxLength: 255
                        },
                        {
                            name: 'rs',
                            type: 'text',
                            label: 'Рс',
                            maxLength: 255
                        },
                        {
                            name: 'phone',
                            type: 'phone',
                            label: 'Телефон'
                        },
                        {
                            name: 'site',
                            type: 'text',
                            label: 'Сайт',
                            maxLength: 255
                        },
                        {
                            name: 'details_file',
                            type: 'file',
                            label: 'Файл с реквизитами'
                        }
                    ],
                    entrepreneur: [
                        {
                            name: 'id',
                            type: 'text',
                            label: 'id',
                            hidden: true
                        },
                        {
                            name: 'user_id',
                            type: 'text',
                            label: 'user_id',
                            hidden: true
                        },
                        {
                            name: 'name',
                            type: 'text',
                            label: 'Название',
                            required: true,
                            maxLength: 255
                        },
                        {
                            name: 'inn',
                            type: 'number',
                            label: 'ИНН',
                            maxLength: 255
                        },
                        {
                            name: 'bank_name',
                            type: 'text',
                            label: 'Банк',
                            maxLength: 255
                        },
                        {
                            name: 'bik',
                            type: 'number',
                            label: 'БИК',
                            maxLength: 255
                        },
                        {
                            name: 'rs',
                            type: 'text',
                            label: 'Рс',
                            maxLength: 255
                        },
                        {
                            name: 'phone',
                            type: 'phone',
                            label: 'Телефон'
                        },
                        {
                            name: 'site',
                            type: 'text',
                            label: 'Сайт',
                            maxLength: 255
                        },
                        {
                            name: 'details_file',
                            type: 'file',
                            label: 'Файл с реквизитами'
                        }
                    ],
                    individual: [
                        {
                            name: 'id',
                            type: 'text',
                            label: 'id',
                            hidden: true
                        },
                        {
                            name: 'user_id',
                            type: 'text',
                            label: 'user_id',
                            hidden: true
                        },
                        {
                            name: 'passport',
                            type: 'text',
                            hidden: true
                        },
                        {
                            name: 'name',
                            type: 'text',
                            label: 'ФИО',
                            required: true,
                            maxLength: 255
                        },
                        {
                            name: 'phone',
                            type: 'phone',
                            label: 'Телефон'
                        },
                        {
                            name: 'site',
                            type: 'text',
                            label: 'Сайт',
                            maxLength: 255
                        }
                    ]
                }
            }
        },
        computed: {
            fields() {
                return this.allFields[this.entity];
            },
            subHeaderText() {
                switch(this.entity){
                    case 'legalEntity':
                        return 'Юр. лицо';
                        break;
                    case 'entrepreneur':
                        return 'Индивидуальный предпрениматель';
                        break;
                    case 'individual':
                        return 'Физ. лицо';
                        break;
                }
            }
        },
        methods: {
            setFromValues() {
                let fields = this.allFields[this.entity];
                for (let field of fields) {
                    let value = this.customer[field.name];
                    if (value !== null) {
                        this.$set(field, 'value', value);
                    }
                }
            },
            onCancel() {
                this.$emit('cancel');
            },
            onInput({index, value}) {
                this.$set(this.allFields[this.entity][index], 'value', value)
            },
            onSubmit() {
                this.$emit('edit-customer', {
                    form: this.allFields[this.entity],
                    entityName: this.entity,
                    itemId: this.customer.id
                });

            }
        },
        components: {
            SForm
        }
    }
</script>
<style lang="stylus">
    .edit-customer {
        position: relative;
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
        >.s-form {
            margin: 20px auto 0;
            .s-form__inputs {
                .s-input, .s-input-file {
                    display: flex;
                    justify-content: center;
                    margin: 10px 0;
                    .s-input__label, .s-input-file__label {
                        flex-basis: 40%;
                        text-align: right;
                        margin-top: 9px;
                    }
                    .s-input__input-message, .s-input-file__input-message {
                        flex-basis: 60%;
                        max-width: 200px;
                        padding: 0 10px;
                        input {
                            width: 100%;
                            padding: 7px 10px;
                            border: solid 1px #3f6b30;
                            border-radius: 5px;
                            font-size: 16px;
                        }
                        .s-input__message, .s-input-file__message {
                            margin: 5px 0 20px;
                            font-size: 13px;
                            font-family: "Century Gothic";
                            color: #AF4925;
                        }
                    }
                    .s-input__icon-wrap, .s-input-file__icon-wrap {
                        width: 21px;
                        height: 21px;
                        margin-top: 5px;
                    }
                }
            }
            .s-input-file {
                .s-input-file__replacer {
                    box-sizing: border-box;
                    border: solid 1px #777;
                    border-radius: 5px;
                    padding: 10px 10px;
                    text-align: center;
                    background: #eee;
                    cursor: pointer;
                    font-size: 14px;
                    &.s-input-file__replacer_valid {
                        border: solid 1px #3f6b30;
                        background: #ebf4e9;
                    }
                    &.s-input-file__replacer_not-valid {
                        border: solid 1px #AF4925;
                        background: #f2e9e9;
                    }
                }
                .s-input-file__download {
                    margin-top: 10px;
                    svg {
                        color: #567f96;
                        cursor: pointer;
                        transition: all .3s;
                        margin-right: 10px;
                        &:hover {
                            transform: scale(1.1)
                        }
                    }
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
        }
    }
</style>