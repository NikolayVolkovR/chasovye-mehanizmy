<template>
    <li @click.stop="onClick" @mouseenter="onMouseover" @mouseleave="onMouseOut" :class="className">
        <router-link :to="item.url" v-if="item.url">
            <font-awesome-icon :icon="['far', iconName]" :class="iconClassList"/>
            {{ item.label }}
        </router-link>
        <template v-else>
            <font-awesome-icon :icon="['far', iconName]" :class="iconClassList"/>
            {{ item.label }}
        </template>

        <vue-menu
                v-if="hasSubmenu"
                :items="item.items"
                :isOpened="isSubMenuOpened || hasActiveChild"
        >

        </vue-menu>
    </li>
</template>
<script>
    export default {
        name: "menu-item",
        data() {
            return {
                isSubMenuOpened: false,
                isHovered: false,
            }
        },
        beforeCreate: function () {
            this.$options.components.VueMenu = require('./Menu.vue').default
        },
        props: {
            item: Object,
        },
        methods: {
            onClick() {
                this.isSubMenuOpened = !this.isSubMenuOpened;
            },
            onMouseover() {
                this.isHovered = true;
            },
            onMouseOut() {
                this.isHovered = false;
            }
        },
        computed: {
            hasSubmenu() {
                return !!this.item.items;
            },
            iconName() {
                return this.hasSubmenu ? 'arrow-alt-circle-right' : 'circle'
            },
            iconClassList() {
                if (this.isSubMenuOpened || this.hasActiveChild) {
                    return 'iconActive';
                }

                return this.isHovered ? 'iconHovered' : ''
            },
            className() {
                if (this.hasActiveChild) {
                    return 'opened'
                } else if (this.$route.path === this.item.url) {
                    return 'active'
                } else {
                    return ''
                }
            },
            hasActiveChild() {
                return hasActiveChild(this.item.items, this.$route.path);
            }
        }
    }

    /*function hasActiveChild (items, pathName) {
        if (items) {
            for (let i = 0, l = items.length; i < l; i++) {
                if (items[i].url === pathName) {
                    return true
                }
                if (items[i].items) {
                    return hasActiveChild(items[i].items, pathName)
                }
            }
        }

        return false
    }*/

    /*function hasActiveItem(items, pathName) {
        for (let i = 0, l = items.length; i < l; i++) {
            if (items[i].url === pathName) {
                return true;
            } else if (items[i].items) {
                return hasActiveItem (items[i].items, pathName)
            }
        }
        return false;
    }

    function hasActiveChild (items, pathName) {
        if (items) {
            return hasActiveItem(items, pathName);
        }
        return false
    }*/

    function hasActiveChild (items, pathName) {
        if (!items) {
            return false;
        }

        for (let i = 0, l = items.length; i < l; i++) {
            if (items[i].url === pathName) {
                return true;
            }

            if (items[i].items) {
                let items2 = items[i].items;

                for (let k = 0, len = items2.length; k < len; k ++) {
                    if (items2[k].url === pathName) {
                        return true;
                    }
                }
            }
        }
        return false;
    }
</script>
<style scoped>
    li {
        color: #ccc;
        font-size: 16px;
        padding: 7px 0 7px 17px;
        cursor: pointer;
        transition: background 0.3s, border-left 0.3s;
        border-left: solid 3px transparent;
    }

    li:hover {
        background: #2D2C2C
    }

    li.opened {
        background: #3A3938;
    }

    li.active {
        background: #212121;
        border-left-color: #AFA598;
    }
    li.active:hover {
        background: #212121;
    }

    svg {
        transition: transform 0.3s;
    }

    .iconHovered {
        transform: rotate(45deg);
    }
    .iconActive {
        transform: rotate(90deg);
    }


</style>