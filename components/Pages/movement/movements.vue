<template>
    <div>
        <h1>Механизмы</h1>
        <item-editor
                title-name="механизм"
                entityName="movement"
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
                    },{
                        attribute: 'name',
                        label: 'Название',
                        type: 'composite',
                        scheme: [
                            {type: 'value', entity: 'brand', attribute: 'name'},
                            ' ',
                            {type: 'value', entity: 'movementSeries', attribute: 'name'},
                            ' ',
                            {type: 'value', entity: 'shaft', attribute: 'height_total'},
                            '/',
                            {type: 'value', entity: 'shaft', attribute: 'height_thread'},
                            ' ',
                            {type: 'value', entity: 'strokeType', attribute: 'name'},
                            ' ',
                            {type: 'value', entity: 'movementType', attribute: 'name'},
                            ' ',
                            {type: 'if', attribute: 'plastic_hanger', text: 'с пластиковой петлёй'}

                        ],
                        required: true,
                        unique: true
                    },{
                        type: 'params-list',
                        label: 'Параметры',
                        readOnly: true,
                        items: [
                            'type_id',
                            'stroke_type_id',
                            'noisines_type_id',
                            'accurancy',
                            'life',
                            'battery_life',
                            'consumption',
                            'warranty'
                        ]
                    },{
                        type: 'params-list',
                        label: 'Цены',
                        readOnly: true,
                        items: [
                            'price_1',
                            'price_2',
                            'price_3',
                            'price_4',
                            'price_5',
                            'quantity'
                        ]
                    },
                    /*{
                        type: 'prices',
                        label: 'Цены',
                        items: [
                            {
                                type: 'number',
                                attribute: 'price_1',
                                label: 'до<br/>50',
                                mit: 0,
                                max: 9999999,
                                step: 0.01
                            },
                            {
                                type: 'number',
                                attribute: 'price_2',
                                label: 'от<br/>50',
                                mit: 0,
                                max: 9999999,
                                step: 0.01
                            },
                            {
                                type: 'number',
                                attribute: 'price_3',
                                label: 'от<br/>100',
                                mit: 0,
                                max: 9999999,
                                step: 0.01
                            },
                            {
                                type: 'number',
                                attribute: 'price_4',
                                label: 'от<br/>500',
                                mit: 0,
                                max: 9999999,
                                step: 0.01
                            },
                            {
                                type: 'number',
                                attribute: 'price_5',
                                label: 'от<br/>1000',
                                mit: 0,
                                max: 9999999,
                                step: 0.01
                            }
                        ],
                        viewOnly: true
                    },*/
                    {
                        attribute: 'price_1',
                        label: 'Цена до 40',
                        type: 'number',
                        float: true,
                        min: 0,
                        max: 9999999,
                        step: 0.1,
                        editOnly: true
                    },{
                        attribute: 'price_2',
                        label: 'Цена от 50',
                        type: 'number',
                        float: true,
                        min: 0,
                        max: 9999999,
                        step: 0.1,
                        editOnly: true
                    },{
                        attribute: 'price_3',
                        label: 'Цена от 100',
                        type: 'number',
                        float: true,
                        min: 0,
                        max: 9999999,
                        step: 0.1,
                        editOnly: true
                    },
                    {
                        attribute: 'price_4',
                        label: 'Цена от 500',
                        type: 'number',
                        float: true,
                        min: 0,
                        max: 9999999,
                        step: 0.1,
                        editOnly: true
                    },
                    {
                        attribute: 'price_5',
                        label: 'Цена от 1000',
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
                        attribute: 'brand_id',
                        label: 'Бренд',
                        type: 'select',
                        optionsEntity: 'brand',
                        editOnly: true
                    },
                    {
                        attribute: 'series_id',
                        label: 'Серия',
                        type: 'select',
                        optionsEntity: 'movementSeries',
                        editOnly: true
                    },
                    {
                        attribute: 'type_id',
                        label: 'Тип',
                        type: 'select',
                        optionsEntity: 'movementType',
                        editOnly: true
                    },{
                        attribute: 'shaft_id',
                        label: 'Шток',
                        type: 'select',
                        optionsEntity: 'shaft',
                        editOnly: true
                    },{
                        attribute: 'stroke_type_id',
                        label: 'Тип хода',
                        type: 'select',
                        optionsEntity: 'strokeType',
                        editOnly: true
                    },{
                        attribute: 'noisines_type_id',
                        label: 'Шумность',
                        type: 'select',
                        optionsEntity: 'noisinesType',
                        editOnly: true
                    },{
                        attribute: 'plastic_hanger',
                        label: 'Пластиковая петля',
                        type: 'checkbox',
                        default: 0,
                        editOnly: true
                    },{
                        attribute: 'accurancy',
                        label: 'Точность хода',
                        type: 'number',
                        float: true,
                        step: 0.1,
                        editOnly: true
                    },{
                        attribute: 'life',
                        label: 'Срок службы (лет)',
                        type: 'number',
                        step: 1,
                        min: 0,
                        max: 99,
                        editOnly: true
                    },{
                        attribute: 'battery_life',
                        label: 'Работа от батареи (мес)',
                        type: 'number',
                        step: 1,
                        min: 0,
                        max: 99,
                        editOnly: true
                    },{
                        attribute: 'consumption',
                        label: 'Ток потребления',
                        type: 'number',
                        step: 1,
                        min: 0,
                        max: 99,
                        editOnly: true
                    },{
                        attribute: 'warranty',
                        label: 'Гарантия (мес)',
                        type: 'number',
                        step: 1,
                        min: 0,
                        max: 99,
                        editOnly: true
                    },{
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
