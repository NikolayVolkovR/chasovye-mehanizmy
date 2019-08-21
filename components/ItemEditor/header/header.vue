<template>
    <th-regular
            v-if="column.type !== 'prices'"
            :value="column.label"
    >
    </th-regular>
    <th-prices
            v-else
            :column="column"
    >
    </th-prices>
</template>
<script>
    import thRegular from './regular.vue'
    import thPrices from './prices.vue'

    export default {
        props: {
            column: Object
        },
        components: {
            thRegular, thPrices
        }
    }
</script>