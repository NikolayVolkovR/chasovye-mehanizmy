<template>
    <div class="item">
        <div class="column photo">
            <img :src="item.photos[0].src" />
            <div>{{ item.name }}</div>
        </div>
        <div class="column shaft">
            <img v-if="item.shaft.photos[0]" :src="item.shaft.photos[0].src" />
            <div>{{ item.shaft.name }}</div>
            <div>(до {{ item.shaft.max_dial_width }} мм)</div>
        </div>
        <div class="column params">
            <clock :type="clockType" :stroke="clockStroke" :size="60" mode="compact"></clock>
            <div class="param"><b>Тип:</b> {{ item.type.name }}</div>
            <div class="param"><b>Ход:</b> {{ item.strokeType.name }}</div>
            <div class="param"><b>Громкость:</b> {{ item.noisinesType.name }}</div>
            <div class="param" v-if="item.accurancy"><b>Точность хода:</b> {{ item.accurancy }}</div>
            <div class="param" v-if="item.life"><b>Срок службы:</b> {{ item.life }} лет</div>
            <div class="param" v-if="item.battery_life"><b>Работа от батарейки:</b> {{ item.battery_life }} мес.</div>
            <div class="param" v-if="item.consumption"><b>Ток потребления:</b> {{ item.consumption }}</div>
            <div class="param" v-if="item.warranty"><b>Гарантия:</b> {{ item.warranty }} мес.</div>
        </div>
        <div class="column prices">
            <div class="prices-wrap">
                <div class="price">{{ showPrice(item.price_1) }}</div>
                <div class="price">{{ showPrice(item.price_2) }}</div>
                <div class="price">{{ showPrice(item.price_3) }}</div>
                <div class="price">{{ showPrice(item.price_4) }}</div>
                <div class="price">{{ showPrice(item.price_5) }}</div>
            </div>
        </div>
        <div class="column cart">
            <cart-column :quantity="item.quantity"></cart-column>
        </div>
    </div>
</template>
<script>
    import clock from 'Components/clock.vue';
    import cartColumn from 'Components/ItemSeller/items/columns/cart.vue'

    export default {
        props: {
            item: Object
        },
        computed: {
            clockType() {
                switch(this.item.type.name) {
                    case 'Стандартный':
                        return 'standard';
                        break;
                    case '24 часа':
                        return '24';
                        break;
                    case 'Усиленный':
                        return 'power';
                        break;
                    case 'Обратный ход':
                        return 'reverse';
                        break;
                    case 'Маятниковый':
                        return 'pendulum';
                        break;
                }
            },
            clockStroke() {
                switch (this.item.strokeType.name) {
                    case 'Плавный':
                        return 'sweep';
                        break;
                    case 'Дискретный':
                        return 'step';
                        break;
                }
            }
        },
        methods: {
            showPrice(price) {
                return parseFloat(price)
            }
        },
        components: {clock, cartColumn}
    }
</script>
<style scoped lang="stylus">
    .item {
        box-sizing: border-box;
        display: table-row;
        color: #4d4d4d;
        font-size: 14px;
        transition: all .3s;

        &.stretched {
            opacity: 0;
            transform: translateY(-5px);
        }

        .column {
            display: table-cell;
            text-align: center;
            padding: 20px 0;
            border-bottom: solid 1px #bfbcb0;
            vertical-align: middle;

            &.photo {
                min-width: 115px;
                max-width: 115px;
                padding: 20px 5px 20px 10px;
                font-size: 16px;

                img {
                    margin-bottom: 10px;
                    max-width: 100%;
                }
            }
            &.shaft {
                vertical-align: center;
                padding: 20px 5px;

                img {
                    margin-bottom: 10px;
                    border-radius: 5px;
                }
            }
            &.params {
                font-size: 13px;
                padding: 20px 5px;
                .param {
                    text-align: left;
                }
            }
            &.prices {
                text-align: center;
                width: 250px;
                overflow: hidden;
                padding: 20px 5px;

                .prices-wrap {
                    display: flex;
                    text-align: center;

                    .price {
                        flex-basis: 48px;
                        overflow: hidden;
                        font-family: "Century Gothic";
                        font-size: 17px;
                        color: #567f96;
                        border-right: solid 1px #bfbda3;
                        padding: 12px 0;

                        &:first-child {
                            border-left: solid 1px #bfbda3;
                        }
                    }
                }
            }
            &.cart {
                max-width: 155px;
                padding: 20px 10px 20px 5px;
            }
        }
    }
</style>