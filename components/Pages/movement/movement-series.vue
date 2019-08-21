<template>
    <div>
        <h1>Серии механизмов</h1>
        <item-editor
                title-name="серию механизмов"
                entityName="movementSeries"
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
                        required: true,
                        unique: true
                    },
                    {
                        attribute: 'description',
                        label: 'Описание',
                        type: 'textarea',
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