<template>
    <label class="s-input" v-if="!hidden">
        <div class="s-input__label">
            {{ label }}
            <span v-if="required" class="s-input__required">*</span>
        </div>
        <div class="s-input__input-message">
            <input
                    type="text"
                    ref="input"
                    :placeholder="placeholder"
                    :class="inputClass"
                    :maxlength="maxLength"
                    :value="value"
                    @keypress="onKeypress"
                    @keyup="onKeyup"
                    @blur="onBlur"
                    @input="onInput"
            />
            <div v-if="hint" class="s-input__hint">{{ hint }}</div>
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
    export default {
        mounted() {
            this.validate();
            this.emitValid();
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
            maxLength: {
                type: Number,
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
                type: [String, Number],
                default: ''
            },
            hint: {
                type: String,
                default: null
            },
            hidden: {
                type: Boolean,
                default: false
            }
        },
        data() {
            return {
                isValidByEmail: false,
                isValidByRequired: false,
                firstBlur: false
            }
        },
        computed: {
            isValid() {
                return this.isValidByEmail && this.isValidByRequired;
            },
            placeholder() {
                if (this.type === 'email') {
                    return 'email'
                }
                return '';
            },
            inputClass() {
                if (this.firstBlur && this.needValidation) {
                    if (this.isValid) {
                        return 's-input_valid';
                    } else {
                        return 's-input_not-valid'
                    }
                }
                return '';
            },
            showIcon() {
                return this.icon && this.firstBlur && this.needValidation;
            },
            iconName() {
                return this.isValid ? 'check-circle' : 'exclamation-circle'
            },
            iconClass() {
                return this.isValid ? 'success-icon' : 'error-icon'
            },
            showMessage() {
                return !this.isValid && this.firstBlur && this.messageText;
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
                return this.required || this.type === 'email'
            }
        },
        methods: {
            onKeypress($event) {
                if (this.type === 'number') {
                    const keyCode = $event.keyCode;

                    if ((keyCode > 31 && (keyCode < 48 || keyCode > 57)) && keyCode !== 46) {
                        $event.preventDefault();
                    } else {
                        return true;
                    }
                }
            },
            onKeyup() {
                this.validate();
            },
            validate() {
                this.validateByEmail();
                this.validateByRequire();
                this.$emit('validate', {isValid: this.isValid, index: this.index});
            },
            validateByEmail() {
                if (this.type === 'email') {
                    let value = this.$refs.input.value;
                    const re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
                    this.isValidByEmail = re.test(value)
                } else {
                    this.isValidByEmail = true
                }

            },
            validateByRequire() {
                if (this.required) {
                    const value = this.$refs.input.value;
                    this.isValidByRequired = value !== '';
                } else {
                    this.isValidByRequired = true;
                }
            },
            onBlur() {
                this.validate();
                this.firstBlur = true;
            },
            onInput() {
                this.$emit('input', {index: this.index, value: this.$refs.input.value});
            },
            emitValid() {
                if (!this.needValidation) {
                    this.$emit('validate', {isValid: true, index: this.index});
                }
            }
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