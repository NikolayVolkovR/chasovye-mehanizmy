<template>
    <td>
        {{ value }}
        <div class="hidden" v-if="hidden">(не показывать)</div>
    </td>
</template>
<script>
    export default {
        props: {
            column: Object,
            item: Object
        },
        computed: {
            value() {
                return this.item[this.column.attribute]
            },
            hidden() {
                if (this.item.show === 0 && this.column.attribute === 'name') {
                    return true
                } else {
                    return false
                }
            }
        }
    }
</script>
<style scoped>
    .hidden {
        margin-top: 15px;
        font-size: 14px;
        color: red;
        font-weight: bold;
    }
</style>