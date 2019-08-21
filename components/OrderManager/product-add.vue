<template>
    <div class="add-product">
        <div class="add-product__menu">
            <div
                    class="menu__item"
                    @click="onMenuItemClick('movement')"
                    :class="menuItemClass('movement')"
            >
                Механизмы
            </div>
            <div
                    class="menu__item"
                    @click="onMenuItemClick('hand')"
                    :class="menuItemClass('hand')"
            >
                Стрелки
            </div>
            <div
                    class="menu__item"
                    @click="onMenuItemClick('sign')"
                    :class="menuItemClass('sign')"
            >
                Знаки
            </div>
            <div
                    class="menu__item"
                    @click="onMenuItemClick('capsule')"
                    :class="menuItemClass('capsule')"
            >
                Капсулы
            </div>
            <div
                    class="menu__item"
                    @click="onMenuItemClick('fastener')"
                    :class="menuItemClass('fastener')"
            >
                Крепёж
            </div>
        </div>

        <item-seller
            v-if="entity && items"
            :entityProp="entity"
            :itemsProp="items"
            :cartMinProp="productCartMin"
            :cartStepProp="productCartMin"
            :adminMode="true"
            @add-product="onAddProduct"
        />
        <div v-if="loading" class="add-product__loading">
            <font-awesome-icon icon="spinner" spin  size="lg"/>
        </div>
    </div>
</template>
<script>
    import ItemSeller from 'Components/ItemSeller/ItemSeller.vue'

    export default {
        data() {
            return {
                entity: null
            }
        },
        computed: {
            items() {
                return this.$store.getters.data(this.entity)
            },
            loading() {
                return this.entity && !this.items;
            },
            productCartMin() {
                let one = ['capsule', 'sign'],
                    ten = ['movement', 'hand', 'fastener'];

                if (one.includes(this.entity)) {
                    return 1;
                } else if (ten.includes(this.entity)) {
                    return 10;
                }
            }
        },
        methods: {
            onMenuItemClick(entity) {
                this.entity = entity;
                if (!this.items) {
                    this.loadItems();
                }

            },
            loadItems() {
                this.$store.dispatch('getItems', {entityName: this.entity});
            },
            menuItemClass(entity) {
                return entity === this.entity ? 'menu__item_selected' : '';
            },
            onAddProduct(data) {
                this.$emit('add-product', data)
            }
        },
        components: {
            ItemSeller
        }
    }
</script>
<style lang="stylus">
    .add-product {
        .add-product__menu {
            display: flex;
            justify-content: center;
            .menu__item {
                padding: 20px;
                border: solid 3px #999;
                text-align: center;
                margin: 10px;
                border-radius: 5px;
                font-size: 18px;
                cursor: pointer;
                transition: all .3s;
                &:hover {
                    transform: scale(1.1);
                    border-color: #777;
                }
                &.menu__item_selected {
                    cursor: default;
                    border-color: #bbb;
                    color: #777;
                    &:hover {
                        transform: scale(1);
                        border-color: #bbb;
                    }
                }
            }
        }
        .add-product__loading{
              text-align: center;
              padding: 20px;
              svg {
                  color: #7F786E;
              }
          }
    }
</style>