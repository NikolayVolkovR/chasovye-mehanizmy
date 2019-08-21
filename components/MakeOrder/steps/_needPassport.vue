<template>
    <div class="">
        <header class="soft">При получения груза физ. лицом нужны его паспортные данные:</header>
        <s-form
                :fields="fields"
                buttonText="Сохранить и продолжить"
                :cancelButton="true"
                cancelButtonText="Назад"
                @cancel="onCancel"
                @field-input="onInput"
                @submit="onSubmit"
        />
    </div>
</template>
<script>
    import sForm from 'Components/common/SForm/SForm.vue'

    export default {
        data() {
            return {
                fields: [
                    {
                        name: 'passport',
                        type: 'text',
                        label: 'Паспорт',
                        required: true,
                        maxLength: 255,
                        hint: 'серия и номер'
                    }
                ]
            }
        },
        methods: {
            onCancel() {
                this.$emit('cancel')
            },
            onInput({index, value}) {
                this.$set(this.fields[index], 'value', value);
            },
            onSubmit() {
                this.$emit('save-passport', this.fields[0].value)
            }
        },
        components: {
            sForm
        }
    }
</script>