<template>
    <td>
        <div class="prices">
            <div
                    v-for="price in prices"
                    class="price"
            >
                {{ value(price.attribute) }}
            </div>
        </div>
    </td>
</template>
<script>
    /*item[groupItem.attribute]*/
    export default {
        props: {
            item: Object,
            prices: Array
        },
        computed: {
            value() {
                return (attribute) => {
                    let value = this.item[attribute]

                    if (value.indexOf('.') > 0) {
                        return parseFloat(value).toString()
                    } else {
                        return parseInt(value)
                    }
                }
            }
        }
    }
</script>
<style scoped>
    .prices {
        display: flex;
        border: 0;
        align-items: center;
        justify-content: center;
    }
    .price {

        text-align: center;
        min-width: 50px;
        flex-basis: 50px;
        border-left: solid 1px #7F786E;
        padding: 10px 0;
    }
    .price:last-child {
        border-right: solid 1px #7F786E;
    }
</style>