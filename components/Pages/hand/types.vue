<template>
    <div>
        <h1>Типы стрелок</h1>
        <item-editor
                title-name="тип стрелки"
                entityName="handType"
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
                        attribute: 'slug',
                        label: 'Slug',
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