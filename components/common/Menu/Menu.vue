<template>
    <transition name="slide-fade">
        <ul class="vue-menu" v-show="isOpened">
            <menu-item v-for="(item, index) in items" :item="item" :key="index"></menu-item>
        </ul>
    </transition>
</template>
<script>
    import MenuItem from './Item.vue'

    export default {
        name: 'vue-menu',
        props: {
            isOpened: {
                default: true,
                type: Boolean
            },
            items: Array
        },
        computed: {

        },
        components: {
            MenuItem
        }
    }
</script>
<style>
    .vue-menu {
        padding: 0;
        margin: 7px 0 0px 0;
        list-style-type: none;
    }

    .slide-fade-enter-active {
        transition: all .3s ease;
    }
    .slide-fade-leave-active {
        transition: all .3s ease;
    }
    .slide-fade-enter, .slide-fade-leave-to{
        transform: translateX(-20px);
        opacity: 0;
    }

</style>