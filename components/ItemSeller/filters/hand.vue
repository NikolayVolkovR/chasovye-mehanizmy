<template>
    <div class="filters">
        <div class="type" v-if="typeFilter">
            <header>Тип:</header>
            <simple-checkbox
                    :checked="filters.typeHourMinutes"
                    :disabled="false"
                    :styles="checkboxStyle"
                    @change="onChange('typeHourMinutes', filters.typeHourMinutes)"
                    label="Часовые и минутные"
            >
            </simple-checkbox>
            <simple-checkbox
                    :checked="filters.typeSeconds"
                    :disabled="false"
                    :styles="checkboxStyle"
                    @change="onChange('typeSeconds', filters.typeSeconds)"
                    label="Секундные"
            >
            </simple-checkbox>
            <simple-checkbox
                    :checked="filters.typePlastic"
                    :disabled="false"
                    :styles="checkboxStyle"
                    @change="onChange('typePlastic', filters.typePlastic)"
                    label="Пластиковые"
            >
            </simple-checkbox>
            <simple-checkbox
                    :checked="filters.typePower"
                    :disabled="false"
                    :styles="checkboxStyle"
                    @change="onChange('typePower', filters.typePower)"
                    label="Усиленные"
            >
            </simple-checkbox>
        </div>
        <div class="shaft">
            <header>Шток:</header>
            <simple-checkbox
                    :checked="filters.shaftS1"
                    :disabled="false"
                    :styles="checkboxStyle"
                    @change="onChange('shaftS1', filters.shaftS1)"
                    label="S1"
            >
            </simple-checkbox>
            <simple-checkbox
                    :checked="filters.shaftS2"
                    :disabled="false"
                    :styles="checkboxStyle"
                    @change="onChange('shaftS2', filters.shaftS2)"
                    label="S2"
            >
            </simple-checkbox>
        </div>
        <div class="length">
            <header>Длина <span class="hint">(мм)</span>:</header>
            <div class="length-inputs">
                <label>от
                    <input
                            type="text"
                            :value="lengthFrom"
                            @keypress="onLengthInputKeypress"
                            @change="onLengthFromChange"
                    />
                </label>
                <label>до
                    <input
                            type="text"
                            :value="lengthTo"
                            @keypress="onLengthInputKeypress"
                            @change="onLengthToChange"
                    />
                </label>
            </div>
            <my-range
                    :min="availLengthMin"
                    :max="availLengthMax"
                    :from="lengthFrom"
                    :to="lengthTo"
                    @from-move="onRangeFromMove"
                    @to-move="onRangeToMove"
            />
        </div>
        <div class="color" :class="colorClass">
            <header>Цвет:</header>
            <simple-checkbox
                    :checked="filters.colorAll"
                    :disabled="false"
                    :styles="colorCheckboxStyle"
                    @change="onChange('colorAll', filters.colorAll)"
                    label="Все"
            />
            <div class="color__items">
                <hand-color
                        v-for="color, index in colors"
                        :key="color.name"
                        :color="color.name"
                        :active="filters[getColorFilterName(color.name)]"
                        @click="onChange(getColorFilterName(color.name), filters[getColorFilterName(color.name)])"
                ></hand-color>
            </div>
        </div>
    </div>
