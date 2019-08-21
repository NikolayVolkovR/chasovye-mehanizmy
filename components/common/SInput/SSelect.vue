<template>
    <label class="s-select">
        <div class="s-select__label">
            {{ label }}
        </div>
        <div class="s-select__input-message">
            <select @change="onChange" ref="select">
                <option
                    v-for="item in items"
                    :value="item.value"
                    :selected="item.value === value"
                >
                    {{ item.label }}
                </option>
            </select>
            <transition name="fade-slide">
                <div
                        v-if="showMessage"
                        class="s-select__message"
                >
                    {{ messageText }}
                </div>
            </transition>
        </div>
    </label>
</template>
<script>
    export default {
        props: {
            items: Array,
            label: String,
            value: [Number,String]
        },
        data() {
            return {}
        },
        computed: {
            messageText() {
                let index = this.items.findIndex(item=>item.value === this.value)
                return this.items[index].message;
            },
            showMessage() {
                return !!this.messageText;
            }
        },
        methods: {
            onChange($event) {
                this.$emit('change', parseInt(this.$refs.select.value));
            }
        }
    }
</script>