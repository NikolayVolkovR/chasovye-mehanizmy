<template>
    <tr class="item-editor__header">
        <table-header
                v-for="column in columns"
                v-if="!column.editOnly"
                :column="column"
                :key="column.label"
        >
        </table-header>
        <th>Управ&shy;ление</th>
    </tr>
</template>
<script>
    import tableHeader from './header/header.vue'

    export default {
        props: {
            columns: Array
        },
        components: {
            tableHeader
        }
    }
</script>
<style scoped>
    .item-editor__header {
        background: #494846;
        color: #CCCCCC;
        font-weight: bold;
    }

    th {
        padding: 20px;
        border: solid 1px #494846;
    }

</style>