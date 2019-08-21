<template>
    <div class="try-hand__cases-menu">
        <label class="try_hand_menu">
            <span class="try_hand_menu__header">Корпус</span>
            <select :value="material" @change="onChange">
                <option value="Пластик">Пластик</option>
                <option value="Дерево">Дерево</option>
                <option value="Металл">Металл</option>
            </select>
        </label>
        <div class="clock-cases">
            <div
                    class="clock-cases__item"
                    v-for="item in items"
                    :class="item.id == activeId ? 'clock-case__item_active' : ''"
                    @click="onItemClick(item.id)"
            >
                <img :src="item.thumb_id[0].src" />
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        props: {
            items: Array,
            material: String,
            activeId: Number
        },
        computed: {

        },
        methods: {
            onChange($event) {
                this.$emit('case-material-change', $event.target.value)
            },
            onItemClick(id) {
                this.$emit('item-click', id)
            }
        }
    }
</script>
<style scoped lang="stylus"></style>