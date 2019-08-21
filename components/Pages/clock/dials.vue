<template>
    <div>
        <h1>Циферблаты для "Примерки стрелок"</h1>
        <item-editor
                title-name="циферблат"
                entityName="clockDial"
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
                        photosQuantity: 1,
                    },
                    {
                        attribute: 'name',
                        label: 'Название',
                        type: 'text',
                        required: true
                    },
                    {
                        attribute: 'color_id',
                        label: 'Материал',
                        type: 'select',
                        optionsEntity: 'color',
                        editOnly: true
                    },
                    {
                        attribute: 'dial_id',
                        label: 'Материал',
                        type: 'select',
                        optionsEntity: 'capsuleDial',
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