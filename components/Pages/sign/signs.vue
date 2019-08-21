<template>
    <div>
        <h1>Накладные знаки</h1>
        <item-editor
                title-name="накладной знак"
                entityName="sign"
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
                        attribute: 'photos',
                        label: 'Фото',
                        type: 'photo',
                        stretch: false,
                        photosQuantity: 5
                    },
                    {
                        attribute: 'name',
                        label: 'Название',
                        type: 'composite',
                        scheme: [
                            {type: 'value', entity: 'signType', attribute: 'name'},
                            ' ',
                            {type: 'value', attribute: 'size'},
                            'мм ',
                            {type: 'value', entity: 'color', attribute: 'name'},
                            ' ',
                            {type: 'value', entity: 'material', attribute: 'name'}
                        ],
                        required: true,
                        unique: true
                    },
                    {
                        type: 'params-list',
                        label: 'Цены',
                        readOnly: true,
                        items: [
                            'price_1',
                            'price_2',
                            'price_3',
                            'price_4',
                            'quantity'
                        ]
                    },
                    {
                        attribute: 'type_id',
                        label: 'Тип',
                        type: 'select',
                        optionsEntity: 'signType',
                        editOnly: true
                    },
                    {
                        attribute: 'size',
                        label: 'Размер (мм)',
                        type: 'number',
                        step: 1,
                        min: 0,
                        max: 99999999999,
                        editOnly: true
                    },
                    {
                        attribute: 'material_id',
                        label: 'Тип',
                        type: 'select',
                        optionsEntity: 'material',
                        editOnly: true
                    },
                    {
                        attribute: 'color_id',
                        label: 'Тип',
                        type: 'select',
                        optionsEntity: 'color',
                        editOnly: true
                    },
                    {
                        attribute: 'price_1',
                        label: 'Цена до 10 шт',
                        type: 'number',
                        float: true,
                        min: 0,
                        max: 9999999,
                        step: 0.1,
                        editOnly: true
                    },
                    {
                        attribute: 'price_2',
                        label: 'Цена от 10 шт',
                        type: 'number',
                        float: true,
                        min: 0,
                        max: 9999999,
                        step: 0.1,
                        editOnly: true
                    },
                    {
                        attribute: 'price_3',
                        label: 'Цена до 100 шт',
                        type: 'number',
                        float: true,
                        min: 0,
                        max: 9999999,
                        step: 0.1,
                        editOnly: true
                    },
                    {
                        attribute: 'price_4',
                        label: 'Цена до 500 шт',
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
                        max: 99999999999,
                        editOnly: true
                    },
                    {
                        attribute: 'description',
                        type: 'textarea',
                        label: 'Описание',
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