<template>
    <div>
        <h1>Типы штоков</h1>
        <item-editor
                title-name="тип штока"
                entityName="shaftType"
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
                        attribute: 'name',
                        label: 'Название',
                        type: 'text',
                        maxLength: 255,
                        unique: true,
                        required: true
                    },
                    {
                        attribute: 'diam_hour',
                        label: 'Диаметр отверстия часовой стрелки',
                        type: 'number',
                        float: true,
                        precision: 1,
                        default: '0',
                        min: 0,
                        max: 99,
                        step: 0.1,
                    },
                    {
                        attribute: 'diam_min',
                        label: 'Диаметр отверстия минутной стрелки',
                        type: 'number',
                        float: true,
                        default: '0',
                        min: 0,
                        max: 99,
                        step: 0.1,
                    },
                ],
                actions: ['edit', 'delete']
            }
        },
        components: {
            ItemEditor
        }
    }
</script>