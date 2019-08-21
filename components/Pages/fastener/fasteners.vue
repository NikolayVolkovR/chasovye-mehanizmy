<template>
    <div>
        <h1>Крепёж</h1>
        <item-editor
                title-name="крепеж"
                entityName="fastener"
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
                        attribute: 'type_id',
                        label: 'Тип',
                        type: 'select',
                        optionsEntity: 'fastenerType',
                        editOnly: true
                    },
                    {
                        attribute: 'name',
                        label: 'Название',
                        type: 'text',
                        maxLength: 255,
                        required: true,
                        unique: true
                    },
                    {
                        attribute: 'price',
                        label: 'Цена ',
                        type: 'number',
                        float: true,
                        min: 0,
                        max: 9999999,
                        step: 0.1,
                        editOnly: true
                    },
                    {
                        attribute: 'quantity',
                        label: 'Количество',
                        type: 'number',
                        step: 10,
                        min: 0,
                        max: 99999999999
                    },
                    {
                        attribute: 'photos',
                        type: 'photo',
                        label: 'Фото',
                        //stretch: false,
                        photosQuantity: 5
                    },
                    {
                        attribute: 'description',
                        type: 'textarea',
                        label: 'Описание'
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