</template>
<script>
    import SimpleCheckbox from 'Components/common/SimpleCheckbox/SimpleCheckbox.vue'
    import MyRange from 'Components/common/Range/Range.vue'
    import handColor from 'Components/ItemSeller/items/hand/handColor.vue'

    export default {
        created() {
            this.lengthFrom = this.availLengthMin;
            this.lengthTo = this.availLengthMax;
            this.$emit('avail-lengths-count', {lengthFrom: this.lengthFrom, lengthTo: this.lengthTo})
        },
        mounted() {
            this.setCheckboxStyle();
            window.addEventListener('resize', this.onResize)
        },
        props: {
            items: Array,
            filters: Object,
            typeFilter: {
                type: Boolean,
                default: true
            },
            colorsOneLine: {
                type: Boolean,
                default: false
            }
        },
        data() {
            return {
                lengthFrom: 0,
                lengthTo: 0,
                filterChangeTimeout: null,
                checkboxStyle: [{
                    marginBottom: '15px',
                    fontSize: '15px'
                }],
                resizeTimeout: null
            }
        },
        computed: {
            colorCheckboxStyle() {
                return [{
                    marginBottom: '15px',
                    fontSize: '15px',
                    marginLeft: '5px'
                }]
            },
            lengths() {
                return Array.from(new Set(this.items.map(item => item.length_m))).sort((a,b) => a - b);
            },
            availLengthMin() {
                return this.lengths[0]
            },
            availLengthMax() {
                return this.lengths[this.lengths.length - 1]
            },
            colors() {
                return Array.from(new Set(this.items.map(item => item.color.id)))
                    .map(id => {
                        return {
                            id: id,
                            name: this.items.find(item => item.color.id === id).color.name
                        }
                    })
            },
            colorClass() {
                return this.colorsOneLine ? 'color__one-line' : '';
            }
        },
        methods: {
            onChange(filterName, value) {
                this.$emit('filter-change', {type: filterName, value: !value})
            },
            onLengthInputKeypress($event) {
                const keyCode = $event.keyCode;

                if ((keyCode > 31 && (keyCode < 48 || keyCode > 57)) && keyCode !== 46) {
                    $event.preventDefault();
                } else {
                    return true;
                }
            },
            onLengthFromChange($event) {
                let value = parseInt($event.target.value);

                if (value < this.availLengthMin) {
                    value = this.availLengthMin;
                } else if (value > this.availLengthMax - 1) {
                    value = this.availLengthMax - 1;
                } else if (value > this.lengthTo - 1) {
                    value = this.lengthTo - 1
                }
                this.lengthFrom = value;
                $event.target.value = value;

                this.$emit('filter-change', {type: 'lengthFrom', value: value})
            },
            onLengthToChange($event) {
                let value = parseInt($event.target.value);

                if (value < this.availLengthMin + 1) {
                    value = this.availLengthMin + 1
                } else if (value > this.availLengthMax) {
                    value = this.availLengthMax
                }

                this.lengthTo = value;
                $event.target.value = value;

                this.$emit('filter-change', {type: 'lengthTo', value: value})
            },
            onRangeFromMove(movedBy) {
                this.lengthFrom = this.availLengthMin + movedBy;

                clearTimeout(this.filterChangeTimeout);
                this.filterChangeTimeout = setTimeout(()=>{
                    this.$emit('filter-change', {type: 'lengthFrom', value: this.lengthFrom});
                }, 300);

            },
            onRangeToMove(movedBy) {
                this.lengthTo = this.availLengthMin + movedBy;

                clearTimeout(this.filterChangeTimeout);
                this.filterChangeTimeout = setTimeout(()=>{
                    this.$emit('filter-change', {type: 'lengthTo', value: this.lengthTo});
                }, 300);
            },
            setCheckboxStyle() {
                if (window.innerWidth >= 400) {
                    this.checkboxStyle = [{
                        marginBottom: '15px',
                        fontSize: '15px'
                    }]
                } else {
                    this.checkboxStyle = [{
                        marginBottom: '15px',
                        fontSize: '13.5px'
                    }]
                }
            },

            getColorFilterName(color) {
                switch(color) {
                    case 'Чёрный':
                        return 'colorBlack';
                    case 'Белый':
                        return 'colorWhite';
                    case 'Золото':
                        return 'colorGold';
                    case 'Бронза':
                        return 'colorBronze';
                    case 'Красный':
                        return 'colorRed';
                    case 'Серебро':
                        return 'colorSilver';
                }
            },

            onColorClick(index) {
                console.log(index)
            },
            onResize() {
                clearTimeout(this.resizeTimeout);

                this.resizeTimeout = setTimeout(()=>{
                    this.setCheckboxStyle()
                }, 500);
            }
        },
        components: {
            SimpleCheckbox, MyRange, handColor
        }
    }
</script>
<style scoped lang="stylus">
    .filters {
        color: #333;
        display: flex;
        margin: 0 0 20px;
        justify-content: center;

        header {
            font-size: 20px;
            text-align: center;
            margin-bottom: 10px;
        }
        .hint {
            font-size: 14px;
            color: #808080;
        }
        .shaft {
            margin: 0 20px;
        }
        .type {
            width: 230px;
        }
        .length {
            width: 140px;
            margin: 0 30px;

            .length-inputs {
                display: flex;
                justify-content: space-between;

                label {
                    flex-basis: 48%;
                    color: #808080;
                    font-size: 17px;
                    font-family: "Alegreya Sans";
                    text-align: center;

                    input {
                        width: 100%;
                        min-width: 45px;
                        border-radius: 5px;
                        border: solid 1px #cccccc;
                        font-size: 16px;
                        font-family: "Century Gothic";
                        color: #666666;
                        margin-top: 5px;
                        padding: 5px;
                        text-align: center;
                        margin-left: 5px;
                    }
                }
            }
        }
        >.color {
            min-width: 80px;
            margin: 0 20px;
            .color__items {
                display: flex;
                justify-content: flex-start;
                flex-wrap: wrap;

                .color {
                    min-width: 34px;
                }
            }

            &.color__one-line {
                .color__items {
                    max-width: 230px;
                }
            }
        }

        @media only screen and (max-width: 650px) {
            justify-content: space-around;
            flex-wrap: wrap;

            .shaft {
                margin: 0;
                width: auto;
                flex-basis: 20%;
            }
            .type {
                margin: 0;
                wwidth: auto;
                flex-basis: 70%;
            }
            .length {
                margin: 10px 0;
                width: auto;
                flex-basis: 43%;
            }
            >.color {
                margin: 10px 0;
                flex-basis: 43%;
                .color__items {
                    //width: 100%;
                    max-width: auto;
                }
            }
        }
    }
</style>