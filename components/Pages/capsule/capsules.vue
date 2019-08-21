<template>
    <div>
        <h1>Капсулы</h1>
        <item-editor
                title-name="капсулу"
                entityName="capsule"
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
                        stretch: true,
                        photosQuantity: 5
                    },
                    {
                        attribute: 'name',
                        label: 'Название',
                        type: 'composite',
                        scheme: [
                            {type: 'value', attribute: 'diam_out'},
                            '/',
                            {type: 'value', attribute: 'diam_in'},
                            'мм ',
                            {type: 'value', entity: 'material', attribute: 'name'},
                            ' ',
                            {type: 'value', entity: 'color', attribute: 'name'},
                            ' ',
                            {type: 'value', entity: 'capsuleDial', attribute: 'name'},
                        ],
                        required: true,
                        unique: true
                    },
                    {
                        type: 'params-list',
                        label: 'Параметры',
                        readOnly: true,
                        items: [
                            'price_1',
                            'price_2',
                            'thickness',
                            'quantity'
                        ]
                    },
                    {
                        attribute: 'diam_out',
                        label: 'Внешний диаметр (мм)',
                        type: 'number',
                        min: 0,
                        max: 9999999,
                        step: 1,
                        editOnly: true
                    },
                    {
                        attribute: 'diam_in',
                        label: 'Внешний внутренний (мм)',
                        type: 'number',
                        min: 0,
                        max: 9999999,
                        step: 1,
                        editOnly: true
                    },
                    {
                        attribute: 'depth',
                        label: 'Глубина посадки (мм)',
                        type: 'number',
                        min: 0,
                        max: 9999999,
                        step: 1,
                        editOnly: true
                    },
                    {
                        attribute: 'thickness',
                        label: 'Общая толщина (мм)',
                        type: 'number',
                        float: true,
                        min: 0,
                        max: 9999999,
                        step: 0.1,
                        editOnly: true
                    },
                    {
                        attribute: 'material_id',
                        label: 'Материал',
                        type: 'select',
                        optionsEntity: 'material',
                        editOnly: true
                    },
                    {
                        attribute: 'color_id',
                        label: 'Цвет',
                        type: 'select',
                        optionsEntity: 'color',
                        editOnly: true
                    },
                    {
                        attribute: 'dial_id',
                        label: 'Циферблат',
                        type: 'select',
                        optionsEntity: 'capsuleDial',
                        editOnly: true
                    },
                    {
                        attribute: 'price_1',
                        label: 'Цена до 100 шт',
                        type: 'number',
                        float: true,
                        min: 0,
                        max: 9999999,
                        step: 0.1,
                        editOnly: true
                    },
                    {
                        attribute: 'price_2',
                        label: 'Цена от 100 шт',
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
                        min: 0,
                        max: 9999999,
                        step: 1,
                        editOnly: true
                    },
                    {
                        attribute: 'description',
                        label: 'Описание',
                        type: 'textarea',
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