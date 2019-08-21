<template>
    <div>
        Цены
        <div class="prices">
            <label v-for="price in prices">
                <input-number :item="price"></input-number>
            </label>
        </div>
    </div>
</template>
<script>
    import InputNumber from './number.vue'

    export default {
        props: {
            item: Object
        },
        computed: {
            prices() {
                return this.item.items
            }
        },
        components: {
            InputNumber
        }
    }
</script>
<style scoped>

</style>