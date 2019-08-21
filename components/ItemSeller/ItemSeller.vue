<template>
    <transition name="fade" mode="out-in">
        <section v-if="itemsLoaded">
            <component
                    v-if="showFilter"
                    :is="filterComponent"
                    :items="allItems"
                    :filters="filters"
                    @filter-change="onFilterChange"
                    @avail-lengths-count="onAvailLengthsCount"
            ></component>
            <transition name="fade" mode="out-in">
                <div class="table" key="table" v-if="items.length > 0">
                    <paginator
                            v-if="paginator"
                            :limit="limit"
                            :offset="offset"
                            :items="items"
                            @limit-change="onLimitChange"
                            @prev-click="onPrevPageClick"
                            @next-click="onNextPageClick"
                            @page-click="onPageClick"
                    />
                    <component
                            :is="headerComponent"
                            :items="items"
                    ></component>

                    <transition-group name="fade-slide">
                        <component
                                v-if="cartMode === 'edit' && itemsProp.length > 0"
                                :is="itemComponent"
                                :cartMin="cartMin"
                                :cartStep="cartStep"
                                v-for="item, index in itemsProp"
                                :key="Array.isArray(item) ? item[0].name : item.name"
                                :item="item"
                                :items="entity === 'hand' ? allItems : null"
                                :cartMode="cartMode"
                                :entity="entity"
                                @add-to-cart-click="onAddToCartClick"
                                @save-cart-quantity-click="onSaveCartQuantityClick"
                        />
                    </transition-group>
                    <component
                            v-if="cartMode === 'add'"
                            :is="itemComponent"
                            :cartMin="cartMin"
                            :cartStep="cartStep"
                            v-for="item, index in paginatedItems"
                            :key="Array.isArray(item) ? item[0].name : item.name"
                            :item="item"
                            :items="entity === 'hand' ? allItems : null"
                            :cartMode="cartMode"
                            :entity="entity"
                            @add-to-cart-click="onAddToCartClick"
                            @save-cart-quantity-click="onSaveCartQuantityClick"
                    >
                    </component>

                    <paginator
                            v-if="paginator"
                            :limit="limit"
                            :offset="offset"
                            :items="items"
                            @limit-change="onLimitChange"
                            @prev-click="onPrevPageClick"
                            @next-click="onNextPageClick"
                            @page-click="onPageClick"
                    />
                </div>
                <div v-else key="no-items" class="no-items">
                    Нет подходящих товаров. Измените условия фильтра.
                    <div @click="resetFilter" class="reset-filter-btn">Сбросить фильтр</div>
                </div>
            </transition>
        </section>
        <div v-else class="item-seller__loading">
            <font-awesome-icon icon="spinner" spin  size="lg"/>
        </div>
    </transition>
