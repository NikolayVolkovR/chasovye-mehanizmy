<template>
    <label class="s-input">
        <div class="s-input__label">
            {{ label }}
            <span v-if="required" class="s-input__required">*</span>
        </div>
        <div class="s-input__input-message">
            <input
                    ref="input"
                    :value="value"
                    v-imask="phoneMask"
                    :class="inputClass"
                    @accept="onAccept"
                    @complete="onComplete"
                    @blur="onBlur"
            >
            <transition name="fade-slide">
                <div
                        v-if="showMessage"
                        class="s-input__message"
                >
                    {{ messageText }}
                </div>
            </transition>
        </div>
        <div class="s-input__icon-wrap">
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
    import {IMaskDirective} from 'vue-imask';

    export default {
        created() {
            this.emitValid()
        },
        directives: {
            imask: IMaskDirective
        },
        props: {
            type: {
                type: String,
                default: 'text'
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
                type: String,
                default: ''
            }
        },
        data() {
            return {
                isValid: false,
                phoneMask: {
                    mask: '+{7} (000) 000-00-00',
                    lazy: false
                },
                changed: false
            }
        },
        computed: {
            inputClass() {
                if (this.changed && this.needValidation) {
                    if (this.isValid) {
                        return 's-input_valid';
                    } else {
                        return 's-input_not-valid'
                    }
                }
                return '';
            },
            showIcon() {
                return this.needValidation && this.icon && this.changed;
            },
            iconName() {
                return this.isValid ? 'check-circle' : 'exclamation-circle'
            },
            iconClass() {
                return this.isValid ? 'success-icon' : 'error-icon'
            },
            showMessage() {
                return !this.isValid && this.changed && this.messageText && this.needValidation;
            },
            messageText() {
                const value = this.$refs.input.value;
                if (this.required && value === '') {
                    return 'Поле обязательно для заполнения'
                } else {
                    return ''
                }
            },
            needValidation() {
                return this.required
            }
        },
        methods: {
            onAccept(value) {
                if (this.needValidation) {
                    this.isValid = false;
                    this.$emit('validate', {isValid: this.isValid, index: this.index});
                }
                this.$emit('input', {index: this.index, value: this.$refs.input.value});
            },
            onComplete() {
                if (this.needValidation) {
                    this.changed = true;
                    this.isValid = true;
                    this.$emit('validate', {isValid: this.isValid, index: this.index});
                }
            },
            onBlur() {
                this.changed = true;
            },
            emitValid() {
                if (!this.needValidation) {
                    this.$emit('validate', {isValid: true, index: this.index});
                }
            }
        },
        components: {

        }
    }
</script>
<style lang="stylus">
    .s-input {
        input {
            outline: none;
            transition: all .3s;

            &.s-input_valid {
                border: solid 1px #3f6b30;
                background: #ebf4e9;
            }
            &.s-input_not-valid {
                border: solid 1px #AF4925;
                background: #f2e9e9;
            }
        }
    }
    .success-icon {
        color: #41AD27;
    }

    .error-icon {
        color: #AF4925;
    }
</style>