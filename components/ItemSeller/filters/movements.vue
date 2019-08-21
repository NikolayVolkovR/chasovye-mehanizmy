<template>
    <div class="filter">
        <div class="selects">
            <div class="column type">
                <label>
                    Тип
                    <!--<icon-base width="20" height="20" iconName="Подробнее"><icon-help /></icon-base>-->
                    <select @change="onChange($event, 'type')" :value="filters.type">
                        <option
                                v-for="type in types"
                                :value="type.id"
                        >
                            {{ type.name }}
                        </option>
                    </select>
                </label>
            </div>
            <div class="column shaft">
                <label>
                    Толщина циферблата
                    <select @change="onChange($event, 'dialWidth')" :value="filters.dialWidth">
                        <option v-for="shaft in shafts" :value="shaft.id">{{ shaft.width }}</option>
                    </select>
                </label>
            </div>
            <div class="column stroke">
                <label>
                    Ход секундной
                    <select @change="onChange($event, 'stroke')" :value="filters.stroke">
                        <option v-for="stroke in strokes" :value="stroke.id">{{ stroke.name }}</option>
                    </select>
                </label>
            </div>
            <div class="column noisiness">
                <label>
                    Громкость
                    <select @change="onChange($event, 'noisiness')" :value="filters.noisiness">
                        <option v-for="noise in noisiness" :value="noise.id">{{ noise.name }}</option>
                    </select>
                </label>
            </div>
        </div>
        <div class="column checkboxes">
            <simple-checkbox
                    :checked="filters.plasticHangerOnly"
                    :disabled="false"
                    :styles="checkboxStyle"
                    @change="onChange($event, 'plasticHangerOnly')"
                    label="Только с пластиковой петлёй"
            >
            </simple-checkbox>

            <simple-checkbox
                    :checked="filters.stockOnly"
                    :disabled="false"
                    :styles="checkboxStyle"
                    @change="onChange($event, 'stockOnly')"
                    label="Только в наличии"
            >
            </simple-checkbox>
        </div>
    </div>
</template>
<script>
    import IconBase from 'Components/icons/IconBase.vue'
    import IconHelp from 'Components/icons/help.vue'
    import SimpleCheckbox from 'Components/common/SimpleCheckbox/SimpleCheckbox.vue'

    export default {
        props: {
            items: Array,
            filters: Object
        },
        data() {
            return {
                checkboxStyle: [
                    {fontSize: '14px'},
                    {lineHeight: 1.35},
                    {marginTop: '20px'}
                ]
            }
        },
        computed: {
            types() {
                let arr = [{id: 'all', name: 'Все'}];

                const uniqueTypes = Array.from(new Set(this.items.map(item => item.type.id)))
                    .map(id => {
                        return {
                            id: id,
                            name: this.items.find(item => item.type.id === id).type.name
                        }
                    });

                return arr.concat(uniqueTypes)
            },
            shafts() {
                let arr = [{id: 'all', width: 'Все'}];

                let uniqueShafts = Array.from(new Set(this.items.map(item => item.shaft.id)))
                    .map(id => {
                        return {
                            id: id,
                            width: this.items.find(item => item.shaft.id === id).shaft.max_dial_width
                        }
                    });

                return arr.concat(uniqueShafts)
            },
            strokes() {
                let arr = [{id: 'all', name: 'Все'}];

                const uniqueStrokes = Array.from(new Set(this.items.map(item => item.strokeType.id)))
                    .map(id => {
                        return {
                            id: id,
                            name: this.items.find(item => item.strokeType.id === id).strokeType.name
                        }
                    });

                return arr.concat(uniqueStrokes)
            },
            noisiness() {
                let arr = [{id: 'all', name: 'Все'}];

                const uniqueStrokes = Array.from(new Set(this.items.map(item => item.noisinesType.id)))
                    .map(id => {
                        return {
                            id: id,
                            name: this.items.find(item => item.noisinesType.id === id).noisinesType.name
                        }
                    });

                return arr.concat(uniqueStrokes)
            }
        },
        methods: {
            onChange($event, type) {
                let value;

                if (type === 'plasticHangerOnly') {
                    this.filters.plasticHangerOnly = !this.filters.plasticHangerOnly;
                    value = this.filters.plasticHangerOnly;
                } else if (type === 'stockOnly') {
                    this.filters.stockOnly = !this.filters.stockOnly;
                    value = this.filters.stockOnly;
                } else {
                    value = $event.target.value;
                }

                this.$emit('filter-change', {type: type, value: value})
            }
        },
        components: {IconBase, IconHelp, SimpleCheckbox}
    }
</script>
<style scoped lang="stylus">
    .filter {
        display: flex;
        justify-content: space-between;
        align-items: stretch;
        box-sizing: border-box;
        color: #4d4d4d;
        font-family: "Alegreya Sans Light";
        font-size: 16px;

        .selects {
            display: flex;
            align-items: flex-end;
            justify-content: flex-start;
            flex-wrap: wrap;
            margin-right: 20px;
            .column {
                flex-basis: 23%;
                margin-top: 20px;
                margin-right: 10px;
                min-width: 130px;

                @media only screen and (max-width:  530px) {
                    min-width: 100px;
                }
                @media only screen and (max-width:  420px) {
                    flex-basis: 48%;
                    margin-right: 0;
                }
            }
            @media only screen and (max-width:  530px) {
                justify-content: space-around;
            }
            @media only screen and (max-width:  420px) {
                justify-content: space-between;
                margin-right: 0;
            }
        }
        .column {
            label {
                svg {
                    cursor: pointer;
                    color: #999999;
                    margin-left: 5px;
                }

                select {
                    display: block;
                    margin-top: 10px;
                    border-radius: 5px;
                    border: solid 1px #938a7d;
                    padding: 7px;
                    color: #938a7d;
                    font-size: 14px;
                    width: 100%;

                    option {
                        padding: 7px;
                    }
                    @media only screen and (max-width:  530px) {
                        font-size: 13px;
                    }
                }
            }
            &.checkboxes {
                display: flex;
                flex-direction: column;
                justify-content: center;
                min-width: 190px;

                @media only screen and (max-width:  500px) {
                    min-width: auto;
                }
            }
        }

        @media only screen and (max-width:  530px) {
            font-size: 13px;
        }
        @media only screen and (max-width:  420px) {
            flex-direction: column;
        }
    }
</style>