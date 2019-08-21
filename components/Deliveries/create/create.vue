<template>
    <div class="create-delivery">
        <header>Новая доставка</header>
        <div class="create-delivery__fields">
            <s-select
                    label="Способ"
                    :items="types"
                    :value="delivery_type_id"
                    @change="onTypeChange"
            />
            <transition name="fade">
                <s-input
                        v-if="!isPickupType"
                        type="string"
                        label="Адрес"
                        :required="true"
                        :maxLength="255"
                        :icon="true"
                        :index="null"
                        :value="address.value"
                        @validate="onAddressInputValidate"
                        @input="onAddressInput"
                />
            </transition>
        </div>
        <div class="s-form__buttons">
            <button
                    v-if="hasCancelButton"
                    class="s-form__cancel-button"
                    @click="onCancel"
            >
                Назад
            </button>
            <button
                    class="s-form__button"
                    :class="submitButtonClass"
                    @click="onSubmit"
            >
                Сохранить и продолжить
            </button>
        </div>
    </div>
</template>
<script>
    import sSelect from 'Components/common/SInput/SSelect.vue'
    import sInput from 'Components/common/SInput/SInput.vue'

    export default {
        created() {
            this.presetDeliveryTypeId();
        },
        props: {
            types: Array,
            hasCancelButton: Boolean
        },
        data() {
            return {
                delivery_type_id: null,
                address: {
                    value: '',
                    isValid: false
                }
            }
        },
        computed: {
            isPickupType() {
                let index = this.types.findIndex(type=>type.value === this.delivery_type_id);
                return this.types[index].pickup === 1;
            },
            submitButtonClass() {
                return this.isComplete ? 's-form__button_active' : '';
            },
            isComplete() {
                if (this.isPickupType) {
                    return true;
                } else {
                    return this.address.isValid;
                }
            }
        },
        methods: {
            presetDeliveryTypeId() {
                this.delivery_type_id = this.types[0].value;
            },
            onTypeChange(value) {
                this.delivery_type_id = value;
            },
            onAddressInputValidate({isValid, index}) {
                this.address.isValid = isValid;
            },
            onAddressInput({index, value}) {
                this.address.value = value;
            },
            onCancel() {
                this.$emit('cancel')
            },
            onSubmit() {
                if (!this.isComplete) {
                    return false;
                }
                let fields = [
                    {
                        name: 'delivery_type_id',
                        value: this.delivery_type_id
                    },
                    {
                        name: 'address',
                        value: this.address.value
                    }
                ];
                this.$emit('submit', fields)
            }
        },
        components: {
            sSelect,
            sInput
        }
    }
</script>