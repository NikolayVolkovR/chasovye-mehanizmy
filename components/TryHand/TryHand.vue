<template>
    <transition name="fade" mode="out-in">
        <section v-if="loaded" class="try-hand">
            <div class="try-hand__top">
                <div class="try-hand__menu">
                    <cases
                            :items="casesByMaterial"
                            :material="caseMaterial"
                            :activeId="activeCaseId"
                            @case-material-change="onCaseMaterialChange"
                            @item-click="onCaseItemClick"
                    />
                    <dials
                            :items="dialsByTypeAndColor"
                            :digitTypes="digitTypes"
                            :digitType="digitType"
                            :digitColor="digitColor"
                            :digitColors="digitColors"
                            :dialColor="dialColor"
                            :activeItemId="activeDialId"
                            @dial-color-change="onDialColorChange"
                            @digit-type-change="onDigitTypeChange"
                            @digit-color-change="onDigitColorChange"
                            @dial-item-click="onDialItemClick"
                    />
                </div>
                <dial
                        :clockCase="getCaseById(activeCaseId)"
                        :dial="getDialById(activeDialId)"
                        :dialColor="dialColor"
                        :hand="activeHand"
                        :second="activeSecond"
                />
            </div>
            <transition name="fade-slide" mode="out-in">
                <div v-if="fullMode && allHandsLoaded" key="full-mode">
                    <div class="active-hands">
                        <header>
                            Активные стрелки:
                            <span
                                    class="active-hands__hide-btn"
                                    @click="onActiveHandsBntClick"
                            >{{ activeHandsBtnText }}</span>
                        </header>
                        <transition name="fade-slide">
                            <div v-if="showActiveHands">
                                <hand-header :tryOn="true"></hand-header>
                                <active-hand :item="[activeHand]" :tryOn="true"></active-hand>
                                <active-hand :item="[activeSecond]" :tryOn="true"></active-hand>
                            </div>
                        </transition>
                    </div>
                    <hand-filter
                            :items="allHands"
                            :filters="filters"
                            :typeFilter="false"
                            :colorsOneLine="true"
                            @filter-change="onFilterChange"
                            @avail-lengths-count="onAvailLengthsCount"
                    />
                </div>
                <div v-else-if="fullMode && !allHandsLoaded" class="full-mode__loading" key="full-mode-loading">
                    <font-awesome-icon icon="spinner" spin  size="lg"/>
                </div>
            </transition>
            <transition name="fade-slide">
                <div
                        v-if="handsToUse.length > 0"
                        class="demo-hands"
                        :style="demoHandsStyle"
                        key="sliders">
                    <hand-slider
                            :items="hands"
                            :activeItemId="activeHandId"
                            :quantity="6"
                            :marginTop="0"
                            @item-click="onHandSliderItemClick"
                    />
                    <hand-slider
                            :items="seconds"
                            :activeItemId="activeSecondId"
                            :quantity="6"
                            :marginTop="30"
                            @item-click="onSecondSliderItemClick"
                    />
                    <transition name="fade-slide">
                        <div
                                class="full-mode-btn"
                                @click="onFullModeBtnClick"
                                v-if="!fullModeActivated"
                        >ПРОДОЛЖИТЬ ВЫБОР<br/>со всеми функциями
                        </div>
                    </transition>
                </div>
                <div v-else class="no-items" key="no-items">
                    Нет подходящих стрелок. Измените условия фильтра.
                    <div @click="resetFilter" class="reset-filter-btn">Сбросить фильтр</div>
                </div>
            </transition>
        </section>
        <div v-else class="try-hand__loading">
            <font-awesome-icon icon="spinner" spin  size="lg"/>
        </div>
    </transition>
