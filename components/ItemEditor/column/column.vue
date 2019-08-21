<template>
    <photo-column
            v-if="column.type === 'photo'"
            :column="column"
            :item="item"
    >
    </photo-column>
    <entity-name
            v-else-if="column.optionsEntity"
            :column="column"
            :item="item"
    >
    </entity-name>
    <params-list
            v-else-if="column.type === 'params-list'"
            :columns="columns"
            :column="column"
            :item="item"
    ></params-list>
    <prices-column
            v-else-if="column.type === 'prices'"
            :item="item"
            :prices="column.items"
    >
    </prices-column>
    <regular-value
            v-else
            :column="column"
            :item="item"
    >
    </regular-value>
</template>

<script>
    import PhotoColumn from './types/photo.vue'
    import EntityName from './types/entityName.vue'
    import RegularValue from './types/value.vue'
    import ParamsList from './types/paramsList.vue'
    import PricesColumn from './types/prices.vue'

    export default {
        props: {
            columns: Array,
            column: Object,
            item: Object
        },
        components: {
            PhotoColumn, EntityName, RegularValue, ParamsList, PricesColumn
        }
    }
</script>

<style scoped>
    td {
        text-align: center;
    }
</style>