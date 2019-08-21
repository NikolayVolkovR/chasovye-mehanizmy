<template>
    <div class="edit-delivery">
        <header>Редактирование доставки</header>
        <div class="edit-delivery__fields">
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
                Сохранить
            </button>
        </div>
    </div>
</template>
<script>
    import sInput from 'Components/common/SInput/SInput.vue'
    import sSelect from 'Components/common/SInput/SSelect.vue'

    export default {
        created() {
            this.presetDeliveryTypeId();
            this.presetAddress();
            this.presetOldValues();
        },
        props: {
            types: Array,
            item: Object
        },
        data() {
            return {
                delivery_type_id: null,
                address: {
                    value: null,
                    isValid: false
                },
                oldValues: {
                    delivery_type_id: null,
                    address: null
                }
            }
        },
        computed: {
            isPickupType() {

                let index = this.types.findIndex(type => type.value === this.delivery_type_id);
                return this.types[index].pickup === 1;
            },
            submitButtonClass() {
                return this.isComplete ? 's-form__button_active' : '';
            },
            isComplete() {
                if (this.isPickupType) {
                    return this.isTypeChanged;
                } else {
                    return this.address.isValid && this.isChanged;
                }
            },
            isChanged() {
                return this.isAddressChanged || this.isTypeChanged;
            },
            isAddressChanged() {
                return this.address.value !== this.oldValues.address;
            },
            isTypeChanged() {
                return this.delivery_type_id != this.oldValues.delivery_type_id;
            }
        },
        methods: {
            presetDeliveryTypeId() {
                this.delivery_type_id = parseInt(this.item.delivery_type_id);
            },
            presetAddress() {
                this.address.value = this.item.address;
            },
            presetOldValues() {
                this.oldValues.delivery_type_id = this.item.delivery_type_id;
                this.oldValues.address = this.item.address;
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
                this.$emit('submit', {itemId: this.item.id, fields: fields})
            }
        },
        components: {
            sInput,
            sSelect
        }
    }
</script>