<template>
    <div class="create-customer__details">
        <s-form
                :fields="fields"
                buttonText="Сохранить и продолжить"
                :cancelButton="true"
                cancelButtonText="Назад"
                @cancel="onFormCancel"
                @field-input="onFieldInput"
                @submit="onFormSubmit"
        />
    </div>
</template>
<script>
    import sForm from 'Components/common/SForm/SForm.vue'

    export default {
        data() {
            return {
                way: null,
                fields: [
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
        },
        methods: {
            onFormCancel() {
                this.$emit('type-cancel')
            },
            onFieldInput({index, value}) {
                this.$set(this.fields[index], 'value', value);
            },
            onFormSubmit() {
                this.$emit('create-individual', this.fields);
            }
        },
        components: {
            sForm
        }
    }
</script>