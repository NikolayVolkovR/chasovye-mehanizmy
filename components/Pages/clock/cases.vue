<template>
    <div>
        <h1>Корпуса часов для "Примерки стрелок"</h1>
        <item-editor
                title-name="корпус часов"
                entityName="clockCase"
                :columns="columns"
                :actions="actions"
        >
        </item-editor>
    </div>
</template>
<script>
    import ItemEditor from '../../ItemEditor/ItemEditor.vue'

    export default {
        data(){
            return {
                columns: [
                    {
                        attribute: 'photo_id',
                        label: 'Фото',
                        single: true,
                        type: 'photo',
                        photosQuantity: 1
                    },
                    {
                        attribute: 'thumb_id',
                        label: 'Превью',
                        type: 'photo',
                        single: true,
                        photosQuantity: 1
                    },
                    {
                        attribute: 'name',
                        label: 'Название',
                        type: 'text',
                        required: true,
                        unique: true
                    },
                    {
                        attribute: 'material_id',
                        label: 'Материал',
                        type: 'select',
                        optionsEntity: 'material',
                        editOnly: true
                    },
                    {
                        attribute: 'show',
                        label: 'Показывать',
                        type: 'checkbox',
                        default: 1,
                        editOnly: true
                    }
                ],
                actions: ['edit', 'delete', 'hide', 'show']
            }
        },
        components: {
            ItemEditor
        }
    }
</script>