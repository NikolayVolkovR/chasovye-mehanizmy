<template>
    <div class="items-headers">
        <template v-for="header in headers">
            <component
                    v-if="header.component"
                    :is="header.component"
                    class="column"
            ></component>
            <div
                    v-else-if="header.label"
                    class="column"
                    :class="header.className"
            >{{ header.label }}</div>
        </template>
    </div>
</template>
<script>
    import movementPrices from 'Components/ItemSeller/headers/columns/movementPrices.vue'
    export default {
        props: {
            items: Array
        },
        data() {
            return {
                headers: [
                    {
                        label: 'Фото и артикул',
                        className: 'photo'
                    },
                    {
                        label: "Шток и (толщина циферблата",
                        className: 'shaft'
                    },
                    {
                        label: 'Параметры',
                        className: 'params'
                    },
                    {
                        component: 'movementPrices'
                    },
                    {
                        label: 'Корзина',
                        className: 'cart'
                    }
                ]
            }
        },
        components: {movementPrices}
    }
</script>
<style scoped lang="stylus">
    .items-headers {
        display: table-row;
        align-items: center;

        .column {
            display: table-cell;
            text-align: center;
            vertical-align: middle;
            font-size: 19px;
            font-family: "Alegreya Sans Light";
            padding: 10px;
            color: #4c4c4c;
            background: #edead3;
            transition: all .3s;

            &:first-child {
                border-radius: 5px 0 0 5px;
            }
            &:last-child {
                border-radius: 0 5px 5px 0;
            }

            .small {
                font-family: "Alegreya Sans Light";
                font-size: 14px;
                color: red;
            }

            &.photo {
                min-width: 110px;
                max-width: 110px;
            }
            &.shaft {
                max-width: 110px;
            }
            &.params {
                min-width: 110px;
            }
            &.cart {
                min-width: 150px;
            }
        }
    }
</style>