</template>
<script>
    import cases from 'Components/TryHand/CasesMenu.vue'
    import dials from 'Components/TryHand/DialsMenu.vue'
    import dial from 'Components/TryHand/Dial.vue'
    import handSlider from 'Components/HandSlider/HandSlider.vue'
    import handFilter from 'Components/ItemSeller/filters/hand.vue'
    import handHeader from 'Components/ItemSeller/headers/hand.vue'
    import hand from 'Components/ItemSeller/items/hand/hand.vue'

    export default {
        name: "try-hand",
        created() {
            this.loadCases();
            this.loadDials();
            if (this.demo) {
                this.loadDemoHands();
            }
            this.setFilter();
            if (this.itemsProp) {
                this.handsToUse = this.itemsProp;
                this.setActiveHandsId();
            }
        },
        props: {
            demo: {
                type: Boolean,
                default: true
            },
            itemsProp: Array,
            activeHandProp: Array
        },
        data() {
            return {
                filters: {},
                caseMaterial: 'Пластик',
                digitType: 'Арабский',
                digitColor: 'Чёрный',
                dialColor: '#fff',
                activeCaseId: null,
                activeDialId: null,
                activeHandId: null,
                activeSecondId: null,
                fullModeActivated: false,
                showActiveHands: true,
                handsToUse: []
            }
        },
        watch: {
            cases(value, oldValue) {
                this.activeCaseId = this.casesByMaterial[0].id
            },
            dials(value, oldValue) {
                this.activeDialId = this.dialsByTypeAndColor[0].id
            },
            demoHands(value, oldValue) {
                if (value !== null) {
                    this.handsToUse = this.demoHands;
                }
            },
            loaded() {
                this.setActiveHandsId();
            },
            allHands() {
                this.handsToUse = this.allHands;
            }
        },
        computed: {
            loaded() {
                if (this.itemsProp) {
                    return Array.isArray(this.cases)
                        && Array.isArray(this.dials);
                } else {
                    return Array.isArray(this.cases)
                        && Array.isArray(this.dials)
                        && Array.isArray(this.demoHands);
                }
            },
            allHandsLoaded() {
                return Array.isArray(this.allHands);
            },
            cases() {
                return this.$store.getters.items('clockCase');
            },
            dials() {
                return this.$store.getters.items('clockDial');
            },
            demoHands() {
                return this.$store.getters.items('handDemo');
            },
            allHands() {
                return this.$store.getters.items('handForSale');
            },
            hands() {
                return this.handsToUse.filter(hand=>hand.type.slug === 'hand')
            },
            seconds() {
                return this.handsToUse.filter(hand=>hand.type.slug === 'second')
            },
            activeHand() {
                if (this.fullMode && this.allHandsLoaded) {
                    return this.handsToUse.find(hand=>hand.id === this.activeHandId && hand.type.slug === 'hand')
                } else {
                    return this.hands.find(hand=>hand.id === this.activeHandId)
                }
            },
            activeSecond() {
                /*if (this.activeHandProp) {
                    const lengthMin = this.activeHandProp[0].length_m - 5;
                    const lengthMax = this.activeHandProp[0].length_m + 5;
                    return this.getSuitableSecond({lengthMin: lengthMin, lengthMax: lengthMax})
                } else {
                    if (this.fullMode && this.allHandsLoaded) {
                        return this.handsToUse.find(second=>second.id === this.activeSecondId && second.type === 'second')
                    } else {
                        return this.seconds.find(second=>second.id === this.activeSecondId)
                    }
                }*/
                if (this.fullMode && this.allHandsLoaded) {
                    return this.handsToUse.find(second=>second.id === this.activeSecondId && second.type.slug === 'second')
                } else {
                    return this.seconds.find(second=>second.id === this.activeSecondId)
                }
            },
            casesByMaterial() {
                return this.cases.filter(item => item.material.name === this.caseMaterial)
            },
            digitTypes() {
                return Array.from(new Set(this.dials.map(dial=>dial.dial.name)))
            },
            digitColors() {
                return Array.from(new Set(this.dials.map(dial=>dial.color.name)))
            },
            dialsByTypeAndColor() {
                return this.dials.filter(item => item.dial.name === this.digitType && item.color.name === this.digitColor)
            },
            fullMode() {
                return !this.demo || this.fullModeActivated
            },
            demoHandsStyle() {
                if (this.fullMode && this.allHandsLoaded) {
                    return {marginTop: 0}
                } else {
                    if (window.innerWidth > 700) {
                        return {marginTop: '40px'}
                    } else {
                        return {marginTop: '20px'}
                    }
                }
            },
            activeHandsBtnText() {
                return this.showActiveHands ? 'Скрыть' : 'Показать'
            }
        },
        methods: {
            loadCases() {
                this.$store.dispatch('getItems', {entityName: 'clockCase'});
            },
            loadDials() {
                this.$store.dispatch('getItems', {entityName: 'clockDial'});
            },
            loadDemoHands() {
                this.$store.dispatch('getItems', {entityName: 'handDemo'});
            },
            loadAllHands () {
                this.$store.dispatch('getItems', {entityName: 'handForSale'});
            },
            setActiveHandsId() {
                if (this.itemsProp) {
                    this.activeHandId = this.activeHandProp[0].id;
                    this.activeSecondId = this.getSuitableSecond().id;
                } else {
                    this.activeHandId = this.hands[0].id;
                    this.activeSecondId = this.seconds[0].id;
                }
            },
            onCaseMaterialChange(material) {
                this.caseMaterial = material;
                this.activeCaseId = this.casesByMaterial[0].id;
            },
            onDialColorChange(value) {
                this.dialColor = value;
            },
            onDigitTypeChange(value) {
                this.digitType = value;
                this.activeDialId = this.dialsByTypeAndColor[0].id;
            },
            onDigitColorChange(value) {
                this.digitColor = value;
                this.activeDialId = this.dialsByTypeAndColor[0].id;
            },
            onCaseItemClick(id) {
                this.activeCaseId = id
            },
            onDialItemClick(id) {
                this.activeDialId = id;
            },
            getCaseById(id) {
                return this.casesByMaterial.find((element, index, array)=>element.id == id)
            },
            getDialById(id) {
                return this.dialsByTypeAndColor.find((element, index, array)=>element.id == id)
            },
            onHandSliderItemClick(id) {
                this.activeHandId = id;
            },
            onSecondSliderItemClick(id) {
                this.activeSecondId = id;
            },
            onFilterChange(data) {
                this.filters[data.type] = data.value;
                this.handleColorFilter(data);
                this.filterHands();
            },
            filterHands() {
                this.handsToUse = this.allHands;

                this.filterHandsByShaft();
                this.filterHandsByLength();
                this.filterHandsByColor();
            },
            filterHandsByShaft() {
                let shafts = [];

                if (this.filters.shaftS1) {
                    shafts.push('S1')
                }
                if (this.filters.shaftS2) {
                    shafts.push('S2')
                }

                this.handsToUse = this.handsToUse.filter((item) => {
                    if (Array.isArray(item)) {
                        item = item[0]
                    }
                    return shafts.includes(item.shaftType.name);
                });
            },
            filterHandsByLength() {
                if (this.filters.lengthFrom && this.filters.lengthTo) {
                    this.handsToUse = this.handsToUse.filter((item) => {
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
                for(let item of this.handsToUse) {
                    if (colors.includes(item.color.name)) {
                        arr.push(item);
                    }
                }

                this.handsToUse = arr;
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
                } /*else if (data.type === 'colorAll' && !data.value && this.allColorsDisabled()) {
                    //this.filters.colorBlack = true;
                }*/ else if (data.type !== 'colorAll' && data.value) {
                    this.filters.colorAll = false;
                }
            },
            onFullModeBtnClick() {
                this.fullModeActivated = true;
                this.loadAllHands();
            },
            onActiveHandsBntClick() {
                this.showActiveHands = !this.showActiveHands;
            },
            setFilter() {
                this.filters = {
                    typeHourMinutes: true,
                        typeSeconds: true,
                        typePlastic: false,
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
            },
            resetFilter() {
                this.setFilter();
                this.handsToUse = this.allHands;
            },
            onAvailLengthsCount(data) {
                this.filters.lengthFrom = data.lengthFrom;
                this.filters.lengthTo = data.lengthTo;
            },
            getSuitableSecond() {
                let lengthMin = this.activeHandProp[0].length_m - 4,
                    lengthMax = this.activeHandProp[0].length_m + 4;

                let second = this.handsToUse.find(
                    fSecond=>
                        fSecond.length_m >= lengthMin
                        && fSecond.length_m <= lengthMax
                        && fSecond.type.slug === 'second'
                );

                if (!second) {
                    lengthMin -=2;
                    lengthMax -=2;

                    second = this.handsToUse.find(
                        fSecond=>
                            fSecond.length_m >= lengthMin
                            && fSecond.length_m <= lengthMax
                            && fSecond.type.slug === 'second'
                    );
                }
                if (!second) {
                    second = this.seconds[0];
                }

                return second;
            }
        },
        components: {
            cases,
            dials,
            dial,
            handSlider,
            'active-hand' : hand,
            handHeader,
            handFilter
        }
    }
</script>
<style lang="stylus">
    label {
        display: flex;
        align-items: flex-end;
        &.try_hand_menu {
            font-family: "Alegreya Sans"
            font-weight: bold;
            font-size: 26px;
            color: #333333;
            .try_hand_menu__header {
                margin-right: 20px;
                @media only screen and (max-width: 450px) {
                    margin-bottom: 3px;
                }
            }
            @media only screen and (max-width: 700px) {
                font-size: 22px;
            }
            @media only screen and (max-width: 500px) {
                font-size: 18px;
                flex-wrap: wrap;
            }
        }
        select {
            @media only screen and (max-width: 700px) {
                font-size: 14px;
                padding: 6px 12px;
            }
            @media only screen and (max-width: 500px) {
                font-size: 14px;
                padding: 4px 8px;
            }
        }
    }

    header {
        &.try_hand_menu {
            font-family: "Alegreya Sans"
            font-weight: bold;
            font-size: 26px;
            color: #333333;

            @media only screen and (max-width: 700px) {
                font-size: 22px;
            }
            @media only screen and (max-width: 500px) {
                font-size: 18px;
            }
        }
    }


    .try-hand__loading {
        display: flex;
        padding: 50px;
        justify-content: center;
        align-items: center;
        color: #7F786E;
    }

    .full-mode__loading {
        display: flex;
        padding: 10px;
        justify-content: center;
        align-items: center;
        color: #7F786E;
    }
    .try-hand {
        justify-content: space-between;
        align-items: flex-start;
        margin: 30px 0;
        .try-hand__top {
            display: flex;
            justify-content: space-between;
            align-items: center;
            @media only screen and (max-width: 700px) {
                //flex-direction: column;
            }
            .try-hand__menu {
                flex-basis: 45%
                color: #333333;
                font-family: "Alegreya Sans Light";
                font-size: 22px;
                .try-hand__cases-menu {
                    .clock-cases {
                        display: flex;
                        flex-wrap: wrap;
                        margin-top: 20px;
                        .clock-cases__item {
                            width: 70px;
                            padding: 5px;
                            border: solid 1px #808080;
                            border-radius: 5px;
                            margin: 0 5px 5px 0;
                            transition: all .3s;
                            cursor: pointer;
                            img {
                                width: 100%;
                                vertical-align: top;
                            }
                            @media only screen and (max-width: 700px) {
                                width: 40px;
                            }
                            @media only screen and (max-width: 500px) {
                                padding: 2px;
                                width: 30px;
                                margin: 0 3px 3px 0;
                            }
                        }
                        .clock-case__item_active {
                            border-color: #607691;
                            border-width: 3px;
                        }
                        @media only screen and (max-width: 700px) {
                            margin-top: 10px;
                        }
                        @media only screen and (max-width: 500px) {
                            margin-top: 5px;
                        }
                    }
                }
                .try-hand__dials-menu {
                    margin-top: 30px;
                    .clock-dials {
                        display: flex;
                        flex-wrap: wrap;
                        margin-top: 20px;

                        .clock-dials__item {
                            width: 70px;
                            padding: 5px;
                            border: solid 1px #808080;
                            border-radius: 5px;
                            margin: 0 5px 5px 0;
                            cursor: pointer;
                            transition: all .3s;
                            img {
                                width: 100%;
                                vertical-align: top;
                            }
                            @media only screen and (max-width: 700px) {
                                width: 40px;
                            }
                            @media only screen and (max-width: 500px) {
                                width: 30px;
                                margin: 0 3px 3px 0;
                                padding: 2px;
                            }
                        }
                        .clock-dials__item_active {
                            border-color: #607691;
                            border-width: 3px;
                        }
                        @media only screen and (max-width: 700px) {
                            margin-top: 10px;
                        }
                        @media only screen and (max-width: 500px) {
                            margin-top: 5px;
                        }
                    }
                    .dials-menu__color {
                        margin-top: 10px;
                        position: relative;
                        display: flex;
                        align-items: flex-end;
                        margin-right: 10px;
                        flex-wrap: wrap;
                        .color-picker__toggle {
                            width: 37px;
                            height: 37px;
                            cursor: pointer;
                            color: #808080;
                            border-radius: 5px;
                            box-shadow: 0 2px 3px #aaa;
                            margin-left: 20px;
                            @media only screen and (max-width: 700px) {
                                width: 32px;
                                height: 32px;
                            }
                            @media only screen and (max-width: 500px) {
                                width: 28px;
                                height: 28px;
                                margin-left: 10px;
                            }
                        }

                        .color-picker {
                            position: absolute;
                            left: 20px;
                            top: 0;
                            padding: 10px;
                            background: #eee;
                            display: flex;
                            align-items: flex-start;
                            border-radius: 5px;
                            z-index: 999999;
                            button {
                                font-family: "Alegreya Sans";
                                font-weight: bold;
                                font-size: 20px;
                                background: #f99532;
                                color: #fff;
                                text-align: center;
                                margin-left: 10px;
                                box-shadow: 0 2px 3px #b26519;
                                border: solid 1px #cc741d;
                                cursor: pointer;
                            }
                            @media only screen and (max-width: 500px) {
                                font-size: 14px;
                                left: 10px;
                                padding: 5px;
                            }
                        }
                        input {
                            display: none;
                            margin 0 10px;
                            flex-basis: 125px;
                            max-width: 125px;
                            @media only screen and (max-width: 700px) {
                                font-size: 14px;
                                padding: 6px 12px;
                            }
                            @media only screen and (max-width: 500px) {
                                padding: 4px 8px;
                            }
                        }
                        @media only screen and (max-width: 500px) {
                            margin-top: 5px;
                        }
                    }
                    .dials-menu__digit {
                        margin-top: 20px;
                        select {
                            margin-top: 5px;
                            @media only screen and (max-width: 700px) {
                                font-size: 14px;
                                padding: 6px 12px;
                            }
                            @media only screen and (max-width: 500px) {
                                padding: 4px 8px;
                            }
                        }
                        @media only screen and (max-width: 700px) {
                            margin-top: 15px;
                        }
                        @media only screen and (max-width: 500px) {
                            margin-top: 10px;
                        }
                    }
                    @media only screen and (max-width: 700px) {
                        margin-top: 15px;
                    }
                    @media only screen and (max-width: 500px) {
                        margin-top: 10px;
                    }
                }
                @media only screen and (max-width: 700px) {
                    font-size: 18px;
                    width: 45%
                }
                @media only screen and (max-width: 500px) {
                    font-size: 16px;
                }
            }
            .try-hand__clock {
                flex-basis: 40%;
                position: relative;
                margin: 0 auto;
                @media only screen and (max-width: 1200px) {
                    flex-basis: 46%;
                }
                @media only screen and (max-width: 1000px) {
                    flex-basis: 52%;
                }
                @media only screen and (max-width: 700px) {
                //flex-basis: 52%;
                    width: 52%;
                    margin: 20px auto 0;
                }
                @media only screen and (max-width: 500px) {

                }
                .try-hand__case {
                    width: 100%;
                    border-radius: 50%;

                    img {
                        vertical-align: top;
                        width: 100%;
                        height: auto;
                    }
                }

                .try-hand__dial, .try-hand__hand,  .try-hand__second{
                    position: absolute;
                    left: 0;
                    top: 0;
                    bottom: 0;
                    right: 0;

                    img {
                        vertical-align: top;
                        width: 100%;
                        height: auto;
                    }
                }

                .try-hand__hand, .try-hand__second {
                    top: .5%;
                }
            }
        }
    }

    .fade-slide-enter-active {
        transition: all .3s ease;
        position: relative;
    }
    .fade-slide-leave-active {
        transition: all .3s ease;
        position: relative;
    }
    .fade-slide-enter, .fade-slide-leave-to{
        opacity: 0;
        transform: translateY(-30px);
        position: relative;
    }


    .active-hands {
        margin: 20px auto;
        header {
            //border-bottom: solid 1px #8e8d78;
            color: #333333;
            font-family: "Alegreya Sans";
            font-size: 28px;
            display: flex;
            align-items: flex-end;
        }
        .active-hands__hide-btn {
            display: inline-block;
            padding: 7px 12px;
            background: #ead6be;
            border: solid 1px #d1bfaa;
            box-shadow: 0 1px 2px #9e9080;
            color: #38332d;
            font-size: 14px;
            margin: 0 0 5px 15px;
            border-radius: 5px;
            cursor: pointer;
            transition: all .3s;

            &:hover {
                background: #f7e2cb;
                box-shadow: 0 1px 1px #82766b;
            }
        }
    }
    .demo-hands {
        flex-basis: 100%;
        overflow: hidden;

        .full-mode-btn {
            float: right;
            background: #607691;
            padding: 15px 30px;
            line-height: 1.6;
            color: #fff;
            text-align: center;
            margin-right: 45px;
            margin-top: 20px;
            border-radius: 5px;
            cursor: pointer;
            transition: all .3s;
            &:hover {
                background: #718ca8;
            }
            @media only screen and (max-width: 500px) {
                margin-right: 35px;
                font-size: 14px;
            }
            @media only screen and (max-width: 400px) {
                width: 80%;
                margin: 20px auto 0;
                float: none;
            }
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
</style>