<template>
    <label class="s-input-file">
        <div class="s-input-file__label">
            {{ label }}
            <span v-if="required" class="s-input-file__required">*</span>
        </div>
        <div class="s-input-file__input-message">
            <input
                    type="file"
                    ref="input"
                    :style="inputStyle"
                    @change="onChange"
            />
            <div
                class="s-input-file__replacer"
                :class="replacerClass"
            >
                {{ replacerText }}
            </div>
            <transition name="fade-slide">
                <div
                        v-if="showMessage"
                        class="s-input-file__message"
                >
                    {{ messageText }}
                </div>
            </transition>
            <div
                    v-if="isEditMode"
                    class="s-input-file__download"
                    title="Скачать файл"
            >
                <a :href="value" target="_blank">
                    <font-awesome-icon icon="download" size="lg"/>
                    {{ fileName }}
                </a>
            </div>
        </div>
        <div class="s-input-file__icon-wrap">
            <font-awesome-icon
                    v-if="showIcon"
                    :icon="iconName"
                    :class="iconClass"
                    size="lg"
            />
        </div>

    </label>
</template>
<script>
    export default {
        mounted() {
            this.setReplacerText();
            this.validate();
        },
        props: {
            hideInput: {
                type: Boolean,
                default: true
            },
            label: {
                type: String,
                default: null
            },
            required: {
                type: Boolean,
                default: false
            },
            icon: {
                type: Boolean,
                default: true
            },
            index: {
                type: Number,
                default: null
            },
            value: {
                type: [String, File],
                default: ''
            },
        },
        data() {
            return {
                changed: false,
                isValid: false,
                replacerText: ''
            }
        },
        computed: {
            inputStyle() {
                if (this.hideInput) {
                    return [
                        {
                            display: 'none'
                        }
                    ]
                }
                return '';
            },
            showIcon() {
                return this.icon && this.changed;
            },
            iconName() {
                return this.isValid ? 'check-circle' : 'exclamation-circle'
            },
            iconClass() {
                return this.isValid ? 'success-icon' : 'error-icon'
            },
            showMessage() {
                return !this.isValid && this.changed && this.messageText;
            },
            messageText() {
                const value = this.$refs.input.value;
                if (this.required && value === '') {
                    return 'Поле обязательно для заполнения'
                } else {
                    return ''
                }
            },
            replacerClass() {
                if (this.changed) {
                    return this.isValid
                        ? 's-input-file__replacer_valid'
                        : 's-input-file__replacer_not-valid'
                }
                return '';
            },
            isEditMode() {
                return this.value && typeof this.value === 'string'
            },
            fileName() {
                return this.value.replace(/^.*[\\\/]/, '');
            }
        },
        methods: {
            validate() {
                if (this.isEditMode) {
                    this.isValid = this.required ? !!this.value : true;
                } else {
                    this.isValid =  this.required
                        ? this.$refs.input.files.length > 0
                        : true;
                }
                this.$emit('validate', {isValid: this.isValid, index: this.index});
            },
            onChange() {
                this.changed = true;
                this.setReplacerText();
                this.emitInput();
                this.validate();
            },
            emitInput() {
                let file;
                if (this.$refs.input.files.length > 0) {
                    file = this.$refs.input.files[0];
                } else {
                    file = '';
                }
                this.$emit('input', {index: this.index, value: file});
            },
            setReplacerText() {
                if (this.isEditMode) {
                    this.replacerText = this.$refs.input.files.length > 0
                        ? this.$refs.input.files[0].name
                        : 'Заменить файл'
                } else {
                    this.replacerText = this.$refs.input.files.length > 0
                        ? this.$refs.input.files[0].name
                        : 'Выберите файл'
                }
            }
        }
    }
</script>
<style lang="stylus">
    .s-input-file {
        input {
            outline: none;
            transition: all .3s;
        }
    }
    .success-icon {
        color: #41AD27;
    }

    .error-icon {
        color: #AF4925;
    }
</style>