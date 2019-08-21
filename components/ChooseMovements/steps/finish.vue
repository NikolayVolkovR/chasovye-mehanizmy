<template>
    <div class="finish-step">
        <header>Подходящие механизмы:</header>
        <item-seller-movements
                :items-prop="movements"
                entity-prop="movement"
                :show-filter="false"
        ></item-seller-movements>

        <template v-if="showFasteners">
            <header class="fastener">Не забудьте добавить в корзину комплектующие:</header>
            <item-seller-movements
                    :items-prop="fastenersToShow"
                    entity-prop="fastener"
                    :show-filter="false"
            ></item-seller-movements>
        </template>
        <div class="again-button" @click="onClick">
            <img class="icon" src="/images/choose-movements/choose-movements.svg" />
            Подобрать другие механизмы
        </div>
    </div>
</template>
<script>
    import ItemSellerMovements from 'Components/ItemSeller/ItemSeller.vue'

    export default {
        props: {
            movements: Array,
            fasteners: Array,
            restrictions: Object
        },
        computed: {
            needFastener() {
                return !!this.restrictions.hanger || !!this.restrictions.nut;
            },
            movementsContainsPendulum() {
                for(let movement of this.movements) {
                    if (movement.type.name === 'Маятниковый') {
                        return true;
                    }
                }
                return false;
            },
            fastenersToShow() {
                let arr = [];
                for(let fastener of this.fasteners) {
                    if (this.restrictions.hanger === 'metal') {
                        if (this.movementsContainsPendulum && fastener.type.name === 'Металлическая петля для маятникового механизма') {
                            arr.push(fastener)
                        } else if (!this.movementsContainsPendulum && fastener.type.name === 'Металлическая петля') {
                            arr.push(fastener)
                        }
                    }

                    if (this.restrictions.nut === 'Да' && fastener.type.name === 'Фигурная гайка') {
                        arr.push(fastener)
                    }
                }
                return arr;
            },
            showFasteners() {
                return this.needFastener && this.fastenersToShow.length > 0
            }
        },
        methods: {
            onClick() {
                this.$emit('again')
            }
        },
        components: {
            ItemSellerMovements
        }
    }
</script>

<style scoped lang="stylus">
    * {
        font-family: "Alegreya Sans";
        color: #333;
        box-sizing: border-box;
    }
    .finish-step {
        max-width: 800px;
        margin: 0 auto;
    }
    header {
        margin-top: 60px;
        font-size: 30px;
        font-weight: bold;
        text-align: center;

        &.fastener {
            margin-top: 60px;
        }
    }

    .again-button {
        position: relative;
        min-width: 200px;
        max-width: 300px;
        text-align: center;
        color: #635d56;
        border: solid 4px #d99be0;
        font-size: 24px;
        font-family: "Alegreya Sans Medium";
        border-radius: 5px;
        padding: 50px 20px 20px;
        margin: 80px auto;
        letter-spacing: 1px;
        cursor: pointer;

        .icon {
            position: absolute;
            top: -40px;
            left: 50%;
            margin-left: -40px;
            width: 80px;
        }
    }
</style>