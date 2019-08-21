<template>
    <td>{{ value }}</td>
</template>

<script>
    export default {
        props: {
            column: Object,
            item: Object
        },
        computed: {
            value() {
                return this.$store.getters.itemNameById(this.column.optionsEntity, this.item[this.column.attribute])
            }
        }
    }
</script>