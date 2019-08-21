<template>
    <div class="s-form">
        <div class="s-form__inputs">
            <s-input
                v-for="field, index in fields"
                v-if="field.type === 'text' || field.type === 'number' || field.type === 'email'"
                :key="field.label"
                :type="field.type"
                :label="field.label"
                :required="field.required"
                :maxLength="field.maxLength"
                :icon="true"
                :index="index"
                :value="field.value"
                :hidden="field.hidden"
                :hint="field.hint"
                @validate="onInputValidate"
                @input="onInput"
            />
            <s-input-file
                v-else-if="field.type === 'file'"
                :key="field.label"
                :label="field.label"
                :required="field.required"
                :value="field.value"
                :icon="true"
                :index="index"
                :hint="field.hint"
                @validate="onInputValidate"
                @input="onInput"
            />
            <s-input-phone
                    v-else-if="field.type === 'phone'"
                    :key="field.label"
                    :label="field.label"
                    :required="field.required"
                    :value="field.value"
                    :icon="true"
                    :index="index"
                    @input="onInput"
                    @validate="onInputValidate"
            />
            <s-select
                    v-else-if="field.type === 'select'"
                    :key="field.label"
                    :label="field.label"
                    :value="field.value"
                    :index="index"
                    :hint="field.hint"
                    @change="onSelectChange"
            />
        </div>
        <div class="s-form__buttons">
            <button
                    v-if="cancelButton"
                    class="s-form__cancel-button"
                    @click="onCancel"
            >
                {{ cancelButtonText }}
            </button>
            <button
                    class="s-form__button"
                    :class="buttonClass"
                    @click="onSubmit"
            >
                {{ buttonText }}
            </button>
        </div>
    </div>
</template>
<script>
    import sInput from 'Components/common/SInput/SInput.vue'
    import sInputFile from 'Components/common/SInput/SInputFile.vue'
    import sInputPhone from 'Components/common/SInput/SInputPhone.vue'
    import sSelect from 'Components/common/SInput/SSelect.vue'

    export default {
        created() {
            this.setFieldsValidation();
            this.setOldValues();
        },
        data() {
            return {
                fieldsValidation: [],
                isComplete: false,
                oldValues: {}
            }
        },
        props: {
            fields: Array,
            buttonText: {
                type: String,
                default: 'Далее'
            },
            cancelButton: {
                type: Boolean,
                default: false
            },
            cancelButtonText: {
                type: String,
                default: 'Отмена'
            }
        },
        computed: {
            buttonClass() {
                return this.isComplete ? 's-form__button_active' : '';
            }
        },
        methods: {
            setFieldsValidation() {
                for (let field of this.fields) {
                    this.fieldsValidation.push(false);
                }
            },
            setOldValues() {
                for (let field of this.fields) {
                    this.oldValues[field.name] = field.value;
                }
            },
            onInputValidate({isValid, index}) {
                this.fieldsValidation[index] = isValid;
                this.setIsComplete()
            },
            setIsComplete() {
                this.isComplete = this.checkIsComplete();
            },
            checkIsComplete() {
                return this.checkValid() && this.hasChanges();
            },
            checkValid() {
                for (let field of this.fieldsValidation) {
                    if (!field) {
                        return false;
                    }
                }
                return true;
            },
            hasChanges() {
                for (let field of this.fields) {
                    if (this.oldValues[field.name] !== field.value) {
                        return true;
                    }
                }
                return false;
            },
            onInput({index, value}) {
                this.$emit('field-input', {index, value})
                this.setIsComplete();
            },
            onSubmit() {
                if (this.isComplete) {
                    this.$emit('submit')
                }
            },
            onCancel() {
                this.$emit('cancel')
            },
            onSelectChange() {

            }
        },
        components: {
            sInput,
            sInputFile,
            sInputPhone,
            sSelect
        }
    }

</script>
<style lang="stylus">

</style>