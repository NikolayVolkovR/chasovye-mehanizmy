<template>
    <div class="try-hand__dials-menu">
        <header class="try_hand_menu">Циферблат</header>
        <div class="dials-menu__color">
            Цвет:
            <input
                    title="Цвет циферблата"
                    type="text"
                    :value="dialColor"
                    @focus="onColorInputFocus"
            />
            <div
                    class="color-picker__toggle"
                    @click="onToggleClick"
                    :style="toggleStyle"
            >
                <icon-base :width="pickColorIconSize" :height="pickColorIconSize" iconName="Выбрать цвет">
                    <icon-pick-color></icon-pick-color>
                </icon-base>
            </div>
            <transition name="fade-slide">
                <div class="color-picker" v-if="showColorPicker">
                    <sketch-picker
                            :value="dialColor"
                            @input="onColorInput"
                    />
                    <button @click="onColorPickerOk">Ok</button>
                </div>
            </transition>

        </div>
        <div class="dials-menu__digit">
            Оцифровка:<br/>
            <select @change="onDigitTypeChange" :value="digitType">
                <option v-for="type in digitTypes" :value="type">{{type}}</option>
            </select>
            <select @change="onDigitColorChange" :value="digitColor">
                <option v-for="color in digitColors" :value="color">{{color}}</option>
            </select>
            <div class="clock-dials">
                <div
                        class="clock-dials__item"
                        v-for="item in items"
                        :class="item.id == activeItemId ? 'clock-dials__item_active' : ''"
                        @click="onDialClick(item.id)"
                >
                    <img :src="item.thumb_id[0].src" />
                </div>
            </div>
        </div>
    </div>
</template>
<script>
    import { Sketch } from 'vue-color'
    import IconBase from 'Components/icons/IconBase.vue'
    import IconPickColor from 'Components/icons/pickColor.vue'

    export default {
        mounted() {
            this.setPickColorIconSize();
            window.addEventListener('resize', this.onResize)
        },
        props: {
            items: Array,
            digitTypes: Array,
            digitType: String,
            digitColors: Array,
            digitColor: String,
            dialColor: String,
            activeItemId: Number
        },
        data() {
            return {
                showColorPicker: false,
                pickColorIconSize: '37',
                resizeTimer: null
            }
        },
        computed: {
            toggleStyle() {
                return {
                    background: this.dialColor
                }
            }
        },
        methods: {
            setPickColorIconSize() {
                if (window.innerWidth >= 500) {
                    this.pickColorIconSize = '32'
                } else if (window.innerWidth >= 700) {
                    this.pickColorIconSize = '37'
                } else {
                    this.pickColorIconSize = '28'
                }
            },
            onColorInput(data) {
                this.$emit('dial-color-change', data.hex)
            },
            onColorPickerOk() {
                this.showColorPicker = false;
            },
            onToggleClick() {
                this.showColorPicker = !this.showColorPicker;
            },
            onColorInputFocus() {
                this.showColorPicker = true;
            },
            onDigitTypeChange($event) {
                this.$emit('digit-type-change', $event.target.value)
            },
            onDigitColorChange($event) {
                this.$emit('digit-color-change', $event.target.value)
            },
            onDialClick(id) {
                this.$emit('dial-item-click', id)
            },
            onResize() {
                clearTimeout(this.resizeTimer);

                this.resizeTimer = setTimeout(()=>{this.setPickColorIconSize()}, 500);
            }
        },
        components: {
            'sketch-picker': Sketch,
                IconBase,
                IconPickColor
        }
    }
</script>