<template>
    <th>
        <div class="prices-label">{{ column.label }}</div>
        <div class="prices">
            <div
                    v-for="item in column.items"
                    v-html="item.label"
                    class="price"
            >
            </div>
        </div>
    </th>
</template>
<script>
    export default {
        props: {
            column: Object
        }
    }
</script>
<style scoped>
    .prices-label {
        margin-top: -15px;
    }
    .prices {
        margin: 10px 0 -20px;
        font-weight: normal;
        display: flex;
    }
    .price {
        flex-grow: 1;
        text-align: center;
        min-width: 50px;
        border-left: solid 1px #CCCCCC;
    }
    .price:last-child {
        border-right: solid 1px #CCCCCC;
    }

</style>