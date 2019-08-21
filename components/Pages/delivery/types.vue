<template>
    <div>
        <h1>Типы доставки</h1>
        <item-editor
                title-name="тип доставки"
                entityName="delivery-type"
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
                        attribute: 'pickup',
                        label: 'Самовывоз',
                        type: 'checkbox',
                        default: 0,
                        editOnly: true
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