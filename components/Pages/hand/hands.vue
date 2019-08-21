<template>
    <div>
        <h1>Стрелки "Часовая и минутная"</h1>
        <item-editor
                title-name="стрелку"
                entityName="hand"
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
                        attribute: 'photo_main_id',
                        label: 'Главное фото',
                        single: true,
                        stretch: false,
                        type: 'photo',
                        photosQuantity: 1
                    },
                    {
                        type: 'params-list',
                        label: 'Основные параметры',
                        readOnly: true,
                        items: [
                            'name',
                            'shaft_type_id',
                            'length_h',
                            'length_m'
                        ]
                    },
                    {
                        attribute: 'name',
                        label: 'Название',
                        type: 'composite',
                        scheme: [
                            {type: 'value', attribute: 'article'},
                            ' ',
                            {type: 'value', entity: 'color', attribute: 'name'}
                        ],
                        required: true,
                        unique: true,
                        editOnly: true
                    },
                    {
                        type: 'params-list',
                        label: 'Доп. параметры',
                        readOnly: true,
                        items: [
                            'material_id',
                            'thickness',
                            'protect_film',
                            'luminiscent',
                            'profile_id',
                            'form_id',
                        ]
                    },
                    {
                        type: 'params-list',
                        label: 'Цены',
                        readOnly: true,
                        items: [
                            'price_10',
                            'price_100'
                        ]
                    },
                    {
                        attribute: 'article',
                        label: 'Артикул',
                        type: 'text',
                        maxLength: 255,
                        required: true,
                        unique: true,
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
                        attribute: 'shaft_type_id',
                        label: 'Тип штока',
                        type: 'select',
                        optionsEntity: 'shaftType',
                        editOnly: true
                    },
                    {
                        attribute: 'length_h',
                        label: 'Длина часовой',
                        type: 'number',
                        min: 0,
                        max: 9999999,
                        step: 1,
                        editOnly: true
                    },
                    {
                        attribute: 'length_m',
                        label: 'Длина минутной',
                        type: 'number',
                        min: 0,
                        max: 9999999,
                        step: 1,
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
                        attribute: 'thickness',
                        label: 'Толщина',
                        type: 'number',
                        float: true,
                        min: 0,
                        max: 9999999,
                        step: 0.1,
                        editOnly: true
                    },
                    {
                        attribute: 'protect_film',
                        label: 'Защитная плёнка',
                        type: 'checkbox',
                        default: 0,
                        editOnly: true
                    },
                    {
                        attribute: 'luminiscent',
                        label: 'Светомасса',
                        type: 'checkbox',
                        default: 0,
                        editOnly: true
                    },{
                        attribute: 'price_10',
                        label: 'Цена по 10',
                        type: 'number',
                        float: true,
                        min: 0,
                        max: 9999999,
                        step: 0.1,
                        editOnly: true
                    },{
                        attribute: 'price_100',
                        label: 'Цена по 100',
                        type: 'number',
                        float: true,
                        min: 0,
                        max: 9999999,
                        step: 0.1,
                        editOnly: true
                    },
                    {
                        attribute: 'profile_id',
                        label: 'Форма профиля',
                        type: 'select',
                        optionsEntity: 'handProfile',
                        editOnly: true
                    },
                    {
                        attribute: 'form_id',
                        label: 'Форма стрелки',
                        type: 'select',
                        optionsEntity: 'handForm',
                        editOnly: true
                    },
                    {
                        attribute: 'photo_try_id',
                        label: 'Фото примерки',
                        type: 'photo',
                        single: true,
                        photosQuantity: 1,
                        editOnly: true
                    },
                    {
                        attribute: 'photo_big_id',
                        label: 'Большое фото',
                        type: 'photo',
                        single: true,
                        photosQuantity: 1,
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