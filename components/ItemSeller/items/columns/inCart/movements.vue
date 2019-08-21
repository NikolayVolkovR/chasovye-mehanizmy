<template>
    <div class="in-cart_edit">
        {{ item.cart }} шт. по {{ price }}
    </div>
</template>
<script>
    export default {
        created() {
            console.log(this.item)
        },
        props: {
            item: Object
        },
        computed: {
            price() {
                const inCart = this.item.cart;
                let price;

                switch (true) {
                    case (inCart < 50):
                        price = this.item.price_1;
                        break;
                    case (inCart >= 50 && inCart < 100):
                        price = this.item.price_2;
                        break;
                }

                /*if (inCart < 50) {
                    price = this.item.price_1;
                }*/

                return parseFloat(price)
            }
        }
    }
</script>
<style>
    .in-cart_edit {
        text-align: center;
        margin-top: 10px;
    }
</style>