</template>
<script>
    import movementHeader from 'Components/ItemSeller/headers/movements.vue'
    import fastenerHeader from 'Components/ItemSeller/headers/fastener.vue'
    import handHeader from 'Components/ItemSeller/headers/hand.vue'
    import movementItem from 'Components/ItemSeller/items/movements.vue'
    import fastenerItem from 'Components/ItemSeller/items/fastener.vue'
    import handItem from 'Components/ItemSeller/items/hand/hand.vue'
    import movementFilter from 'Components/ItemSeller/filters/movements.vue'
    import fastenerFilter from 'Components/ItemSeller/filters/fastener.vue'
    import handFilter from 'Components/ItemSeller/filters/hand.vue'
    import signFilter from 'Components/ItemSeller/filters/sign.vue'
    import signHeader from 'Components/ItemSeller/headers/sign.vue'
    import signItem from 'Components/ItemSeller/items/sign.vue'
    import capsuleFilter from 'Components/ItemSeller/filters/capsule.vue'
    import capsuleHeader from 'Components/ItemSeller/headers/capsule.vue'
    import capsuleItem from 'Components/ItemSeller/items/capsule.vue'
    import paginator from 'Components/ItemSeller/Paginator.vue'

    export default {
        created() {
            this.rootEntity = this.$root.entity;
            this.rootCartMin = this.$root.cartMin;
            this.rootCartStep = this.$root.cartStep;
            this.loadItems();
            this.setFilters();
            this.setLimit();
            /*if (this.entity === 'movement') {
                this.loadStandardFastenerId();
            }*/
        },
        props: {
            entityProp: String,
            itemsProp: Array,
            showFilter: {
                type: Boolean,
                default: true
            },
            cartMinProp: {
                type: Number,
                default: 10
            },
            cartStepProp: {
                type: Number,
                default: 10
            },
            cartMode: {
                type: String,
                default: 'add'
            },
            paginator: {
                type: Boolean,
                default: true
            },
            adminMode: {
                type: Boolean,
                default: false
            }
        },
        data(){
            return {
                rootEntity: null,
                itemsLoaded: false,
                filters: {},
                items: null,
                paginatedItems: null,
                limit: 10,
                offset: 0,
                rootCartMin: null,
                rootCartStep: null
            }
        },
        computed: {
            entity() {
                return this.rootEntity || this.entityProp
            },
            cartMin() {
                return this.rootCartMin || this.cartMinProp
            },
            cartStep() {
                return this.rootCartStep || this.cartStepProp
            },
            allItems() {
                if (this.itemsProp) {
                    this.itemsLoaded = true;
                    return this.itemsProp;
                } else {
                    let entityName = this.entity + 'ForSale';
                    return this.$store.getters.items(entityName);
                }
            },
            headerComponent() {
                return this.entity + 'Header';
            },
            itemComponent() {
                return this.entity + 'Item';
            },
            filterComponent() {
                return this.entity + 'Filter';
            },
           /* standardFastenerId() {
                return this.$store.getters.standardFastenerId;
            },*/
        },
        watch: {
            allItems(value, oldValue) {
                if (value!== null) {
                    if (this.entity === 'hand') {
                        this.items = this.getItemsForHands(value);
                    } else {
                        this.items = value;
                    }

                    this.itemsLoaded = true;
                    this.filterItems();
                }
            }
        },
        methods: {
            /*loadStandardFastenerId() {
                this.$store.dispatch('getStandardFastenerId');
            },*/
            loadItems() {
                if (!this.itemsProp) {
                    let entityName = this.entity + 'ForSale';
                    this.$store.dispatch('getItems', {entityName: entityName});
                } else {
                    if (this.entity === 'hand' && this.cartMode === 'add') {
                        this.items = this.getItemsForHands(this.itemsProp)
                    } else {
                        this.items = this.itemsProp;
                    }
                    this.setPaginatedItems()
                }
            },
            setFilters() {
                if (this.entity === 'movement') {
                    this.filters = {
                        type: 'all',
                        dialWidth: 'all',
                        stroke: 'all',
                        noisiness: 'all',
                        plasticHangerOnly: false,
                        stockOnly: false
                    }
                } else if (this.entity === 'hand') {
                    this.filters = {
                        typeHourMinutes: true,
                        typeSeconds: false,
                        typePlastic: true,
                        typePower: true,
                        shaftS1: true,
                        shaftS2: true,
                        lengthFrom: null,
                        lengthTo: null,
                        colorAll: true,
                        colorRed: false,
                        colorBlack: false,
                        colorGold: false,
                        colorWhite: false,
                        colorBronze: false,
                        colorSilver: false
                    }
                }
            },
            setLimit() {
                if (!this.paginator) {
                    this.limit = 0;
                }
            },
            onLimitChange(value) {
                this.offset = 0;
                this.limit = parseInt(value);
                this.setPaginatedItems();
            },
            onFilterChange(data) {
                this.handleColorFilter(data);
                this.filters[data.type] = data.value;
                this.offset = 0;

                this.filterItems();
            },
            onAvailLengthsCount(data) {
                this.filters.lengthFrom = data.lengthFrom;
                this.filters.lengthTo = data.lengthTo;
            },
            filterItems() {
                if (!this.showFilter) {
                    return false;
                }
                if (this.entity === 'movement') {
                    this.filterMovements();
                } else if (this.entity === 'hand') {
                    this.filterHands();
                } else if (this.entity === 'fastener') {
                    this.filterFastener();
                } else if (this.entity === 'sign') {
                    this.filterSign();
                } else if (this.entity === 'capsule') {
                    this.filterCapsule();
                }
            },
            filterMovements() {
                this.items = this.allItems;

                if (this.filters.type !== 'all') {
                    this.items = this.allItems.filter(item => item.type.id === parseInt(this.filters.type))
                }
                if (this.filters.dialWidth !== 'all') {
                    this.items = this.items.filter(item => item.shaft.id === parseInt(this.filters.dialWidth))
                }
                if (this.filters.stroke !== 'all') {
                    this.items = this.items.filter(item => item.strokeType.id === parseInt(this.filters.stroke))
                }
                if (this.filters.noisiness !== 'all') {
                    this.items = this.items.filter(item => item.noisinesType.id === parseInt(this.filters.noisiness))
                }
                if (this.filters.plasticHangerOnly) {
                    this.items = this.items.filter(item => item.plastic_hanger === 1)
                }
                if (this.filters.stockOnly) {
                    this.items = this.items.filter(item => item.quantity > 10)
                }
                this.setPaginatedItems();
            },
            filterHands() {
                this.items = this.getItemsForHands(this.allItems);

                this.filterHandsByType();
                this.filterHandsByShaft();
                this.filterHandsByLength();
                this.filterHandsByColor();
                this.setPaginatedItems();
            },
            filterHandsByType() {
                let types = [];
                if (this.filters.typeHourMinutes) {
                    types.push('hand')
                }
                if (this.filters.typeSeconds) {
                    types.push('second')
                }
                if (this.filters.typePlastic) {
                    types.push('plastic')
                }
                if (this.filters.typePower) {
                    types.push('power')
                }

                this.items = this.items.filter((item) => {
                    /*if (Array.isArray(item)) {
                        item = item[0]
                    }*/
                    item = item[0]
                    return types.includes(item.type.slug);
                });
            },
            filterHandsByShaft() {
                let shafts = [];

                if (this.filters.shaftS1) {
                    shafts.push('S1')
                }
                if (this.filters.shaftS2) {
                    shafts.push('S2')
                }

                this.items = this.items.filter((item) => {
                    if (Array.isArray(item)) {
                        item = item[0]
                    }
                    return shafts.includes(item.shaftType.name);
                });
            },
            filterHandsByLength() {
                if (this.filters.lengthFrom && this.filters.lengthTo) {
                    this.items = this.items.filter((item) => {
                        if (Array.isArray(item)) {
                            item = item[0]
                        }
                        return item.length_m >= this.filters.lengthFrom && item.length_m <= this.filters.lengthTo
                    });
                }
            },
            filterHandsByColor() {
                if (this.filters.colorAll) {
                    return false;
                }

                let colors = [];
                if (this.filters.colorRed) {
                    colors.push('Красный')
                }
                if (this.filters.colorBlack) {
                    colors.push('Чёрный')
                }
                if (this.filters.colorGold) {
                    colors.push('Золото')
                }
                if (this.filters.colorWhite) {
                    colors.push('Белый')
                }
                if (this.filters.colorBronze) {
                    colors.push('Бронза')
                }
                if (this.filters.colorSilver) {
                    colors.push('Серебро')
                }

                let arr = [];
                for(let item of this.items) {
                    let subArr = [];
                    for (let subItem of item) {
                        if (colors.includes(subItem.color.name)) {
                            subArr.push(subItem);
                        }
                    }
                    if (subArr.length === 1) {
                        arr.push(subArr[0]);
                    } else if (subArr.length > 1) {
                        arr.push(subArr);
                    }
                }
                this.items = this.getItemsForHands(arr);
            },
            filterFastener() {
                this.items = this.allItems;
                this.setPaginatedItems();
            },
            filterSign() {
                this.items = this.allItems;
                this.setPaginatedItems();
            },
            filterCapsule() {
                this.items = this.allItems;
                this.setPaginatedItems();
            },
            resetFilter() {
                this.setFilters();
                if (this.entity === 'hand') {
                    this.items = this.getItemsForHands(this.allItems)
                } else {
                    this.items = this.allItems;
                }
            },
            getItemsForHands(allHands) {
                let arr = [];

                for (let hand of allHands) {
                    let index = this.arrayContainsHand(arr, hand);

                    if (index !== false) {
                        let arrIndex = arr[index];

                        if (Array.isArray(arrIndex)) {
                            arrIndex.push(hand)
                        } else {
                            const buffer = JSON.parse(JSON.stringify(arrIndex));
                            arr[index] = [];
                            arr[index].push(buffer);
                            arr[index].push(hand)
                        }
                    } else {
                        arr.push([hand])
                    }
                }

                return arr;
            },
            setPaginatedItems() {
                if (this.limit === 0) {
                    this.paginatedItems = this.items;
                } else {
                    let arr = [];
                    let limit = this.offset + this.limit > this.items.length
                        ? this.limit - ((this.offset + this.limit) - this.items.length)
                        : this.limit;

                    for (let i = this.offset; i < this.offset + limit; i++) {
                        arr.push(this.items[i])
                    }

                    this.paginatedItems = arr;
                }
            },
            arrayContainsHand(array, hand) {
                let i = 0;
                for (let item of array) {
                    if (Array.isArray(item)) {
                        for (let subItem of item) {
                            if (subItem.article === hand.article) {
                                return i
                            }
                        }
                    }
                    if (item.article === hand.article) {
                        return i
                    }
                    i++;
                }
                return false;
            },
            handleColorFilter(data) {
                const colors = [
                    'colorAll',
                    'colorBlack',
                    'colorWhite',
                    'colorRed',
                    'colorSilver',
                    'colorGold',
                    'colorBronze'
                ];

                if (!colors.includes(data.type)) {
                    return false;
                }

                if (data.type === 'colorAll' && data.value) {
                    this.filters.colorBlack = false;
                    this.filters.colorWhite = false;
                    this.filters.colorRed = false;
                    this.filters.colorSilver = false;
                    this.filters.colorGold = false;
                    this.filters.colorBronze = false;
                } else if (data.type !== 'colorAll' && data.value) {
                    this.filters.colorAll = false;
                }
            },
            allColorsDisabled () {
                const colors = [
                    'colorBlack',
                    'colorWhite',
                    'colorRed',
                    'colorSilver',
                    'colorGold',
                    'colorBronze'
                ];
                for (let color of colors) {
                    if (this.filters[color]) {
                        return false;
                    }
                }
                return true;
            },
            onPrevPageClick() {
                this.offset -= this.limit;
                this.setPaginatedItems();
            },
            onNextPageClick() {
                this.offset += this.limit;
                this.setPaginatedItems();
            },
            onPageClick(offset) {
                this.offset = offset;
                this.setPaginatedItems();
            },
            onAddToCartClick({itemId, quantity}) {
                const data = {
                    entityName: this.entity,
                    itemId: itemId,
                    quantity: quantity
                };

                if (this.adminMode) {
                    this.$emit('add-product', data)
                } else {
                    this.$store.dispatch('addToCart', data);
                }

                /*if (this.entity === 'movement') {
                    this.$store.dispatch('addToCart', {
                        entityName: 'fastener',
                        itemId: this.standardFastenerId,
                        quantity: quantity
                    });
                }*/
            },
            onSaveCartQuantityClick({itemId, quantity}) {
                if (quantity === 0) {
                    this.$store.dispatch('removeCartItem', {
                        entityName: this.entity,
                        itemId: itemId
                    });
                } else {
                    this.$store.dispatch('saveCartQuantity', {
                        entityName: this.entity,
                        itemId: itemId,
                        quantity: quantity
                    });
                    /*if (this.entity === 'movement') {

                        this.$store.dispatch('saveCartQuantity', {
                            entityName: 'fastener',
                            itemId: this.standardFastenerId,
                            quantity: this.totalItemsQuantity()
                        });
                    }*/
                }
            },
        },
        components: {
            movementHeader,
            fastenerHeader,
            handHeader,
            movementItem,
            fastenerItem,
            handItem,
            movementFilter,
            fastenerFilter,
            handFilter,
            signFilter,
            signHeader,
            signItem,
            capsuleFilter,
            capsuleHeader,
            capsuleItem,
            paginator
        }
    }
</script>
<style scoped lang="stylus">
    section {
        width: 100%;

        .table {
            margin-top: 20px;

            .items {
                display: table-row-group;
            }
        }
        .no-items {
            padding: 40px;
            text-align: center;
            font-family: "Alegreya Sans Light";
            font-size: 24px;
            color: #4D4D4D;

            .reset-filter-btn {
                background: #b970c4;
                color: #fff;
                text-transform: uppercase;
                padding: 20px;
                margin: 20px auto;
                border-radius: 5px;
                max-width: 280px;
                cursor: pointer;
            }
        }
    }


    .fade-enter-active {
        transition: all .3s ease;
        position: relative;
    }
    .fade-leave-active {
        transition: all .3s ease;
        position: relative;
    }
    .fade-enter, .fade-leave-to{
        opacity: 0;
        position: relative;
    }

    .item-seller__loading{
        text-align: center;
        padding: 20px;
        svg {
            color: #7F786E;
        }
    }
</style>