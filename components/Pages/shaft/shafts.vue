<template>
    <div>
        <h1>Штоки</h1>
        <item-editor
                title-name="шток"
                entityName="shaft"
                :columns="columns"
                :actions="actions"
        >
        </item-editor>
    </div>
</template>

<script>
    import ItemEditor from '../../ItemEditor/ItemEditor.vue'
    //$shaftType->name . ' ' . $form->height_total . '/' . $form->height_thread;
    export default {
        data(){
            return {
                columns: [
                    {
                        attribute: 'name',
                        label: 'Название',
                        type: 'composite',
                        scheme: [
                            {type: 'value', entity: 'shaftType', attribute: 'name'},
                            ' ',
                            {type: 'value', attribute: 'height_total'},
                            '/',
                            {type: 'value', attribute: 'height_thread'}
                        ],
                        required: true,
                        unique: true
                    },
                    {
                        attribute: 'photos',
                        label: 'Фото',
                        type: 'photo',
                        stretch: true,
                        photosQuantity: 3
                    },
                    {
                        attribute: 'type_id',
                        label: 'Тип штока',
                        type: 'select',
                        optionsEntity: 'shaftType'
                    },
                    {
                        attribute: 'height_total',
                        label: 'Обая высота (мм)',
                        type: 'number',
                        min: 0,
                        max: 99,
                        step: 1
                    },
                    {
                        attribute: 'height_thread',
                        label: 'Высота резьбы (мм)',
                        type: 'number',
                        min: 0,
                        max: 99,
                        step: 1
                    },
                    {
                        attribute: 'max_dial_width',
                        label: 'Максимальная толщина циферблата (мм)',
                        type: 'number',
                        min: 0,
                        max: 99,
                        step: 1,
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