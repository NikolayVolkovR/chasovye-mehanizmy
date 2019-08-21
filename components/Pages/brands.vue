<template>
    <div>
        <h1>Производители</h1>
        <item-editor
                title-name="Производителя"
                entityName="brand"
                :columns="columns"
                :actions="actions"
        >
        </item-editor>
    </div>
</template>
<script>
    import ItemEditor from '../ItemEditor/ItemEditor.vue'

    export default {
        data(){
            return {
                columns: [
                    {
                        attribute: 'name',
                        label: 'Название',
                        type: 'text',
                        maxLength: 255,
                        pattern: /^[0-9a-zа-я ]+$/i,
                        patternMessage: 'Должны быть буквы или цифры',
                        default: '',
                        value: '',
                        required: true,
                        unique: true
                    },
                    {
                        attribute: 'full_name',
                        label: 'Полное название',
                        type: 'text',
                        maxLength: 255,
                        default: '',
                        value: ''
                    },
                    {
                        attribute: 'description',
                        label: 'Описание',
                        type: 'textarea',
                        default: '',
                        value: ''
                    }
                ],
                actions: ['edit', 'delete']
            }
        },
        components: {
            ItemEditor
        }
    }
</script>