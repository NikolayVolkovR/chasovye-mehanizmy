<template>
    <div class="create-customer">
        <header>Создать заказчика</header>
        <header v-if="type" class="sub">{{ subHeaderText }}</header>
        <transition name="fade" mode="out-in">
            <div
                    v-if="!type"
                    class="customer-types"
            >
                <div class="customer-type" @click="onTypeClick('legalEntity')">Юр. лицо</div>
                <div class="customer-type" @click="onTypeClick('entrepreneur')">Индивидуальный предприниматель</div>
                <div class="customer-type" @click="onTypeClick('individual')">Физ. лицо</div>
            </div>
            <component
                    v-else
                    :is="componentName"
                    @type-cancel="onTypeCancel"
                    @create-legal-entity="onCreateLegalEntity"
                    @create-entrepreneur="onCreateEntrepreneur"
                    @create-individual="onCreateIndividual"
            />
        </transition>
        <transition name="fade">
            <button
                    v-if="!type && hasCustomers"
                    class="create-customer__cancel-btn"
                    @click="onCreateCancel"
            >
                Назад
            </button>
        </transition>
    </div>
</template>
<script>
    import legalEntity from './_legalEntity.vue'
    import entrepreneur from './_entrepreneur.vue'
    import individual from './_individual.vue'

    export default {
        data() {
            return {
                type: null
            }
        },
        props: {
            hasCustomers: Boolean
        },
        computed: {
            componentName() {
                return this.type;
            },
            subHeaderText() {
                switch(this.type){
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
            onTypeClick(type) {
                this.type = type;
            },
            onTypeCancel() {
                this.type = null;
            },
            onCreateLegalEntity(form) {
                this.$emit('create-legal-entity', {form: form, entityName: this.type})
            },
            onCreateEntrepreneur(form) {
                this.$emit('create-entrepreneur', {form: form, entityName: this.type})
            },
            onCreateIndividual(form) {
                this.$emit('create-individual', {form: form, entityName: this.type})
            },
            onCreateCancel() {
                this.$emit('cancel')
            }
        },
        components: {
            legalEntity,
            entrepreneur,
            individual
        }
    }
</script>
<style lang="stylus">
    .create-customer {
        position: relative;
        header {
            color: #333333;
            font-family: "Alegreya Sans";
            font-size: 20px;
            text-transform: uppercase;
            text-align: center;
            margin: 50px 0 0;
            font-weight: bold;
        }
        .customer-types{
            display: flex;
            justify-content: space-around;
            box-sizing: border-box;
            text-align: center;
            margin: 20px 0 0;
            .customer-type {
                display: flex;
                align-items: center;
                flex-basis: 25%;
                border: solid 4px #e19ae5
                border-radius: 5px;
                padding: 20px;
                font-family: "Alegreya Sans";
                font-size: 20px;
                color: #333333;
                margin: 10px;
                cursor: pointer;
                transition: all .3s;
                &:hover {
                    transform: scale(1.05);
                    border-color: #c489c9;
                }
            }
        }
        .create-customer__ways {
            display: flex;
            justify-content: center;
            margin: 20px 0 0;
            .create-customer__way {
                display: flex;
                align-items: center;
                text-align: center;
                flex-basis: 33%;
                border: solid 4px #e19ae5
                border-radius: 5px;
                padding: 10px 20px;
                font-family: "Alegreya Sans";
                font-size: 18px;
                color: #333333;
                margin: 10px;
                cursor: pointer;
                transition: all .3s;
                &.create-customer__way_active {
                    background: #eee;
                    border-color: #916d99;
                    &:hover {
                        transform: scale(1);
                        border-color: #916d99;
                    }
                }
            }
        }
        .create-customer__details {
            position: relative;
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
                    }
                }
            }
        }
        .create-customer__cancel-btn {
            position: relative;
            display: block;
            margin: 30px auto 0;
            background: #567f96;
            color: #fff;
            cursor: pointer;
        }
    }
</style>