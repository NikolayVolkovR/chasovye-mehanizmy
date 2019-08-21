<template>
    <div>
        <h1>Материалы</h1>
        <item-editor
                title-name="материал"
                entityName="material"
                :columns="columns"
                :actions="actions"
        >
        </item-editor>
    </div>
</template>
<script>
    import ItemEditor from '../ItemEditor/ItemEditor.vue'

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