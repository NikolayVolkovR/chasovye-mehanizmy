<template>
    <td>
        <div v-for="param in value" class="param">{{ param }}</div>
    </td>
</template>
<script>
    export default {
        props: {
            columns: Array,
            column: Object,
            item: Object
        },
        computed: {
            value() {
                let params = [];

                for(let attribute of this.column.items) {
                    let column = this.getColumnByAttribute(attribute),
                        param = '';

                    if (column.optionsEntity) {
                        let entityName = column.optionsEntity,
                            itemId = this.item[attribute],
                            item = this.$store.getters.itemById(entityName, itemId);

                        if (item) {
                            param = column.label + ': ' + item.name
                        }

                    } else if (column.type === 'checkbox') {
                        let value = this.item[column.attribute];
                        param =  value == 0 ? column.label + ': нет' : column.label + ': да'
                    } else if (column.type === 'photo') {
                        /*let src = this.item[column.attribute][0].src
                            image = new Image;

                        image.src = src;
                        param = image;*/
                    } else {
                        param = column.label + ': ' + this.item[attribute]
                    }
                    params.push(param)
                }
                return params;
            }
        },
        methods: {
            getColumnByAttribute(attribute) {
                for (let column of this.columns) {
                    if (column.attribute === attribute) {
                        return column
                    }
                }
            }
        }
    }
</script>
<style scoped>

    .param {
        text-align: left;
        margin-bottom: 5px;
    }
</style>