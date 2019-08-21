<template>
    <div class="create-customer__details">
        <div class="create-customer__ways">
            <div
                    class="create-customer__way"
                    :class="fileWayClass"
                    @click="onWayClick('file')"
            >
                Прикрепить файл с реквизитами
            </div>
            <div
                    class="create-customer__way"
                    :class="fillWayClass"
                    @click="onWayClick('fill')"
            >
                Заполнить реквизиты
            </div>
        </div>
        <transition name="fade" mode="out-in">
            <s-form
                    v-if="way"
                    :fields="formFields"
                    buttonText="Сохранить и продолжить"
                    :cancelButton="true"
                    cancelButtonText="Назад"
                    @cancel="onFormCancel"
                    @field-input="onFieldInput"
                    @submit="onFormSubmit"
            />
        </transition>
        <button
                v-if="!way"
                class="create-customer__cancel-btn"
                @click="onTypeCancel"
        >
            Назад
        </button>
    </div>
</template>
<script>
    import sForm from 'Components/common/SForm/SForm.vue'

    export default {
        data() {
            return {
                way: null,
                fillFields: [
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
                        required: true,
                        maxLength: 255
                    },
                    {
                        name: 'bank_name',
                        type: 'text',
                        label: 'Банк',
                        required: true,
                        maxLength: 255
                    },
                    {
                        name: 'bik',
                        type: 'number',
                        label: 'БИК',
                        required: true,
                        maxLength: 255
                    },
                    {
                        name: 'rs',
                        type: 'text',
                        label: 'Рс',
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
                ],
                fileFields: [
                    {
                        name: 'name',
                        type: 'text',
                        label: 'Название',
                        required: true,
                        maxLength: 255
                    },
                    {
                        name: 'details_file',
                        type: 'file',
                        label: 'Файл с реквизитами',
                        required: true
                    }
                ]
            }
        },
        computed: {
            formFields() {
                return this.way === 'file' ? this.fileFields : this.fillFields;
            },
            fileWayClass() {
                return this.way === 'file' ? 'create-customer__way_active' : '';
            },
            fillWayClass() {
                return this.way === 'fill' ? 'create-customer__way_active' : '';
            }
        },
        methods: {
            onWayClick(way) {
                this.way = way;
            },
            onFormCancel() {
                this.way = null;
            },
            getFieldsName() {
                if (this.way === 'fill') {
                    return 'fillFields';
                } else if (this.way === 'file') {
                    return 'fileFields';
                }
            },
            onFieldInput({index, value}) {
                let fieldsName = this.getFieldsName();
                this.$set(this[fieldsName][index], 'value', value);
            },
            onFormSubmit() {
                let fieldsName = this.getFieldsName();
                this.$emit('create-entrepreneur', this[fieldsName]);
            },
            onTypeCancel() {
                this.$emit('type-cancel')
            }
        },
        components: {
            sForm
        }
    }
</script>