<template>
    <tr class="item">
        <column
                v-for="column, index in columns" v-if="!column.editOnly"
                :columns="columns"
                :column="column"
                :item="item"
                :key="index"
        >
        </column>
        <column-control
                :actions="actions"
                :item="item"
                @edit-click="onEditClick"
                @delete-click="onDeleteClick"
                @hide-show-click="onHideShowClick"
        >
        </column-control>
    </tr>
</template>

<script>
    import Column from './column/column.vue'
    import ColumnControl from './column/types/control.vue'

    export default {
        props: {
            index: Number,
            item: Object,
            columns: Array,
            actions: {
                type: Array,
                default: ['edit', 'delete']
            },
            entityName: String
        },
        methods: {
            onEditClick() {
                this.$emit('item-edit-click', {index: this.index})
            },
            onHideShowClick() {
                let data = {
                    entityName: this.entityName,
                    itemId: this.item.id,
                    itemIndex: this.index
                };

                if (this.item.show) {
                    this.$store.dispatch('hideItem', data)
                } else {
                    this.$store.dispatch('showItem', data)
                }
            },
            onDeleteClick() {
                this.$emit('item-delete-click', {index: this.index})
            }
        },
        components: {
            Column, ColumnControl
        }
    }
</script>

<style scoped>
    tr {
        transition: all 0.3s;
    }

    tr:hover {
        background: #DDDDDD!important;
    }

    tr:nth-child(even) {background: transparent}
    tr:nth-child(odd) {background: #EFEFEF}

    td {
        padding: 10px;
        border-bottom: solid 1px #ccc;
    }

</style>